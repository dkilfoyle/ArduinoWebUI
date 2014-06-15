ArduinoWebUI
============

Web UI for Arduino via node.js, johnny-five and websockets

## Design

* Firmata on the arduino
* Node.js Express for web serving
* Johnny-Five for arduino to node
* Socket.io for node to browser
* sb-admin-v2 bootstrap theme for web UI (custom conversion to jade template)

## Installation

1. In main directory `npm install` to download the node dependencies
2. Upload standard firmata to the arduino
3. In main directory `npm start`
4. Navigate browser to localhost:3000/dash
