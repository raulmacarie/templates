$(function(){

  $('#Add-Button').click( function () {
      $('.template-btn').prop('disabled', false);
    });

  $('.modal').on('hidden.bs.modal', function () {
      $('.template-btn').prop('disabled', true);
  })

  
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

    tagName:  "li",

    template: _.template($('#item-template').html()),

    contentTemplate: _.template($('#content-template').html()),

    events: {
      "click a.destroy" : "clear",
      "dblclick .view"  : "edit",
      "click .view"  : "load",
      "click #update-title":  "update"

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
      $('#updateModal').modal('show');
      $("#update-title").val(this.model.get('title'));
      //this.input.val('test' + Templates.get('title'));
    },

    load: function() {
        $('#content').html(this.contentTemplate(this.model.toJSON()));
    },

    update: function() {
      alert('here');
      var value = $("#update-title").val();
      if (!value) {
        this.clear();
      } else {
        this.model.save({title: value});
      }
      $('#saveModal').modal('hide');
    },

    clear: function() {
      this.model.destroy();
    }

  });

  var AppView = Backbone.View.extend({

    el: $("#templatesapp"),

    events: {
      "click #save-template":  "saveTemplate",

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
      this.$("#templates-list").append(view.render().el);
    },

    addAll: function() {
      Templates.each(this.addOne, this);
    },

    saveTemplate: function(e) {
      if (!this.input.val()) return;
      Templates.create({type: 1, title: this.input.val()});
      this.input.val('');
      $('#saveModal').modal('hide');
    }

});

  var App = new AppView;

});
