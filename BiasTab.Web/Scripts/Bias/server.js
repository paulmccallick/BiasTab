$ = require('jquery');

module.exports = function () {
    return {
        postJSON: function (url, data, callback) {
            return $.post(url, data, callback, "json");
        },
        getJSON: function(url, callback) {
            $.getJSON(url, callback);
        }
    }
}();