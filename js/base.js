$(function(){

  $.fn.serializeObject = function() {
     var o = {};
     var a = this.serializeArray();
     $.each(a, function() {
         if (o[this.name]) {
             if (!o[this.name].push) {
                 o[this.name] = [o[this.name]];
             }
             o[this.name].push(this.value || '');
         } else {
             o[this.name] = this.value || '';
         }
     });
     return o;
  };

  $('#Add-Button').click( function () {
      $('.template-btn').prop('disabled', false);
    });

  var clearContent = function () {
    $('#content').html('');
  }
  
  var hideModal = function () {
        $('.modal').on('hidden.bs.modal', function () {
          $('.template-btn').prop('disabled', true);
        });
      }

  $('.template-btn').click( function(){
      clearContent();
      var type = $(this).attr('data-value');
      var data = {type: type, title: '', content: ''};
      parsedTemplate = _.template(modalTemplate, {data: data});
      $('#bootstrap-modal').html(parsedTemplate);
      $('#templateModal').modal('show');
      $('#save-modal-template').click(function(){       
        $('#templateModal').modal('hide');
        if (type > 2) {
          var filename = $('#files').val().split('\\').pop();
          $('#modal-content').val(filename);
        }
        var data = $('#formTemplate').serializeObject();
        App.saveTemplate(data);
      });
      hideModal();
  });

  var modalTemplate = $('#modal-template').html();

  var Template = Backbone.Model.extend({

    defaults: function() {
      return {
        type: '',
        title: 'Unknown title',
        content: ''
      };
    },
    initialize: function() {
      if (!this.get("title")) {
        this.set({"title": this.defaults().title});
      }
    },


  });

  var CreatedTemplatesList = Backbone.Collection.extend({

    model: Template,

    localStorage: new Backbone.LocalStorage("templates-backbone")

  });

  var Templates = new CreatedTemplatesList;


  var TemplateView = Backbone.View.extend({

    
    template: _.template($('#item-template').html()),

    contentTemplate: _.template($('#content-template').html()),

    events: {
      "click a.destroy" : "clear",
      "dblclick .view"  : "edit",
      "click .view"  : "load"
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
      this.$("#templates-list").prepend(view.render().el);
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