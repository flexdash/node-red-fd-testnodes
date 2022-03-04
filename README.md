node-red-fd-testbutton
===============================

A Node-RED dashboard FlexDash node to test a simple button, derived from
https://github.com/node-red/node-red-ui-nodes/tree/master/node-red-node-ui-mylittleuinode

The intention of this node is to show the user the how/where/what of creating a custom
FlexDash ui node that looks and smeels pretty similar to "standard" UI nodes.

## How it works...

There is a 1-1 correspondence between a NR node and a FlexDash Widget.
All widgets have an ID (of the form w0000) and that is used in the FlexDash config json.
The NR node stores the widget ID in a "hidden" config field.
When an NR node is loaded, it is "associated" with the corresponding widget by virtue of this
ID, and if the ID is null, then a fresh widget is created. (Need to understand exactly when/where
this needs to happen.)

FlexDash widgets have a bunch of params (equivalent to config fields), for example, title, color,
text, value, etc.
Each param can be given a so-called static value or a dynamically linked value.
A static value is stored in the FlexDash config json and is part of what is sent to a new browser
that connects so it can initialize the widgets to be shown.
A dynamic value is stored in a JSON data tree that is sent to the browser and is updated as values in
the tree are changing (kind'of a reactive observer paradigm across server and browser).
If a param is to receive a dynamic value, then a link into the JSON data tree is stored in the config.

The way FLexDash UI nodes can deal with config and values is more flexible than standard UI nodes.
This is because FlexDash does not distinguish between config and data. Everything is a param.
Many params are simple values, such a title or color, but some params may contain complex data structures,
such as the data to be plotted in a chart.

Each widget param can be given a static value in the NR flow editor's config panel.
This is stored in the config.
But an input message can set any of the params too. In that case, the config is altered to point
"somewhere" in the JSON data tree and the value in the message is stored there.
Unless the input message's value is null, in that case the link in the config is removed and the
widget will use the static value again.

The above suggests that there ought to be some conversion of values between Node-Red and the FlexDash
widget, or more precisely, the widget's config or dynamic values.
This would be equivalent to the current `beforeEmit` function for UI nodes.
A possibility would be a `convertParam` function that would be called by some FlexDash helper code
to convert the NR config to values to be stored in the widget's static config.
This function would again be called for each message coming into the NR node in order to set
appropriate dynamic values.

Another option is to abuse the on-input function of the NR node.
It can whatever it wants with the input message, and simply calls a `set` function provided
by the FlexDash config node to set params.
Whether the `set` causes static values to be changed or dynamic ones can be hidden and dealt
with under the hood.
Then the initial config can be passed through the on-input so it produces the right values to
be placed into the static config.


__The text below has not been updated__

## Install
This node is not really intended to be insalled and used as-is - it is meant to be a teaching example for
developers to use to create their own UI widgets.

Either use the Editor - Menu - Manage Palette - Install option, or run the following command in your Node-RED user directory (typically `~/.node-red`) after installing Node-RED-dashboard.

    npm i node-red-node-ui-mylittleuinode

## Inputs
Send `msg.payload` to this node to change the text displayed in the textbox.

## Outputs
Node will send the textbox value as `msg.payload` when the textbox has focus, and the user presses the `Enter` key.


## Requirements
Node-RED v19.4 or greater
Node-RED-dashboard v2.13.0 or greater

## Example
```json
[{"id":"865215e4.a45508","type":"ui_my-little-ui-node","z":"a95b9b.0bfb7468","group":"eec59831.7f2e18","order":0,"width":0,"height":0,"name":"","textLabel":"My Little UI Node","textColor":"#000000","x":3410,"y":380,"wires":[["f9941dcd.0a9cf"]]},{"id":"d3d5d6de.eb37c8","type":"inject","z":"a95b9b.0bfb7468","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":3210,"y":380,"wires":[["865215e4.a45508"]]},{"id":"f9941dcd.0a9cf","type":"debug","z":"a95b9b.0bfb7468","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":3620,"y":380,"wires":[]},{"id":"eec59831.7f2e18","type":"ui_group","z":"","name":"Test","tab":"6522c70.1515a38","disp":true,"width":"6","collapse":false},{"id":"6522c70.1515a38","type":"ui_tab","z":"","name":"Sandbox","icon":"dashboard","disabled":false,"hidden":false}]
```

## Authors
Thorsten von Eicken
based on work by
Bart Butenaers
https://github.com/bartbutenaers
