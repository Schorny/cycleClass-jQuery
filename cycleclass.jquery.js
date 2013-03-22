/*!
 * cycleClass jQuery Plugin
 * https://github.com/Schorny/cycleClass-jQuery
 *
 * Copyright 2013, Toni Schornboeck <toni.schornboeck@gmail.com>
 *
 * Released unter the MIT License
 * http://opensource.org/licenses/MIT
 */
(function($) {
    //TODO: think about "use strict" - jQuery does not use it because of compatibility problems...

    //sanitize this.className to allow for a faster hasClass
    //we replace \t\r\n with a normal blank, so we can use indexOf for classname lookup
    var sanitizeClassName = function(className) {
        return (" "+className+" ").replace(/[\t\r\n]/g, " ");
    };

    //faster than jQuery.hasClass because we assume elementClassName is sanitized
    var fastHasClass = function(elementClassName, thisClass) {
        return elementClassName.indexOf(" "+thisClass+" ")>=0;
    };

    //reverse the array and copy it in one step
    //may need performance testing
    //http://www.scottlogic.co.uk/2010/10/javascript-array-performance/
    //says [] assign is faster than .push
    var arrayReverseCopy = function(array) {
        var result=[];
        var length=array.length;
        for(var i=length-1; i>=0; --i) {
            result[length-i-1]=array[i];
        }
        return result;
    };

    /**
     * Cycles through a list of classes
     *
     * @param {Array} classList array of classnames
     * @param {Object} [options] options object
     * @config {Boolean} [backwards] set to true if you want to cycle backwards
     * @config {Integer} [toIndex] doesn't cycle to the next class, but cycles to the toIndex class in the classList
     * @config {Function} [onRoundTrip] callback function if a round trip happens, receives the element as only argument
     * @config {Function} [transition] callback function, called with 3 arguments (this element, old class, new class) which is responsible for the transition between the classes (cycleClass won't change classes if transition is set, this is tranisition's responsibility)
     * @return this
     */
    $.fn.cycleClass = function(classList, options) {
        options = options || {};
        if(options.backwards) {
            classList = arrayReverseCopy(classList);
        }
        //TODO: test if its faster to sanitize classList

        var classCount = classList.length;

        return this.each(function() {
            //abort if this is not an ELEMENT_NODE
            if(this.nodeType !== 1) return;
            var className = sanitizeClassName(this.className);

            //start with -1 so the next element is always pos+1
            var pos=-1;
            for(var i=0; i<classCount; ++i) {
                if(fastHasClass(className, classList[i])) {
                    pos=i;
                    break;
                }
            }

            //only remove class if a class was found
            var cur="";
            if(pos!==-1) {
                cur = classList[pos];
                className=className.replace(" "+cur+" ", " ");
            }

            //get next element, beware of round trips
            var next="";
            if(options.toIndex === undefined) {
                next = classList[(pos+1)%classCount];
            } else {
                next = classList[options.toIndex];
            }

            //be tricky and put next as first classname for faster retrieval next time
            className=next+" "+className;

            //commit classname changes
            //if transition, then classname change is done by transition function
            if(options.transition) {
                options.transition(this, cur, next);
            } else {
                this.className = $.trim(className);
            }

            if(options.onRoundTrip) {
                if(pos===classCount-1) {
                    options.onRoundTrip(this);
                }
            }
        });
    };
})(jQuery);