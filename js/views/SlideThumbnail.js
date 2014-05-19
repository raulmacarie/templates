define(
  [ "backbone",
  	"router",
    "views/ViewSlide",
  	"text!templates/slide-thumbnail-template.html"
  ], function(Backbone, Router, ViewSlide, template) { 
  	
  	var SlidesThumbnail = Backbone.View.extend ({
  		
  		template: _.template(template),

      events: {
                'click .slide-thumbnail' : 'loadSlide'
      },

  		initialize: function() {
	        this.listenTo(this.model, 'change', this.updateSlideThumb);
	        this.listenTo(this.model, 'destroy', this.removeSlideThumb);
  		},

  		render: function() {
  			this.$el.prepend(this.template(this.model.toJSON()));
        return this;
  		},

  		updateSlideThumb: function() {
  			this.$el.html(this.template(this.model.toJSON()));
  		},

  		removeSlideThumb: function() {
  			this.$el.html('');	
  		},

      loadSlide: function(e) {
        app_router.navigate('view/' + this.model.id, true);
      }

  	});

  	return SlidesThumbnail;
 });