define(
  [ "backbone",
    "models/Slide",
    "collections/Slides",
    "views/Slides",
    "views/ViewSlide",
    "views/EditSlide",
    "blocalstorage"
], function(Backbone, ModelSlide, SlidesCollection, SlidesThumbnail, ViewSlide, EditSlide, localStorage) {

  function AppView(){
 
   alert('here');
   // this.showView(view) {
   //  if (this.currentView){
   //    this.currentView.close();
   //  }
 
   //  this.currentView = view;
   //  this.currentView.render();
 
   //  $("#mainContent").html(this.currentView.el);
  }
 
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
            
            var firstSlide = slidesCollection.length > 0 ? slidesCollection.models[slidesCollection.length -1] : null;

            if (firstSlide) {
                this.navigate('view/' + firstSlide.id, true);
            }else{$('#slide-panel').html('');}
        },

        viewSlide: function(id) {
          var model = slidesCollection.get(id);
          var viewSlide = new ViewSlide({model: model});
 
       }, 

       editSlide: function(id) {
            console.log(id);
            if ((id>=1) && (id<=4)) {
              var model = new ModelSlide();        
              model.set({'type' : id});
              editSlide = new EditSlide({ model: model});
            }else{
              var model = slidesCollection.get(id);
              var editSlide = new EditSlide({model: model});
            }
        },

        resetView: function () {

        }
    });
  
  return AppRouter;

});