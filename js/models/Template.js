var app = app || {
    collections: {},
    models: {},
    routers: {},
    views: {}
};

app.models.Template = Backbone.Model.extend({
    defaults: function() {
        return {
            type: '',
            title: 'Title',
            content: ''
        };
    },
    initialize: function() {
        if (!this.get("title")) {
            this.set({"title": this.defaults().title});
        }
    }
});