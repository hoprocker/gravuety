<template>
<svg :height="height" :width="width">
<my-polygon></my-polygon>
</svg>
</template>

<script>
import MyPolygon from './components/MyPolygon'

export default {
  props: {
    height: 400,
    width: 400
  },
  components: { MyPolygon }
}
</script>

<style>
</style>
