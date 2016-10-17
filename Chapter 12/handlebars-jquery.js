/// <reference path="jquery-2.0.2.js" />
(function ($) {

    Handlebars.registerHelper('gt', function (a, b, options) {
        return (a > b) ? options.fn(this) : options.inverse(this);
    });

    Handlebars.registerHelper("gtValAttr", function () {
        return "value='" + (this.stock > 0 ? "1" : "0") + "'";
    });

    Handlebars.registerHelper("inputElem", function (product, stock, options) {
        options.hash.name = product;
        options.hash.value = stock > 0 ? "1" : "0";
        options.hash.required = "required";
        return $("<input>", options.hash)[0].outerHTML;
    });

    Handlebars.registerHelper("stockValue", function (options) {
        options.data.attributeValue = this.stock > 0 ? "1" : "0";
        return options.fn(this);
    });

    var compiled = {};
    $.fn.template = function (data) {
        var template = $.trim($(this).first().html());
        if (compiled[template] == undefined) {
            compiled[template] = Handlebars.compile(template);
        } 
        return $(compiled[template](data));
    };
})(jQuery);