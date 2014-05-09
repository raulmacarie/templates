var app = app || {
    collections: {},
    models: {},
    routers: {},
    views: {}
};

app.collections.Slides = Backbone.Collection.extend({
    model: app.models.Slide,
    localStorage: new Backbone.LocalStorage("slides")
});