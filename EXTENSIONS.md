# I18n Extensions
Extensions extend the functionality of this plugin and allows it to integrate with UI frameworks, or to incorporate
very specific behavior relevant for your use case.

Extensions add additional attributes to `t`, and/or additional exports. They don't interfere with the original
behavior of `t` and cannot redefine existing attributes.

## Use an extension
To use an extension, you simply need to reference it in the `extensions` configuration field. Built-in extensions are
referenced by their name, and custom ones will take the form of functions.

### Examples
Single built-in extension:
```js
import i18n from 'vite-plugin-i18n-tolgee'

export default {
  plugins: [
    i18n({
      projectId: '1337',
      apiKey: process.env.TOLGEE_API_KEY,
      extensions: 'jsx', // Enables JSX extension
    }),
  ],
}
```

Single custom extension
```js
import i18n from 'vite-plugin-i18n-tolgee'
import ext from './build/ext.js'

export default {
  plugins: [
    i18n({
      projectId: '1337',
      apiKey: process.env.TOLGEE_API_KEY,
      extensions: ext,
    }),
  ],
}
```

Multiple extensions
```js
import i18n from 'vite-plugin-i18n-tolgee'
import ext from './build/ext.js'

export default {
  plugins: [
    i18n({
      projectId: '1337',
      apiKey: process.env.TOLGEE_API_KEY,
      extensions: [ 'jsx', ext ],
    }),
  ],
}
```

## React/Preact extension (`jsx`)
This extension adds 2 things: a component named `I18nWrapper` exported from `virtual:i18n` you must wrap your
application in, and a `jsx` function to `t`

`t.jsx` behaves just like `t`, except it returns a component that'll respond to locale updates automatically. Common
tags like `<b>` will be transformed into components, as well as Markdown markup.

> **Note**: JSX runtime will automatically be determined. If you're using Preact, final transformation will be calling
> Preact's `h` function without requiring additional configuration.

```jsx
// If you're using Preact, you're probably knowledgeable
// enough to adapt this to your env ;)
import React from 'react'
import { createRoot } from 'react-dom/client'
import t, { I18nWrapper } from 'virtual:i18n'

function App () {
  return (
    <div>
      <h1>{t.jsx('TITLE', 'My Website')}</h1>
      <p>{t.jsx('HELLO_WORLD', 'Hello, world!')}</p>
    </div>
  )
}

const root = createRoot(document.getElementById('#app'))
root.render(
  <I18nWrapper>
    <App/>
  </I18nWrapper>
)
```

## Custom extension

# 🚧 This section is WIP and subject to change. 🚧

If the supported extensions aren't enough for you, this API is here to cover your needs. It lets you customize at the
lowest level how you want code to be transformed, while still letting you benefit from the internal code analysis tools,
static validation, string pre-processing, and more.

Wondering how powerful it is? Well, all the pre-existing extensions are in fact implemented with this API! You get
access to the raw AST tree, you can define & redefine exports of `virtual:i18n`, anything you desire.

### Creating an extension
#### Adding an attribute to `t`
*TBD*

#### Adding additional exports
*TBD*

### Inclusion in base plugin
*TBD*
