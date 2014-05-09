var app = app || {
    collections: {},
    models: {},
    routers: {},
    views: {}
};

app.routers.Router = Backbone.Router.extend({
    routes: {
        '' : 'home',
        'add' : 'addSlide',
        'slide/:id': 'viewSlide',
        'edit/:id': 'editSlide'
    },

    home: function () {
        $("#right-hand-panel").hide();
    },

    addSlide: function () {
        $("#right-hand-panel").show();
    },

    viewSlide: function (id) {
        $("#right-hand-panel").hide();

        SlideShow.slides.each(function (model) {
            if (model.id === id) {
                model.trigger('viewslide');
            }
        });
    },

    editSlide: function (id) {
        $("#right-hand-panel").hide();

        SlideShow.slides.each(function (model) {
            if (model.id === id) {
                model.trigger('editslide');
            }
        });
    }
});

SlideShow.router = new app.routers.Router();

Backbone.history.start();