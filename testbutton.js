// FlexDash button for Node-RED
// Copyright (c) 2022 by Thorsten von Eicken, see LICENSE

module.exports = function (RED) {

  // flexdashTestButton instatiates a FD Widget TestButton node, this is the node being constructed
  // and config are the values set by the user in the flow editor.
  function flexdashTestButton(config) {
    const fd = RED.nodes.getNode(config.fd)
    RED.nodes.createNode(this, config)

    // propagate this node's config to the FD widget
    // The third arg is the kind of widget to create, if it doesn't exist
    fd.initWidget(this, config, 'TestButton')

    // handle flow input messages, basically massage them a bit and update the FD widget
    this.on("input", msg => {
      // prepare update of widget params
      const params = typeof msg.params === 'object' ? Object.assign({}, msg.params) : {}
      // msg.payload is interpreted as setting the button value, i.e. params.value
      if ('payload' in msg) params.value = msg.payload
      // send the params to the widget
      fd.updateWidget(this, params)
    })

    // handle widget input messages, we receive the payload sent by the widget
    fd.onInput(this, payload => {
      // the button sends the value of its output_value param, we just propagate it as msg.payload
      // note that output_value could be an object, so we could decide to use that as full msg...
      this.send({payload})
    })

  }

  RED.nodes.registerType("flexdash testbutton", flexdashTestButton)
}
