// FlexDash Widget nodes for Node-RED
// Copyright (c) 2022 by Thorsten von Eicken, see LICENSE

module.exports = function (RED) {

  // flexdashTestButton instatiates a FD Widget TestButton node, this is the node being constructed
  // and config are the values set by the user in the flow editor.
  function flexdashTestButton(config) {
    const fd = RED.nodes.getNode(config.server)
    RED.nodes.createNode(this, config)

    this.on("input", msg => {

    })

  }

  RED.nodes.registerType("flexdash testbutton", flexdashTestButton)
}
