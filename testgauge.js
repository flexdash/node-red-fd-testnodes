// FlexDash gauge for Node-RED
// Copyright (c) 2022 by Thorsten von Eicken, see LICENSE

module.exports = function (RED) {

  // flexdashTestGauge instatiates a FD Widget TestGauge node, 'this' is the node being constructed
  // and config are the values set by the user in the flow editor.
  function flexdashTestGauge(config) {
    const fd = RED.nodes.getNode(config.fd) // get a handle onto FlexDash
    RED.nodes.createNode(this, config)

    // propagate this node's config to the FD widget
    // The third arg is the kind of widget to create, if it doesn't exist
    fd.initWidget(this, config, 'Gauge')

    // handle flow input messages, basically massage them a bit and update the FD widget
    this.on("input", msg => {
      // prepare update of widget params
      const params = typeof msg.params === 'object' ? Object.assign({}, msg.params) : {}
      // msg.payload is interpreted as setting the gauge value, i.e. params.value
      if ('payload' in msg) params.value = msg.payload
      // send the params to the widget
      fd.updateWidget(this, params)
    })

  }

  RED.nodes.registerType("flexdash testgauge", flexdashTestGauge)
}
