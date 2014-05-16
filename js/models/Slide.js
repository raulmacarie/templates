define(
  [ "backbone"
  ], function(Backbone, validation, UserModelm, template) { 

 	var Slide = Backbone.Model.extend ({
        defaults: function() {
            return {
                type: '',
                title: 'Title',
                content: ''
            };
        },
        initialize: function() {
            if (!this.get("title")) {
                this.set({"title": this.defaults().title});
            }
        }
  	})

    return Slide;
});