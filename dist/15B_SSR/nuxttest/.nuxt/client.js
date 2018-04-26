'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var loadAsyncComponents = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(to, from, next) {
    var _this = this;

    var Components, startLoader, statusCode;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Check if route path changed (this._pathChanged), only if the page is not an error (for validate())
            this._pathChanged = !!app.nuxt.err || from.path !== to.path;
            this._queryChanged = JSON.stringify(to.query) !== JSON.stringify(from.query);
            this._diffQuery = this._queryChanged ? (0, _utils.getQueryDiff)(to.query, from.query) : [];

            if (this._pathChanged && this.$loading.start) {
              this.$loading.start();
            }

            _context.prev = 4;
            _context.next = 7;
            return (0, _utils.resolveRouteComponents)(to);

          case 7:
            Components = _context.sent;


            if (!this._pathChanged && this._queryChanged) {
              // Add a marker on each component that it needs to refresh or not
              startLoader = Components.some(function (Component) {
                var watchQuery = Component.options.watchQuery;
                if (watchQuery === true) return true;
                if (Array.isArray(watchQuery)) {
                  return watchQuery.some(function (key) {
                    return _this._diffQuery[key];
                  });
                }
                return false;
              });

              if (startLoader && this.$loading.start) {
                this.$loading.start();
              }
            }

            // Call next()
            next();
            _context.next = 19;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](4);

            _context.t0 = _context.t0 || {};
            statusCode = _context.t0.statusCode || _context.t0.status || _context.t0.response && _context.t0.response.status || 500;

            this.error({ statusCode: statusCode, message: _context.t0.message });
            this.$nuxt.$emit('routeChanged', to, from, _context.t0);
            next(false);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 12]]);
  }));

  return function loadAsyncComponents(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var render = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(to, from, next) {
    var _this4 = this;

    var nextCalled, _next, matches, Components, layout, _layout, isValid, _layout2;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(this._pathChanged === false && this._queryChanged === false)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt('return', next());

          case 2:

            // nextCalled is true when redirected
            nextCalled = false;

            _next = function _next(path) {
              if (from.path === path.path && _this4.$loading.finish) _this4.$loading.finish();
              if (from.path !== path.path && _this4.$loading.pause) _this4.$loading.pause();
              if (nextCalled) return;
              nextCalled = true;
              var matches = [];
              _lastPaths = (0, _utils.getMatchedComponents)(from, matches).map(function (Component, i) {
                return (0, _utils.compile)(from.matched[matches[i]].path)(from.params);
              });
              next(path);
            };

            // Update context


            _context3.next = 6;
            return (0, _utils.setContext)(app, {
              route: to,
              from: from,
              next: _next.bind(this)
            });

          case 6:
            this._dateLastError = app.nuxt.dateErr;
            this._hadError = !!app.nuxt.err;

            // Get route's matched components
            matches = [];
            Components = (0, _utils.getMatchedComponents)(to, matches);

            // If no Components matched, generate 404

            if (Components.length) {
              _context3.next = 24;
              break;
            }

            _context3.next = 13;
            return callMiddleware.call(this, Components, app.context);

          case 13:
            if (!nextCalled) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt('return');

          case 15:
            _context3.next = 17;
            return this.loadLayout(typeof _index.NuxtError.layout === 'function' ? _index.NuxtError.layout(app.context) : _index.NuxtError.layout);

          case 17:
            layout = _context3.sent;
            _context3.next = 20;
            return callMiddleware.call(this, Components, app.context, layout);

          case 20:
            if (!nextCalled) {
              _context3.next = 22;
              break;
            }

            return _context3.abrupt('return');

          case 22:
            // Show error page
            app.context.error({ statusCode: 404, message: 'This page could not be found' });
            return _context3.abrupt('return', next());

          case 24:

            // Update ._data and other properties if hot reloaded
            Components.forEach(function (Component) {
              if (Component._Ctor && Component._Ctor.options) {
                Component.options.asyncData = Component._Ctor.options.asyncData;
                Component.options.fetch = Component._Ctor.options.fetch;
              }
            });

            // Apply transitions
            this.setTransitions(mapTransitions(Components, to, from));

            _context3.prev = 26;
            _context3.next = 29;
            return callMiddleware.call(this, Components, app.context);

          case 29:
            if (!nextCalled) {
              _context3.next = 31;
              break;
            }

            return _context3.abrupt('return');

          case 31:
            if (!app.context._errored) {
              _context3.next = 33;
              break;
            }

            return _context3.abrupt('return', next());

          case 33:

            // Set layout
            _layout = Components[0].options.layout;

            if (typeof _layout === 'function') {
              _layout = _layout(app.context);
            }
            _context3.next = 37;
            return this.loadLayout(_layout);

          case 37:
            _layout = _context3.sent;
            _context3.next = 40;
            return callMiddleware.call(this, Components, app.context, _layout);

          case 40:
            if (!nextCalled) {
              _context3.next = 42;
              break;
            }

            return _context3.abrupt('return');

          case 42:
            if (!app.context._errored) {
              _context3.next = 44;
              break;
            }

            return _context3.abrupt('return', next());

          case 44:

            // Call .validate()
            isValid = true;

            Components.forEach(function (Component) {
              if (!isValid) return;
              if (typeof Component.options.validate !== 'function') return;
              isValid = Component.options.validate({
                params: to.params || {},
                query: to.query || {},
                store: store
              });
            });
            // ...If .validate() returned false

            if (isValid) {
              _context3.next = 49;
              break;
            }

            this.error({ statusCode: 404, message: 'This page could not be found' });
            return _context3.abrupt('return', next());

          case 49:
            _context3.next = 51;
            return Promise.all(Components.map(function (Component, i) {
              // Check if only children route changed
              Component._path = (0, _utils.compile)(to.matched[matches[i]].path)(to.params);
              Component._dataRefresh = false;
              // Check if Component need to be refreshed (call asyncData & fetch)
              // Only if its slug has changed or is watch query changes
              if (_this4._pathChanged && Component._path !== _lastPaths[i]) {
                Component._dataRefresh = true;
              } else if (!_this4._pathChanged && _this4._queryChanged) {
                var watchQuery = Component.options.watchQuery;
                if (watchQuery === true) {
                  Component._dataRefresh = true;
                } else if (Array.isArray(watchQuery)) {
                  Component._dataRefresh = watchQuery.some(function (key) {
                    return _this4._diffQuery[key];
                  });
                }
              }
              if (!_this4._hadError && _this4._isMounted && !Component._dataRefresh) {
                return Promise.resolve();
              }

              var promises = [];

              var hasAsyncData = Component.options.asyncData && typeof Component.options.asyncData === 'function';
              var hasFetch = !!Component.options.fetch;
              var loadingIncrease = hasAsyncData && hasFetch ? 30 : 45;

              // Call asyncData(context)
              if (hasAsyncData) {
                var promise = (0, _utils.promisify)(Component.options.asyncData, app.context).then(function (asyncDataResult) {
                  (0, _utils.applyAsyncData)(Component, asyncDataResult);
                  if (_this4.$loading.increase) _this4.$loading.increase(loadingIncrease);
                });
                promises.push(promise);
              }

              // Call fetch(context)
              if (hasFetch) {
                var p = Component.options.fetch(app.context);
                if (!p || !(p instanceof Promise) && typeof p.then !== 'function') {
                  p = Promise.resolve(p);
                }
                p.then(function (fetchResult) {
                  if (_this4.$loading.increase) _this4.$loading.increase(loadingIncrease);
                });
                promises.push(p);
              }

              return Promise.all(promises);
            }));

          case 51:

            // If not redirected
            if (!nextCalled) {
              if (this.$loading.finish) this.$loading.finish();
              _lastPaths = Components.map(function (Component, i) {
                return (0, _utils.compile)(to.matched[matches[i]].path)(to.params);
              });
              next();
            }

            _context3.next = 66;
            break;

          case 54:
            _context3.prev = 54;
            _context3.t0 = _context3['catch'](26);

            if (!_context3.t0) _context3.t0 = {};
            _lastPaths = [];
            _context3.t0.statusCode = _context3.t0.statusCode || _context3.t0.status || _context3.t0.response && _context3.t0.response.status || 500;

            // Load error layout
            _layout2 = _index.NuxtError.layout;

            if (typeof _layout2 === 'function') {
              _layout2 = _layout2(app.context);
            }
            _context3.next = 63;
            return this.loadLayout(_layout2);

          case 63:

            this.error(_context3.t0);
            this.$nuxt.$emit('routeChanged', to, from, _context3.t0);
            next(false);

          case 66:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[26, 54]]);
  }));

  return function render(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

// Fix components format in matched, it's due to code-splitting of vue-router


var mountApp = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(__app) {
    var Components, _app, layout, mount;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // Set global variables
            app = __app.app;
            router = __app.router;
            store = __app.store;

            // Resolve route components
            _context5.next = 5;
            return Promise.all(resolveComponents(router));

          case 5:
            Components = _context5.sent;


            // Create Vue instance
            _app = new _vue2.default(app);

            // Load layout

            layout = NUXT.layout || 'default';
            _context5.next = 10;
            return _app.loadLayout(layout);

          case 10:
            _app.setLayout(layout);

            // Mounts Vue app to DOM element

            mount = function mount() {
              _app.$mount('#__nuxt');

              // Listen for first Vue update
              _vue2.default.nextTick(function () {
                // Call window.onNuxtReady callbacks
                nuxtReady(_app);

                // Enable hot reloading
                hotReloadAPI(_app);
              });
            };

            // Enable transitions


            _app.setTransitions = _app.$options.nuxt.setTransitions.bind(_app);
            if (Components.length) {
              _app.setTransitions(mapTransitions(Components, router.currentRoute));
              _lastPaths = router.currentRoute.matched.map(function (route) {
                return (0, _utils.compile)(route.path)(router.currentRoute.params);
              });
            }

            // Initialize error handler
            _app.$loading = {}; // To avoid error while _app.$nuxt does not exist
            if (NUXT.error) _app.error(NUXT.error);

            // Add router hooks
            router.beforeEach(loadAsyncComponents.bind(_app));
            router.beforeEach(render.bind(_app));
            router.afterEach(normalizeComponents);
            router.afterEach(fixPrepatch.bind(_app));

            // If page already is server rendered

            if (!NUXT.serverRendered) {
              _context5.next = 23;
              break;
            }

            mount();
            return _context5.abrupt('return');

          case 23:

            // First render on client-side
            render.call(_app, router.currentRoute, router.currentRoute, function (path) {
              // If not redirected
              if (!path) {
                normalizeComponents(router.currentRoute, router.currentRoute);
                showNextPage.call(_app, router.currentRoute);
                // Dont call fixPrepatch.call(_app, router.currentRoute, router.currentRoute) since it's first render
                mount();
                return;
              }

              // Push the path and then mount app
              router.push(path, function () {
                return mount();
              }, function (err) {
                if (!err) return mount();
                console.error(err);
              });
            });

          case 24:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function mountApp(_x13) {
    return _ref5.apply(this, arguments);
  };
}();

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _index = require('./index');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var noopData = function noopData() {
  return {};
};
var noopFetch = function noopFetch() {};

// Global shared references
var _lastPaths = [];
var app = void 0;
var router = void 0;
var store = void 0;

// Try to rehydrate SSR data from window
var NUXT = window.__NUXT__ || {};

// Setup global Vue error handler
var defaultErrorHandler = _vue2.default.config.errorHandler;
_vue2.default.config.errorHandler = function (err, vm, info) {
  var nuxtError = {
    statusCode: err.statusCode || err.name || 'Whoops!',
    message: err.message || err.toString()

    // Show Nuxt Error Page
  };if (vm && vm.$root && vm.$root.$nuxt && vm.$root.$nuxt.error && info !== 'render function') {
    vm.$root.$nuxt.error(nuxtError);
  }

  // Call other handler if exist
  if (typeof defaultErrorHandler === 'function') {
    return defaultErrorHandler.apply(undefined, arguments);
  }

  // Log to console
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  } else {
    console.error(err.message || nuxtError.message);
  }
};

