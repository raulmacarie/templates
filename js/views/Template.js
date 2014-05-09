var app = app || {
    collections: {},
    models: {},
    routers: {},
    views: {}
};

app.views.Template = Backbone.View.extend({

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
    },

    load: function() {
        $('#content').html(this.contentTemplate(this.model.toJSON()));
    },

    clear: function() {
        this.model.destroy();
        clearContent();
    }

});