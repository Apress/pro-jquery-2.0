(function ($) {
    var compiled = {};
    $.fn.template = function (data) {
        var template = $.trim($(this).first().html());
        if (compiled[template] == undefined) {
            compiled[template] = Handlebars.compile(template);
        } 
        return $(compiled[template](data));
    };
})(jQuery);
