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
        "edit li.slide-thumbnail": "routeToEditSlide",

        "dblclick li.slide-thumbnail": "routeToEditSlide",
        "click li.slide-thumbnail": "routeToViewSlide"
    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'viewslide', this.viewSlide);
        this.listenTo(this.model, 'editslide', this.editSlide);
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    routeToViewSlide: function () {
        SlideShow.router.navigate('slide/' + this.model.id, true);
    },

    viewSlide: function () {
        $("#current-slide").html(this.contentTemplate(this.model.toJSON()));
    },

    routeToEditSlide: function () {
        SlideShow.router.navigate('edit/' + this.model.id, true);
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
                title: $("#edit-slide-title").val().trim() || model.attributes.title,
                content: $("#edit-slide-content").val()
            };

            model.save(data);
            view.routeToViewSlide();
        });

        $("#discard-changes").unbind('click').click(function () {
            view.routeToViewSlide();
        });
    },

    deleteSlide: function() {
        this.model.destroy();
//        clearContent();
    }
});