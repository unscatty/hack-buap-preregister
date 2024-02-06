import { BuildEntry, MkdistBuildEntry, defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      format: 'esm',
      ext: 'mjs',
      input: './src/**',
      outDir: './dist',
      distDir: './dist/src',
      rootDir: '.',
      srcDir: './src',
      pattern: ['**/*.{ts,vue}', '!**/email/playground/**'],
      declaration: true,
    },
  ],
  declaration: true,
  clean: true,
  rootDir: '.',
})
