function Main() {
    var loaded = 0;

    console.log('@ Main started');

    /* Prevent Mobile Scroll */
    document.ontouchmove = function(event) {
        event.preventDefault();
    }

    /* Define Backbone and socket */
    socket = io.connect(); // establish a websocket connection with server
    Backbone.socket = socket; // Backbone.sync use this socket connection to sync with the server
    Backbone.$ = $; // let Backbone to use the current jQuery library

    /* Define file list */
    fileList = getFileList();

    /* Fetch Stage List */


    /* Fetch Heroes List */
    HeroModel = getHeroModel();
    heroCollection = getHeroCollection(HeroModel);
    heroCollection.fetch({
        success: function(collection, res, options) {

            console.log('@ Fetch heroes list success');
            // console.debug(res);
            /* Load Files */
            loadQueue();

        },
        error: function(collection, res, options) {
            console.log('@ failed, ' + collection + ' error=' + response.errmsg);
        }
    });

} // end fn Main

$(document).ready = Main();