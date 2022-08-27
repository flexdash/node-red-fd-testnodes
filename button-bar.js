// Node-RED node implementation for FlexDash widget ButtonBar

module.exports = function (RED) {

  const widgetProps = {
  "title": {
    "name": "title",
    "name_text": "Title",
    "name_kebab": "title",
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
    "type": "string",
    "input_type": "str",
    "tip": "Info text to display in (i) pop-up. ",
    "default": null,
    "default_html": null
  },
  "value": {
    "name": "value",
    "name_text": "Value",
    "name_kebab": "value",
    "tip": "Index or value of selected button or array of bool per button. ",
    "default": null,
    "default_html": null,
    "input_type": "any"
  },
  "buttons": {
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
    "name": "stretch",
    "name_text": "Stretch",
    "name_kebab": "stretch",
    "tip": "Stretch buttons horizontally to fill widget. ",
    "default": false,
    "default_html": "false",
    "type": "boolean",
    "input_type": "bool"
  }
}
  const widgetDefaults = Object.fromEntries(Object.values(widgetProps).map(p => [p.name, p.default]))

  // Instantiate the Node-RED node, 'this' is the node being constructed
  // and config contains the values set by the user in the flow editor.
  function ButtonBar(config) {
    RED.nodes.createNode(this, config)

    // Create missing node properties. This is to deal with the fact that if node properties are
    // added in an upgrade then nodes in existing flows don't have them. Besides not having the
    // expected defaults, this breaks the "widget-has-property" check when setting dynamic prop
    // values.
    for (const prop in widgetDefaults) {
      if (!config.hasOwnProperty(prop)) {
        config[prop] = widgetDefaults[prop]
        this.debug("Missing property: " + prop + " added with default: " + config[prop])
      }
    }
  
    // Initialize the widget by pushing the config to its props and get a handle
    // onto the FlexDash widget API.
    // The third arg is the kind of widget to create, if it doesn't exist
    const widget = RED.plugins.get('flexdash').initWidget(this, config, 'ButtonBar')
    if (!widget) return // missing config node, thus no FlexDash to hook up to, nothing to do here

    // handle flow input messages, basically massage them a bit and update the FD widget
    this.on("input", msg => {
      // if message has a topic and a `_delete` property then delete array-widget topic
      if ('topic' in msg && msg._delete) {
        widget.deleteTopic(msg.topic)
        return
      }
      // prepare update of widget props
      const props = Object.assign({}, msg) // shallow clone
      // msg.payload is interpreted as setting the value prop
      if ('value' && 'payload' in msg) props['value'] = msg.payload
      // delete fields that we don't want to pass to the widget, setProps ignores ones with leading _
      for (const p of ['topic', 'payload']) delete props[p]
      widget.setProps(msg.topic, props)
    })

    // handle messages from the widget, we receive the potential array element topic, the payload
    // sent by the widget, and the socket ID
    if (true) {
      widget.onInput((topic, payload, socket) => {
        // propagate the payload into the flow and attach the FD socket ID
        let msg = { payload: payload, _flexdash_socket: socket }
        if (topic != undefined) msg.topic = topic // array elt topic has priority
        else if (config.fd_output_topic) msg.topic = config.fd_output_topic // optional non-array topic
        this.send(msg)
      })
    }
  }

  RED.nodes.registerType("fd-button-bar", ButtonBar)
}
