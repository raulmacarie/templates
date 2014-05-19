require.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    'jquery': 'library/jquery.min',
    'jquery.ui' : 'library/jquery.ui.position',
    'less' : 'library/less.min',
    'bootstrap' : 'library/bootstrap.min',
    'underscore' : 'library/underscore.min',
    'backbone' : 'library/backbone.min',
    'blocalstorage' : 'library/backbone.localStorage',
    'text' : 'library/text'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'jquery.ui' : {
      deps: ['jquery'],
      exports: '$'      
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: "$.fn.popover"
    },
    'blocalstorage' : {
      deps: ['backbone']
    },
    'backbone': {
      deps: ['underscore', 'jquery', 'bootstrap', 'jquery.ui', 'less'],
      exports: 'Backbone'
    }
  }
});

require([
  'app',

], function(App){
  App.initialize();
});
