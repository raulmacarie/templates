var app = app || {
    collections: {},
    models: {},
    routers: {},
    views: {}
};

app.views.SlideEdit = Backbone.View.extend({
    el: '#content',
    render: function () {
        var template = _.template($('#add-template').html(), {});
        this.$el.html(template);
    }
});