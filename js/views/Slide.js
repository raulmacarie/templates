var app = app || {
    collections: {},
    models: {},
    routers: {},
    views: {}
};

app.views.Slide = Backbone.View.extend({
    el: '#slidesList',
    render: function () {
        var that = this;
        var slides = new app.collections.Slides();
        slides.fetch({
            success: function (slides) {
                var template = _.template($('#item-template').html(), {
                    slides: slides.models
                });
                that.$el.prepend(template);
            }
        })
    }
});