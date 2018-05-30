import imagePreloader from './components/imagePreloader.vue'

export default {
  install: function (Vue, options) {
    Vue.component('imagePreloader', imagePreloader);
  }
}
export { imagePreloader }
