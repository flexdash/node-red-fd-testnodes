const C = (n, t) => {
  const l = n.__vccOpts || n;
  for (const [f, p] of t)
    l[f] = p;
  return l;
}, N = {
  name: "ButtonBar",
  help: "Bar of buttons.\nDisplay a bar of buttons with any combination of icons, labels and second lines.\nPressing a button sends a message with either the 0-based index of the button in the bar or\nthe `value` of the button.\n\nThe buttons are configured using the `button` prop, which must be an array of objects with\nthe following properties (all are optional):\n\n- `icon`: icon name with 'mdi-' prefix, names can be found at https://materialdesignicons.com\n- `label`: button label,\n- `line2`: second line of text,\n- `line2_color`: color of second line, shows as a \"pill\",\n- `value`: value to send when button is clicked,\n- `disabled`: whether button is disabled,\n",
  props: {
    value: { default: null, tip: "index or value of selected button or array of bool per button" },
    buttons: {
      default: [{ label: "button 1" }],
      tip: "array of buttons with icon, label, color, line2, line2_color, disabled, value"
    },
    variant: { type: String, default: "default", tip: "values: 'default', 'flex'" }
  },
  output: { default: null },
  computed: {
    group_btn_bindings() {
      return this.buttons.map((n, t) => ({
        disabled: !!n.disabled,
        color: n.color || "primary",
        flat: !0,
        active: Array.isArray(this.value) ? this.value[t] : t === this.value || n.value == this.value
      }));
    },
    flex_btn_bindings() {
      const n = this.buttons.some((t) => t.line2) ? "42px" : "null";
      return this.buttons.map((t, l) => ({
        disabled: !!t.disabled,
        color: t.color || "primary",
        density: "default",
        height: n,
        elevation: 1,
        active: Array.isArray(this.value) ? this.value[l] : l === this.value || t.value == this.value
      }));
    },
    density() {
      return {
        VBtnGroup: {
          density: this.buttons.some((n) => n.line2) ? "default" : "comfortable"
        }
      };
    }
  },
  methods: {
    click(n) {
      const t = this.buttons[n];
      t && "value" in t ? this.$emit("send", t.value) : this.$emit("send", n);
    }
  }
}, m = window.Vue.renderList, w = window.Vue.Fragment, o = window.Vue.openBlock, i = window.Vue.createElementBlock, _ = window.Vue.resolveComponent, c = window.Vue.createBlock, a = window.Vue.createCommentVNode, r = window.Vue.toDisplayString, y = window.Vue.createTextVNode, u = window.Vue.withCtx, g = window.Vue.createElementVNode, k = window.Vue.mergeProps, S = window.Vue.createVNode;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const j = { class: "button-bar d-flex align-center justify-center" }, z = {
  key: 0,
  class: "mx-1 d-flex flex-wrap justify-center"
}, A = { class: "d-flex flex-column" }, E = { key: 0 }, O = { key: 1 }, P = { class: "d-flex flex-column" }, T = { key: 0 }, D = { key: 1 };
function I(n, t, l, f, p, d) {
  const h = _("v-icon"), v = _("v-chip"), b = _("v-btn"), x = _("v-btn-group"), V = _("v-defaults-provider");
  return o(), i("div", j, [
    l.variant == "flex" ? (o(), i("div", z, [
      (o(!0), i(w, null, m(l.buttons, (e, s) => (o(), c(b, k({ key: s }, d.flex_btn_bindings[s], {
        onClick: (B) => d.click(s),
        style: { margin: "1px 0.5px 1px 0.5px" }
      }), {
        default: u(() => [
          e.icon ? (o(), c(h, {
            key: 0,
            size: e.label ? "default" : "large",
            class: "mr-1",
            icon: e.icon
          }, null, 8, ["size", "icon"])) : a("", !0),
          g("div", A, [
            e.label ? (o(), i("span", E, r(e.label), 1)) : a("", !0),
            e.line2 && !e.line2_color ? (o(), i("span", O, r(e.line2), 1)) : a("", !0),
            e.line2 && e.line2_color ? (o(), c(v, { key: 2 }, {
              default: u(() => [
                y(r(e.line2), 1)
              ]),
              _: 2
            }, 1024)) : a("", !0)
          ])
        ]),
        _: 2
      }, 1040, ["onClick"]))), 128))
    ])) : (o(), c(V, {
      key: 1,
      defaults: d.density
    }, {
      default: u(() => [
        S(x, {
          divided: "",
          variant: "flat",
          class: "ma-auto",
          "max-width": "95%"
        }, {
          default: u(() => [
            (o(!0), i(w, null, m(l.buttons, (e, s) => (o(), c(b, k({ key: s }, d.group_btn_bindings[s], {
              onClick: (B) => d.click(s)
            }), {
              default: u(() => [
                e.icon ? (o(), c(h, {
                  key: 0,
                  size: e.label ? "default" : "large",
                  class: "mr-1",
                  icon: e.icon
                }, null, 8, ["size", "icon"])) : a("", !0),
                g("div", P, [
                  e.label ? (o(), i("span", T, r(e.label), 1)) : a("", !0),
                  e.line2 && !e.line2_color ? (o(), i("span", D, r(e.line2), 1)) : a("", !0),
                  e.line2 && e.line2_color ? (o(), c(v, {
                    key: 2,
                    color: e.line2_color,
                    variant: "flat"
                  }, {
                    default: u(() => [
                      y(r(e.line2), 1)
                    ]),
                    _: 2
                  }, 1032, ["color"])) : a("", !0)
                ])
              ]),
              _: 2
            }, 1040, ["onClick"]))), 128))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["defaults"]))
  ]);
}
const F = /* @__PURE__ */ C(N, [["render", I], ["__scopeId", "data-v-cde5aeb8"]]), L = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: F
}, Symbol.toStringTag, { value: "Module" })), G = /* @__PURE__ */ Object.assign({ "./button-bar.vue": L });
export {
  G as default
};
