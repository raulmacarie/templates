function addSlideThumbnailsUIEvents() {
    $("li.slide-thumbnail").children()
        .unbind('hover')
        .hover(function () {
            var thumbnail = $(this).parent();

            if (!thumbnail.hasClass("active")) {
                thumbnail.addClass("hover");
            }
        })
        .unbind('mouseleave')
        .mouseleave(function () {
            var thumbnail = $(this).parent();

            thumbnail.removeClass("hover");
        })
        .unbind('click')
        .click(function () {
            var thumbnail = $(this).parent();

            $("li.slide-thumbnail").removeClass("active");
            thumbnail.removeClass("hover").addClass("active");
        });
}

$(document).ready(function () {
    $.contextMenu({
        selector: 'li.slide-thumbnail',
        callback: function(key/*, options*/) {
            switch (key) {
                case "edit":
                    $("li.slide-thumbnail").removeClass("active");
                    this.addClass("active");
                    break;
                case "delete":
                    break;
            }
            this.trigger(key);
        },
        items: {
            "edit": {name: "Edit", icon: "edit"},
            "delete": {name: "Delete", icon: "delete"}
        }
    });
});