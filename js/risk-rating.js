
function getTotalLMH(score) {
  var v = {
    "LOWLOW" : "NOTE",
    "LOWMEDIUM" : "LOW",
    "LOWHIGH" : "MEDIUM",
    "MEDIUMLOW" : "LOW",
    "MEDIUMMEDIUM" : "MEDIUM",
    "MEDIUMHIGH" : "HIGH",
    "HIGHLOW" : "MEDIUM",
    "HIGHMEDIUM" : "HIGH",
    "HIGHHIGH" : "CRITICAL",
  }
  return v[score];
}

function getLMH(score) {
  if (score < 3) {
    return "LOW";
  } else if (score < 6) {
    return "MEDIUM";
  } else {
    return "HIGH";
  }
}

function registerTotalListener() {
  $(".c").click(function(e){
    var v = "";
    var elts = $(".c-lmh");
    for (var j = 0; j < elts.length; j++) {
      v += elts[j].innerHTML;
    }
    var lmh = getTotalLMH(v);
    $("#c").text(lmh);
    $("#c").attr("class", "is-"+lmh);
  })
}
registerTotalListener();

var level1 = [ "c1", "c2"];

function registerLevel1Listener(c) {
  $("."+c).click(function(e){
    var v = 0;
    var elts = $("."+c);
    for (var j = 0; j < elts.length; j++) {
      v += Number(elts[j].innerHTML);
    }
    var score = v/j;
    $("#"+c).text(score);
    var lmh = getLMH(score);
    $("#"+c+"-lmh").text(lmh);
    $("#"+c+"-lmh").parent().attr("class", "is-"+lmh);
    $("#"+c).trigger("click");
  })
}

// register listeners
for (var i=0; i < level1.length; i++) {
  registerLevel1Listener(level1[i]);
}

var level2 = [ "c1-1", "c1-2", "c2-1", "c2-2" ];

function registerLevel2Listener(c) {
  $("."+c).change(function(e){
    var v = 0;
    var elts = $("."+c);
    for (var j = 0; j < elts.length; j++) {
      v += Number(elts[j].value);
    }
    var score = v/j;
    $("#"+c).text(score);
    var lmh = getLMH(score);
    $("#"+c+"-lmh").text(lmh);
    $("#"+c+"-lmh")./*parent().*/attr("class", "is-"+lmh);
    $("#"+c).trigger("click");
  })
}

// register listeners
for (var i=0; i < level2.length; i++) {
  registerLevel2Listener(level2[i]);
}
// initialize displayed ratings
for (var i=0; i < level2.length; i++) {
  $("."+level2[i]).trigger("change");
}


