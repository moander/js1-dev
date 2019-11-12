# js1 q-vue modules

## src/boot/modules.js

```js
import Modules from '../modules'
import Js1VueModulesBootV1 from '@moander/js1-vue/src/Js1VueModulesBootV1'

export default new Js1VueModulesBootV1({
    Modules
}).boot;
```

## src/modules/index.js

```js
import Js1VueModulesIndex from '@moander/js1-vue/src/Js1VueModulesIndex'

export default new Js1VueModulesIndex({
    requireModule: key => require('./' + key),
    // Define your modules here
    modules: [
        'your-module-a',
        'your-module-b',
    ],
    // Define modules from packages.json here
    externalModules: [],
}).init();
```

## boot/i18n.js

```js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import Modules from '../modules'
import Js1VueModulesI18nV1 from '@moander/js1-vue/src/Js1VueModulesI18nV1'

Vue.use(VueI18n)

export const i18n = new Js1VueModulesI18nV1({
  Modules,
  locale: localStorage.getItem('locale'),
}).createVueI18n({ messages });

export default ({ app }) => {
  app.i18n = i18n
}

```

