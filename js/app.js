$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

clearContent = function () {
    $('#content').html('');
};

var SlideShow = new app.views.SlideShow;

/*
 $(function() {
 $.fn.serializeObject = function() {
 var o = {};
 var a = this.serializeArray();
 $.each(a, function() {
 if (o[this.name]) {
 if (!o[this.name].push) {
 o[this.name] = [o[this.name]];
 }
 o[this.name].push(this.value || '');
 } else {
 o[this.name] = this.value || '';
 }
 });
 return o;
 };

 $('#Add-Button').click( function () {
 $('.template-btn').prop('disabled', false);
 });

 var clearContent = function () {
 $('#content').html('');
 }

 var modalTemplate = $('#modal-template').html();

 var hideModal = function () {
 $('.modal').on('hidden.bs.modal', function () {
 $('.template-btn').prop('disabled', true);
 });
 };

 $("#right-hand-panel ul li").click(function() {

 var modal = new app.NewSlideView();

 $("#left-hand-panel ul").html(modal.render().el);
 });

 $("#right-hand-panel ul li").click(function() {
 var type,
 data,
 parsedTemplate,
 fileName;

 clearContent();

 type = $(this).attr('data-value');
 data = {
 type: type,
 title: '',
 content: ''
 };
 parsedTemplate = _.template(modalTemplate, {
 data: data
 });

 $('#bootstrap-modal').html(parsedTemplate);
 $('#templateModal').modal('show');
 $('#save-modal-template').click(function () {
 $('#templateModal').modal('hide');
 if (type > 2) {
 fileName = $('#files').val().split('\\').pop();
 $('#modal-content').val(fileName);
 }
 data = $('#formTemplate').serializeObject();
 eventBus.trigger('save:Template', data);
 });

 hideModal();
 });
 });*/