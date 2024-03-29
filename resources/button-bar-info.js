export default {
  "vue_file": "widgets/button-bar.vue",
  "base_filename": "button-bar",
  "module_dir": ".",
  "module_name": "@flexdash/node-red-fd-testnodes",
  "resources_dir": "resources",
  "resources_path": "resources/@flexdash/node-red-fd-testnodes",
  "name": "ButtonBar",
  "name_text": "Button Bar",
  "type_kebab": "fd-button-bar",
  "help": "Bar of buttons.\nDisplay a bar of buttons with any combination of icons, labels and second lines.\nPressing a button sends a message with either the index of the button in the bar (0-based) or\nthe `value` of the button.\n\nThe buttons are configured using the `button` prop, which must be an array of objects with\nthe following properties (all are optional):\n\n- `icon`: icon name with 'mdi-' prefix, names can be found at https://materialdesignicons.com\n- `label`: button label,\n- `line2`: second line of text,\n- `line2_color`: color of second line, shows as a \"pill\",\n- `value`: value to send when button is clicked,\n- `disabled`: whether button is disabled,\n- 'selected_color': color of button when selected,\n\nButtons can be shown as selected by setting the `value` prop to the value of the selected button\nor by passing in an array of booleans, one for each button.\n",
  "help_title": "Bar of buttons",
  "help_body": "Display a bar of buttons with any combination of icons, labels and second lines.\nPressing a button sends a message with either the index of the button in the bar (0-based) or\nthe `value` of the button.\n\nThe buttons are configured using the `button` prop, which must be an array of objects with\nthe following properties (all are optional):\n\n- `icon`: icon name with 'mdi-' prefix, names can be found at https://materialdesignicons.com\n- `label`: button label,\n- `line2`: second line of text,\n- `line2_color`: color of second line, shows as a \"pill\",\n- `value`: value to send when button is clicked,\n- `disabled`: whether button is disabled,\n- 'selected_color': color of button when selected,\n\nButtons can be shown as selected by setting the `value` prop to the value of the selected button\nor by passing in an array of booleans, one for each button.",
  "output": true,
  "props": {
    "title": {
      "name": "title",
      "name_text": "Title",
      "name_kebab": "title",
      "msg_name": "title",
      "type": "string",
      "input_type": "str",
      "tip": "Text to display in the widget header. ",
      "default": "Button Bar",
      "default_html": "'Button Bar'"
    },
    "popup_info": {
      "name": "popup_info",
      "name_text": "Popup Info",
      "name_kebab": "popup-info",
      "msg_name": "popup_info",
      "type": "string",
      "input_type": "str",
      "tip": "Info text to display in (i) pop-up. ",
      "default": null,
      "default_html": null
    },
    "value": {
      "msg_name": "payload",
      "name": "value",
      "name_text": "Payload",
      "name_kebab": "value",
      "tip": "Index or value of selected button or array of bool per button. ",
      "default": null,
      "default_html": null,
      "input_type": "any"
    },
    "buttons": {
      "msg_name": "buttons",
      "name": "buttons",
      "name_text": "Buttons",
      "name_kebab": "buttons",
      "tip": "Array of buttons with icon, label, value, color, selected_color, line2, line2_color, disabled. ",
      "default": [
        {
          "label": "button 1"
        }
      ],
      "default_html": "[{'label':'button 1'}]",
      "input_type": "any"
    },
    "variant": {
      "msg_name": "variant",
      "name": "variant",
      "name_text": "Variant",
      "name_kebab": "variant",
      "tip": "Values: 'default', 'flex'. ",
      "default": "default",
      "default_html": "default",
      "type": "string",
      "input_type": "str"
    },
    "stretch": {
      "msg_name": "stretch",
      "name": "stretch",
      "name_text": "Stretch",
      "name_kebab": "stretch",
      "tip": "Stretch buttons horizontally to fill widget. ",
      "default": false,
      "default_html": "false",
      "type": "boolean",
      "input_type": "bool"
    }
  },
  "payload_prop": "value"
}