define(
  [ "backbone",
    "models/Slide",
    "collections/Slides",
    "views/Slides",
    "views/ViewSlide",
    "views/EditSlide",
    "blocalstorage"
], function(Backbone, ModelSlide, SlidesCollection, SlidesThumbnail, ViewSlide, EditSlide, localStorage) {
 
  var AppRouter = Backbone.Router.extend({
        routes: {
            '' : 'home',
            'view/:id' : 'viewSlide',
            'edit/:id' : 'editSlide',
            'add/:id' : 'editSlide',
            '*actions' : 'home'
        },

        initialize: function() {
          slidesCollection = new SlidesCollection;
          slidesCollection.fetch();
          
          var slidesThumbnail = new SlidesThumbnail();
        },
        
        home: function() {
            
            if (typeof(interval) === 'undefined') {
              console.log('undefined');
            }else{
             clearInterval(interval);;
            }

            var firstSlide = slidesCollection.length > 0 ? slidesCollection.models[slidesCollection.length -1] : null;

            if (firstSlide) {
                this.navigate('view/' + firstSlide.id, true);
            }else{$('#slide-panel').html('');}
        },

        viewSlide: function(id) {

          if (typeof(interval) === 'undefined') {
            console.log('undefined');
          }else{
           clearInterval(interval);;
          }
          
          var position = 0, currentSlide, nextSlide;

          slidesCollection.each( function(model) {
            if (model.id === id) {
              var viewSlide = new ViewSlide({model: model});
              currentSlide = position;
            }
            position ++
          })

          if (currentSlide == 0) {nextSlide = slidesCollection.length-1;}
          else {nextSlide = currentSlide -1;}

          var nextID = slidesCollection.models[nextSlide].id;
          interval = setInterval(function(){ app_router.navigate('view/' + nextID, true);},20000);
          
       }, 

       editSlide: function(id) {

            if (typeof(interval) === 'undefined') {
              console.log('undefined');
            }else{
             clearInterval(interval);;
            }

            if ((id>=1) && (id<=5)) {
              var model = new ModelSlide();        
              model.set({'type' : id});
              editSlide = new EditSlide({ model: model});
            }else{
              var model = slidesCollection.get(id);
              var editSlide = new EditSlide({model: model});
            }
        },

        resetView: function () {
            //still undecided about this
        }
    });
  
  return AppRouter;

});