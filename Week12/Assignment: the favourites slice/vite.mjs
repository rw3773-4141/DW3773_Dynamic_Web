import {spawn} from 'node:child_process'
import {mkdtempSync, symlinkSync, rmSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'
import {fileURLToPath} from 'node:url'
import process from 'node:process'

// A colon in a folder name is valid on macOS, but Vite rejects served paths
// containing one. Use a temporary link without renaming this project folder.
const projectDirectory = fileURLToPath(new URL('.', import.meta.url))
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'favourites-slice-'))
const projectLink = join(temporaryDirectory, 'project')
symlinkSync(projectDirectory, projectLink, 'dir')

const [command = 'dev', ...options] = process.argv.slice(2)
const child = spawn(process.execPath, [
  '--preserve-symlinks',
  '--preserve-symlinks-main',
  join(projectLink, 'node_modules/vite/bin/vite.js'),
  ...(command === 'dev' ? [] : [command]),
  projectLink,
  ...options,
], {stdio: 'inherit'})

const cleanup = () => rmSync(temporaryDirectory, {recursive: true, force: true})
process.once('exit', cleanup)
process.once('SIGINT', () => child.kill('SIGINT'))
process.once('SIGTERM', () => child.kill('SIGTERM'))
child.once('error', (error) => {
  console.error(error.message)
  process.exitCode = 1
})
child.once('exit', (code) => { process.exitCode = code ?? 0 })
