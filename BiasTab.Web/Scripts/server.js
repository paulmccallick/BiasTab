$ = require('jquery');

module.exports = function () {
    console.log('inside exports');
    return {
        postJSON: function (url, data, callback) {
            return $.post(url, data, callback, "json");
        }
    }
}();