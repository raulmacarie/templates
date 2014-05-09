var app = app || {
    collections: {},
    models: {},
    routers: {},
    views: {}
};

app.routers.Router = Backbone.Router.extend({
    routes: {
        '' : 'home',
        'add' : 'add-slide',
        'slide/:id': 'view-slide',
        'edit/:id': 'edit-slide'
    }
});

var router = new app.routers.Router();

var slideView = new app.views.Slide();
var slideEditView = new app.views.SlideEdit();

router.on('route:add-slide', function () {
    $("#right-hand-panel").show();
});

router.on('route:home', function () {
    $("#right-hand-panel").hide();
    slideView.render();
});

router.on('route:edit-slide', function (id) {
    $("#right-hand-panel").hide();
    slideEditView.render();
});

Backbone.history.start();