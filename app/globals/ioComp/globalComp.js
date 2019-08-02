//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-io';             //dont worry about this
const type = 'comp';                      //type of app
const compName = 'ioComp';

//ids
var parentId;
var compId;

const init = (pid) => {
  return build();
}

function build(){
  let socket = require('socket.io-client');
  global.my_socket = socket;
  return true;
}

let compController = {init:init,ref:compRef,type:type};
if(!engine.global.comp.hasOwnProperty(compName)){
  engine.add.comp(compName,compController);
} else {
  engine.common.error(compName + " global comp has been already been added to the global comp object.");
}
module.exports = compController;
