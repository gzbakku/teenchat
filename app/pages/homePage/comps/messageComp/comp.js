//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-message';             //dont worry about this
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

  engine.add.function('message',message);

}

function message(type,msg){

  if(type == 'success'){
    return success(msg);
  }
  if(type == 'warn'){
    return warn(msg);
  }
  if(type == 'danger'){
    return danger(msg);
  }
  if(type == 'info'){
    return info(msg);
  }

  return {
    success:success,
    warn:warn,
    danger:danger,
    info:info,
    form:form
  }
}

function success(msg){
  makeMessage("message message-success",msg);
  return true;
}

function warn(msg){
  makeMessage("message message-warning",msg);
  return false;
}

function danger(msg){
  makeMessage("message message-danger",msg);
  return false;
}

function info(msg){
  makeMessage("message message-info",msg);
  return true;
}

function form(){
  makeMessage("message message-info",'Please fill the form correctly.');
  return false;
}

function makeMessage(type,msg){

  let main = engine.make.div({
    id:'message-' + engine.uniqid(),
    parent:'page-router',
    class:type
  });

  let close = engine.make.div({
    id:'closeCont',
    parent:main,
    class:'message-close-cont'
  });

    engine.make.button({
      id:'close',
      parent:close,
      class:'message-close-button',
      value:'close',
      function:()=>{
        engine.view.remove(main);
      }
    });

  engine.make.div({
    id:'message',
    parent:main,
    class:'message-text-cont',
    text:msg
  });

  setTimeout(()=>{
    engine.view.remove(main);
  }, 5000);

}

module.exports = {init:init,ref:compRef,type:type}
