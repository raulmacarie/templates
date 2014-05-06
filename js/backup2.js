$(function(){

  var Template = Backbone.Model.extend({

    defaults: function() {
      return {
        id:'',
        type: 'Unknown title',
        title: '',
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

    localStorage: new Backbone.LocalStorage("templates-backbone"),

  });

  var Templates = new CreatedTemplatesList;


  var TemplatesView = Backbone.View.extend({

    tagName:  "li",

    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .toggle"   : "loadTemplate",
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    // Re-render the titles of the todo item.
    render: function() {
      console.log(this.template)
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    // Toggle the `"done"` state of the model.
    loadTemplate: function() {
      this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      var value = this.input.val();
      if (!value) {
        this.clear();
      } else {
        this.model.save({title: value});
        this.$el.removeClass("editing");
      }
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });

  var AppView = Backbone.View.extend({

    el: $("#templatesapp"),

    statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
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
      var view = new TemplatesView({model: template});
      this.$("#templates-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      Templates.each(this.addOne, this);
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    saveTemplate: function(e) {
      //if (!this.input.val()) return;
      Templates.create({title: this.input.val()});
      this.input.val('');
      $('#myModal').modal('hide');
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.invoke(Todos.done(), 'destroy');
      return false;
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      Todos.each(function (todo) { todo.save({'done': done}); });
    }

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;

});
