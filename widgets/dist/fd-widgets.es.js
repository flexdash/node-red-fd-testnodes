const C = (t, o) => {
  const l = t.__vccOpts || t;
  for (const [f, h] of o)
    l[f] = h;
  return l;
}, j = {
  name: "ButtonBar",
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
- 'selected_color': color of button when selected,

Buttons can be shown as selected by setting the \`value\` prop to the index of the selected button
or by passing in an array of booleans, one for each button.
`,
  props: {
    value: { default: null, tip: "index or value of selected button or array of bool per button" },
    buttons: {
      default: [{ label: "button 1" }],
      tip: "array of buttons with icon, label, color, line2, line2_color, disabled, value"
    },
    variant: { type: String, default: "default", tip: "values: 'default', 'flex'" },
    stretch: { type: Boolean, default: !1, tip: "stretch buttons horizontally to fill widget" }
  },
  output: { default: null },
  data() {
    return {
      justify: "center"
    };
  },
  computed: {
    selected() {
      return this.buttons.map(
        (t, o) => Array.isArray(this.value) ? this.value[o] : o === this.value || t.value == this.value
      );
    },
    btn_color() {
      return this.buttons.map((t, o) => {
        const l = t.color || "primary";
        return this.selected[o] && t.selected_color ? t.selected_color : l;
      });
    },
    btn_active() {
      return this.buttons.map((t, o) => this.selected[o] && !t.selected_color);
    },
    group_btn_bindings() {
      return this.buttons.map((t, o) => ({
        disabled: !!t.disabled,
        color: t.color || "primary",
        flat: !0,
        active: Array.isArray(this.value) ? this.value[o] : o === this.value || t.value == this.value
      }));
    },
    group_btn_style() {
      return {
        "flex-grow": this.stretch ? 1 : 0
      };
    },
    flex_btn_bindings() {
      const t = this.buttons.some((o) => o.line2) ? "42px" : "null";
      return this.buttons.map((o, l) => ({
        disabled: !!o.disabled,
        color: this.btn_color[l],
        density: "default",
        height: t,
        elevation: 1,
        active: this.btn_active[l]
      }));
    },
    flex_btn_style() {
      return {
        "flex-grow": this.stretch ? 1 : 0,
        margin: "1px 0.5px 1px 0.5px"
      };
    },
    density() {
      return {
        VBtnGroup: {
          density: this.buttons.some((t) => t.line2) ? "default" : "comfortable"
        }
      };
    }
  },
  methods: {
    click(t) {
      const o = this.buttons[t];
      o && "value" in o ? this.$emit("send", o.value) : this.$emit("send", t);
    }
  }
}, y = window.Vue.renderList, m = window.Vue.Fragment, n = window.Vue.openBlock, s = window.Vue.createElementBlock, _ = window.Vue.resolveComponent, c = window.Vue.createBlock, i = window.Vue.createCommentVNode, u = window.Vue.toDisplayString, w = window.Vue.createTextVNode, d = window.Vue.withCtx, g = window.Vue.createElementVNode, x = window.Vue.mergeProps, N = window.Vue.createVNode;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const S = { class: "button-bar d-flex align-center w-100" }, z = {
  key: 0,
  class: "mx-1 w-100 d-flex flex-wrap justify-center"
}, A = { class: "d-flex flex-column" }, E = { key: 0 }, O = { key: 1 }, P = { class: "d-flex flex-column" }, T = { key: 0 }, D = { key: 1 };
function I(t, o, l, f, h, a) {
  const p = _("v-icon"), b = _("v-chip"), v = _("v-btn"), k = _("v-btn-group"), V = _("v-defaults-provider");
  return n(), s("div", S, [
    l.variant == "flex" ? (n(), s("div", z, [
      (n(!0), s(m, null, y(l.buttons, (e, r) => (n(), c(v, x({ key: r }, a.flex_btn_bindings[r], {
        onClick: (B) => a.click(r),
        style: a.flex_btn_style
      }), {
        default: d(() => [
          e.icon ? (n(), c(p, {
            key: 0,
            size: e.label ? "default" : "large",
            class: "mr-1",
            icon: e.icon
          }, null, 8, ["size", "icon"])) : i("", !0),
          g("div", A, [
            e.label ? (n(), s("span", E, u(e.label), 1)) : i("", !0),
            e.line2 && !e.line2_color ? (n(), s("span", O, u(e.line2), 1)) : i("", !0),
            e.line2 && e.line2_color ? (n(), c(b, {
              key: 2,
              color: e.line2_color,
              variant: "flat",
              class: "justify-center"
            }, {
              default: d(() => [
                w(u(e.line2), 1)
              ]),
              _: 2
            }, 1032, ["color"])) : i("", !0)
          ])
        ]),
        _: 2
      }, 1040, ["onClick", "style"]))), 128))
    ])) : (n(), c(V, {
      key: 1,
      defaults: a.density
    }, {
      default: d(() => [
        N(k, {
          divided: "",
          variant: "flat",
          class: "mx-1 w-100 justify-center",
          "max-width": "100%"
        }, {
          default: d(() => [
            (n(!0), s(m, null, y(l.buttons, (e, r) => (n(), c(v, x({ key: r }, a.group_btn_bindings[r], {
              onClick: (B) => a.click(r),
              style: a.group_btn_style
            }), {
              default: d(() => [
                e.icon ? (n(), c(p, {
                  key: 0,
                  size: e.label ? "default" : "large",
                  class: "mr-1",
                  icon: e.icon
                }, null, 8, ["size", "icon"])) : i("", !0),
                g("div", P, [
                  e.label ? (n(), s("span", T, u(e.label), 1)) : i("", !0),
                  e.line2 && !e.line2_color ? (n(), s("span", D, u(e.line2), 1)) : i("", !0),
                  e.line2 && e.line2_color ? (n(), c(b, {
                    key: 2,
                    color: e.line2_color,
                    variant: "flat",
                    class: "justify-center"
                  }, {
                    default: d(() => [
                      w(u(e.line2), 1)
                    ]),
                    _: 2
                  }, 1032, ["color"])) : i("", !0)
                ])
              ]),
              _: 2
            }, 1040, ["onClick", "style"]))), 128))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["defaults"]))
  ]);
}
const F = /* @__PURE__ */ C(j, [["render", I], ["__scopeId", "data-v-87d04793"]]), L = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: F
}, Symbol.toStringTag, { value: "Module" })), G = /* @__PURE__ */ Object.assign({ "./button-bar.vue": L });
export {
  G as default
};
