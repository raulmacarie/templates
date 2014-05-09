$(function(){
    $("#right-hand-panel ul li").click(function() {
        var type,
            data,
            parsedTemplate,
            fileName;

        clearContent();

        type = $(this).attr('data-value');
        data = {
            type: type,
            title: '',
            content: ''
        };
        parsedTemplate = _.template(modalTemplate, {
            data: data
        });

        $('#bootstrap-modal').html(parsedTemplate);
        $('#templateModal').modal('show');
        $('#save-modal-template').click(function () {
            $('#templateModal').modal('hide');
            if (type > 2) {
                fileName = $('#files').val().split('\\').pop();
                $('#modal-content').val(fileName);
            }
            data = $('#formTemplate').serializeObject();
            App.saveTemplate(data);
        });

        hideModal();
    });

  var TemplateView = Backbone.View.extend({
    template: _.template($('#item-template').html()),

    contentTemplate: _.template($('#content-template').html()),

    events: {
      "delete li.slide-thumbnail": "clear",
      "edit li.slide-thumbnail": "edit",

      "dblclick li.slide-thumbnail": "edit",
      "click li.slide-thumbnail": "load"
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    edit: function() {
      clearContent();
      var thisModel = this.model;
      var parsedTemplate = _.template(modalTemplate, {data:this.model.attributes});
      $('#bootstrap-modal').html(parsedTemplate);
      $('#templateModal').modal('show');

      var type = $('#type-modal').val();

      $('#save-modal-template').click(function(){       
        if (type > 2) {
          var filename = $('#files').val().split('\\').pop();
          if( filename != '') $('#modal-content').val(filename);
        }
        var data = $('#formTemplate').serializeObject();
        thisModel.save(data);
        $('#templateModal').modal('hide');
      });
      
      hideModal();      
    },

    load: function() {
        $('#content').html(this.contentTemplate(this.model.toJSON()));
    },

    clear: function() {
      this.model.destroy();
      clearContent();
    }

  });

  var AppView = Backbone.View.extend({

    el: $("#slideshow-application"),

    events: {
      "click #save-template":  "saveTemplate"
    },

    initialize: function() {

      this.input = this.$("#template-title");

      this.listenTo(Templates, 'add', this.addOne);
      
      Templates.fetch();
    },

    render: function() {

    },

    addOne: function(template) {
        var view = new TemplateView({model: template});

        this.$("#left-hand-panel ul").prepend(view.render().el);

        if ('function' === typeof addSlideThumbnailsUIEvents) {
            setTimeout('addSlideThumbnailsUIEvents()', 100);
        }
    },

    addAll: function() {
      Templates.each(this.addOne, this);
    },

    saveTemplate: function(data) {
      Templates.create(data);
    }

  });

  var App = new AppView;

});