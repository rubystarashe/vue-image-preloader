## Installation
```
npm install --save vue-image-preloade
```

Installing the plugin will globally add the `vue-image-preloade` component to your project.

```js
//main.js
import imagePreloade from 'vue-image-preloade'
Vue.use(imagePreloade)
```

you can also import the standalone component.

```js
// foo.vue
import { imagePreloade } from 'vue-image-preloade'
export default {
  components: {
    imagePreloade,
  },
}
```

## Basic Usage
```html
<image-preloader
  :src='https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'
/>
<image-preloader
  :src=['https://nodejs.org/static/images/logo.svg', 'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png']
/>
<image-preloader
  :src='https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'
  :srcs='https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'
  :image='https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'
  :images='https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'
  :img='https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'
  :imgs='https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'
/>
```
specific onload & all src onload event
```html
<image-preloader
  :id="test"
  :srcs=['https://nodejs.org/static/images/logo.svg', 'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png']
  @loaded="loadedOne"
  @loaded-all="loadedAll"
/>
<script>
...
  methods: {
    loadedOne(e) {
      console.log(e)  // ImagePreloader id, loaded src, src index, loaded count, src list length, progress
      console.log(e.progress)
    },
    loadedAll(e) {
      console.log(e)  // ImagePreloade id or boolean
    }
  }
...
</script>
```
