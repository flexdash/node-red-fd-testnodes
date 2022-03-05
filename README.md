node-red-fd-testbutton
===============================

A few Node-RED dashboard FlexDash nodes to test simple UI nodes implemented with FlexDash.

## How it works...

When a Node-RED FlexDash UI node is instantiated it calls `initWidget`, which establishes a 1-1 relationship with a widget shown in the dashboard.
The first time the node is instantiated the widget has to be created, but later, e.g. on redeploy
or Node-RED restarts, the existing widget is located.
This happens by storing the ID of the "owning" node in the widget's config.

FlexDash widgets have a bunch of params (equivalent to config fields), for example, title, color,
text, value, etc.
Each param can be given a so-called static value or a dynamically linked value:

- A static value is stored in the FlexDash config json and is part of what is sent to a new
  browser that connects so it can initialize the widgets to be shown.
- A dynamic value is stored in a JSON data tree that is sent to the browser and is updated
  as values in the tree are changing (kind'of a reactive observer paradigm across server and browser).
  If a param is to receive a dynamic value, then a link into the JSON data tree is stored in
  the config.

The way FlexDash UI nodes can deal with config and values is more flexible than standard UI nodes.
This is because FlexDash does not distinguish between config and data. Everything is a param.
Many params are simple values, such a title or color, but some params may contain complex data
structures, such as the data to be plotted in a chart.

Each widget param can be given a static value in the NR flow editor's config panel.
This is stored in the config.
But an input message can override any of the params too. In that case, the config is altered to point
"somewhere" in the JSON data tree and the value in the message is stored there.
Unless the input message's value is null, in that case the link in the config is removed and the
widget will use the static value again.
