import imagePreloader from './components/imagePreloader.vue'

export default {
  install: function (Vue, options) {
    document.body.innerHTML = '<img id="imagePreloader_global_component">' + document.body.innerHTML
    const globalComponentsStyle = document.getElementById('imagePreloader_global_component').style
    globalComponentsStyle.width = 0
    globalComponentsStyle.height = 0
    globalComponentsStyle.position = 'fixed'
    globalComponentsStyle.zIndex = -1
    
    Vue.component('imagePreloader', imagePreloader)
    Vue.prototype.$imagePreload = (src, element = null) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          const el = element ? element : (document || {}).getElementById('imagePreloader_global_component')
          if(el) {
            el.style.content = el.style.content + ' url(' + src + ')'
          }
          resolve(img)
        }
        img.onerror = reject
      })
    }
  }
}
export { imagePreloader }
