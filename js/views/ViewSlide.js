define(
  [ "backbone",
  	"blocalstorage",
  	"models/Slide",
  	"collections/Slides",
    "views/EditSlide",
    "views/Slides",
  	"text!templates/view-slide-template.html"
  ], function(Backbone, LocalStorage, Model, SlidesCollection, EditSlide, Slides, template) { 

  	var ViewSlide = Backbone.View.extend ({

  		template: _.template(template),

      events: {
        'click #edit-slide-button' : 'editSlide',
        'click #delete-slide-button' : 'deleteSlide',

      },  	

  		initialize: function() {
        this.render();
  		},

      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        $('#slide-panel').empty().html(this.$el);
        this.$el.parent().parent().find('#right-hand-panel').hide();
        return this;
  		},
      
      editSlide: function() {
        var editSlide = new EditSlide({ model: this.model});
        app_router.navigate('edit/' + this.model.id, true);
      },

      deleteSlide: function(e) {
        this.model.destroy();
        app_router.navigate('', true);

      },

  	});

  	return ViewSlide;
});