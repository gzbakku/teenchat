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
    class:'page-home-login-card card'
  });

    const card_header = engine.make.div({
      parent:card,
      class:'page-home-login-card-header',
      text:'home'
    });

    const form = engine.make.div({
      parent:card,
      class:'page-home-login-card-form'
    });

      const username = engine.make.input({
        parent:form,
        class:'page-home-login-card-form-input',
        placeholder:'username',
        type:'string',
        value:'hola'
      });

      const age = engine.make.input({
        parent:form,
        class:'page-home-login-card-form-input',
        placeholder:'age',
        type:'number',
        value:'23'
      });

      const gender = engine.make.select({
        parent:form,
        class:'page-home-login-card-form-input',
        options:[
          {text:'gender',value:'gender',disabled:true},
          {text:'male',value:'male',disables:true},
          {text:'female',value:'female',disables:true},
        ]
      });

      engine.make.button({
        parent:form,
        class:'page-home-login-card-form-button',
        value:'start',
        function:async ()=>{

          if(engine.data.get('io_comp_load_failed','session')){
            return engine.global.function.message().warn('something went wrong, please reload the page.');
          }

          if(!engine.data.get('device_signature','local')){
            engine.data.set('device_signature',engine.md5(engine.uniqid()),'local');
          }

          const vals = {
            username:engine.binder.text(username),
            age:engine.binder.number(age),
            gender:engine.binder.text(gender),
          };

          if(!engine.validate.json({
            username:{type:'string',min:1,max:256},
            gender:{type:'string',options:['male','female']},
            age:{type:'number',min:10,max:60}
          },vals)){
            return engine.global.function.message().form();
          }

          const device_signature = engine.data.get('device_signature','local');
          const signatures = {
            user_signature:engine.md5(JSON.stringify(vals) + device_signature),
            device_signature:device_signature
          };

          const result = await engine.global.function.sendARequest({
            at:'/check_name',
            body:{
              user:vals,
              user_signature:signatures.user_signature,
              device_signature:signatures.device_signature
            },
            errors:{
              'already_registered':'username is already registered try a new one.'
            }
          });

          const mod = engine.global.comp.ioComp;
          if(!mod){
            engine.loader.hook.comp({
              comp:'ioComp',
              function:(s)=>{
                const mod = engine.global.comp.ioComp;
                if(!mod){
                  return engine.global.function.message().warn('something went wrong, please reload the page.');
                } else {
                  mod.init();
                  engine.global.function.connect(result.data);
                }
              }
            });
          } else {
            engine.global.function.connect(result.data);
          }

        }
      });

}

module.exports = {init:init,ref:compRef,type:type,trackers:null}
