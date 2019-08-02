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

  engine.loader.load.comp('io')
  .then(()=>{
    const mod = engine.global.comp.ioComp;
    if(!mod){
      engine.data.set('io_comp_load_failed',true,'session');
      return engine.global.function.message().warn('something went wrong, please reload the page.');
    } else {
      mod.init();
    }
  })
  .catch((e)=>{
    return engine.global.function.message().warn('something went wrong, please reload the page.');
  });

  if(engine.data.get('user','session')){
    engine.global.function.loader().show();
    engine.loader.hook.comp({
      comp:'ioComp',
      function:()=>{
        engine.global.function.loader().hide();
        const mod = engine.global.comp.ioComp;
        if(!mod){
          engine.data.set('io_comp_load_failed',true,'session');
          return engine.global.function.message().warn('something went wrong, please reload the page.');
        } else {
          mod.init();
          engine.global.function.connect(JSON.parse(engine.data.get('user','session')));
        }
      }
    });
  }

  const loginComp = require('./comps/loginComp/comp');
  const imageComp = require('./comps/imageComp/comp');
  const aboutComp = require('./comps/aboutComp/comp');
  const featuresComp = require('./comps/featuresComp/comp');

  const main = engine.make.div({
    parent:pageId
  });

  engine.global.comp.menuComp.init(main);

  const mid = engine.make.div({
    parent:main,
    class:'page-home-mid'
  });

    const left = engine.make.div({
      parent:mid,
      class:'page-home-mid-left'
    });

      loginComp.init(left);

    const right = engine.make.div({
      parent:mid,
      class:'page-home-mid-right'
    });

      imageComp.init(right);

  // aboutComp.init(main);
  // featuresComp.init(main);

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
