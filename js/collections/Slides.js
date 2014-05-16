define(
  [ "backbone",
  	"blocalstorage",
  	"models/Slide"
  ], function(Backbone, LocalStorage, Slide) { 

  	var model = Slide;
  	var Slides = Backbone.Collection.extend ({
	    model: model,
	    localStorage: new Backbone.LocalStorage("slides-backbone")
  	})
  	
  	return Slides;
});
