var d3_flavour =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.chart = exports.transformData = undefined;
	
	var _range = __webpack_require__(2);
	
	var _merge = __webpack_require__(3);
	
	var defaultOptions = {
	    depth: 5,
	    flavours: ['Malty', 'Sour', 'Floral', 'Fruit', 'Sweet', 'Smooth', 'Bitter', 'Hoppy'],
	    thickness: 0.1,
	    bgColor: '#fff',
	    fgColor1: '#ccc',
	    fgColor2: '#666',
	    fgColor3: 'orange',
	    color: '#888'
	};
	
	var _getId = function _getId(id, i) {
	    var d = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
	    return id + '_a_' + i + '_' + d;
	};
	
	var _getIdSelector = function _getIdSelector(id, i) {
	    var d = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
	    return '#' + _getId(id, i, d);
	};
	
	var _getColor = function _getColor(datum, d, options, width) {
	    return options.depth - datum <= d ? options.fgColor2 : options.fgColor1;
	};
	
	var _getArcForFlavourAndDepth = function _getArcForFlavourAndDepth(f, d, width, options) {
	    // Number of segments
	    var n = options.flavours.length;
	    // Segment length
	    var s = Math.PI * 2 / n;
	    // Start angle
	    var s_a = f * s;
	    // End angle
	    var e_a = (f + 1) * s;
	    return d3.svg.arc().innerRadius(width / 2 * (1 - (d + 1) * options.thickness)).outerRadius(width / 2 * (1 - options.thickness - (d + 1) * options.thickness)).startAngle(s_a).endAngle(e_a);
	};
	
	var _draw = function _draw(svg, id, data, width, height, options) {
	    var c = svg.selectAll('.flavour-arc').data(data);
	
	    var g = c.enter().append('g').attr('class', '.flavour-arc');
	
	    c.exit().remove();
	
	    g.append(function (datum, i) {
	        var sg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'g'));
	
	        (0, _range.range)(options.depth).forEach(function (d) {
	            sg.append('path').attr('d', _getArcForFlavourAndDepth(i, d, width, options)).attr('transform', 'translate(' + width / 2 + ',' + width / 2 + ')').attr('fill', _getColor(datum, d, options, width)).attr('stroke-width', width / 60).attr('stroke', options.bgColor).attr('id', _getId(id, i, d)).style('cursor', 'pointer').on('mouseover', function () {
	                d3.select(_getIdSelector(id, i, d)).transition().ease('elastic').duration(300).attr('fill', options.fgColor3);
	            }).on('mouseout', function () {
	                d3.select(_getIdSelector(id, i, d)).transition().ease('quad').duration(100).attr('fill', _getColor(datum, d, options, width));
	            }).on('click', function () {
	                var newData = data.slice(0);
	
	                newData[i] = options.depth - d;
	                if (newData[i] === data[i]) {
	                    newData[i] = 0;
	                }
	
	                if (typeof options.callback === 'function') {
	                    options.callback(newData);
	                }
	
	                c.selectAll("*").remove();
	
	                _draw(svg, id, newData, width, height, options);
	            });
	        });
	
	        var t = sg.append('text').attr('x', 0).attr('dy', -width / 90).style('font-size', width / 20 + 'px').style('font-family', 'Verdana').style("text-anchor", "middle");
	
	        t.append('textPath').attr('fill', options.color).attr('xlink:href', _getIdSelector(id, i)).attr("startOffset", "20%").text(options.flavours[i]);
	
	        return sg.node();
	    });
	};
	
	var transformData = exports.transformData = function transformData(data) {
	    return Object.keys(data).map(function (key) {
	        return data[key];
	    });
	};
	
	var chart = exports.chart = function chart(id, data) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? defaultOptions : arguments[2];
	
	    var opts = (0, _merge.merge)(defaultOptions, options);
	    var base = d3.select('#' + id);
	    var width = base.node().getBoundingClientRect().width;
	    var height = base.node().getBoundingClientRect().height;
	    var svg = base.append("svg").attr("width", width).attr("height", height);
	    _draw(svg, id, data, width, height, opts);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var range = exports.range = function range(n) {
	    return Array.from(Array(n).keys());
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var merge = exports.merge = function merge(obj1, obj2) {
	    var obj3 = {};
	    for (var attrname in obj1) {
	        obj3[attrname] = obj1[attrname];
	    }
	    for (var _attrname in obj2) {
	        obj3[_attrname] = obj2[_attrname];
	    }
	    return obj3;
	};

/***/ }
/******/ ]);
//# sourceMappingURL=d3-flavour.js.map