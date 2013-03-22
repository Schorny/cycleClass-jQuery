
function testClasses($elem, expected, notexpected) {
    for(var clazz in expected) {
        clazz=expected[clazz];
        if(!$elem.hasClass(clazz)) {
            console.log("$elem doesn't have expected class "+clazz);
            return false;
        }
    }

    for(var clazz in notexpected) {
        clazz=notexpected[clazz];
        if($elem.hasClass(clazz)) {
            console.log("$elem has notexpected class "+clazz);
            return false;
        }
    }

    return true;
}

test("one step forward", function() {
    var $elem=$("<div class='one'></div>");
    var classList=["one", "two", "three"];

    ok(testClasses($elem, ["one"], ["two", "three"]), "setup");
    $elem.cycleClass(classList);
    ok(testClasses($elem, ["two"], ["one", "three"]), "first step");
});

test("one step backward", function() {
    var $elem=$("<div class='two'></div>");
    var classList=["one", "two", "three"];
    var config={
        backwards: true
    };

    ok(testClasses($elem, ["two"], ["one", "three"]), "setup");
    $elem.cycleClass(classList, config);
    ok(testClasses($elem, ["one"], ["two", "three"]), "first step");
});

test("roundtrip forward", function() {
    var $elem=$("<div class='one'></div>");
    var classList=["one", "two", "three"];

    var expectRoundtrip=false;

    var config={
        onRoundTrip: function() {
            ok(expectRoundtrip, "round trip");
            expectRoundtrip=false;
        }
    };

    ok(testClasses($elem, ["one"], ["two", "three"]), "setup");
    $elem.cycleClass(classList, config);
    ok(testClasses($elem, ["two"], ["one", "three"]), "first step");
    $elem.cycleClass(classList, config);
    ok(testClasses($elem, ["three"], ["one", "two"]), "second step");

    expectRoundtrip=true;

    $elem.cycleClass(classList, config);
    ok(testClasses($elem, ["one"], ["two", "three"]), "third step");
    ok(expectRoundtrip===false, "roundtrip not done");
});

test("roundtrip backward", function() {
    var $elem=$("<div class='three'></div>");
    var classList=["one", "two", "three"];

    var expectRoundtrip=false;

    var config={
        onRoundTrip: function() {
            ok(expectRoundtrip, "round trip");
            expectRoundtrip=false;
        },
        backwards: true
    };

    ok(testClasses($elem, ["three"], ["one", "two"]), "setup");
    $elem.cycleClass(classList, config);
    ok(testClasses($elem, ["two"], ["one", "three"]), "first step");
    $elem.cycleClass(classList, config);
    ok(testClasses($elem, ["one"], ["two", "three"]), "second step");

    expectRoundtrip=true;

    $elem.cycleClass(classList, config);
    ok(testClasses($elem, ["three"], ["one", "two"]), "third step");
    ok(expectRoundtrip===false, "roundtrip not done");
});

test("add missing class on forward step", function() {
    var $elem=$("<div class=''></div>");
    var classList=["one", "two", "three"];

    ok(testClasses($elem, [], ["one", "two", "three"]), "setup");
    $elem.cycleClass(classList);
    ok(testClasses($elem, ["one"], ["two", "three"]), "first step");
});

test("add missing class on backward step", function() {
    var $elem=$("<div class=''></div>");
    var classList=["one", "two", "three"];

    var config={
        backwards: true
    };

    ok(testClasses($elem, [], ["one", "two", "three"]), "setup");
    $elem.cycleClass(classList, config);
    ok(testClasses($elem, ["three"], ["one", "two"]), "first step");
});

test("correct roundtrip parameter", function() {
    expect(1);
    var $elem=$("<div class='one' data-foo='bar'></div>");
    var classList=["one", "two", "three"];
    var config={
        onRoundTrip: function(e) {
            ok($(e).data("foo")==="bar", "round trip");
        }
    };

    $elem.cycleClass(classList, config);
    $elem.cycleClass(classList, config);
    $elem.cycleClass(classList, config);
});

test("don't remove other classes", function() {
    var $elem=$("<div class='other one'></div>");
    var classList=["one", "two", "three"];

    ok(testClasses($elem, ["one", "other"], ["two", "three"]), "setup");
    $elem.cycleClass(classList);
    ok(testClasses($elem, ["two", "other"], ["one", "three"]), "first step");
});

test("don't remove partial class names", function() {
    var $elem=$("<div class='one oneone'></div>");
    var classList=["one", "two", "three"];

    ok(testClasses($elem, ["one", "oneone"], ["two", "three"]), "setup");
    $elem.cycleClass(classList);
    ok(testClasses($elem, ["two", "oneone"], ["one", "three"]), "first step");
});

test("transition call", function() {
    var $elem=$("<div class='one'></div>");
    var classList=["one", "two", "three"];

    var transitionCalled=false;

    var config={
        transition:function() { ok(transitionCalled===false, "transition call"); transitionCalled=true; }
    };

    ok(testClasses($elem, ["one"], ["two", "three"]), "setup");
    $elem.cycleClass(classList, config);
    ok(testClasses($elem, ["one"], ["two", "three"]), "first step");

    ok(transitionCalled===true, "transition called");
});

test("correct transition parameter", function() {
    var $elem=$("<div class='one' data-dings='dangs'></div>");
    var classList=["one", "two", "three"];

    var config={
        transition:function(e, oldClass, newClass) {
            ok($(e).data("dings")==="dangs", "element parameter");
            ok(oldClass==="one", "old class parameter");
            ok(newClass==="two", "new class parameter");
        }
    };

    ok(testClasses($elem, ["one"], ["two", "three"]), "setup");
    $elem.cycleClass(classList, config);
    ok(testClasses($elem, ["one"], ["two", "three"]), "first step");
});

test("jump to index", function() {
    var $elem=$("<div class='one'></div>");
    var classList=["one", "two", "three"];
    var config={
        toIndex: 2
    };

    ok(testClasses($elem, ["one"], ["two", "three"]), "setup");
    $elem.cycleClass(classList, config);
    ok(testClasses($elem, ["three"], ["one", "two"]), "first step");
});