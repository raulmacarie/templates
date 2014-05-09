var app = app || {
    collections: {},
    models: {},
    routers: {},
    views: {}
};

app.views.Slide = Backbone.View.extend({
    template: _.template($('#slide-thumbnail-template').html()),

    contentTemplate: _.template($('#view-slide-template').html()),

    events: {
        "delete li.slide-thumbnail": "deleteSlide",
        "edit li.slide-thumbnail": "editSlide",

        "dblclick li.slide-thumbnail": "editSlide",
        "click li.slide-thumbnail": "viewSlide"
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    viewSlide: function() {
//        router.navigate('slide/' + this.model.id);
        $("#current-slide").html(this.contentTemplate(this.model.toJSON()));
    },

    editSlide: function() {
        var view = this,
            model = view.model,
            editSlideTemplate = $("#edit-slide-template").html(),
            currentSlide = $("#current-slide"),
            parsedTemplate,
            data,
            type = model.attributes.type,
            fileName;

        currentSlide.html("");

        parsedTemplate = _.template(editSlideTemplate, this.model.attributes);
        currentSlide.html(parsedTemplate);

        $('#save-changes').unbind('click').click(function(){
            if (type > 2) {
                fileName = $('#files').val().split('\\').pop();
                if (fileName != '') {
                    $('#edit-slide-content').val(fileName);
                }
            }

            data = {
                title: $("#edit-slide-title").val(),
                content: $("#edit-slide-content").val()
            };

            model.save(data);
            view.viewSlide();
        });

        $("#discard-changes").unbind('click').click(function () {
            view.viewSlide();
        });
    },

    deleteSlide: function() {
        this.model.destroy();
//        clearContent();
    }
});