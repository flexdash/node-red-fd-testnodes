<!-- PushButton - Simple button that sends a message when clicked
     Copyright ©2021 Thorsten von Eicken, MIT license, see LICENSE file
-->
<template>
  <div class="button-bar d-flex align-center justify-center">
    <v-defaults-provider :defaults="density">
      <v-btn-toggle :model-value="toggle" @update:modelValue="change" class="ma-auto" max-width="95%" divided
                    variant="outlined" density="default">
        <v-btn v-for="(btn,ix) in buttons" v-bind:key="ix" v-bind="btn_bindings[ix]">
          <v-icon v-if="btn.icon" :size="btn.label ? 'default' : 'large'" class="mr-1" :icon="btn.icon" />
          <div class="d-flex flex-column">
            <span v-if="btn.label">{{ btn.label }}</span>
            <span v-if="btn.line2 && !btn.line2_color">{{ btn.line2 }}</span>
            <v-chip v-if="btn.line2 && btn.line2_color">{{ btn.line2 }}</v-chip>
          </div>
        </v-btn>
      </v-btn-toggle>
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
Pressing a button sends a message with a specified payload.
Each button may contain an icon and/or a title string and is centered in the widget.
Icon names can be found at https://materialdesignicons.com.`,

  props: {
    value: { default: null, tip: "index or value of current selected button" },
    buttons: { default: [{label:"button 1"}],
      tip: "array of buttons with icon, label, color, line2, line2_color, disabled, value" },
  },

  output: { default: null },

  computed: {

    // actual bindings passed into v-btn
    btn_bindings() {
      return this.buttons.map(b => ({
        disabled: !!b.disabled,
        style: "background-color: " + (b.color || "primary"),
      }))
    },

    density() {
      return {
        VBtnToggle: {
          density: this.buttons.some(b => b.line2) ? "default" : "compact",
        },
      }
    },

  },

  methods: {
    change(ix) {
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
