var cp = require('child_process');


function iisExpress() {
    var iisInstance;
    return {
        start: function (options, callback) {
            console.log(options.path);
            if (!iisInstance) {
                iisInstance = cp.spawn("C:\\Program Files\\IIS Express\\iisexpress.exe", ['/path:' + options.path, '/port:' + options.port]);
                iisInstance.stdout.setEncoding('utf8');
                iisInstance.stdout.on('data', function (data) {
                    console.log('stdout: ' + data);
                    console.log(data);
                    if (data.indexOf("IIS Express is running.") != -1) {
                        callback();
                    }

                });
            }
        },
        stop: function() {
            console.log('stopping iis express');
            if (iisInstance) {
                if (iisInstance.connected) {
                    iisInstance.kill();
                }
            }
        }
    }
}


module.exports = iisExpress();