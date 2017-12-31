
var margin = 10;
var $html = $("html");
var $window = $(window);

var $button = $("<button>")
    .addClass("random-movie-button button")
    .html("Random");

var previousSelection;
$button.click(function () {
    var $posters = $(":not(.poster-list.-overlapped) > .poster[data-film-id]:has(.overlay)");

    if ($posters.length <= 1) return;

    $posters = $posters.filter(function () {
        return this === $posters.filter("[data-film-id='" + $(this).data("film-id") + "']")[0];
    });

    var $selection;
    do {
        $selection = $($posters[Math.floor((Math.random() * $posters.length))]);
    } while ($posters.length > 0 && $selection.data("film-id") === previousSelection)

    previousSelection = $selection.data("film-id");

    var highlight = function () {
        var $overlay = $selection.find(".overlay");

        $overlay.effect({
            effect: "highlight",
            color: $overlay.css("border-color"),
            duration: 1000
        });
    }

    var $container = $selection.closest(".poster-container, .poster-list, .poster");
    //if ($container.length === 0) { $container = $selection; }

    var top = $container.offset().top - margin;
    var bottom = top + $container.height() + margin*2;

    var windowTop = $window.scrollTop();
    var windowHeight = $window.height();

    if (windowTop > top) {
        $html.animate({ scrollTop: top }, { duration: 500, complete: highlight });
    } else if (windowTop + windowHeight < bottom) {
        $html.animate({ scrollTop: bottom - windowHeight }, { duration: 500, complete: highlight });
    } else {
        highlight();
    }
});

$("#content").append($button);
