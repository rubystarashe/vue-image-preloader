<template>
<div>
  <img :style="{ content: content }" class="imagePreloader_components" :id="id">
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
      loadedCount: 0,
      loadedImgs: []
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
    content() {
      return this.loadedImgs.length ? (this.loadedImgs.length > 1 ? 'url(' + this.loadedImgs.join(') url(') + ')' : 'url(' + this.loadedImgs[0] + ')') : ''
    }
  },
  methods: {
    loaded(src, index) {
      this.loadedCount++
      this.loadedImgs.push(src)
      this.$emit('loaded', {
        id: this.id,
        src,
        index,
        count: this.loadedCount,
        length: this.data.length,
        progress: this.loadedCount / this.data.length * 100
      })
      if(this.loadedCount === this.data.length) this.$emit('loaded-all', this.id || true)
    }
  },
  mounted() {
    for(let i = this.data.length; i > 0; i--) {
      const img = new Image()
      const index = this.data.length - i
      img.src = this.data[index]
      img.onload = () => {
        this.loaded(img.src, index)
      }
    }
  }
}
</script>

<style>
.imagePreloader_components {
  z-index: -1;
  width: 0;
  height: 0;
  position: fixed;
}
</style>
