
//import all the pages here which you want to be in the app and use engine.get.pageModule api to get the page
const homePage = require('./pages/homePage/page');
const chatPage = require('./pages/chatPage/page');

//declare the first page module here
const startPage = homePage;

/*set the base url to the native vegana cdn,
or if hosting on non native platform please
set the baseurl to where the files for the project are held*/
const baseHref = null;

const loaderComp = require('./pages/homePage/comps/loaderComp/comp');
const menuComp = require('./pages/homePage/comps/menuComp/comp');
const messageComp = require('./pages/homePage/comps/messageComp/comp');
loaderComp.init('page-router');
messageComp.init('page-router');

engine.add.comp('menuComp',menuComp);

const supers = require('./supers');
supers();

//------------------------------------------------------------------------------
//dont fuck with anything below
engine.router.set.baseHref(baseHref);
if(engine.router.active.page == null){
  startPage.init();
}
