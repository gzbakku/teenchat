//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-menu';             //dont worry about this
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

  const main = engine.make.div({
    parent:compId,
    class:'page-home-comp-menu'
  });

    const left = engine.make.div({
      parent:main,
      class:'page-home-comp-menu-left'
    });

      engine.make.image({
        parent:left,
        class:'page-home-comp-menu-logo',
        type:'local',
        location:'/assets/images/love.png'
      });

    const right = engine.make.div({
      parent:main,
      class:'page-home-comp-menu-right'
    });

      engine.global.function.makeAButton({
        parent:right,
        class:'page-home-comp-menu-link',
        text:'about',
        page:'aboutPage'
      });

      engine.global.function.makeAButton({
        parent:right,
        class:'page-home-comp-menu-link',
        text:'contact us',
        page:'contactPage'
      });

      engine.global.function.makeAButton({
        parent:right,
        class:'page-home-comp-menu-link',
        text:'help',
        page:'helpPage'
      });

      if(io){
        const logout = engine.make.button({
          parent:right,
          class:'page-home-comp-menu-link',
          value:'logout',
          function:(id)=>{
            engine.view.remove(id);
            engine.global.function.toLazyPage('homePage');
          }
        });
      }

      engine.add.function('showLogoutButton',()=>{
        const logout = engine.make.button({
          parent:right,
          class:'page-home-comp-menu-link',
          value:'logout',
          function:()=>{
            io.disconnect();
            engine.global.function.toLazyPage('homePage');
            engine.view.hide(logout);
          }
        });
      })

}

module.exports = {init:init,ref:compRef,type:type,trackers:null}
