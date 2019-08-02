(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-private';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

}

//these trackers will be triggered when this module is routed
const trackers = {
  title:'sample comp title',
  meta:[
    {
      name:'description',
      content:'this is a sample comp description'
    },
    {
      name:'keywords',
      content:'comp,vegana'
    }
  ],
  function_data:{},
  //function will be triggered with the function data as input when the module is routed to.
  function:(function_data)=>{}
};

//build the dom for comp here
function build(){

  engine.common.tell('building',log);

  //sample greetings
  let greetings = engine.make.div({
    id:"greetings",
    parent:compId,
    class:'greetings',
    text:'greetings this is the private comp'
  });

  return true; //always return after build it can be

}

module.exports = {init:init,ref:compRef,type:type,trackers:trackers}

},{}],2:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-public';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

}

//build the dom for comp here
function build(){



}

module.exports = {init:init,ref:compRef,type:type,trackers:null}

},{}],3:[function(require,module,exports){
//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-chat";
const pageName = 'chatPage';

//init page
const init = () => {
  engine.make.init.page(pageId,"page");  //init page
  build();                               //start build
}

//build page
function build(){

  const privateComp = require('./comps/privateComp/comp');
  const publicComp = require('./comps/publicComp/comp');

  engine.global.comp.menuComp.init(pageId);

  const this_cont = engine.make.div({
    parent:pageId,
    class:'page-chat-cont'
  });

    const left = engine.make.div({
      parent:this_cont,
      class:'page-chat-cont-left'
    });

      publicComp.init(left);

    const right = engine.make.div({
      parent:this_cont,
      class:'page-chat-cont-right'
    });

      privateComp.init(right);

}

//do not change current exports you are free to add your own though.
let pageControllers = {
  init:init,
  ref:pageId,
  type:type,
  name:pageName,
  contModules:{},
  contList:{},
  trackers:null
};
module.exports = pageControllers;
window.pageModules[pageName] = pageControllers;

},{"./comps/privateComp/comp":1,"./comps/publicComp/comp":2}]},{},[3]);
