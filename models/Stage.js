/* 
   server side script
*/
var Rectangular = require('./Rectangular');

module.exports =
    class Stage extends Rectangular {

        constructor(w, h, x, y, bgSrc) {
            super(w, h, x, y);
            this.bgSrc = bgSrc;
        }

    }