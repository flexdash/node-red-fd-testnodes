<!-- PushButton - Simple button that sends a message when clicked
     Copyright ©2021 Thorsten von Eicken, MIT license, see LICENSE file
-->
<template>
  <div class="button-bar d-flex align-center w-100">
    <!-- 'flex' variant: buttons are in a flex div -->
    <div v-if="variant=='flex'" class="mx-1 w-100 d-flex flex-wrap justify-center">
      <v-btn v-for="(btn,ix) in buttons" v-bind:key="ix" v-bind="flex_btn_bindings[ix]"
             @click="click(ix)" :style="flex_btn_style">
        <v-icon v-if="btn.icon" :size="btn.label ? 'default' : 'large'" class="mr-1" :icon="btn.icon" />
        <div class="d-flex flex-column">
          <span v-if="btn.label">{{ btn.label }}</span>
          <span v-if="btn.line2 && !btn.line2_color">{{ btn.line2 }}</span>
          <v-chip v-if="btn.line2 && btn.line2_color"
                  :color="btn.line2_color" variant="flat" class="justify-center">
            {{ btn.line2 }}
          </v-chip>
        </div>
      </v-btn>
    </div>
    <!-- 'default' variant: buttons are in a VBtnGroup -->
    <v-defaults-provider v-else :defaults="density">
      <v-btn-group divided variant="flat" class="mx-1 w-100 justify-center" max-width="100%">
        <v-btn v-for="(btn,ix) in buttons" v-bind:key="ix" v-bind="group_btn_bindings[ix]"
               @click="click(ix)" :style="group_btn_style">
          <v-icon v-if="btn.icon" :size="btn.label ? 'default' : 'large'" class="mr-1" :icon="btn.icon" />
          <div class="d-flex flex-column">
            <span v-if="btn.label">{{ btn.label }}</span>
            <span v-if="btn.line2 && !btn.line2_color">{{ btn.line2 }}</span>
            <v-chip v-if="btn.line2 && btn.line2_color"
                    :color="btn.line2_color" variant="flat" class="justify-center">
              {{ btn.line2 }}
            </v-chip>
          </div>
        </v-btn>
      </v-btn-group>
    </v-defaults-provider>
  </div>
</template>
  
<style scoped>
.button-bar { height: 100%; }
</style>

<script scoped>

export default {
  name: 'ButtonBar',
  
  help: `Bar of buttons.
Display a bar of buttons with any combination of icons, labels and second lines.
Pressing a button sends a message with either the index of the button in the bar (0-based) or
the \`value\` of the button.

The buttons are configured using the \`button\` prop, which must be an array of objects with
the following properties (all are optional):

- \`icon\`: icon name with 'mdi-' prefix, names can be found at https://materialdesignicons.com
- \`label\`: button label,
- \`line2\`: second line of text,
- \`line2_color\`: color of second line, shows as a "pill",
- \`value\`: value to send when button is clicked,
- \`disabled\`: whether button is disabled,
- \'selected_color\': color of button when selected,

Buttons can be shown as selected by setting the \`value\` prop to the index of the selected button
or by passing in an array of booleans, one for each button.
`,
 
  props: {
    value: { default: null, tip: "index or value of selected button or array of bool per button" },
    buttons: { default: [{label:"button 1"}],
      tip: "array of buttons with icon, label, value, color, selected_color, line2, line2_color, disabled" },
    variant: { type: String, default: 'default', tip: "values: 'default', 'flex'" },
    stretch: { type: Boolean, default: false, tip: "stretch buttons horizontally to fill widget" },
  },

  output: { default: null },

  data() { return {
    justify: 'center',
  }},

  computed: {
    // return an array of booleans to indicate which buttons are selected
    selected() {
      return this.buttons.map((b, ix) =>
        Array.isArray(this.value) ? this.value[ix] : ix===this.value || b.value==this.value
      )
    },

    // return an array of button colors
    // default to the primary color, and use the selected color if specified
    btn_color() {
      return this.buttons.map((b, ix) => {
        const c = b.color || "primary"
        return this.selected[ix] && b.selected_color ? b.selected_color : c
      })
    },

    // return an array of active states for buttons
    // set button active if no selected color is specified and button is selected
    btn_active() {
      return this.buttons.map((b, ix) => this.selected[ix] && !b.selected_color)
    },

    // bindings passed into v-btn when inside v-btn-toggle
    group_btn_bindings() {
      return this.buttons.map((b,ix) => ({
        disabled: !!b.disabled,
        color: b.color || "primary",
        flat: true,
        active: Array.isArray(this.value) ? this.value[ix] : ix===this.value || b.value==this.value,
      }))
    },

    group_btn_style() { return {
        "flex-grow": this.stretch ? 1 : 0,
    }},

    // bindings passed into v-btn when using a flex div
    flex_btn_bindings() {
      const height = this.buttons.some(b => b.line2) ? "42px" : "null"
      return this.buttons.map((b,ix) => ({
        disabled: !!b.disabled,
        color: this.btn_color[ix],
        density: "default",
        height,
        elevation: 1,
        active: this.btn_active[ix],
      }))
    },

    flex_btn_style() { return {
        "flex-grow": this.stretch ? 1 : 0,
        margin: "1px 0.5px 1px 0.5px",
    }},

    density() {
      return {
        VBtnGroup: {
          density: this.buttons.some(b => b.line2) ? "default" : "comfortable",
        },
      }
    },

  },

  methods: {
    click(ix) {
      const btn = this.buttons[ix]
      if (btn && 'value' in btn) {
        this.$emit('send', btn.value)
      } else {
        this.$emit('send', ix)
      }
    },
  },

}
</script>