// Create and mount App
(0, _index.createApp)().then(mountApp).catch(function (err) {
  if (err.message === 'ERR_REDIRECT') {
    return; // Wait for browser to redirect...
  }
  console.error('[nuxt] Error while initializing app', err);
});

function componentOption(component, key) {
  if (!component || !component.options || !component.options[key]) {
    return {};
  }
  var option = component.options[key];
  if (typeof option === 'function') {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return option.apply(undefined, args);
  }
  return option;
}

function mapTransitions(Components, to, from) {
  var componentTransitions = function componentTransitions(component) {
    var transition = componentOption(component, 'transition', to, from) || {};
    return typeof transition === 'string' ? { name: transition } : transition;
  };

  return Components.map(function (Component) {
    // Clone original object to prevent overrides
    var transitions = Object.assign({}, componentTransitions(Component));

    // Combine transitions & prefer `leave` transitions of 'from' route
    if (from && from.matched.length && from.matched[0].components.default) {
      var from_transitions = componentTransitions(from.matched[0].components.default);
      Object.keys(from_transitions).filter(function (key) {
        return from_transitions[key] && key.toLowerCase().indexOf('leave') !== -1;
      }).forEach(function (key) {
        transitions[key] = from_transitions[key];
      });
    }

    return transitions;
  });
}

