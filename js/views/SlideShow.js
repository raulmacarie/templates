var app = app || {
    collections: {},
    models: {},
    routers: {},
    views: {}
};

app.views.SlideShow = Backbone.View.extend({
    el: $("#slideshow-application"),

    events: {
        "click #right-hand-panel ul li" : "addSlide",
        "click #save-changes": "saveChanges",
        "click #discard-changes": "discardChanges",
        "click #add-slide-button": "showTemplates"
    },

    initialize: function() {
        this.slides = new app.collections.Slides;
        this.listenTo(this.slides, 'add', this.addSlideToLeftHandPanel);
        this.slides.fetch();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    showTemplates: function () {
        router.navigate('add', true);
    },

    addSlide: function (template) {
        var type = $(template.currentTarget).attr('data-type'),
            data = {
                type: type,
                title: 'Title',
                content: ''
            };

        this.saveTemplate(data);
    },

    addSlideToLeftHandPanel: function (slide) {
        var view = new app.views.Slide({
            model: slide
        });

        $("#left-hand-panel").find("ul").prepend(view.render().el);

        if ('function' === typeof addSlideThumbnailsUIEvents) {
            setTimeout('addSlideThumbnailsUIEvents()', 100);
        }
    },

    saveTemplate: function(data) {
        this.slides.create(data);
    }
});