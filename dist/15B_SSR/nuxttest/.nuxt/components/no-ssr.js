'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
** From https://github.com/egoist/vue-no-ssr
** With the authorization of @egoist
*/
exports.default = {
  name: 'no-ssr',
  props: ['placeholder'],
  data: function data() {
    return {
      canRender: false
    };
  },
  mounted: function mounted() {
    this.canRender = true;
  },
  render: function render(h) {
    if (this.canRender) {
      if (process.env.NODE_ENV === 'development' && this.$slots.default && this.$slots.default.length > 1) {
        throw new Error('<no-ssr> You cannot use multiple child components');
      }
      return this.$slots.default && this.$slots.default[0];
    }

    return h('div', {
      class: ['no-ssr-placeholder']
    }, this.$slots.placeholder || this.placeholder);
  }
};
//# sourceMappingURL=no-ssr.js.map