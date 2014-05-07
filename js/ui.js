$(document).ready(function () {
    $("li.slide-thumbnail *")
        .hover(function () {
            var thumbnail = $(this).parent();

            if (!thumbnail.hasClass("active")) {
                thumbnail.addClass("hover");
            }
        })
        .mouseleave(function () {
            var thumbnail = $(this).parent();

            thumbnail.removeClass("hover");
        })
        .click(function () {
            var thumbnail = $(this).parent();

            $("li.slide-thumbnail").removeClass("active");
            thumbnail.removeClass("hover").addClass("active");
        });

    $.contextMenu({
        selector: 'li.slide-thumbnail',
        callback: function(key, options) {
            this.trigger(key);
        },
        items: {
            "edit": {name: "Edit", icon: "edit"},
            "delete": {name: "Delete", icon: "delete"}
        }
    });
});