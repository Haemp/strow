/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CommonStyles_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CommonStyles_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__CommonStyles_js__);

class Basement extends HTMLElement {

    constructor() {
        super();
        this.$ = this.attachShadow({ mode: 'open' });
        this.$.innerHTML = ` 
            <style>
                @import url('./basement.css')
            </style>
            <slot name="content"></slot>
        `;

        this.onClickWhenShown = e => {
            if (!this.isChildOfBasement(e)) {
                document.removeEventListener('click', this.onClickWhenShown);
                this.toggle();
            }
        };
    }

    toggle() {
        this.show = !this.show;
        var self = this;

        if (this.show) {

            // handle outside clicks to close
            document.addEventListener('click', this.onClickWhenShown);
        } else {
            document.removeEventListener('click', this.onClickWhenShown);
        }

        this.render();
    }

    isChildOfBasement(event) {
        return event.path.find(element => element === this);
    }

    render() {
        if (this.show) {
            this.classList.add('show');
            this.classList.remove('hide');
        } else {
            this.classList.add('hide');
            this.classList.remove('show');
        }
    }}




class BasementToggle extends HTMLElement {

    constructor() {
        super();
        this.$ = this.attachShadow({ mode: 'open' });
        this.$.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
                :host{
                    border-radius: 20px;
                    background-color: #333;
                    display: inline-block;
                    color: #fff;
                    padding: 6px;
                    cursor:pointer;
                    user-select: none;
                }
                i.material-icons{ font-size: 28px; }
                :host(:active){
                    background-color: #999;
                }
            </style>
            <i class="material-icons">list</i>
        `;
    }}


customElements.define('s-basement-toggle', BasementToggle);
customElements.define('s-basement', Basement);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(3);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class CommonStyles extends HTMLElement {

    constructor() {
        super();
        this.$shadyDom = true;
    }
    connectedCallback() {
        this.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
                @import url('./common-styles.css')
            </style>
        `;
    }}


customElements.define('s-common-styles', CommonStyles);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Basement__ = __webpack_require__(0);
// this imports the dropped file
// setup your component here...


