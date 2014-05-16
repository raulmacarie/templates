define([
  'backbone',
  'router' // Request router.js
], function(Backbone, Router){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    app_router = new Router;

  	Backbone.history.start();
  };

  /*$(document).mouseup(function (e)
    {
        var container = $("#righ-hand-panel");

        console.log(e.target);

        if (!container.is(e.target) )// if the target of the click isn't the container...
             // ... nor a descendant of the container

        {
            container.hide();
        }else{container.hide()}
    });*/

  return { 
    initialize: initialize
  };
});