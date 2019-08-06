//var interval;
$(document).ready(function() {
    // get all click events of every skill
    $('#skills').on('click', '.skill.webapp', function() {
        selectSkill('webapp');
    });
    $('#skills').on('click', '.skill.webtech', function() {
        selectSkill('webtech');
    });
    $('#skills').on('click', '.skill.desktopapp', function() {
        selectSkill('desktopapp');
    });
    $('#skills').on('click', '.skill.database', function() {
        selectSkill('database');
    });
    $('#skills').on('click', '.skill.teamworking', function() {
        selectSkill('teamworking');
    });
    
    // set interval to auto scroll the skills every 10 seconds
    /*interval = setInterval(function() {
        selectNextSkill();
    }, 10000);*/
    
    /*
     * Function to change the language and keep the user at the same point
     */
    $('.change_language').on('click', function(e) {
        e.preventDefault();
        var language = $(this).attr('data-language');
        var path = window.location.href;
        var array_path = path.split('/');
        var real_path = '/';
        if(array_path[array_path.length-1] !== 'es' && array_path[array_path.length-1] !== 'en') real_path = '/' + array_path[array_path.length-1];
        window.location = window.location.protocol + '//' + window.location.host + '/change_language/' + language + real_path;
    });
    
    /*
     * Function to view submenu when hover and prevent hide on click.
     */
    $('.dropdown').hover(
        function() {
            $(this).addClass('open');
            $(this).find('.dropdown-menu').show();
        },
        function() {
            $(this).removeClass('open');
            $(this).find('.dropdown-menu').hide();
        }
    );
    
    /*
     * Function to prevent to show the submenu when clicking on the father.
     * The function checks if the submenu is visible, to prevent affecting to mobile views.
     */
    $('.dropdown a').on('click', function() {
        if($(this).siblings('.dropdown-menu').is(':visible')) {
            return false;
        }
    });
    
    /*
     * Function to remove the entire menu when clicking on a submenu link.
     * Bug of bootstrap to not hide on mobile view all the navbar-collapse when
     * clicking an anchor of a submenu.
     */
    $('.dropdown > ul > li > a').on('click', function() {
        $('.navbar-collapse.in').removeClass('in');
    });
});

/*
 * @author      Hector Manrique
 * @description change the visible skill to the new one selected
 * @params      var skill (string) skill selected        
 */
function selectSkill(skill) {
    // get the visible div and the next one
    var visible = $('.skill-container').find('.skill-img:visible');
    var next = $('.skill-container').find('.skill-img.'+skill);
    // change skill when the next one is different
    if(!visible.hasClass(skill)) {
        // animate the visible skill
        visible.animate({
            opacity: 0,
            left: '-=100%'
        }, 500, function() {
            // when the visible skill hides, normalize css...
            visible.hide();
            visible.css('left', '');
            visible.css('opacity', '');
            // prepare the next skill with css...
            next.css('left', '100%');
            next.css('opacity', '0');
            // show the next skill... (but it can not be watched yet)
            next.show();
            // put the next skill text as selected
            $('.skill').find('.skill-text').removeClass('selected');
            $('.skill.'+skill).find('.skill-text').addClass('selected');
            $('.skill-container').find('.skill-img.'+skill).fadeIn(500);
            // and finally animate the next skill
            next.animate({
                opacity: 1,
                left: '-=100%'
            }, 500, function() {
                next.css('left', '');
                next.css('opacity', '');
                
                // reset interval
                /*clearInterval(interval);
                interval = setInterval(function() {
                    selectNextSkill();
                }, 10000);*/
            });
        });
    }
}

/*
 * @author      Hector Manrique
 * @description change the visible skill to the next one
 */
function selectNextSkill() {
    var selected = $('.skill').find('.selected');
    var next = selected.parent().next();
    if(next.length === 0) {
        next = $('.skill:first-child');
    }
    if(next.length !== 0) {
        $.each(next.attr('class').split(/\s+/), function(index, item) {
            if(item !== 'skill') {
                selectSkill(item);
                return false;
            }
        });
    }
}

