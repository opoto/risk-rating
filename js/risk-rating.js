
// get parameter
var settings = window.location.hash
if (settings && (settings.length == 17)) {
  elts = $("select");
  for (var j = 0; j < elts.length; j++) {
    elts[j].value = settings.substr(j+1,1);
  }
}

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
    
    v = "";
    elts = $("select");
    for (var j = 0; j < elts.length; j++) {
      v += elts[j].value;
    }
    v = "#"+v
    $("#link").attr("href", v);
    window.location = v;
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

// ------------- Google analytics
var x = window.location.toString().indexOf("://opoto.github.io/risk-rating");
var gaid = ((x==4) || (x==5)) ?  'UA-83851302-1' : '';
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', gaid, 'auto');
ga('send', 'pageview');
