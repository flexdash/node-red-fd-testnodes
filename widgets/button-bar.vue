<!-- PushButton - Simple button that sends a message when clicked
     Copyright ©2021 Thorsten von Eicken, MIT license, see LICENSE file
-->
<template>
  <div class="button-bar d-flex align-center justify-center">
    <!-- 'flex' variant: buttons are in a flex div -->
    <div v-if="variant=='flex'" class="mx-1 d-flex flex-wrap justify-center">
      <v-btn v-for="(btn,ix) in buttons" v-bind:key="ix" v-bind="flex_btn_bindings[ix]"
             @click="click(ix)" style="margin: 1px 0.5px 1px 0.5px;">
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
      <v-btn-group divided variant="flat" class="ma-auto" max-width="95%">
        <v-btn v-for="(btn,ix) in buttons" v-bind:key="ix" v-bind="group_btn_bindings[ix]"
               @click="click(ix)">
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
Pressing a button sends a message with either the 0-based index of the button in the bar or
the \`value\` of the button.

The buttons are configured using the \`button\` prop, which must be an array of objects with
the following properties (all are optional):

- \`icon\`: icon name with 'mdi-' prefix, names can be found at https://materialdesignicons.com
- \`label\`: button label,
- \`line2\`: second line of text,
- \`line2_color\`: color of second line, shows as a "pill",
- \`value\`: value to send when button is clicked,
- \`disabled\`: whether button is disabled,
`,
 
  props: {
    value: { default: null, tip: "index or value of selected button or array of bool per button" },
    buttons: { default: [{label:"button 1"}],
      tip: "array of buttons with icon, label, color, line2, line2_color, disabled, value" },
    variant: { type: String, default: 'default', tip: "values: 'default', 'flex'" },
  },

  output: { default: null },

  computed: {

    // bindings passed into v-btn when inside v-btn-toggle
    group_btn_bindings() {
      return this.buttons.map((b,ix) => ({
        disabled: !!b.disabled,
        color: b.color || "primary",
        flat: true,
        active: Array.isArray(this.value) ? this.value[ix] : ix===this.value || b.value==this.value,
      }))
    },

    // bindings passed into v-btn when using a flex div
    flex_btn_bindings() {
      const height = this.buttons.some(b => b.line2) ? "42px" : "null"
      return this.buttons.map((b,ix) => ({
        disabled: !!b.disabled,
        color: b.color || "primary",
        density: "default",
        height,
        elevation: 1,
        active: Array.isArray(this.value) ? this.value[ix] : ix===this.value || b.value==this.value,
      }))
    },

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
