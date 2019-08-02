//controllers
const log = false;
const compRef = '-comp-public';
const type = 'comp';

//ids
var parentId;
var compId;

const init = (pid) => {

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found');
  }

  parentId = pid;
  compId = parentId + compRef;
  engine.make.init.comp(compId,parentId,'comp');
  build();

}

function build(){

  const this_cont = engine.make.div({
    parent:compId,
    class:'page-chat-comp-public-main'
  });

  const box = make_box(this_cont);

  io.on('public_message',(v)=>{
    box.new_message(v.message,v.username,v.user_id);
  });

  io.on('new_user',(d)=>{
    box.new_message(d.username + ' just joined, say hello.');
  });
  io.on('user_left',(d)=>{
    box.new_message(d.username + ' just left.');
  });

  //make_sample_mesages(box);

  const post = make_post(this_cont,box);

}

function make_sample_mesages(box){
  const message = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.";
  box.new_message(message,'akku');
  box.new_message(message,'nikku');
  box.new_message(message,'nikku');
  box.new_message(message,'mallika');
  box.new_user({username:'nikku'});
  box.new_message(message,'chinnu');
  box.new_message(message,'nikku');
  box.new_user({username:'akku'});
  box.new_message(message,'akku');
  box.new_message(message,'chinnu');
  box.new_user({username:'chinnu'});
  box.new_message(message,'mallika');
  box.new_message(message,'mallika');
  box.user_left({username:'mallika'});
  box.new_message(message,'akku');
}

function make_box(p){

  const box = engine.make.div({
    parent:p,
    class:'page-chat-comp-public-main-box'
  });

  document.getElementById(box).scrollIntoView();

  function make_message(text,name,id){

    const message_array = [
      'message-green',
      'message-red',
      'message-yellow',
      'message-blue'
    ];

    const num = Math.floor(Math.random() * (4 - 0)) + 0;

    const message_line = engine.make.div({
      parent:box,
      class:'page-chat-comp-public-main-box-message-line'
    });

    let style = 'float:left;';
    if(id == room.user.user_id){
      style = 'float:right;';
    }

    const message = engine.make.div({
      parent:box,
      class:'card page-chat-comp-public-main-box-message ' + message_array[num],
      style:style
    });

      engine.make.div({
        parent:message,
        class:'page-chat-comp-public-main-box-message-text',
        text:text
      });

      if(name){
        engine.make.div({
          parent:message,
          class:'page-chat-comp-public-main-box-message-username',
          text:name,
          function:()=>{
            engine.global.function.update_textarea('@' + name + ' ');
          }
        });
      }

  }

  function new_message(text,name,id){
    make_message(text,name,id);
  }

  function new_user(user){
    make_message(user.username + ' just joined say hello.');
  }

  function user_left(user){
    make_message(user.username + ' just left.');
  }

  return {
    new_message:new_message,
    new_user:new_user,
    user_left:user_left
  };

}

function make_post(p,box){

  const post = engine.make.div({
    parent:p,
    class:'page-chat-comp-public-main-post'
  });

    const message = engine.make.textarea({
      parent:post,
      class:'page-chat-comp-public-main-post-textbox'
    });

    const a = document.getElementById(message);
    engine.add.function('update_textarea',(text)=>{
      a.value = text;
    });

    let last_posted;

    setInterval(function () {
      last_posted = null;
    }, 3000);

    engine.make.button({
      parent:post,
      class:'page-chat-comp-public-main-post-button',
      value:'post',
      function:()=>{

        const val = engine.binder.text(message);

        if(!val || typeof(val) !== 'string' || val.length <= 1){
          return engine.global.function.message().warn('message cannot be less then 2 letters.');
        }

        if(val == last_posted){
          return engine.global.function.message().warn('already posted');
        }

        io.emit('public_message',{message:val});

        engine.global.function.update_textarea('');

      }
    });

}

module.exports = {init:init,ref:compRef,type:type,trackers:null}
