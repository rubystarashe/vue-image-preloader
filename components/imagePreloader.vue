<template>
<div>
  <img v-for="(e, i) in data" v-bind:key="e" :src="e" @load="loaded(e, i)"/>
</div>
</template>

<script>
export default {
  props: [
    'src',
    'srcs',
    'images',
    'image',
    'img',
    'imgs',
    'id'
  ],
  data() {
    return  {
      loadedCount: 0
    }
  },
  computed: {
    data() {
      return (this.src ? new Array(this.src) : [])
        .concat(this.srcs)
        .concat(this.images)
        .concat(this.image)
        .concat(this.img)
        .concat(this.imgs)
        .filter(e => { return e })
    },
  },
  methods: {
    loaded(src, index) {
      this.loadedCount++
      this.$emit('loaded', {
        src,
        index,
        count: this.loadedCount,
        length: this.data.length,
        progress: this.loadedCount / this.data.length * 100
      })
      if(this.loadedCount === this.data.length) this.$emit('loaded-all', this.id || true)
    }
  }
}
</script>
