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

function build(){

  const chatsComp = require('./comps/chatsComp/comp');
  const usersComp = require('./comps/usersComp/comp');

  engine.make.tabs.comp({
    parent:compId,
    tabs:[
      {value:'users',module:usersComp,data:null,active:true},
      {value:'chats',module:chatsComp,data:null}
    ]
  });

}

module.exports = {init:init,ref:compRef,type:type,trackers:null}