function applySSRData(Component, ssrData) {
  if (NUXT.serverRendered && ssrData) {
    (0, _utils.applyAsyncData)(Component, ssrData);
  }
  Component._Ctor = Component;
  return Component;
}

// Get matched components
function resolveComponents(router) {
  var _this2 = this;

  var path = (0, _utils.getLocation)(router.options.base, router.options.mode);

  return (0, _utils.flatMapComponents)(router.match(path), function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(Component, _, match, key, index) {
      var _Component;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(typeof Component === 'function' && !Component.options)) {
                _context2.next = 4;
                break;
              }

              _context2.next = 3;
              return Component();

            case 3:
              Component = _context2.sent;

            case 4:
              // Sanitize it and save it
              _Component = applySSRData((0, _utils.sanitizeComponent)(Component), NUXT.data ? NUXT.data[index] : null);

              match.components[key] = _Component;
              return _context2.abrupt('return', _Component);

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }));

    return function (_x4, _x5, _x6, _x7, _x8) {
      return _ref2.apply(this, arguments);
    };
  }());
}

function callMiddleware(Components, context, layout) {
  var _this3 = this;

  var midd = [];
  var unknownMiddleware = false;

  // If layout is undefined, only call global middleware
  if (typeof layout !== 'undefined') {
    midd = []; // Exclude global middleware if layout defined (already called before)
    if (layout.middleware) {
      midd = midd.concat(layout.middleware);
    }
    Components.forEach(function (Component) {
      if (Component.options.middleware) {
        midd = midd.concat(Component.options.middleware);
      }
    });
  }

  midd = midd.map(function (name) {
    if (typeof name === 'function') return name;
    if (typeof _middleware2.default[name] !== 'function') {
      unknownMiddleware = true;
      _this3.error({ statusCode: 500, message: 'Unknown middleware ' + name });
    }
    return _middleware2.default[name];
  });

  if (unknownMiddleware) return;
  return (0, _utils.middlewareSeries)(midd, context);
}

