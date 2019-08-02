//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-users';             //dont worry about this
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
    parent:compId
  });

  let total_users = Object.keys(room.users).length;

  let text = total_users + ' are online.';
  if(total_users == 1){
    text = total_users + ' user is online.';
  }

  const online = engine.make.div({
    parent:this_cont,
    class:'page-chats-comp-private-total_online',
    text:text
  });

  let o = document.getElementById(online);

  function update_online_users(n){
    let text = n + ' are online.';
    if(n == 1){
      text = n + ' user is online.';
    }
    o.innerHTML = text;
  }

  const users = engine.make.div({
    parent:this_cont,
    class:'page-chats-comp-private-users'
  });

    let boxes = {};

    for(let i=0;i<30;i++){
      new_user(user);
    }

    engine.add.function('new_user',new_user);

    function new_user(user){

      if(user.user_id == room.user.user_id){
        return true;
      }

      const this_cont = engine.make.div({
        parent:users,
        class:'page-chats-comp-private-user',
        text:user.username + ', ' + user.age + ', ' + user.gender
      });

      boxes[user.user_id] = this_cont;

    }

}

module.exports = {init:init,ref:compRef,type:type,trackers:null}