// Set the custom element up programmatically.
// If you want to meddle with the HTML click that
// HTML Setup tab instead. 
const element = document.querySelector('s-basement-toggle');

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmY1OThmODMyODg1MzUwMDczZDEiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9oYWVtcC9wcm9qZWN0cy9zdHJpdmUvQmFzZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9oYWVtcC9wcm9qZWN0cy9zdHJpdmUvQ29tbW9uU3R5bGVzLmpzIiwid2VicGFjazovLy8vVXNlcnMvaGFlbXAvTGlicmFyeS9BcHBsaWNhdGlvbiBTdXBwb3J0L0VsZWN0cm9uL2RlZmluaXRpb25zL1VzZXJzL2hhZW1wL3Byb2plY3RzL3N0cml2ZS9CYXNlbWVudC5qcy9zdGFydHVwLmpzIl0sIm5hbWVzIjpbIkJhc2VtZW50IiwiSFRNTEVsZW1lbnQiLCJjb25zdHJ1Y3RvciIsIiQiLCJhdHRhY2hTaGFkb3ciLCJtb2RlIiwiaW5uZXJIVE1MIiwib25DbGlja1doZW5TaG93biIsImUiLCJpc0NoaWxkT2ZCYXNlbWVudCIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInRvZ2dsZSIsInNob3ciLCJzZWxmIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsImV2ZW50IiwicGF0aCIsImZpbmQiLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiQmFzZW1lbnRUb2dnbGUiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIkNvbW1vblN0eWxlcyIsIiRzaGFkeURvbSIsImNvbm5lY3RlZENhbGxiYWNrIiwicXVlcnlTZWxlY3RvciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzdEQTtBQUNBLE1BQU1BLFFBQU4sU0FBdUJDLFdBQXZCLENBQWtDOztBQUU5QkMsa0JBQWE7QUFDVDtBQUNBLGFBQUtDLENBQUwsR0FBUyxLQUFLQyxZQUFMLENBQWtCLEVBQUNDLE1BQU0sTUFBUCxFQUFsQixDQUFUO0FBQ0EsYUFBS0YsQ0FBTCxDQUFPRyxTQUFQLEdBQW9COzs7OztTQUFwQjs7QUFPQSxhQUFLQyxnQkFBTCxHQUF5QkMsQ0FBRCxJQUFPO0FBQzNCLGdCQUFHLENBQUMsS0FBS0MsaUJBQUwsQ0FBdUJELENBQXZCLENBQUosRUFBOEI7QUFDMUJFLHlCQUFTQyxtQkFBVCxDQUE2QixPQUE3QixFQUFzQyxLQUFLSixnQkFBM0M7QUFDQSxxQkFBS0ssTUFBTDtBQUNIO0FBQ0osU0FMRDtBQU1IOztBQUVEQSxhQUFRO0FBQ0osYUFBS0MsSUFBTCxHQUFZLENBQUMsS0FBS0EsSUFBbEI7QUFDQSxZQUFJQyxPQUFPLElBQVg7O0FBRUEsWUFBRyxLQUFLRCxJQUFSLEVBQWE7O0FBRVQ7QUFDQUgscUJBQVNLLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEtBQUtSLGdCQUF4QztBQUNILFNBSkQsTUFJSztBQUNERyxxQkFBU0MsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0MsS0FBS0osZ0JBQTNDO0FBQ0g7O0FBRUQsYUFBS1MsTUFBTDtBQUNIOztBQUVEUCxzQkFBa0JRLEtBQWxCLEVBQXdCO0FBQ3BCLGVBQU9BLE1BQU1DLElBQU4sQ0FBV0MsSUFBWCxDQUFnQkMsV0FBV0EsWUFBWSxJQUF2QyxDQUFQO0FBQ0g7O0FBRURKLGFBQVE7QUFDSixZQUFHLEtBQUtILElBQVIsRUFBYTtBQUNULGlCQUFLUSxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsTUFBbkI7QUFDQSxpQkFBS0QsU0FBTCxDQUFlRSxNQUFmLENBQXNCLE1BQXRCO0FBQ0gsU0FIRCxNQUdLO0FBQ0QsaUJBQUtGLFNBQUwsQ0FBZUMsR0FBZixDQUFtQixNQUFuQjtBQUNBLGlCQUFLRCxTQUFMLENBQWVFLE1BQWYsQ0FBc0IsTUFBdEI7QUFDSDtBQUNKLEtBL0M2Qjs7Ozs7QUFvRGxDLE1BQU1DLGNBQU4sU0FBNkJ2QixXQUE3QixDQUF3Qzs7QUFFcENDLGtCQUFhO0FBQ1Q7QUFDQSxhQUFLQyxDQUFMLEdBQVMsS0FBS0MsWUFBTCxDQUFrQixFQUFDQyxNQUFNLE1BQVAsRUFBbEIsQ0FBVDtBQUNBLGFBQUtGLENBQUwsQ0FBT0csU0FBUCxHQUFvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBQXBCO0FBbUJILEtBeEJtQzs7O0FBMkJ4Q21CLGVBQWVDLE1BQWYsQ0FBc0IsbUJBQXRCLEVBQTJDRixjQUEzQztBQUNBQyxlQUFlQyxNQUFmLENBQXNCLFlBQXRCLEVBQW9DMUIsUUFBcEMsRTs7Ozs7Ozs7Ozs7Ozs7QUNqRkEsTUFBTTJCLFlBQU4sU0FBMkIxQixXQUEzQixDQUFzQzs7QUFFbENDLGtCQUFhO0FBQ1Q7QUFDQSxhQUFLMEIsU0FBTCxHQUFpQixJQUFqQjtBQUNIO0FBQ0RDLHdCQUFtQjtBQUNmLGFBQUt2QixTQUFMLEdBQWtCOzs7OztTQUFsQjtBQU1ILEtBYmlDOzs7QUFnQnRDbUIsZUFBZUMsTUFBZixDQUFzQixpQkFBdEIsRUFBeUNDLFlBQXpDLEU7Ozs7Ozs7O0FDaEJBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU1QLFVBQVVWLFNBQVNvQixhQUFULENBQXVCLG1CQUF2QixDQUFoQixDIiwiZmlsZSI6IkJhc2VtZW50LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZmNTk4ZjgzMjg4NTM1MDA3M2QxIiwiaW1wb3J0ICcuL0NvbW1vblN0eWxlcy5qcydcbmNsYXNzIEJhc2VtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnR7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy4kID0gdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pXG4gICAgICAgIHRoaXMuJC5pbm5lckhUTUwgPSBgIFxuICAgICAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgICAgIEBpbXBvcnQgdXJsKCcuL2Jhc2VtZW50LmNzcycpXG4gICAgICAgICAgICA8L3N0eWxlPlxuICAgICAgICAgICAgPHNsb3QgbmFtZT1cImNvbnRlbnRcIj48L3Nsb3Q+XG4gICAgICAgIGA7XG5cbiAgICAgICAgdGhpcy5vbkNsaWNrV2hlblNob3duID0gKGUpID0+IHtcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzQ2hpbGRPZkJhc2VtZW50KGUpKXtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGlja1doZW5TaG93bilcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSAgXG5cbiAgICB0b2dnbGUoKXtcbiAgICAgICAgdGhpcy5zaG93ID0gIXRoaXMuc2hvdztcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmKHRoaXMuc2hvdyl7XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBvdXRzaWRlIGNsaWNrcyB0byBjbG9zZVxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2tXaGVuU2hvd24pICAgIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrV2hlblNob3duKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgfVxuXG4gICAgaXNDaGlsZE9mQmFzZW1lbnQoZXZlbnQpe1xuICAgICAgICByZXR1cm4gZXZlbnQucGF0aC5maW5kKGVsZW1lbnQgPT4gZWxlbWVudCA9PT0gdGhpcylcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgaWYodGhpcy5zaG93KXtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnc2hvdycpXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuY2xhc3MgQmFzZW1lbnRUb2dnbGUgZXh0ZW5kcyBIVE1MRWxlbWVudHtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuJCA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KVxuICAgICAgICB0aGlzLiQuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgICAgIEBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zJyk7XG4gICAgICAgICAgICAgICAgOmhvc3R7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDZweDtcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOnBvaW50ZXI7XG4gICAgICAgICAgICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpLm1hdGVyaWFsLWljb25zeyBmb250LXNpemU6IDI4cHg7IH1cbiAgICAgICAgICAgICAgICA6aG9zdCg6YWN0aXZlKXtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzk5OTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3N0eWxlPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmxpc3Q8L2k+XG4gICAgICAgIGBcbiAgICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgncy1iYXNlbWVudC10b2dnbGUnLCBCYXNlbWVudFRvZ2dsZSlcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgncy1iYXNlbWVudCcsIEJhc2VtZW50KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAvVXNlcnMvaGFlbXAvcHJvamVjdHMvc3RyaXZlL0Jhc2VtZW50LmpzIiwiY2xhc3MgQ29tbW9uU3R5bGVzIGV4dGVuZHMgSFRNTEVsZW1lbnR7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLiRzaGFkeURvbSA9IHRydWU7XG4gICAgfVxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCl7XG4gICAgICAgIHRoaXMuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgICAgIEBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zJyk7XG4gICAgICAgICAgICAgICAgQGltcG9ydCB1cmwoJy4vY29tbW9uLXN0eWxlcy5jc3MnKVxuICAgICAgICAgICAgPC9zdHlsZT5cbiAgICAgICAgYDtcbiAgICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgncy1jb21tb24tc3R5bGVzJywgQ29tbW9uU3R5bGVzKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC9Vc2Vycy9oYWVtcC9wcm9qZWN0cy9zdHJpdmUvQ29tbW9uU3R5bGVzLmpzIiwiLy8gdGhpcyBpbXBvcnRzIHRoZSBkcm9wcGVkIGZpbGVcbi8vIHNldHVwIHlvdXIgY29tcG9uZW50IGhlcmUuLi5cbmltcG9ydCBCYXNlbWVudCBmcm9tICcuL0Jhc2VtZW50JztcblxuLy8gU2V0IHRoZSBjdXN0b20gZWxlbWVudCB1cCBwcm9ncmFtbWF0aWNhbGx5LlxuLy8gSWYgeW91IHdhbnQgdG8gbWVkZGxlIHdpdGggdGhlIEhUTUwgY2xpY2sgdGhhdFxuLy8gSFRNTCBTZXR1cCB0YWIgaW5zdGVhZC4gXG5jb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcigncy1iYXNlbWVudC10b2dnbGUnKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gL1VzZXJzL2hhZW1wL0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9FbGVjdHJvbi9kZWZpbml0aW9ucy9Vc2Vycy9oYWVtcC9wcm9qZWN0cy9zdHJpdmUvQmFzZW1lbnQuanMvc3RhcnR1cC5qcyJdLCJzb3VyY2VSb290IjoiIn0=