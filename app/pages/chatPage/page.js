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
