
//scroll data here
let keys = {37: 1, 38: 1, 39: 1, 40: 1};
function preventDefault(e){
  e = e || window.event;if(e.preventDefault){e.preventDefault()};e.returnValue = false;
}
function preventDefaultForScrollKeys(e) {
    if(keys[e.keyCode]){preventDefault(e);return false;}
}

const run_online = false;
let api_address = 'http://localhost:8080';

if(run_online){
  api_address = 'https://teenchat.herokuapp.com';
}

global.room = {};

let bool = {

  connect:(user)=>{

    engine.global.function.loader().show();

    const url = engine.global.function.get_api_address();

    let query = {
      user_id:user.user_id
    };

    if(user.session_id){
      query.session_id = user.session_id;
      query.user = JSON.stringify(user);
    }

    global.io = my_socket.connect(url,{
      query:query
    });

    io.on('connect',(e)=>{
      room.tell = e;
    });

    io.on('hello',(d)=>{
      room.user = d;
      engine.data.reset('user',JSON.stringify(d),'session');
    });

    io.on('users',(d)=>{
      engine.global.function.loader().hide();
      room.users = d;
      engine.global.function.toLazyPage('chatPage');
    });

    io.on('disconnect',(d)=>{
      engine.global.function.loader().hide();
      //engine.global.function.message().warn('you have been disconnected form the server');
      engine.global.function.toLazyPage('homePage');
    });

    io.on('error',(e)=>{
      console.log(e);
      engine.global.function.loader().hide();
      if(e == 'session_expired'){
        return engine.global.function.message().warn('session expired');
      }
      if(e == 'username_captured'){
        return engine.global.function.message().warn('username is already captured for this session, please login again.');
      }
    });

  },

  get_api_address:()=>{
    return api_address;
  },

  sendARequest : async (data)=>{

    if(!data.at || !data.body){
      return engine.common.error('invalid_data-sendARequest-supers');
    }

    engine.global.function.loader().show();

    const url = api_address + data.at;
    const result = await engine.request({
      method:'post',
      url:url,
      body:data.body
    });

    engine.global.function.loader().hide();

    if(!result){
      return engine.global.function.message().danger('something went wrong, please try again.');
    }

    if(result.result == 'error'){

      if(data.errors){
        if(data.errors.hasOwnProperty(result.error)){
          return engine.global.function.message().warn(data.errors[result.error]);
        } else {
          if(result.error == 'invalid_request'){
            return engine.global.function.message().danger('invalid request, please try again.');
          } else {
            return engine.global.function.message().danger('unknown error, please try again.');
          }
        }
      }

      return false;

    }

    if(result.result == 'success'){
      if(data.success){
        return engine.global.function.message().success(data.success);
      }
      return result;
    }

  },

  makeAButton: async (data)=>{

    let make_a = {
      parent:data.parent,
      class:data.class,
      text:data.text,
      style:'padding-top:1vh;'
    };

    if(data.page){
      make_a.type = 'local';
      make_a.page = data.page;
      make_a.cont = data.cont;
      make_a.panel = data.panel;
    }

    if(data.href){
      make_a.type = 'url';
      make_a.href = data.href;
    }

    let href = engine.make.a(make_a);
    if(data.href){
      return true;
    }

    engine.view.hide(href);

    let button = engine.make.button({
      parent:data.parent,
      class:data.class,
      value:data.text,
      function:()=>{
        if(data.page && data.cont && data.panel){
          engine.global.function.toLazyPanel(data.page,data.cont,data.panel,data.data);
        } else if(data.page && data.cont && !data.panel){
          engine.global.function.toLazyCont(data.page,data.cont,data.data);
        } else if(data.page && !data.cont && !data.panel){
          engine.global.function.toLazyPage(data.page,data.data);
        }
      }
    });

    let mod;
    if(data.page && data.cont && data.panel){
      mod = await engine.global.function.loadLazyPanel(data.page,data.cont,data.panel,data.data);
    } else if(data.page && data.cont && !data.panel){
      mod = await engine.global.function.loadLazyCont(data.page,data.cont,data.data);
    } else if(data.page && !data.cont && !data.panel){
      mod = await engine.global.function.loadLazyPage(data.page,data.data);
    }

    if(mod){
      engine.view.remove(button);
      engine.view.show(href);
    }

  },

  loadLazyPage : async (page)=>{
    let mod = engine.get.pageModule(page);
    if(mod){
      return mod;
    } else {
      let run = await engine.loader.load.page(page)
      .then(()=>{
        return true;
      })
      .catch((e)=>{
        if(e == 'pageModule-already-loaded'){
          return true;
        } else {
          return engine.common.error('failed-fetch_module-promise_error-loadLazyPage-supers-index');
        }
      });
      if(run){ return engine.get.pageModule(page); } else return false;
    }
  },

  loadLazyCont : async (page,cont,data)=>{
    let pageMod = await engine.global.function.loadLazyPage(page);
    if(!pageMod){
      return engine.common.error('failed-loadLazyPage-loadLazyCont-supers-index');
    }
    let mod = engine.get.contModule(page,cont);
    if(mod){
      return mod;
    } else {
      let run = await engine.loader.load.cont(page,cont)
      .then(()=>{
        return true;
      })
      .catch((e)=>{
        if(e == 'contModule-already-loaded'){
          return true;
        } else {
          return engine.common.error('failed-fetch_module-promise_error-loadLazyCont-supers-index');
        }
      });
      if(run){ return engine.get.contModule(page,cont); } else return false;
    }
  },

  loadLazyPanel : async (page,cont,panel,data)=>{
    let pageMod = await engine.global.function.loadLazyPage(page);
    if(!pageMod){
      return engine.common.error('failed-loadLazyPage-loadLazyPanel-supers-index');
    }
    let contMod = await engine.global.function.loadLazyCont(page,cont);
    if(!contMod){
      return engine.common.error('failed-loadLazyCont-loadLazyPanel-supers-index');
    }
    let mod = engine.get.panelModule(page,cont,panel);
    if(mod){
      return mod;
    } else {
      let run = await engine.loader.load.panel(page,cont,panel)
      .then(()=>{
        return true;
      })
      .catch((e)=>{
        if(e == 'panelModule-already-loaded'){
          return true;
        } else {
          return engine.common.error('failed-fetch_module-promise_error-loadLazyPanel-supers-index');
        }
      });
      if(run){return engine.get.panelModule(page,cont,panel)} else return false;
    }
  },

  toLazyPage :async (page,data)=>{
    engine.global.function.loader().show();
    let mod = await engine.global.function.loadLazyPage(page);
    engine.global.function.loader().hide();
    if(mod){
      engine.router.navigate.to.page(mod,data);
      return true;
    } else {
      return engine.common.error('failed-loadLazyPage-toLazyPage-supers-index');
    }
  },

  toLazyCont :async (page,cont,data)=>{

    let toPage = await engine.global.function.toLazyPage(page);
    if(!toPage){
      return engine.common.error('failed-toLazyPage-toLazyCont-supers-index');
    }
    engine.global.function.loader().show();
    let mod = await engine.global.function.loadLazyCont(page,cont);
    engine.global.function.loader().hide();
    if(mod){
      engine.router.navigate.to.cont(mod,data);
      return true;
    } else {
      return engine.common.error('failed-fetch_module-toLazyCont-supers-index');
    }
  },

  toLazyPanel:async (page,cont,panel,data)=>{
    // let toPage = await engine.global.function.toLazyPage(page);
    // if(!toPage){
    //   return engine.common.error('failed-toLazyPage-toLazyPanel-supers-index');
    // }

    let toCont = await engine.global.function.toLazyCont(page,cont,null);
    if(!toCont){
      return engine.common.error('failed-toLazyCont-toLazyPanel-supers-index');
    }
    engine.global.function.loader().show();
    let mod = await engine.global.function.loadLazyPanel(page,cont,panel);
    engine.global.function.loader().hide();
    if(mod){
      engine.router.navigate.to.panel(mod,data);
      return true;
    } else {
      return engine.common.error('failed-loadLazyPanel-toLazyPanel-supers-index');
    }
  },

  lazyCompLoader : async function(comp){

    if(engine.global.comp[comp]){
      return engine.global.comp[comp];
    }

    engine.global.function.loader().show();

    let hold = await engine.loader.load.comp(comp.replace('Comp',''))
    .then(()=>{
      return true;
    })
    .catch((error)=>{
      if(error){
        console.log(error);
      }
      return engine.global.function.message().warn('failed to load lazy comp, please reload the page.');
    });

    engine.global.function.loader().hide();

    if(hold){
      return engine.global.comp[comp];
    } else {
      return false;
    }

  }

};

module.exports = ()=>{
  for(let key in bool){
    engine.add.function(key,bool[key]);
  }
};
