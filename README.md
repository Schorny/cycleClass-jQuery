cycleClass.jQuery
=================
jQuery plugin to allow cycling through more classes than just 2 (like jQuery.toggleClass does).

Example
=================
```JavaScript
$elem = $("<div class='one'></div>");
$elem.cycleClass(["one", "two", "three"]);
//$elem has now class "two" and neither "one" nor "three"
```

Configuration
=================
cycleClass takes an array of classnames as first parameter. If none of the supplied classnames are set, the first one is set.

As second parameter cycleClass takes a config object with 4 possible options:
* backwards - a boolean. Default false. If true, the cycling is done backwards. Beware that it is much faster to use a pre-reversed array to cycle backwards than to let cycleClass reverse the array on each call
* onRoundTrip - a callback function taking the current element as only parameter. This callback is called everytime a round trip happens.
* transition - a callback function taking the current element, the old classname and the new classname as 3 parameters. this callback is responsible for changing the classes on the element and allows for transition effects to take place.
* toIndex - an integer. If toIndex is set, cycleClass does not cycle to the next class in the classList, but instead cycles to the class with the index toIndex. If toIndex is negative, the index is taken from the back.

Note: onRoundTrip is called after transition.


Project Structure
=================
All you need is `cycleclass.jquery.js` or `cycleclass.jquery.min.js`. It does not use much jQuery, therefore should work with any jQuery version. Only newest jQuery is supported though (tests are ran against newest jQuery).

In the directory `demo` you'll find a simple demo how it works. It's currently in german though.

In the directory `tests` you'll find all QUnit tests for cycleClass in the file `tests.js`.

Pretty simple, isn't it? ;)