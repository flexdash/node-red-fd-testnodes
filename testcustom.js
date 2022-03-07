// FlexDash TestCustom for Node-RED
// Copyright (c) 2022 by Thorsten von Eicken, see LICENSE

module.exports = function (RED) {

  // flexdashTestCustom creates a widget on-the-fly using vue3-sfc-loader and instantiates it.
  function flexdashTestCustom(config) {
    const fd = RED.nodes.getNode(config.fd)
    RED.nodes.createNode(this, config)

    // propagate this node's config to the FD widget
    // The third arg is the kind of widget to create, if it doesn't exist
    fd.initWidget(this, config, `nr__${this.id}`)
    console.log("Update custom widget with config:",
      Object.keys(config).map(k => k + ":" + JSON.stringify(config[k]).substring(0,20)).join(', '))

    // handle flow input messages, basically massage them a bit and update the FD widget
    this.on("input", msg => {
      // prepare update of widget params
      const params = typeof msg.params === 'object' ? Object.assign({}, msg.params) : {}
      // msg.payload is interpreted according to the payload config
      if ('payload' in msg && config.payload) params[config.payload] = msg.payload
      // send the params to the widget
      fd.updateWidget(this, params)
    })

    // handle widget input messages, we receive the payload sent by the widget
    fd.onInput(this, payload => {
      this.send({payload})
    })
  }

  RED.nodes.registerType("flexdash testcustom", flexdashTestCustom)
}
