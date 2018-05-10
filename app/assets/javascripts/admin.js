if (typeof jQuery === "undefined") {
    throw new Error("jQuery plugins need to be before this file");
}

$.AdminBSB = {};
$.AdminBSB.options = {
    colors: {
        red: '#F44336',
        pink: '#E91E63',
        purple: '#9C27B0',
        deepPurple: '#673AB7',
        indigo: '#3F51B5',
        blue: '#2196F3',
        lightBlue: '#03A9F4',
        cyan: '#00BCD4',
        teal: '#009688',
        green: '#4CAF50',
        lightGreen: '#8BC34A',
        lime: '#CDDC39',
        yellow: '#ffe821',
        amber: '#FFC107',
        orange: '#FF9800',
        deepOrange: '#FF5722',
        brown: '#795548',
        grey: '#9E9E9E',
        blueGrey: '#607D8B',
        black: '#000000',
        white: '#ffffff'
    },
    leftSideBar: {
        scrollColor: 'rgba(0,0,0,0.5)',
        scrollWidth: '4px',
        scrollAlwaysVisible: false,
        scrollBorderRadius: '0',
        scrollRailBorderRadius: '0',
        scrollActiveItemWhenPageLoad: true,
        breakpointWidth: 1170
    },
    dropdownMenu: {
        effectIn: 'fadeIn',
        effectOut: 'fadeOut'
    }
}

/* Left Sidebar - Function =================================================================================================
*  You can manage the left sidebar menu options
*/
$.AdminBSB.leftSideBar = {
    activate: function () {
        var _this = this;
        var $body = $('body');
        var $overlay = $('.overlay');

        //Close sidebar
        $(window).click(function (e) {
            var $target = $(e.target);
            if (e.target.nodeName.toLowerCase() === 'i') { $target = $(e.target).parent(); }

            if (!$target.hasClass('bars') && _this.isOpen() && $target.parents('#leftsidebar').length === 0) {
                if (!$target.hasClass('js-right-sidebar')) $overlay.fadeOut();
                $body.removeClass('overlay-open');
            }
        });

        $.each($('.menu-toggle.toggled'), function (i, val) {
            $(val).next().slideToggle(0);
        });

        //When page load
        var curLeftLink = window.location.pathname;
        var curLeftLinkLi = $("[href='"+curLeftLink+"']").parent();
        curLeftLinkLi.addClass('active')

        $.each($('.menu .list li.active'), function (i, val) {
            var $activeAnchors = $(val).find('a:eq(0)');
            $activeAnchors.addClass('toggled');
            $activeAnchors.next().show();
        });

        //Collapse or Expand Menu
        $('.menu-toggle').on('click', function (e) {
            var $this = $(this);
            var $content = $this.next();

            if ($($this.parents('ul')[0]).hasClass('list')) {
                var $not = $(e.target).hasClass('menu-toggle') ? e.target : $(e.target).parents('.menu-toggle');

                $.each($('.menu-toggle.toggled').not($not).next(), function (i, val) {
                    if ($(val).is(':visible')) {
                        $(val).prev().toggleClass('toggled');
                        $(val).slideUp();
                    }
                });
            }

            $this.toggleClass('toggled');
            $content.slideToggle(320);
        });

        //Set menu height
        _this.setMenuHeight();
        _this.checkStatuForResize(true);
        $(window).resize(function () {
            _this.setMenuHeight();
            _this.checkStatuForResize(false);
        });

        //Set Waves
        Waves.attach('.menu .list a', ['waves-block']);
        Waves.init();
    },
    setMenuHeight: function (isFirstTime) {
        if (typeof $.fn.slimScroll != 'undefined') {
            var configs = $.AdminBSB.options.leftSideBar;
            var height = ($(window).height() - ($('.legal').outerHeight() + $('.user-info').outerHeight() + $('.navbar').innerHeight()));
            var $el = $('.list');

            $el.slimscroll({
                height: height + "px",
                color: configs.scrollColor,
                size: configs.scrollWidth,
                alwaysVisible: configs.scrollAlwaysVisible,
                borderRadius: configs.scrollBorderRadius,
                railBorderRadius: configs.scrollRailBorderRadius
            });

            //Scroll active menu item when page load, if option set = true
            if ($.AdminBSB.options.leftSideBar.scrollActiveItemWhenPageLoad) {
                var activeItemOffsetTop = $('.menu .list li.active')[0].offsetTop
                if (activeItemOffsetTop > 150) $el.slimscroll({ scrollTo: activeItemOffsetTop + 'px' });
            }
        }
    },
    checkStatuForResize: function (firstTime) {
        var $body = $('body');
        var $openCloseBar = $('.navbar .navbar-header .bars');
        var width = $body.width();

        if (firstTime) {
            $body.find('.content, .sidebar').addClass('no-animate').delay(1000).queue(function () {
                $(this).removeClass('no-animate').dequeue();
            });
        }

        if (width < $.AdminBSB.options.leftSideBar.breakpointWidth) {
            $body.addClass('ls-closed');
            $openCloseBar.fadeIn();
        }
        else {
            $body.removeClass('ls-closed');
            $openCloseBar.fadeOut();
        }
    },
    isOpen: function () {
        return $('body').hasClass('overlay-open');
    }
};
//==========================================================================================================================

