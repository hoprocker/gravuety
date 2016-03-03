<template>
<polygon :points="points" style="fill:lime;stroke:purple;stroke-width:1"></polygon>
</template>

<script>
export default {
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
}
</script>
