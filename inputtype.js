module.exports = function (RED) {
  function testInputType(config) {
    RED.nodes.createNode(this, config)
  }
  RED.nodes.registerType("test inputtype", testInputType)
}
