define([
  'backbone',
  'router' // Request router.js
], function(Backbone, Router){
  var initialize = function(){
    app_router = new Router;

  	Backbone.history.start();
  };

  return { 
    initialize: initialize
  };
});