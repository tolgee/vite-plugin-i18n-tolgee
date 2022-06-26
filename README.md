# `vite-plugin-i18n-tolgee`
A [Vite](https://vitejs.dev/) plugin to leverage the power of the [Tolgee](https://tolgee.io/) localization platform,
without having to deal with the painful part of extracting strings, bundling them, and keeping your localization
project up to date.

# 🚧 Under heavy development, we're not even at a MVP yet! 🚧

## How it works
First, you need to add the plugin to your Vite configuration file. Some minimal configuration will be needed, see
the [Installation](#installation) section for more details about this.

You will then have the `virtual:i18n` virtual module you can import in your source files. You don't need to install
anything, it'll be provided by the plugin. See the [Usage](#usage) section for all the details about this virtual
package.

This virtual module exports the `t` function you'd find on most i18n packages. And... that's pretty much all you need
to know! Behind the scenes, the plugin will interact with Tolgee to fetch and update strings as needed, and will do
all the heavy lifting. No need to worry about production/development env, exporting strings from Tolgee, nothing.

While the goal of this plugin is to remove the maintenance cost of i18n, the second equally important goal is to have
a minuscule footprint in your final bundle, both in size and performance. That's why this plugins uses techniques like
compile-time preprocessing: this helps to render strings as fast as possible, and to reduce the amount of code bundled
(no ICU parser, or anything).

In summary, this library aims to mix Tolgee's amazing user experience for translators, with an amazing developer
experience for the people building the app. No more excuses for not localizing your app!

## Installation
Start by installing the `vite-plugin-i18n-tolgee` with your favorite package manager.

Then, add the plugin to your `vite.config.js`:
```js
import i18n from 'vite-plugin-i18n-tolgee'

export default {
  plugins: [
    i18n({
      projectId: '1337',
      apiKey: process.env.TOLGEE_API_KEY,
    }),
  ],
}
```

### Configuration properties
 - `tolgeeUrl`: Base URL of Tolgee. Defaults to `https://app.tolgee.io/`
 - `projectId`: **Required**\* ID of the Tolgee project for the app
 - `apiKey`: **Required**\* API key to connect to Tolgee's REST API
 - `markdown`: Enable support of Markdown in source strings. See [Markdown support](#markdown-support). Defaults to `false`.
 - `runtime`: Either `vanilla` (default), `react`, `preact`, or a function. See [RUNTIME.md](RUNTIME.md) for more details.

\*While required for the plugin to operate as expected, if not provided the plugin will still function in development
mode, and will require the use of a flag to run a production build (or build will error out). In this configuration,
source strings will be used as the only available locale. This is useful for external contributors who don't have an
API key.

## Usage
The goal of this plugin is to do a lot with the developers doing little. That's why there's very little to know about
the use of this plugin.

You'll need basic ICU to get started, and this isn't covered by this guide. You should give the official docs from
Unicode a look [here](https://unicode-org.github.io/icu/userguide/format_parse/messages/).

> Note: below is general documentation of how to use with the vanilla runtime. While provided (and custom) runtimes try
> to be transparent and function the same, it's recommended to check [RUNTIME.md](RUNTIME.md) for all the details and
> quirks of other runtimes.

The default export of `virtual:i18n` is all you'll need. We'll name it `t` here. It's a function that takes 3 arguments:
the string key, the source string, and eventual arguments in form of an object.

Because `t` behaves similar to a macro behind the scene, **all the arguments must be statically provided**. The string
key and the source string cannot be variables or otherwise dynamic, and the arguments object must have all its keys
static. Values can obviously be dynamic, that's the point of having them.

If, for any reason, you need the raw ICU string in the current locale, you can use `t.raw`. It takes the same
parameters as `t` minus the arguments, and have the same requirements regarding static analysis.

By default, the runtime will pick the browser locale. To change the locale, you can use `t.setLocale`. Note that the
vanilla runtime will **not** not refresh strings, you are responsible for handling this in your application. Other
runtimes may provide this feature, refer to their respective documentation.

### Markdown support
When enabled, the plugin can convert Markdown from source strings into corresponding HTML markup. Only a subset of
Markdown is implemented:
 - `**`: Bold
 - `*`, `_`: Italics
 - `__`: Underline (Note: non-standard)
 - `~~`: Strike-through
 - ` ` `: Inline code
 - `[name](link)`: Link
 - Plain http links are **not** automatically converted into clickable links

### Example usage
```js
import t from 'virtual:i18n'

// Set locale
// By default, browser's locale will be used

t('HI', 'Hi {name}!', { name: 'Cynthia' }) // ~> Hi Cynthia!
t('HI', 'Hi {name}!') // ~x Does not bundle: missing argument

t.raw('HI', 'Hi {name}!') // ~> "Hi {name}!"

t.setLocale('fr-FR') // Prints warning in development mode if locale doesn't exist
t('HI', 'Hi {name}!', { name: 'Cynthia' }) // ~> Salut Cynthia!

t(someVariable, 'something something') // ~x Does not bundle: one of the parameters isn't static
```

## Credits where due
Inspiration for the compile-time string parsing from [frenchkiss.js](https://github.com/koala-interactive/frenchkiss.js)'s
JIT approach. Thanks to [Tolgee](https://github.com/tolgee/tolgee-platform) for existing.
