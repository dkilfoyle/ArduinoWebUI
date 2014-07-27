(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function r(r){return null!=r&&""!==r}function n(e){return Array.isArray(e)?e.map(n).filter(r).join(" "):e}var e={};return e.merge=function t(n,e){if(1===arguments.length){for(var a=n[0],s=1;s<n.length;s++)a=t(a,n[s]);return a}var i=n["class"],l=e["class"];(i||l)&&(i=i||[],l=l||[],Array.isArray(i)||(i=[i]),Array.isArray(l)||(l=[l]),n["class"]=i.concat(l).filter(r));for(var o in e)"class"!=o&&(n[o]=e[o]);return n},e.joinClasses=n,e.cls=function(r,t){for(var a=[],s=0;s<r.length;s++)a.push(t&&t[s]?e.escape(n([r[s]])):n(r[s]));var i=n(a);return i.length?' class="'+i+'"':""},e.attr=function(r,n,t,a){return"boolean"==typeof n||null==n?n?" "+(a?r:r+'="'+r+'"'):"":0==r.indexOf("data")&&"string"!=typeof n?" "+r+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'":t?" "+r+'="'+e.escape(n)+'"':" "+r+'="'+n+'"'},e.attrs=function(r,t){var a=[],s=Object.keys(r);if(s.length)for(var i=0;i<s.length;++i){var l=s[i],o=r[l];"class"==l?(o=n(o))&&a.push(" "+l+'="'+o+'"'):a.push(e.attr(l,o,!1,t))}return a.join("")},e.escape=function(r){var n=String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+r?r:n},e.rethrow=function a(r,n,e,t){if(!(r instanceof Error))throw r;if(!("undefined"==typeof window&&n||t))throw r.message+=" on line "+e,r;try{t=t||require("fs").readFileSync(n,"utf8")}catch(s){a(r,null,e)}var i=3,l=t.split("\n"),o=Math.max(e-i,0),c=Math.min(l.length,e+i),i=l.slice(o,c).map(function(r,n){var t=n+o+1;return(t==e?"  > ":"    ")+t+"| "+r}).join("\n");throw r.path=n,r.message=(n||"Jade")+":"+e+"\n"+i+"\n\n"+r.message,r},e}();

    var templatizer = {};


    // arduino.jade compiled template
    templatizer["arduino"] = function tmpl_arduino(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(webtitle, pagetitle) {
            buf.push('<!DOCTYPE html><html><head><meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' + jade.escape(null == (jade_interp = webtitle) ? "" : jade_interp) + '</title><!-- Stylesheets--><link href="css/bootstrap.min.css" rel="stylesheet"><link href="font-awesome/css/font-awesome.css" rel="stylesheet"><link href="css/sb-admin.css" rel="stylesheet"><!-- scripts--><script src="js/jquery-1.10.2.js"></script><script src="js/bootstrap.min.js"></script><script src="js/plugins/metisMenu/jquery.metisMenu.js"></script><script src="js/sb-admin.js"></script><script src="http://localhost:8080/socket.io/socket.io.js"></script><script src="js/smoothie.js"></script><script src="js/mytemplates.js"></script><script src="js/segment-display.js"></script><script src="js/raphael.2.1.0.min.js"></script><script src="js/justgage.js"></script><script>var pings = {};\nvar sensors = {};\n\nNumber.prototype.pad = function(size) {\n    var s = String(this);\n    if(typeof(size) !== "number"){size = 2;}\n    while (s.length < size) {s = " " + s;}\n    return s;\n}\n\n$(document).ready(function() {\n\n    // websocket setup\n    socket = io.connect(\'http://localhost\', {\n        port: 8080\n    });\n    \n    // PING related code\n    \n    socket.on(\'distance\', function (e) {\n        pings[e.name].timeseries.append(new Date().getTime(), e.distance);\n        pings[e.name].digits.setValue(Math.round(e.distance).pad(3));   \n    });\n    \n    $("#showNewPingSensor").click(function() {\n        $("#newPingSensor").show("slow");\n    });\n    \n    $("#closeNewPingSensor").click(function() {\n        $("#newPingSensor").hide();\n    });\n    \n    $("#pingAdd").click(function() {\n    \n        display = new SegmentDisplay($("#pingName").val() + "-digits");\n              display.pattern         = "###";\n              display.displayAngle    = 6;\n              display.digitHeight     = 19.5;\n              display.digitWidth      = 13;\n              display.digitDistance   = 2.5;\n              display.segmentWidth    = 2.4;\n              display.segmentDistance = 0.3;\n              display.segmentCount    = 7;\n              display.cornerType      = 3;\n              display.colorOn         = "#24dd22";\n              display.colorOff        = "#1b3a05";\n              display.draw();\n              \n        var newping = { \n            pin: $("#pingPin").val(),\n            freq: $("#pingFreq").val(),\n            name: $("#pingName").val(),\n            smoothie: new SmoothieChart({maxValue:220, minValue:0}),\n            timeseries: new TimeSeries(),\n            digits: display\n            };\n            \n        socket.emit("pingAdd", { pin: newping.pin, freq: newping.freq, name: newping.name });\n        \n        $("div.col-lg-8").append(templatizer.panelmixins.canvaspanel(newping.name, {"Close": "close"+newping.name}, newping.name));\n        \n        $("#close"+newping.name).click(function() {\n            $("#"+newping.name+"-panel").remove();\n        });\n        \n        newping.smoothie.streamTo(document.getElementById(newping.name+"-canvas"));\n        $("#"+newping.name+"-canvas")[0].width = $("#"+newping.name+"-div").width();\n        newping.smoothie.addTimeSeries(newping.timeseries, {lineWidth:2,strokeStyle:\'#00ff00\'}); \n        \n        pings[newping.name] = newping;\n        \n    });\n    \n    // POT related code\n    \n    socket.on(\'sensorReading\', function (e) {\n        sensors[e.name].gage.refresh(e.value);\n    });\n    \n    $("#showNewPotSensor").click(function() {\n        $("#newPotSensor").show("slow");\n    });\n    \n    $("#closeNewPotSensor").click(function() {\n        $("#newPotSensor").hide();\n    });\n    \n    $("#potAdd").click(function() {\n    \n        var potName = $("#potName").val();\n        \n        // Create new pot dash panel\n        $("div.col-lg-8").append(templatizer.panelmixins.gagepanel(potName, {"Close": "close"+potName}, potName));\n        $("#close"+potName).click(function() {\n            $("#"+potName+"-panel").remove();\n        });\n        \n        var gage = new JustGage({\n            parentNode: potName+"-div",\n            min: 0,\n            max: 1024,\n            title: "Pin"\n        });\n        \n        var newpot = { \n            pin: $("#potPin").val(),\n            name: $("#potName").val(),\n            gage: gage\n        };\n        \n        socket.emit("sensorAdd", { pin: newpot.pin, name: newpot.name, freq: newpot.freq });               \n        \n        sensors[newpot.name] = newpot;\n        \n    });          \n    \n    \n    // Connection related code\n    \n    // Populate the com ports in the connect arduino panel\n    $.getJSON("/admin/comports", function(result) {\n        var options = $("#arduinoCOMPort")\n        $.each(result, function() {\n            options.append($("<option />").text(this.comName));\n            });\n        });\n        \n    socket.on(\'arduinoConnected\', function() {\n        $("#arduinoConnect").text("Disconnect");\n        $("#arduinoConnect").removeClass("btn-warning").addClass("btn-danger");\n    });\n    \n    $("#arduinoConnect").click(function() {\n        if ($(this).text() == "Connect") {\n            socket.emit("arduinoConnect", { port: $("#arduinoCOMPort").val() } );\n            $("#arduinoConnect").text("Connecting...");\n            $("#arduinoConnect").removeClass("btn-success").addClass("btn-warning");\n        }\n        else {\n            socket.emit("arduinoDisConnect");\n            $("#arduinoConnect").text("Not implemented");\n        }\n    });\n    \n    \n});\n\n</script></head><body><div id="wrapper"><!-- header and sidebar navigation--><nav role="navigation" style="margin-bottom: 0" class="navbar navbar-default navbar-fixed-top"><!-- top left navbar header--><div class="navbar-header"><button type="button" data-toggle="collapse" data-target=".sidebar-collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="index.html" class="navbar-brand">' + jade.escape(null == (jade_interp = webtitle) ? "" : jade_interp) + '</a></div><!-- top right navbar links--><ul class="nav navbar-top-links navbar-right"><li class="dropdown"><a data-toggle="dropdown" href="#" class="dropdown-toggle"><i class="fa fa-user fa-fw"></i><i class="fa fa-caret-down"></i></a><ul class="dropdown-menu dropdown-user">');
            buf.push(templatizer["arduino"]["menuitem"]("User Profile", "#", "fa-user"));
            buf.push(templatizer["arduino"]["menuitem"]("Settings", "#", "fa-gear"));
            buf.push('<li class="divider"></li>');
            buf.push(templatizer["arduino"]["menuitem"]("Logout", "#", "fa-sign-out"));
            buf.push('</ul></li></ul><!-- sidebar navigation--><div role="navigation" class="navbar-default navbar-static-side"><div class="sidebar-collapse"><ul id="side-menu" class="nav"><li class="sidebar-search"><div class="input-group custom-search-form"><input type="text" placeholder="Search..." class="form-control"><span class="input-group-btn"><button type="button" class="btn btn-default"><i class="fa fa-search"></i></button></span></div></li>');
            buf.push(templatizer["arduino"]["menuitem"]("    Dashboard", "#"));
            buf.push(templatizer["arduino"]["submenu"].call({
                block: function(buf) {
                    buf.push(templatizer["arduino"]["menuitem"]("    Ping", "#", "showNewPingSensor"));
                    buf.push(templatizer["arduino"]["menuitem"]("    Pot", "#", "showNewPotSensor"));
                }
            }, "    Sensors", "fa-bar-chart-o"));
            buf.push('</ul></div></div></nav><!-- panel layouts--><div id="page-wrapper"><div class="row"><div class="col-lg-12"><h1 class="page-header">' + jade.escape(null == (jade_interp = pagetitle) ? "" : jade_interp) + '</h1></div></div><div class="row"><div class="col-lg-8">');
            buf.push(templatizer["arduino"]["panel"].call({
                block: function(buf) {
                    buf.push('<div class="form-inline"><div class="form-group"><select id="arduinoCOMPort" class="form-control"></select></div><div class="form-group"><button id="arduinoConnect" class="btn btn-success">Connect</button></div></div>');
                }
            }, "   Arduino"));
            buf.push('</div><div class="col-lg-4">');
            buf.push(templatizer["arduino"]["panel"].call({
                block: function(buf) {
                    buf.push('<form role="form" class="form-horizontal"><div class="form-group"><label class="col-sm-2 control-label">Name:</label><div class="col-sm-10"><input id="pingName" value="HC-SR04" class="form-control"></div></div><div class="form-group"><label class="col-sm-2 control-label">Pin:</label><div class="col-sm-10"><select id="pingPin" class="form-control">');
                    (function() {
                        var $obj = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
                        if ("number" == typeof $obj.length) {
                            for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                var val = $obj[$index];
                                buf.push("<option>" + jade.escape(null == (jade_interp = val) ? "" : jade_interp) + "</option>");
                            }
                        } else {
                            var $l = 0;
                            for (var $index in $obj) {
                                $l++;
                                var val = $obj[$index];
                                buf.push("<option>" + jade.escape(null == (jade_interp = val) ? "" : jade_interp) + "</option>");
                            }
                        }
                    }).call(this);
                    buf.push('</select></div></div><div class="form-group"><label class="col-sm-2 control-label">Freq:</label><div class="col-sm-10"><input id="pingFreq" value="100" class="form-control"></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><button id="pingAdd" class="btn btn-default">Add</button></div></div></form>');
                },
                attributes: {
                    id: "newPingSensor",
                    hidden: true
                }
            }, "   New Ping", {
                "Close Panel": "closeNewPingSensor"
            }));
            buf.push(templatizer["arduino"]["panel"].call({
                block: function(buf) {
                    buf.push('<form role="form" class="form-horizontal"><div class="form-group"><label class="col-sm-2 control-label">Name:</label><div class="col-sm-10"><input id="potName" value="mypot" class="form-control"></div></div><div class="form-group"><label class="col-sm-2 control-label">Pin:</label><div class="col-sm-10"><select id="potPin" class="form-control">');
                    (function() {
                        var $obj = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
                        if ("number" == typeof $obj.length) {
                            for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                var val = $obj[$index];
                                buf.push("<option>" + jade.escape(null == (jade_interp = val) ? "" : jade_interp) + "</option>");
                            }
                        } else {
                            var $l = 0;
                            for (var $index in $obj) {
                                $l++;
                                var val = $obj[$index];
                                buf.push("<option>" + jade.escape(null == (jade_interp = val) ? "" : jade_interp) + "</option>");
                            }
                        }
                    }).call(this);
                    buf.push('<option>A0</option><option>A1</option><option>A2</option><option>A3</option><option>A4</option><option>A5</option></select></div></div><div class="form-group"><label class="col-sm-2 control-label">Freq:</label><div class="col-sm-10"><input id="pingFreq" value="100" class="form-control"></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><button id="potAdd" class="btn btn-default">Add</button></div></div></form>');
                },
                attributes: {
                    id: "newPotSensor",
                    hidden: true
                }
            }, "   New Pot", {
                "Close Panel": "closeNewPotSensor"
            }));
            buf.push("</div></div></div></div></body></html>");
        })("webtitle" in locals_for_with ? locals_for_with.webtitle : typeof webtitle !== "undefined" ? webtitle : undefined, "pagetitle" in locals_for_with ? locals_for_with.pagetitle : typeof pagetitle !== "undefined" ? pagetitle : undefined);
        return buf.join("");
    };

    // arduino.jade:submenu compiled template
    templatizer["arduino"]["submenu"] = function tmpl_arduino_submenu(name, icon) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<li><a href="#">');
        if (icon) {
            buf.push("<i" + jade.cls([ "fa " + icon + " fa-fw" ], [ true ]) + "></i>");
        } else {
            buf.push('<i class="fa fa-dashboard fa-fw"></i>');
        }
        buf.push(jade.escape(null == (jade_interp = name) ? "" : jade_interp) + '<span class="fa arrow"></span></a><ul class="nav nav-second-level">');
        block && block(buf);
        buf.push("<k></k></ul></li>");
        return buf.join("");
    };


    // arduino.jade:menuitem compiled template
    templatizer["arduino"]["menuitem"] = function tmpl_arduino_menuitem(name, link, myid, icon) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push("<li><a" + jade.attr("href", "" + link + "", true, false) + jade.attr("id", myid, true, false) + ">");
        if (icon) {
            buf.push("<i" + jade.cls([ "fa " + icon + " fa-fw" ], [ true ]) + "></i>");
        } else {
            buf.push('<i class="fa fa-dashboard fa-fw"></i>');
        }
        buf.push(jade.escape(null == (jade_interp = name) ? "" : jade_interp) + "</a></li>");
        return buf.join("");
    };


    // arduino.jade:panel compiled template
    templatizer["arduino"]["panel"] = function tmpl_arduino_panel(title, actions) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push("<div" + jade.attr("id", attributes.id, false, false) + jade.attr("hidden", attributes.hidden, false, false) + ' class="panel panel-default"><div class="panel-heading"><i class="fa fa-bar-chart-o fa-fw"></i>' + jade.escape(null == (jade_interp = title) ? "" : jade_interp));
        if (actions) {
            buf.push('<div class="pull-right"><div class="btn-group"><button type="button" data-toggle="dropdown" class="btn btn-default btn-xs dropdown-toggle">Actions<span class="caret"></span></button><ul role="menu" class="dropdown-menu pull-right">');
            (function() {
                var $obj = actions;
                if ("number" == typeof $obj.length) {
                    for (var key = 0, $l = $obj.length; key < $l; key++) {
                        var val = $obj[key];
                        buf.push("<li><a" + jade.attr("id", "" + val + "", true, false) + ' href="#">' + jade.escape((jade_interp = key) == null ? "" : jade_interp) + "</a></li>");
                    }
                } else {
                    var $l = 0;
                    for (var key in $obj) {
                        $l++;
                        var val = $obj[key];
                        buf.push("<li><a" + jade.attr("id", "" + val + "", true, false) + ' href="#">' + jade.escape((jade_interp = key) == null ? "" : jade_interp) + "</a></li>");
                    }
                }
            }).call(this);
            buf.push("</ul></div></div>");
        }
        buf.push('</div><div class="panel-body">');
        if (block) {
            block && block(buf);
        }
        buf.push("</div></div>");
        return buf.join("");
    };

    // error.jade compiled template
    templatizer["error"] = function tmpl_error(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(title, message, error) {
            buf.push("<!DOCTYPE html><html><head><title>" + jade.escape(null == (jade_interp = title) ? "" : jade_interp) + '</title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>' + jade.escape(null == (jade_interp = message) ? "" : jade_interp) + "</h1><h2>" + jade.escape(null == (jade_interp = error.status) ? "" : jade_interp) + "</h2><pre>" + jade.escape((jade_interp = error.stack) == null ? "" : jade_interp) + "</pre></body></html>");
        })("title" in locals_for_with ? locals_for_with.title : typeof title !== "undefined" ? title : undefined, "message" in locals_for_with ? locals_for_with.message : typeof message !== "undefined" ? message : undefined, "error" in locals_for_with ? locals_for_with.error : typeof error !== "undefined" ? error : undefined);
        return buf.join("");
    };

    // index.jade compiled template
    templatizer["index"] = function tmpl_index(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(title, distance) {
            buf.push("<!DOCTYPE html><html><head><title>" + jade.escape(null == (jade_interp = title) ? "" : jade_interp) + '</title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>' + jade.escape(null == (jade_interp = title) ? "" : jade_interp) + "</h1><p>Welcome to " + jade.escape((jade_interp = title) == null ? "" : jade_interp) + "</p><current>distance reading is " + jade.escape((jade_interp = distance) == null ? "" : jade_interp) + "</current></body></html>");
        })("title" in locals_for_with ? locals_for_with.title : typeof title !== "undefined" ? title : undefined, "distance" in locals_for_with ? locals_for_with.distance : typeof distance !== "undefined" ? distance : undefined);
        return buf.join("");
    };

    // layout-dash.jade compiled template
    templatizer["layout-dash"] = function tmpl_layout_dash(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(webtitle, pagetitle) {
            buf.push('<!DOCTYPE html><html><head><meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' + jade.escape(null == (jade_interp = webtitle) ? "" : jade_interp) + '</title><!-- Stylesheets--><link href="css/bootstrap.min.css" rel="stylesheet"><link href="font-awesome/css/font-awesome.css" rel="stylesheet"><link href="css/sb-admin.css" rel="stylesheet"><!-- scripts--><script src="js/jquery-1.10.2.js"></script><script src="js/bootstrap.min.js"></script><script src="js/plugins/metisMenu/jquery.metisMenu.js"></script><script src="js/sb-admin.js"></script></head><body><div id="wrapper"><!-- header and sidebar navigation--><nav role="navigation" style="margin-bottom: 0" class="navbar navbar-default navbar-fixed-top"><!-- top left navbar header--><div class="navbar-header"><button type="button" data-toggle="collapse" data-target=".sidebar-collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="index.html" class="navbar-brand">' + jade.escape(null == (jade_interp = webtitle) ? "" : jade_interp) + '</a></div><!-- top right navbar links--><ul class="nav navbar-top-links navbar-right"><li class="dropdown"><a data-toggle="dropdown" href="#" class="dropdown-toggle"><i class="fa fa-user fa-fw"></i><i class="fa fa-caret-down"></i></a><ul class="dropdown-menu dropdown-user"></ul></li></ul><!-- sidebar navigation--><div role="navigation" class="navbar-default navbar-static-side"><div class="sidebar-collapse"><ul id="side-menu" class="nav"><li class="sidebar-search"><div class="input-group custom-search-form"><input type="text" placeholder="Search..." class="form-control"><span class="input-group-btn"><button type="button" class="btn btn-default"><i class="fa fa-search"></i></button></span></div></li></ul></div></div></nav><!-- panel layouts--><div id="page-wrapper"><div class="row"><div class="col-lg-12"><h1 class="page-header">' + jade.escape(null == (jade_interp = pagetitle) ? "" : jade_interp) + '</h1></div></div><div class="row"><div class="col-lg-8"></div><div class="col-lg-4"></div></div></div></div></body></html>');
        })("webtitle" in locals_for_with ? locals_for_with.webtitle : typeof webtitle !== "undefined" ? webtitle : undefined, "pagetitle" in locals_for_with ? locals_for_with.pagetitle : typeof pagetitle !== "undefined" ? pagetitle : undefined);
        return buf.join("");
    };

    // layout.jade compiled template
    templatizer["layout"] = function tmpl_layout(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(title) {
            buf.push("<!DOCTYPE html><html><head><title>" + jade.escape(null == (jade_interp = title) ? "" : jade_interp) + '</title><link rel="stylesheet" href="/stylesheets/style.css"></head><body></body></html>');
        })("title" in locals_for_with ? locals_for_with.title : typeof title !== "undefined" ? title : undefined);
        return buf.join("");
    };

    // navmixins.jade compiled template
    templatizer["navmixins"] = function tmpl_navmixins(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        return buf.join("");
    };

    // panelmixins.jade compiled template
    templatizer["panelmixins"] = function tmpl_panelmixins(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        buf.push("<!-- need this to store the mixins-->");
        buf.push(templatizer["panelmixins"]["canvaspanel"]("Test", {}, "Test"));
        buf.push(templatizer["panelmixins"]["gagepanel"]("Test", {}, "Test"));
        return buf.join("");
    };

    // panelmixins.jade:panel compiled template
    templatizer["panelmixins"]["panel"] = function tmpl_panelmixins_panel(title, actions) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push("<div" + jade.attr("id", attributes.id, false, false) + jade.attr("hidden", attributes.hidden, false, false) + ' class="panel panel-default"><div class="panel-heading"><i class="fa fa-bar-chart-o fa-fw"></i>' + jade.escape(null == (jade_interp = title) ? "" : jade_interp));
        if (actions) {
            buf.push('<div class="pull-right"><div class="btn-group"><button type="button" data-toggle="dropdown" class="btn btn-default btn-xs dropdown-toggle">Actions<span class="caret"></span></button><ul role="menu" class="dropdown-menu pull-right">');
            (function() {
                var $obj = actions;
                if ("number" == typeof $obj.length) {
                    for (var key = 0, $l = $obj.length; key < $l; key++) {
                        var val = $obj[key];
                        buf.push("<li><a" + jade.attr("id", "" + val + "", true, false) + ' href="#">' + jade.escape((jade_interp = key) == null ? "" : jade_interp) + "</a></li>");
                    }
                } else {
                    var $l = 0;
                    for (var key in $obj) {
                        $l++;
                        var val = $obj[key];
                        buf.push("<li><a" + jade.attr("id", "" + val + "", true, false) + ' href="#">' + jade.escape((jade_interp = key) == null ? "" : jade_interp) + "</a></li>");
                    }
                }
            }).call(this);
            buf.push("</ul></div></div>");
        }
        buf.push('</div><div class="panel-body">');
        if (block) {
            block && block(buf);
        }
        buf.push("</div></div>");
        return buf.join("");
    };


    // panelmixins.jade:canvaspanel compiled template
    templatizer["panelmixins"]["canvaspanel"] = function tmpl_panelmixins_canvaspanel(title, actions, canvasid) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push(templatizer["panelmixins"]["panel"].call({
            block: function(buf) {
                buf.push("<canvas" + jade.attr("id", "" + canvasid + "-digits", true, false) + ' style="background: black" class="col-md-2"></canvas><div' + jade.attr("id", "" + canvasid + "-div", true, false) + "><canvas" + jade.attr("id", "" + canvasid + "-canvas", true, false) + ' class="col-md-10"></canvas></div>');
            },
            attributes: {
                id: jade.escape("" + canvasid + "-panel")
            }
        }, title, actions));
        return buf.join("");
    };


    // panelmixins.jade:gagepanel compiled template
    templatizer["panelmixins"]["gagepanel"] = function tmpl_panelmixins_gagepanel(title, actions, canvasid) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push(templatizer["panelmixins"]["panel"].call({
            block: function(buf) {
                buf.push("<div" + jade.attr("id", "" + canvasid + "-div", true, false) + ' style="height:150px;" class="col-md-2"></div>');
            },
            attributes: {
                id: jade.escape("" + canvasid + "-panel")
            }
        }, title, actions));
        return buf.join("");
    };

    return templatizer;
}));