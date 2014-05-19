define(
  [ "backbone",
    "router",
    "views/Slides",
    "collections/Slides",
  	"text!templates/edit-slide-template.html"
  ], function(Backbone, Router, Slides, SlidesCollection, template) { 

  	var EditSlide = Backbone.View.extend ({

  		template: _.template(template),

      events: {
        'click #save-changes' : 'saveSlide',
        'click #discard-changes' : 'cancelChange'

      },

      initialize: function () {
        this.$el.parent().find('#right-hand-panel').hide();
        this.render();
      },
      
      render: function() {

        this.$el.html(this.template(this.model.toJSON()));
        $('#slide-panel').empty().html(this.$el);
        this.$el.parent().parent().find('#right-hand-panel').hide();
        return this;
      },
      
      saveSlide: function() {
        var elParent = this.$el,
            data,
            id = this.model.id,
            type = this.model.get('type');

        if ((type > 2) && (type < 5)) {
                fileName = elParent.find('#files').val().split('\\').pop();
                if (fileName != '') {
                    elParent.find('#edit-slide-content').val(fileName);
                }
            }

        data = {
                type: type,
                title: elParent.find("#edit-slide-title").val(),
                content: elParent.find("#edit-slide-content").val()
        };
        
        this.model.set(data);

        if (!id) {       
              slidesCollection.create(this.model, {
                success: function(model){
                    app_router.navigate('view/' + model.id, true);
                }
              });
        }else{
              this.model.save(data, {
                success: function(model){
                    app_router.navigate('view/' + model.id, true);
                }
              });
        }

      },

      cancelChange: function() {
        app_router.navigate('', true);
      }
  	});

  	return EditSlide;

});