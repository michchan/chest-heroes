var configValues = require('./config');

module.exports = {

    getDbConnectionString: function() {
        return 'mongodb://' + configValues.uname +
            ':' + configValues.pwd +
            '@ds139370.mlab.com:39370/michnodejsdemo';
    }

}