function normalizeComponents(to, ___) {
  (0, _utils.flatMapComponents)(to, function (Component, _, match, key) {
    if ((typeof Component === 'undefined' ? 'undefined' : _typeof(Component)) === 'object' && !Component.options) {
      // Updated via vue-router resolveAsyncComponents()
      Component = _vue2.default.extend(Component);
      Component._Ctor = Component;
      match.components[key] = Component;
    }
    return Component;
  });
}

function showNextPage(to) {
  // Hide error component if no error
  if (this._hadError && this._dateLastError === this.$options.nuxt.dateErr) {
    this.error();
  }

  // Set layout
  var layout = this.$options.nuxt.err ? _index.NuxtError.layout : to.matched[0].components.default.options.layout;
  if (typeof layout === 'function') {
    layout = layout(app.context);
  }
  this.setLayout(layout);
}

// When navigating on a different route but the same component is used, Vue.js
// Will not update the instance data, so we have to update $data ourselves
function fixPrepatch(to, ___) {
  var _this5 = this;

  if (this._pathChanged === false && this._queryChanged === false) return;

  _vue2.default.nextTick(function () {
    var matches = [];
    var instances = (0, _utils.getMatchedComponentsInstances)(to, matches);

    instances.forEach(function (instance, i) {
      if (!instance) return;
      // if (!this._queryChanged && to.matched[matches[i]].path.indexOf(':') === -1 && to.matched[matches[i]].path.indexOf('*') === -1) return // If not a dynamic route, skip
      if (instance.constructor._dataRefresh && _lastPaths[i] === instance.constructor._path && typeof instance.constructor.options.data === 'function') {
        var newData = instance.constructor.options.data.call(instance);
        for (var key in newData) {
          _vue2.default.set(instance.$data, key, newData[key]);
        }
      }
    });
    showNextPage.call(_this5, to);

    // Hot reloading
    setTimeout(function () {
      return hotReloadAPI(_this5);
    }, 100);
  });
}

