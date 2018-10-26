## Installation / 설치
```
npm install --save vue-image-preloader
```

Installing the plugin will globally add the `vue-image-preloader` component to your project.  
플러그인을 전역적으로 설치하여 `vue-image-preloader` 컴포넌트를 사용할 수 있습니다.

```js
import imagePreloader from 'vue-image-preloader'
Vue.use(imagePreloader)
```

you can also import the standalone component.  
단일 컴포넌트에 설치하여 사용할 수도 있습니다.

```js
import { imagePreloader } from 'vue-image-preloader'
export default {
  components: {
    imagePreloader,
  },
}
```

Nuxt.js
```js
module.exports = {
  plugins: [
    { src: '~plugins/vue-image-preloader-installer.js', ssr: false }
  ]
}
```

## Basic Usage
```html
<!-- choose any one props type -->

<image-preloader
  :src="'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'"
/>
<image-preloader
  :src=['https://nodejs.org/static/images/logo.svg', 'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png']
/>
<image-preloader
  :src="'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'"
  :srcs="'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'"
  :image="'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'"
  :images="'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'"
  :img="'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'"
  :imgs="'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'"
/>
```
specific onload & all src onload event  
특정 로드와 전체 로드에 대한 onload 이벤트를 사용할 수 있습니다.
```html
<template>
...
<image-preloader
  :id="test"
  :srcs=['https://nodejs.org/static/images/logo.svg', 'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png']
  @loaded="loadedOne"
  @loaded-all="loadedAll"
/>
...
</template>

<script>
import { imagePreloader } from 'vue-image-preloader'
export default {
  components: {
    imagePreloader
  }
...
  methods: {
    loadedOne(e) {
      console.log(e)  // ImagePreloader id, loaded src, src index, loaded count, src list length, progress
      console.log(e.progress)
    },
    loadedAll(e) {
      console.log(e)  // ImagePreloader id or boolean
    }
  }
...
</script>
```
with global component  
전역 컴포넌트로 사용할 경우입니다.
```html
<template>
...
<no-ssr>
<image-preloader
  :id="test"
  :srcs=['https://nodejs.org/static/images/logo.svg', 'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png']
  @loaded="loadedOne"
  @loaded-all="loadedAll"
/>
</no-ssr>
...
</template>

<script>
...
  methods: {
    loadedOne(e) {
      console.log(e)  // ImagePreloader id, loaded src, src index, loaded count, src list length, progress
      console.log(e.progress)
    },
    loadedAll(e) {
      console.log(e)  // ImagePreloader id or boolean
    }
  }
...
</script>
```

## Global Method
`$imagePreload` global method  
플러그인을 전역적으로 설치했다면, `$imagePreload` 메소드를 사용할 수도 있습니다.
```html
<script>
...
  async mounted() {
    this.$imagePreload('https://nodejs.org/static/images/logo.svg')
      .then(r => console.log(r))  // return loaded img element
    await this.$imagePreload([
      'https://nodejs.org/static/images/logo.svg',
      'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'
    ], (e => console.log(e))) // element, loaded src, src index, loaded count, src list length, progress
    const el = document.getElementById('test')
    await this.$imagePreload('https://nodejs.org/static/images/logo.svg', el)
    await this.$imagePreload.reset()
    await this.$imagePreload.reset(el)
  }
...
</script>
```