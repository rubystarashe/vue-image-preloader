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
          try {
            const content = Array.isArray(src) ? (src.length > 1 ? 'url(' + src.join(') url(') + ')' : 'url(' + src[0]) + ')' :  'url(' + src + ')'
            const el = element ? element : (document || {}).getElementById('imagePreloader_global_component')
            if(el) {
              el.style.content = el.style.content + ' ' + content
            } else reject(null)
            resolve(img)
          } catch(e) {
            reject(e)
          }
        }
        img.onerror = reject
      })
    }
    Vue.prototype.$imagePreload.reset = (element = null) => {
      return new Promise((resolve, reject) => {
        try {
          const el = element ? element : (document || {}).getElementById('imagePreloader_global_component')
          if(el) {
            el.style.content = ''
          } else reject(null)
          resolve(true)
        } catch(e) {
          reject(e)
        }
      })
    }
  }
}
export { imagePreloader }