/* Right Sidebar - Function ================================================================================================
*  You can manage the right sidebar menu options
*  
*/
$.AdminBSB.rightSideBar = {
    activate: function () {
        var _this = this;
        var $sidebar = $('#rightsidebar');
        var $overlay = $('.overlay');

        //Close sidebar
        $(window).click(function (e) {
            var $target = $(e.target);
            if (e.target.nodeName.toLowerCase() === 'i') { $target = $(e.target).parent(); }

            if (!$target.hasClass('js-right-sidebar') && _this.isOpen() && $target.parents('#rightsidebar').length === 0) {
                if (!$target.hasClass('bars')) $overlay.fadeOut();
                $sidebar.removeClass('open');
            }
        });

        $('.js-right-sidebar').on('click', function () {
            $sidebar.toggleClass('open');
            if (_this.isOpen()) { $overlay.fadeIn(); } else { $overlay.fadeOut(); }
        });
    },
    isOpen: function () {
        return $('.right-sidebar').hasClass('open');
    }
}
//==========================================================================================================================

/* Searchbar - Function ================================================================================================
*  You can manage the search bar
*  
*/
$.AdminBSB.search = {
    activate: function () {
        var _this = this;
        var $searchBar = $('.search-bar');

        //Search button click event
        $('.js-search').on('click', function () {
            _this.showSearchBar();
        });

        //Close search click event
        $searchBar.find('.close-search').on('click', function () {
            _this.hideSearchBar();
        });

        //ESC key on pressed
        $searchBar.find('input[type="text"]').on('keyup', function (e) {
            if (e.keyCode == 27) {
                _this.hideSearchBar();
            }
        });
    },
    showSearchBar: function () {
        var $searchBar = $('.search-bar');
        $searchBar.addClass('open');
        $searchBar.find('input[type="text"]').focus();
    },
    hideSearchBar: function () {
        var $searchBar = $('.search-bar');
        $searchBar.removeClass('open');
        $searchBar.find('input[type="text"]').val('');
    }
}
//==========================================================================================================================
/* Navbar - Function =======================================================================================================
*  You can manage the navbar
*/
$.AdminBSB.navbar = {
    activate: function () {
        var $body = $('body');
        var $overlay = $('.overlay');

        //Open left sidebar panel
        $('.bars').on('click', function () {
            $body.toggleClass('overlay-open');
            if ($body.hasClass('overlay-open')) { $overlay.fadeIn(); } else { $overlay.fadeOut(); }
        });

        //Close collapse bar on click event
        $('.nav [data-close="true"]').on('click', function () {
            var isVisible = $('.navbar-toggle').is(':visible');
            var $navbarCollapse = $('.navbar-collapse');

            if (isVisible) {
                $navbarCollapse.slideUp(function () {
                    $navbarCollapse.removeClass('in').removeAttr('style');
                });
            }
        });
    }
}
//==========================================================================================================================
/* Input - Function ========================================================================================================
*  You can manage the inputs(also textareas) with name of class 'form-control'
*/
$.AdminBSB.input = {
    activate: function () {
        //On focus event
        $('.form-control').focus(function () {
            $(this).parent().addClass('focused');
        });

        //On focusout event
        $('.form-control').focusout(function () {
            var $this = $(this);

            if ($this.parents('.form-group').hasClass('form-float')) {
                if ($this.val() == '') { $this.parents('.form-line').removeClass('focused'); }
            }
            else {
                $this.parents('.form-line').removeClass('focused');
            }
        });

        //On label click
        $('body').on('click', '.form-float .form-line .form-label', function () {
            // alert($(this).parent().attr('class'));
            $(this).parent().find('input').focus();
        });

        //Not blank form
        $('.form-control').each(function () {
            if ($(this).val() !== '') {
                $(this).parents('.form-line').addClass('focused');
            }
        });
    }
}
//==========================================================================================================================
/* Form - Select - Function ================================================================================================
*  You can manage the 'select' of form elements
*/
$.AdminBSB.select = {
    activate: function () {
        if ($.fn.selectpicker) { $('select:not(.ms)').selectpicker(); }
    }
}
//==========================================================================================================================
/* DropdownMenu - Function =================================================================================================
*  You can manage the dropdown menu 
*/
$.AdminBSB.dropdownMenu = {
    activate: function () {
        var _this = this;

        $('.dropdown, .dropup, .btn-group').on({
            "show.bs.dropdown": function () {
                var dropdown = _this.dropdownEffect(this);
                _this.dropdownEffectStart(dropdown, dropdown.effectIn);
            },
            "shown.bs.dropdown": function () {
                var dropdown = _this.dropdownEffect(this);
                if (dropdown.effectIn && dropdown.effectOut) {
                    _this.dropdownEffectEnd(dropdown, function () { });
                }
            },
            "hide.bs.dropdown": function (e) {
                var dropdown = _this.dropdownEffect(this);
                if (dropdown.effectOut) {
                    e.preventDefault();
                    _this.dropdownEffectStart(dropdown, dropdown.effectOut);
                    _this.dropdownEffectEnd(dropdown, function () {
                        dropdown.dropdown.removeClass('open');
                    });
                }
            }
        });

        //Set Waves
        Waves.attach('.dropdown-menu li a', ['waves-block']);
        Waves.init();
    },
    dropdownEffect: function (target) {
        var effectIn = $.AdminBSB.options.dropdownMenu.effectIn, effectOut = $.AdminBSB.options.dropdownMenu.effectOut;
        var dropdown = $(target), dropdownMenu = $('.dropdown-menu', target);

        if (dropdown.length > 0) {
            var udEffectIn = dropdown.data('effect-in');
            var udEffectOut = dropdown.data('effect-out');
            if (udEffectIn !== undefined) { effectIn = udEffectIn; }
            if (udEffectOut !== undefined) { effectOut = udEffectOut; }
        }

        return {
            target: target,
            dropdown: dropdown,
            dropdownMenu: dropdownMenu,
            effectIn: effectIn,
            effectOut: effectOut
        };
    },
    dropdownEffectStart: function (data, effectToStart) {
        if (effectToStart) {
            data.dropdown.addClass('dropdown-animating');
            data.dropdownMenu.addClass('animated dropdown-animated');
            data.dropdownMenu.addClass(effectToStart);
        }
    },
    dropdownEffectEnd: function (data, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        data.dropdown.one(animationEnd, function () {
            data.dropdown.removeClass('dropdown-animating');
            data.dropdownMenu.removeClass('animated dropdown-animated');
            data.dropdownMenu.removeClass(data.effectIn);
            data.dropdownMenu.removeClass(data.effectOut);

            if (typeof callback == 'function') {
                callback();
            }
        });
    }
}
//==========================================================================================================================
/* Browser - Function ======================================================================================================
*  You can manage browser
*/
var edge = 'Microsoft Edge';
var ie10 = 'Internet Explorer 10';
var ie11 = 'Internet Explorer 11';
var opera = 'Opera';
var firefox = 'Mozilla Firefox';
var chrome = 'Google Chrome';
var safari = 'Safari';

