import { parse as parseJs } from 'acorn'

export default function parse (code: string) {
  const ast = parseJs(code, {
    ecmaVersion: 'latest',
    sourceType: 'module',
    allowHashBang: true,
  })

  
}
