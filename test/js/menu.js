function init_sidebar() {
    var a = function () {
        $RIGHT_COL.css("min-height", $(window).height());
        var a = $BODY.outerHeight(),
            b = $BODY.hasClass("footer_fixed") ? -10 : $FOOTER.height(),
            c = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
            d = a < c ? c : a;
        d -= $NAV_MENU.height() + b, $RIGHT_COL.css("min-height", d)
    };
    $SIDEBAR_MENU.find("a").on("click", function (b) {
        var c = $(this).parent();
        c.is(".active") ? (c.removeClass("active active-sm"), $("ul:first", c).slideUp(function () {
            a()
        })) : (c.parent().is(".child_menu") ? $BODY.is(".nav-sm") && ($SIDEBAR_MENU.find("li").removeClass("active active-sm"), $SIDEBAR_MENU.find("li ul").slideUp()) : ($SIDEBAR_MENU.find("li").removeClass("active active-sm"), $SIDEBAR_MENU.find("li ul").slideUp()), c.addClass("active"), $("ul:first", c).slideDown(function () {
            a()
        }))
    }), $MENU_TOGGLE.on("click", function () {
        if ($(window).width() > 1366) {
            $BODY.hasClass("nav-md") ? ($SIDEBAR_MENU.find("li.active ul").hide(), $SIDEBAR_MENU.find("li.active").addClass("active-sm").removeClass("active")) : ($SIDEBAR_MENU.find("li.active-sm ul").show(), $SIDEBAR_MENU.find("li.active-sm").addClass("active").removeClass("active-sm")), $BODY.toggleClass("nav-md nav-sm"), a()
        }
    }), $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent("li").addClass("current-page"), $SIDEBAR_MENU.find("a").filter(function () {
        return this.href == CURRENT_URL
    }).parent("li").addClass("current-page").parents("ul").slideDown(function () {
        a()
    }).parent().addClass("active"), $(window).smartresize(function () {
        a()
    }), a(), $.fn.mCustomScrollbar && $(".menu_fixed").mCustomScrollbar({
        autoHideScrollbar: !0,
        theme: "minimal",
        mouseWheel: {
            preventDefault: !0
        }
    })
}



function update_title() {
    if (document.title == "SCADANET SP Página Inicial") {
        document.getElementById("page-title").innerHTML = "Página Inicial";
    } else {
        document.getElementById("page-title").innerHTML = document.title;
    }    

    if ($(window).width() <= 1366) {
        document.getElementById("menu_toggle").style.visibility = "hidden";

        $BODY.hasClass("nav-md") ? ($SIDEBAR_MENU.find("li.active ul").hide(), $SIDEBAR_MENU.find("li.active").addClass("active-sm").removeClass("active")) : ($SIDEBAR_MENU.find("li.active-sm ul").show(), $SIDEBAR_MENU.find("li.active-sm").addClass("active").removeClass("active-sm")), $BODY.toggleClass("nav-md nav-sm")

        
    }
}

function toggleFullScreen(elem) {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) { 
            elem.mozRequestFullScreen(); // Firefox
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); // Chrome / Opera
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen(); // IE / Edge
        }
        $("#fullscreenIcon").removeClass("glyphicon glyphicon-fullscreen").addClass("glyphicon glyphicon-resize-small");
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        $("#fullscreenIcon").removeClass("glyphicon glyphicon-resize-small").addClass("glyphicon glyphicon-fullscreen");
    }
}

var CURRENT_URL = window.location.href.split("#")[0].split("?")[0],
    $BODY = $("body"),
    $MENU_TOGGLE = $("#menu_toggle"),
    $SIDEBAR_MENU = $("#sidebar-menu"),
    $SIDEBAR_FOOTER = $(".sidebar-footer"),
    $LEFT_COL = $(".left_col"),
    $RIGHT_COL = $(".right_col"),
    $NAV_MENU = $(".nav_menu"),
    $FOOTER = $("footer"),
    randNum = function () {
        return Math.floor(21 * Math.random()) + 20
    };
    
$(document).ready(function () {
    init_sidebar();
    update_title();
    var clickState = 0;
    var currentPage = $('#page-title').text();
    $('#menu_toggle').click(function(){
        switch(currentPage) {
            case 'TX IPL Sinóptico':
                if (clickState == 0) {
                    //console.log("ON");
                    $('#bg').css('left', '65px');
                    $('#bgtx').css('left', '-33px');
                    $('#bgpump').css('left', '955px');
                    $('#bgheat').css('left', '899px');
                    clickState = 1;
                } else {
                    //console.log("OFF");
                    $('#bg').css('left', '250px');
                    $('#bgtx').css('left', '152px');
                    $('#bgpump').css('left', '1140px');
                    $('#bgheat').css('left', '1084px');
                    clickState = 0;
                }
                break;
            case 'TX DR Sinóptico':
                if (clickState == 0) {
                    //console.log("ON");
                    $('#bg').css('left', '65px');
                    $('#bgtx').css('left', '0px');
                    $('#bgpump').css('left', '975px');
                    $('#bgheat').css('left', '645px');
                    clickState = 1;
                } else {
                    //console.log("OFF");
                    $('#bg').css('left', '250px');
                    $('#bgtx').css('left', '180px');
                    $('#bgpump').css('left', '1163px');
                    $('#bgheat').css('left', '834px');
                    clickState = 0;
                }
                break;
        }
        
    });
});

    
