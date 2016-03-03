import Vue from 'vue'

Vue.config.debug = true

/* eslint-disable no-new */
Vue.component('my-polygon', {
  template: '<polygon :points="points" style="fill:lime;stroke:purple;stroke-width:1">{{test}}</polygon>',
  props: ['height', 'width'],
  computed: {
    points: function () {
      var points = []
      for (var i = 0; i < 6; i++) {
        points.push(String(Math.random() * this.width) + ',' + String(Math.random() * this.height))
      }
      return points.join(' ')
    }
  }
})

Vue.component('my-circle', {
  template: '<circle :cx="center.x" :cy="center.y" :r="radius" :fill="fill"></circle>',
  props: ['mouse_pt', 'gravity', 'width', 'height'],
  computed: {
    fill: function () {
      return 'rgba(' + Math.round(Math.random() * 255) + ',' +
                       Math.round(Math.random() * 255) + ',' +
                       Math.round(Math.random() * 255) + ',' +
                       '0.8)'
    },
    radius: function () {
      return Math.round(2 + (Math.random() * 30))
    }
  },
  data: function () {
    return {
      center: { x: this.mouse_pt.x, y: this.mouse_pt.y },
      velocity: 0
    }
  },
  events: {
    'update-physics': function () {
      this.velocity += (this.gravity / 50)
      this.center.y += this.velocity
      if (this.center.y + this.radius > this.height) {
        this.$destroy(true)
      }
    }
  }
})

new Vue({
  el: '#app',
  template: '#svg-tmpl',
  data: {
    last_gen: 0,
    mouse_pt: {},
    circles: [],
    delay: 500,
    gravity: 0.2,
    delay_hook: null
  },
  computed: {
    width: function () {
      return window.outerWidth
    },
    height: function () {
      return window.outerHeight - 40
    }
  },
  methods: {
    circletwerk: function () {
      if (Date.now() > this.last_gen + this.delay) {
        this.last_gen = Date.now()
        // this.mouse_pt = {x: e.clientX, y: e.clientY}
        this.mouse_pt = {x: Math.random() * this.width, y: Math.random() * this.height}
        this.circles.push(1)
      }
    },
    intervaltwerk: function () {
      var this_ = this
      this_.delay_hook = window.setInterval(function () {
        this_.circletwerk()
      }, this_.delay)
    }
  },
  ready: function () {
    var this_ = this
    window.setInterval(function () {
      this_.$broadcast('update-physics')
    }, 20)
    this.intervaltwerk()
  },
  watch: {
    'delay': function (newval, oldval) {
      window.clearInterval(this.delay_hook)
      this.intervaltwerk()
    }
  }
})
