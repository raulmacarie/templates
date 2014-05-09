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
        "click #save-modal-template": "saveTemplate",
        "click #add-slide-button": "showTemplateList"
    },

    initialize: function() {
//        this.input = this.$("#template-title");
//        this.listenTo(app.Templates, 'add', this.addOne);
//        //eventBus.on('save:Template', this.saveTemplate, this);
        this.slidesCollection = new app.collections.Slides;
        this.slidesCollection.fetch();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    showTemplateList: function () {
        router.navigate('add', true);
    },

    addSlide: function (template) {
        var type = template.currentTarget.attr('data-value'),
            data = {
                type: type,
                title: 'Title',
                content: ''
            };
    },

    addOne: function(template) {
        var view = new app.views.Template({model: template});

        this.$("#left-hand-panel ul").append(view.render().el);

        if ('function' === typeof addSlideThumbnailsUIEvents) {
            setTimeout('addSlideThumbnailsUIEvents()', 100);
        }
    },

    addAll: function() {
        this.slidesCollection.each(this.addOne, this);
    },

    saveTemplate: function(data) {
        this.slidesCollection.create(data);
    }
});