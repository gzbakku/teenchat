//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-loader';             //dont worry about this
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

let loaderCont;

//build the dom for comp here
function build(){

  loaderCont = engine.make.div({
    id:'loaderCont',
    parent:'page-router',
    class:'loader-cont'
  });

    engine.make.div({
      id:'background',
      parent:loaderCont,
      class:'loader-background'
    });

    let loader = engine.make.div({
      id:'box',
      parent:loaderCont,
      class:'loader-box'
    });

      let loadingCont = engine.make.div({
        id:'loadingCont',
        parent:loader,
        class:'loader-loading-cont'
      });

        engine.make.div({
          id:'loading',
          parent:loadingCont,
          class:'loader-loading'
        });

      engine.make.div({
        id:'text',
        parent:loader,
        class:'loader-text',
        text:'loading ...'
      });

    engine.add.function('loader',loaderFunc);
    engine.view.hide(loaderCont);

}

function loaderFunc(){
  return {
    show:show,
    hide:hide
  }
}

function show(){
  engine.view.show(loaderCont);
}

function hide(){
  engine.view.hide(loaderCont);
}

module.exports = {init:init,ref:compRef,type:type}
