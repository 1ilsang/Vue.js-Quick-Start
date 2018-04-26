'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = undefined;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

// Recursive find files in {srcDir}/{dir.store}
var files = require.context('@/store', true, /^\.\/(?!-)[^.]+\.(js)$/);
var filenames = files.keys();

// Store
var storeData = {};

// Check if {dir.store}/index.js exists
var indexFilename = void 0;
filenames.forEach(function (filename) {
  if (filename.indexOf('./index.') !== -1) {
    indexFilename = filename;
  }
});
if (indexFilename) {
  storeData = getModule(indexFilename);
}

// If store is not an exported method = modules store
if (typeof storeData !== 'function') {

  // Store modules
  if (!storeData.modules) {
    storeData.modules = {};
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = filenames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var filename = _step.value;

      var name = filename.replace(/^\.\//, '').replace(/\.(js)$/, '');
      if (name === 'index') continue;

      var namePath = name.split(/\//);
      var _module = getModuleNamespace(storeData, namePath);

      name = namePath.pop();
      _module[name] = getModule(filename);
      _module[name].namespaced = true;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

// createStore
var createStore = exports.createStore = storeData instanceof Function ? storeData : function () {
  return new _vuex2.default.Store(Object.assign({
    strict: process.env.NODE_ENV !== 'production'
  }, storeData, {
    state: storeData.state instanceof Function ? storeData.state() : {}
  }));
};

// Dynamically require module
function getModule(filename) {
  var file = files(filename);
  var module = file.default || file;
  if (module.commit) {
    throw new Error('[nuxt] store/' + filename.replace('./', '') + ' should export a method which returns a Vuex instance.');
  }
  if (module.state && typeof module.state !== 'function') {
    throw new Error('[nuxt] state should be a function in store/' + filename.replace('./', ''));
  }
  return module;
}

function getModuleNamespace(storeData, namePath) {
  if (namePath.length === 1) {
    return storeData.modules;
  }
  var namespace = namePath.shift();
  storeData.modules[namespace] = storeData.modules[namespace] || {};
  storeData.modules[namespace].namespaced = true;
  storeData.modules[namespace].modules = storeData.modules[namespace].modules || {};
  return getModuleNamespace(storeData.modules[namespace], namePath);
}
//# sourceMappingURL=store.js.map