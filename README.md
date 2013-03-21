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

As second parameter cycleClass takes a config options with 2 possible options:
* backwards - a boolean. Default false. If true, the cycling is done backwards. Beware that it is much faster to use a pre-reversed array to cycle backwards than to let cycleClass reverse the array on each call
* onRoundTrip - a callback function taking the current element as only parameter. This callback is called everytime a round trip happens.

