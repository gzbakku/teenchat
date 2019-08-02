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

function build(){

  const this_cont = engine.make.div({
    parent:compId,
    class:'page-home-comp-image-cont'
  });

  engine.make.image({
    parent:this_cont,
    class:'page-home-comp-image-cont-img',
    type:'local',
    location:'./assets/images/group.png'
  });

}

module.exports = {init:init,ref:compRef,type:type,trackers:null}
