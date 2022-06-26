# I18n Runtime
The choice of runtime will define how calls to `t` in code will be transformed and how they'll behave in your final
application. From a simplistic approach to rendering strings to deep integrations with a UI framework, there's barely
any limits to how `t` can be transformed.

## React/Preact runtime
This runtime exports `I18nWrapper` from `virtual:i18n`: you must wrap your application with this component.

You can use `t` like you'd use it normally; it'll return a component instead of a string. Common tags like `<b>` will
automatically transformed into components (as well as Markdown markup). If you need a plain string, you can use `t.str`.
Locale change will immediately trigger a re-render of all the translated strings.

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

## Custom runtime

# 🚧 This section is WIP and subject to change. 🚧

If the supported runtimes aren't enough for you, this API is here to cover your needs. It lets you customize at the
lowest level how you want code to be transformed, while still letting you benefit from the internal code analysis tools,
static validation, string pre-processing, and more.

Wondering how powerful it is? Well, all the pre-existing runtimes are in fact implemented as custom runtimes! You get
access to the raw AST tree, you can define & redefine exports of `virtual:i18n`, anything you desire.

### Defining a runtime
*TBD*

### Inclusion as a pre-bundled runtime
*TBD*
