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

    setAsActiveThumbnail: function () {
        this.$el.find('li.slide-thumbnail').addClass('active');
    },

    routeToViewSlide: function (id) {
        var slideId;

        if (typeof id === 'object') {
            slideId = this.model.id;
        } else {
            slideId = id;
        }

        SlideShow.router.navigate('slide/' + slideId, true);
    },

    viewSlide: function () {
        $("#current-slide").html(this.contentTemplate(this.model.toJSON()));
        this.setAsActiveThumbnail();
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
            id = model.id,
            fileName;

        this.setAsActiveThumbnail();

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
                type: type,
                title: $("#edit-slide-title").val().trim() || model.attributes.title,
                content: $("#edit-slide-content").val()
            };

            if (!id) {
                SlideShow.slides.create(data, {
                    success: function(model) {
                        view.routeToViewSlide(model.id);
                    }
                });
            } else {
                model.save(data, {
                    success: function(model) {
                        view.routeToViewSlide(model.id);
                    }
                });
            }
        });

        $("#discard-changes").unbind('click').click(function () {
            if (!id) {
                currentSlide.html("");
                SlideShow.router.navigate('', true);
            } else {
                view.routeToViewSlide(model.id);
            }
        });
    },

    deleteSlide: function() {
        this.model.destroy();
    }
});