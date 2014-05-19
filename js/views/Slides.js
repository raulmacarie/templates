define(
  [ "backbone",
  	"router",
    "models/Slide",
  	"collections/Slides",
    "views/SlideThumbnail"
  ], function(Backbone, Router, Model, SlidesCollection, SlideThumbnail) { 

  	var Slides = Backbone.View.extend ({

  		el: '#slideshow-application',

  		events: {

  			'click #add-slide-button' : 'showOptionsSlide',
  			'click #right-hand-panel ul li' : 'addNewSlide'

  		},

  		initialize: function() {
          this.listenTo(slidesCollection, 'add', this.addSlideThumbnail);          
          this.render();
  		},

      render: function() {
        var elParent = this.$el;
        slidesCollection.each(function (model) {
          var slideThumbnail = new SlideThumbnail({
              model: model
          });

          elParent.find('#left-hand-panel ul').prepend(slideThumbnail.render().el);
        });
         return this;
      },

  		showOptionsSlide: function() {
  			this.$el.find('#right-hand-panel').show();

  		},

      addSlideThumbnail: function(model) {
        var slideThumbnail = new SlideThumbnail({model : model});
        this.$el.find('#left-hand-panel ul').prepend(slideThumbnail.render().el);

      },

  		addNewSlide: function(e) {
  			var id = $(e.currentTarget).attr('data-type');
  			this.$el.find('#right-hand-panel').hide();
  			app_router.navigate('add/' + id, true);
  		},

      loadSlide: function () {
        console.log('here');
      }
  	})

  	return Slides;

});