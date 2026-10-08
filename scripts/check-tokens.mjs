// Fails when styling values appear outside src/tokens (see ADR 0001).
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = new URL('../src', import.meta.url).pathname
const skip = join(root, 'tokens')
const patterns = [
  [/#[0-9a-fA-F]{3,8}\b/, 'hex color'],
  [/\brgba?\(|\bhsla?\(/, 'rgb/hsl color'],
  [/font-family\s*:(?!\s*var\()/, 'hardcoded font-family'],
  [/@media\s*\(/, 'hardcoded media query (use the Grid)'],
]

const problems = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (path === skip) continue
    if (statSync(path).isDirectory()) walk(path)
    else if (/\.(css|tsx?)$/.test(name)) {
      readFileSync(path, 'utf8').split('\n').forEach((line, i) => {
        for (const [re, label] of patterns) if (re.test(line)) problems.push(`${relative(root, path)}:${i + 1} ${label}: ${line.trim()}`)
      })
    }
  }
}
walk(root)

if (problems.length) {
  console.error(`Found ${problems.length} value(s) outside tokens:\n${problems.join('\n')}`)
  process.exit(1)
}
console.log('check:tokens ok')
