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
        'edit/:id': 'editSlide',
        'new/:id': 'editSlide'
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
        if ((id >= 1) && (id <=4)) {
            
            Model.set({ 'type' : id });
            var view = new app.views.Slide({
                model: Model
            });

            view.model.trigger('editslide');
        }
        else
        SlideShow.slides.each(function (model) {
            if (model.id === id) {
                model.trigger('editslide');
            }
        });
    }
});

SlideShow.router = new app.routers.Router();

Backbone.history.start();