$.AdminBSB.browser = {
    activate: function () {
        var _this = this;
        var className = _this.getClassName();

        if (className !== '') $('html').addClass(_this.getClassName());
    },
    getBrowser: function () {
        var userAgent = navigator.userAgent.toLowerCase();

        if (/edge/i.test(userAgent)) {
            return edge;
        } else if (/rv:11/i.test(userAgent)) {
            return ie11;
        } else if (/msie 10/i.test(userAgent)) {
            return ie10;
        } else if (/opr/i.test(userAgent)) {
            return opera;
        } else if (/chrome/i.test(userAgent)) {
            return chrome;
        } else if (/firefox/i.test(userAgent)) {
            return firefox;
        } else if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
            return safari;
        }

        return undefined;
    },
    getClassName: function () {
        var browser = this.getBrowser();

        if (browser === edge) {
            return 'edge';
        } else if (browser === ie11) {
            return 'ie11';
        } else if (browser === ie10) {
            return 'ie10';
        } else if (browser === opera) {
            return 'opera';
        } else if (browser === chrome) {
            return 'chrome';
        } else if (browser === firefox) {
            return 'firefox';
        } else if (browser === safari) {
            return 'safari';
        } else {
            return '';
        }
    }
}
//==========================================================================================================================
/* dataTable */
$.AdminBSB.dataTable = {
    activate: function () {
        var dt_wrapper = $('div.dataTables_wrapper');
        if (dt_wrapper.attr('class') != undefined) {
            var dat = $('table.dataTable');
            dat.removeClass('dataTable');
            return;
        }
        var pageLength = $.AdminBSB.current.dtPageLength();
        pageLength = pageLength === '' ? 10 : parseInt(pageLength);
        var dt = $('.js-table').DataTable({
            lengthMenu: [[-1, 10, 25, 50, 100], ["全部", 10, 25, 50, 100]],
            pageLength: pageLength,
            responsive: true
        });
        dt.on( 'draw', function () {
            active_modal();
        });

        //Exportable table
        // $('.js-exportable').DataTable({
        //     dom: 'Bfrtip',
        //     responsive: true,
        //     buttons: [
        //         'copy', 'csv', 'excel', 'pdf', 'print'
        //     ]
        // });
    }
}
//==========================================================================================================================
/* Skin */
$.AdminBSB.skin = {
    activate: function () {
        var _this = this;
        _this.skinChanger();
        _this.activateNotificationAndTasksScroll();

        _this.setSkinListHeightAndScroll(true);
        _this.setSettingListHeightAndScroll(true);
        $(window).resize(function () {
            _this.setSkinListHeightAndScroll(false);
            _this.setSettingListHeightAndScroll(false);
        });
    },
    //Skin changer
    skinChanger: function() {
        $('.right-sidebar .demo-choose-skin li').on('click', function () {
            var $body = $('body');
            var $this = $(this);

            var existTheme = $('.right-sidebar .demo-choose-skin li.active').data('theme');
            $('.right-sidebar .demo-choose-skin li').removeClass('active');
            $body.removeClass('theme-' + existTheme);
            $this.addClass('active');

            $body.addClass('theme-' + $this.data('theme'));
            setCookie('skins', $this.children('span').attr('key'));
        });
    },
    //Activate notification and task dropdown on top right menu
    activateNotificationAndTasksScroll: function () {
        $('.navbar-right .dropdown-menu .body .menu').slimscroll({
            height: '254px',
            color: 'rgba(0,0,0,0.5)',
            size: '4px',
            alwaysVisible: false,
            borderRadius: '0',
            railBorderRadius: '0'
        });
    },
    //Skin tab content set height and show scroll
    setSkinListHeightAndScroll:  function (isFirstTime) {
        var height = $(window).height() - ($('.navbar').innerHeight() + $('.right-sidebar .nav-tabs').outerHeight());
        var $el = $('.demo-choose-skin');

        if (!isFirstTime){
          $el.slimScroll({ destroy: true }).height('auto');
          $el.parent().find('.slimScrollBar, .slimScrollRail').remove();
        }

        $el.slimscroll({
            height: height + 'px',
            color: 'rgba(0,0,0,0.5)',
            size: '6px',
            alwaysVisible: false,
            borderRadius: '0',
            railBorderRadius: '0'
        });
    },
    //Setting tab content set height and show scroll
    setSettingListHeightAndScroll: function (isFirstTime) {
        var height = $(window).height() - ($('.navbar').innerHeight() + $('.right-sidebar .nav-tabs').outerHeight());
        var $el = $('.right-sidebar .demo-settings');

        if (!isFirstTime){
          $el.slimScroll({ destroy: true }).height('auto');
          $el.parent().find('.slimScrollBar, .slimScrollRail').remove();
        }

        $el.slimscroll({
            height: height + 'px',
            color: 'rgba(0,0,0,0.5)',
            size: '6px',
            alwaysVisible: false,
            borderRadius: '0',
            railBorderRadius: '0'
        });
    }
}
//==========================================================================================================================
/* modal */
$.AdminBSB.modal = {
    activate: function () {
        $("[data-target='#defaultModal']").bind('click', function () {
            var $this = $(this);
            // alert($("#defaultModalTitle").attr('class'));
            $("#defaultModalTitle").text($this.data('text'));
            // var ajax_type = $this.data('method');
            $.ajax({url: $this.data('href'), type: $this.data('method'), success: function (data) {
                var modalBody = $("div#defaultModalBody")
                modalBody.html(data);
                $.AdminBSB.tagsinput.activate(modalBody);
                $.AdminBSB.input.activate();
                $.AdminBSB.formValidation.activate();
            }})
        });
    }
}
//==========================================================================================================================
/* form-validation */
$.AdminBSB.formValidation = {
    activate: function () {
        $('#form_validation').validate({
            rules: {
                'checkbox': {
                    required: true
                },
                'gender': {
                    required: true
                }
            },
            highlight: function (input) {
                $(input).parents('.form-line').addClass('error');
            },
            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
            },
            errorPlacement: function (error, element) {
                $(element).parents('.form-group').append(error);
            }
        });

        //Advanced Form Validation
        $('#form_advanced_validation').validate({
            rules: {
                'date': {
                    customdate: true
                },
                'creditcard': {
                    creditcard: true
                }
            },
            highlight: function (input) {
                $(input).parents('.form-line').addClass('error');
            },
            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
            },
            errorPlacement: function (error, element) {
                $(element).parents('.form-group').append(error);
            }
        });

        //Custom Validations ===============================================================================
        //Date
        $.validator.addMethod('customdate', function (value, element) {
            return value.match(/^\d\d\d\d?-\d\d?-\d\d$/);
        },
            'Please enter a date in the format YYYY-MM-DD.'
        );

        //Credit card
        $.validator.addMethod('creditcard', function (value, element) {
            return value.match(/^\d\d\d\d?-\d\d\d\d?-\d\d\d\d?-\d\d\d\d$/);
        },
            'Please enter a credit card in the format XXXX-XXXX-XXXX-XXXX.'
        );
    }
}
//==========================================================================================================================
/* tagsinput */
$.AdminBSB.tagsinput = {
    activate: function (item) {
        var elem = $("input[data-role=tagsinput]");
        item.find(elem).tagsinput();
    }
}
//==========================================================================================================================
/* notification */
$.AdminBSB.notification = {
    activate: function (text) {
        var _this = this;
        var placementFrom = 'bottom';                   // $(this).data('placement-from');
        var placementAlign = 'center';                  // $(this).data('placement-align');
        var animateEnter = 'animated zoomInUp';         // $(this).data('animate-enter');
        var animateExit = 'animated zoomOutUp';         // $(this).data('animate-exit');
        var colorName = 'bg-' + $.AdminBSB.current.themeColor(); // $(this).data('color-name');
        _this.showNotification(colorName, text, placementFrom, placementAlign, animateEnter, animateExit);
    },

    showNotification: function (colorName, text, placementFrom, placementAlign, animateEnter, animateExit) {
        if (colorName === null || colorName === '') { colorName = 'bg-black'; }
        if (text === null || text === '') { text = 'Turning standard Bootstrap alerts'; }
        if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
        if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
        var allowDismiss = true;

        $.notify({
            message: text
        },
            {
                type: colorName,
                allow_dismiss: allowDismiss,
                newest_on_top: true,
                timer: 500,  // 多少时间后notify自动消失
                placement: {
                    from: placementFrom,
                    align: placementAlign
                },
                animate: {
                    enter: animateEnter,
                    exit: animateExit
                },
                template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
            });
    }
}
//==========================================================================================================================
/* clipboard */
$.AdminBSB.clipboard = {
    activate: function () {
        var clipboard = new Clipboard('.clipboard-btn');
        clipboard.on('success', function(e) {
            setTooltip(e.trigger, '复制成功!');
            hideTooltip(e.trigger);
        });
        clipboard.on('error', function(e) {
            setTooltip(e.trigger, '复制失败!');
            hideTooltip(e.trigger);
        });
        $('.clipboard-btn').tooltip({
            trigger: 'click',
            placement: 'left'
        });
    }
}
//==========================================================================================================================
/* font-awesome */
$.AdminBSB.fontAwesome = {
    activate: function () {
        $('head').append('<script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js" integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+" crossorigin="anonymous"></script>');
    }
}
//==========================================================================================================================
/* init */
$(document).on("turbolinks:load", function () {
    $.AdminBSB.browser.activate();
    $.AdminBSB.fontAwesome.activate();
    $.AdminBSB.leftSideBar.activate();
    $.AdminBSB.rightSideBar.activate();
    $.AdminBSB.navbar.activate();
    $.AdminBSB.dropdownMenu.activate();
    $.AdminBSB.input.activate();
    $.AdminBSB.select.activate();
    $.AdminBSB.search.activate();
    $.AdminBSB.dataTable.activate();
    $.AdminBSB.skin.activate();
    $.AdminBSB.modal.activate();
    $.AdminBSB.clipboard.activate();

    setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);
})
//==========================================================================================================================
/* current */
$.AdminBSB.current = {
    themeColor: function () {
        return getCookie('skins');
    },
    datatable: function () {
        return $('.js-table').DataTable();
    },
    dtPageLength: function () {
        return getCookie('dtPageLength');
    }
}
//==========================================================================================================================
$(function () {
    //Widgets count
    $('.count-to').countTo();

    //Sales count to
    $('.sales-count-to').countTo({
        formatter: function (value, options) {
            return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ' ').replace('.', ',');
        }
    });

    if ($('#real_time_chart').attr('id') == 'real_time_chart') {initRealTimeChart();}
    if ($('#donut_chart').attr('id') == 'donut_chart') {initDonutChart();}
    if ($('.sparkline').attr('class') == 'sparkline') {initSparkline();}
});

