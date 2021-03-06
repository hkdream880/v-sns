var build = function (){
  
  var _version = '0.0.1';
  var _env = 'local';
  var _url = './';

  var _importArr = [];

  _importArr.push(`<script src="./common/lib/vue.js"></script>`);
  _importArr.push(`<script src="./common/lib/vue-router.js"></script>`);
  _importArr.push(`<script src="./common/lib/axios.js"></script>`);
  _importArr.push(`<script src="./common/lib/jquery-3.4.1.js"></script>`);
  _importArr.push(`<script src="./common/lib/bootstrap.bundle.min.js"></script>`);
  _importArr.push(`<script src="./common/lib/bootstrap.min.js"></script>`);
  _importArr.push(`<script src="./common/lib/nprogress.js"></script>`);


  _importArr.push(`<script src="./components/timeLineComponent.js"></script>`);
  _importArr.push(`<script src="./components/homeComponent.js"></script>`);
  _importArr.push(`<script src="./components/headerComponent.js"></script>`);
  _importArr.push(`<script src="./components/joinComponent.js"></script>`);
  _importArr.push(`<script src="./components/friendListComponet.js"></script>`);
  _importArr.push(`<script src="./components/messageBoxComponent.js"></script>`);
  _importArr.push(`<script src="./routes/mainRouter.js"></script>`);
  _importArr.push(`<script src="./index.js"></script>`);

  return {
    importArr : _importArr,
    version : _version,
    env : _env,
    url : _url,
  }
}