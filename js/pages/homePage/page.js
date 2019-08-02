(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-about';             //dont worry about this
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
    text:'greetings this is the about comp'
  });

  return true; //always return after build it can be

}

module.exports = {init:init,ref:compRef,type:type,trackers:trackers}

},{}],2:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-features';             //dont worry about this
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
    text:'greetings this is the features comp'
  });

  return true; //always return after build it can be

}

module.exports = {init:init,ref:compRef,type:type,trackers:trackers}

},{}],3:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-image';             //dont worry about this
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
    text:'greetings this is the image comp'
  });

  return true; //always return after build it can be

}

module.exports = {init:init,ref:compRef,type:type,trackers:trackers}

},{}],4:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-login';             //dont worry about this
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

function build(){

  const card = engine.make.div({
    parent:compId,
    class:'home-card card'
  });

    const card_header = engine.make.div({
      parent:card,
      class:'home-card-header',
      text:'home'
    });

    const form = engine.make.div({
      parent:card,
      class:'home-card-form'
    });

      const username = engine.make.input({
        parent:form,
        class:'home-card-form-input',
        placeholder:'username',
        type:'string'
      });

      engine.make.button({
        parent:form,
        class:'home-card-form-button',
        value:'start',
        function:()=>{

          const val = engine.binder.text(username);


        }
      });

}

module.exports = {init:init,ref:compRef,type:type,trackers:null}

},{}],5:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-menu';             //dont worry about this
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

function build(){

  const main = engine.make.div({
    parent:compId,
    class:'page-home-comp-menu'
  });

    const left = engine.make.div({
      parent:compId,
      class:'page-home-comp-menu-left'
    });

      engine.global.function.makeAButton({
        parent:left,
        class:'page-home-comp-menu-logo',
        text:'teenchat',
        page:'homePage'
      });

    const right = engine.make.div({
      parent:compId,
      class:'page-home-comp-menu-right'
    });

}

module.exports = {init:init,ref:compRef,type:type,trackers:null}

},{}],6:[function(require,module,exports){
//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-home";
const pageName = 'homePage';

//init page
const init = () => {
  engine.make.init.page(pageId,"page");  //init page
  build();                               //start build
}

//these trackers will be triggered when this module is routed
const trackers = {
  title:'teenchat - meet like minded people and make new friends',
  meta:[
    {
      name:'description',
      content:'teenchat is a social network to meet like minded people and connect on topics you like.'
    },
    {
      name:'keywords',
      content:'teenchat,chat,friends,meet,people'
    }
  ],
  function_data:{},
  function:(function_data)=>{}
};

function build(){

  const menuComp = require('./comps/menuComp/comp');
  const loginComp = require('./comps/loginComp/comp');
  const imageComp = require('./comps/imageComp/comp');
  const aboutComp = require('./comps/aboutComp/comp');
  const featuresComp = require('./comps/featuresComp/comp');

  const main = engine.make.div({
    parent:pageId
  });

  menuComp.init(main);

  const mid = engine.make.div({
    parent:main
  });

    const left = engine.make.div({
      parent:mid
    });

      loginComp.init(left);

    const right = engine.make.div({
      parent:mid
    });

      imageComp.init(right);

    aboutComp.init(main);

    featuresComp.init(main);

}

//do not change current exports you are free to add your own though.
let pageControllers = {
  init:init,
  ref:pageId,
  type:type,
  name:pageName,
  contModules:{},
  contList:{},
  trackers:trackers
};
module.exports = pageControllers;
window.pageModules[pageName] = pageControllers;

},{"./comps/aboutComp/comp":1,"./comps/featuresComp/comp":2,"./comps/imageComp/comp":3,"./comps/loginComp/comp":4,"./comps/menuComp/comp":5}]},{},[6]);