function initRealTimeChart() {
    //Real time ==========================================================================================
    var realtime = 'on';
    var plot = $.plot('#real_time_chart', [getRandomData()], {
        series: {
            shadowSize: 0,
            color: 'rgb(0, 188, 212)'
        },
        grid: {
            borderColor: '#f3f3f3',
            borderWidth: 1,
            tickColor: '#f3f3f3'
        },
        lines: {
            fill: true
        },
        yaxis: {
            min: 0,
            max: 100
        },
        xaxis: {
            min: 0,
            max: 100
        }
    });

    function updateRealTime() {
        plot.setData([getRandomData()]);
        plot.draw();

        var timeout;
        if (realtime === 'on') {
            timeout = setTimeout(updateRealTime, 320);
        } else {
            clearTimeout(timeout);
        }
    }

    updateRealTime();

    $('#realtime').on('change', function () {
        realtime = this.checked ? 'on' : 'off';
        updateRealTime();
    });
    //====================================================================================================
}

function initSparkline() {
    $(".sparkline").each(function () {
        var $this = $(this);
        $this.sparkline('html', $this.data());
    });
}

function initDonutChart() {
    Morris.Donut({
        element: 'donut_chart',
        data: [{
            label: 'Chrome',
            value: 37
        }, {
            label: 'Firefox',
            value: 30
        }, {
            label: 'Safari',
            value: 18
        }, {
            label: 'Opera',
            value: 12
        },
        {
            label: 'Other',
            value: 3
        }],
        colors: ['rgb(233, 30, 99)', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', 'rgb(0, 150, 136)', 'rgb(96, 125, 139)'],
        formatter: function (y) {
            return y + '%'
        }
    });
}

function getRandomData() {
    var data = [], totalPoints = 110;
    if (data.length > 0) data = data.slice(1);

    while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50, y = prev + Math.random() * 10 - 5;
        if (y < 0) { y = 0; } else if (y > 100) { y = 100; }

        data.push(y);
    }

    var res = [];
    for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]]);
    }

    return res;
}