function nuxtReady(_app) {
  window._nuxtReadyCbs.forEach(function (cb) {
    if (typeof cb === 'function') {
      cb(_app);
    }
  });
  // Special JSDOM
  if (typeof window._onNuxtLoaded === 'function') {
    window._onNuxtLoaded(_app);
  }
  // Add router hooks
  router.afterEach(function (to, from) {
    // Wait for fixPrepatch + $data updates
    _vue2.default.nextTick(function () {
      return _app.$nuxt.$emit('routeChanged', to, from);
    });
  });
}

// Special hot reload with asyncData(context)
function getNuxtChildComponents($parent) {
  var $components = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  $parent.$children.forEach(function ($child) {
    if ($child.$vnode.data.nuxtChild && !$components.find(function (c) {
      return c.$options.__file === $child.$options.__file;
    })) {
      $components.push($child);
    }
    if ($child.$children && $child.$children.length) {
      getNuxtChildComponents($child, $components);
    }
  });

  return $components;
}

function hotReloadAPI(_app) {
  if (!module.hot) return;

  var $components = getNuxtChildComponents(_app.$nuxt, []);

  $components.forEach(addHotReload.bind(_app));
}

function addHotReload($component, depth) {
  var _this6 = this;

  if ($component.$vnode.data._hasHotReload) return;
  $component.$vnode.data._hasHotReload = true;

  var _forceUpdate = $component.$forceUpdate.bind($component.$parent);

  $component.$vnode.context.$forceUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var Components, Component, promises, next, context;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            Components = (0, _utils.getMatchedComponents)(router.currentRoute);
            Component = Components[depth];

            if (Component) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt('return', _forceUpdate());

          case 4:
            if ((typeof Component === 'undefined' ? 'undefined' : _typeof(Component)) === 'object' && !Component.options) {
              // Updated via vue-router resolveAsyncComponents()
              Component = _vue2.default.extend(Component);
              Component._Ctor = Component;
            }
            _this6.error();
            promises = [];

            next = function next(path) {
              this.$loading.finish && this.$loading.finish();
              router.push(path);
            };

            _context4.next = 10;
            return (0, _utils.setContext)(app, {
              route: router.currentRoute,
              isHMR: true,
              next: next.bind(_this6)
            });

          case 10:
            context = app.context;

            _this6.$loading.start && _this6.$loading.start();
            callMiddleware.call(_this6, Components, context).then(function () {
              // If layout changed
              if (depth !== 0) return Promise.resolve();
              var layout = Component.options.layout || 'default';
              if (typeof layout === 'function') {
                layout = layout(context);
              }
              if (_this6.layoutName === layout) return Promise.resolve();
              var promise = _this6.loadLayout(layout);
              promise.then(function () {
                _this6.setLayout(layout);
                _vue2.default.nextTick(function () {
                  return hotReloadAPI(_this6);
                });
              });
              return promise;
            }).then(function () {
              return callMiddleware.call(_this6, Components, context, _this6.layout);
            }).then(function () {
              // Call asyncData(context)
              var pAsyncData = (0, _utils.promisify)(Component.options.asyncData || noopData, context);
              pAsyncData.then(function (asyncDataResult) {
                (0, _utils.applyAsyncData)(Component, asyncDataResult);
                _this6.$loading.increase && _this6.$loading.increase(30);
              });
              promises.push(pAsyncData);
              // Call fetch()
              Component.options.fetch = Component.options.fetch || noopFetch;
              var pFetch = Component.options.fetch(context);
              if (!pFetch || !(pFetch instanceof Promise) && typeof pFetch.then !== 'function') {
                pFetch = Promise.resolve(pFetch);
              }
              pFetch.then(function () {
                return _this6.$loading.increase && _this6.$loading.increase(30);
              });
              promises.push(pFetch);
              return Promise.all(promises);
            }).then(function () {
              _this6.$loading.finish && _this6.$loading.finish();
              _forceUpdate();
              setTimeout(function () {
                return hotReloadAPI(_this6);
              }, 100);
            });

          case 13:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this6);
  }));
}
//# sourceMappingURL=client.js.map