'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _nuxtChild = require('./nuxt-child');

var _nuxtChild2 = _interopRequireDefault(_nuxtChild);

var _nuxtError = require('./nuxt-error.vue');

var _nuxtError2 = _interopRequireDefault(_nuxtError);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'nuxt',
  props: ['nuxtChildKey', 'keepAlive'],
  render: function render(h) {
    // If there is some error
    if (this.nuxt.err) {
      return h('nuxt-error', {
        props: {
          error: this.nuxt.err
        }
      });
    }
    // Directly return nuxt child
    return h('nuxt-child', {
      key: this.routerViewKey,
      props: this.$props
    });
  },
  beforeCreate: function beforeCreate() {
    _vue2.default.util.defineReactive(this, 'nuxt', this.$root.$options.nuxt);
  },

  computed: {
    routerViewKey: function routerViewKey() {
      // If nuxtChildKey prop is given or current route has children
      if (typeof this.nuxtChildKey !== 'undefined' || this.$route.matched.length > 1) {
        return this.nuxtChildKey || (0, _utils.compile)(this.$route.matched[0].path)(this.$route.params);
      }
      var Component = this.$route.matched[0] && this.$route.matched[0].components.default;
      if (Component && Component.options && Component.options.key) {
        return typeof Component.options.key === 'function' ? Component.options.key(this.$route) : Component.options.key;
      }
      return this.$route.path;
    }
  },
  components: {
    NuxtChild: _nuxtChild2.default,
    NuxtError: _nuxtError2.default
  }
};
//# sourceMappingURL=nuxt.js.map