//Google Analiytics ======================================================================================
addLoadEvent(loadTracking);
var trackingId = 'UA-30038099-6';

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

function loadTracking() {
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', trackingId, 'auto');
    ga('send', 'pageview');
}
//========================================================================================================


function getCookie(c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1){
      c_start = c_start + c_name.length+1;
      c_end = document.cookie.indexOf(";",c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}

function setCookie(c_name, value){
  document.cookie = c_name+ "=" +escape(value);
}

// function shift_data_to_tbody(data){
//     $("tbody tr:eq(0)").before(data);
// }

/* 加入新元素之后需要重新绑定, 绑定之前需要先将原来的解绑*/
function active_modal(){
    $("[data-target='#defaultModal']").unbind();
    $.AdminBSB.modal.activate();
}

function removeTags(datas) {
    datas = datas.match(/<td>.*<\/td>/g);
    for (i in datas) {
        datas[i] = datas[i].replace('<td>','').replace('</td>','');
    }
    return datas;
}

function notify(text) {
    $.AdminBSB.notification.activate(text);
}

function setTooltip(btn, message) {
  $(btn).tooltip('hide')
    .attr('data-original-title', message)
    .tooltip('show');
}

function hideTooltip(btn) {
  setTimeout(function() {
    $(btn).tooltip('hide');
  }, 1000);
}

function datatableCreate(rowdata) {
    var dt = $.AdminBSB.current.datatable();
    dt.row.add(rowdata).draw();
    var node = dt.row(function (idx, data, node) { return data === rowdata; }).node();
    updateBgcolor($(node));
}

function datatableUpdate(rowdata, jquery_selector) {
    var dt = $.AdminBSB.current.datatable();
    var row = dt.row(jquery_selector);
    row.data(rowdata).draw();
    updateBgcolor($(row.node()));
}

function updateBgcolor(elem) {
    elem.css("background-color", 'pink');
}