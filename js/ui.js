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
    addSlideThumbnailsUIEvents();

    $("#add-slide-button").click(function () {
        $("#right-hand-panel").show();
    });

    $("body").mousedown(function (e) {
        var rightHandPanel = $("#right-hand-panel");

        if (e.target !== rightHandPanel[0]
                && !rightHandPanel.find(e.target).length) {
            rightHandPanel.hide();
        }
    });

    $.contextMenu({
        selector: 'li.slide-thumbnail',
        callback: function(key/*, options*/) {
            this.trigger(key);
        },
        items: {
            "edit": {name: "Edit", icon: "edit"},
            "delete": {name: "Delete", icon: "delete"}
        }
    });
});