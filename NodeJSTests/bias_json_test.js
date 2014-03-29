var jsdom = require('jsdom');
var jquery = require('jquery');
var biasViewModel = '../BiasTab.Web/Scripts/Bias/bias_view_model';

console.log(require.resolve('knockout'));

jsdom.env(
    {
        html: '<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom\'s Homepage</a></p>',
        scripts: ["http://code.jquery.com/jquery.js",'littleTest.js',],
        done: function (errors, window) {
            console.log('here');
            console.log(errors);
            console.log(window.xyz);

        }
    }
);