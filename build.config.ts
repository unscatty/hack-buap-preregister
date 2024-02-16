import { BuildEntry, MkdistBuildEntry, defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      format: 'cjs',
      ext: 'js',
      input: './src/**',
      outDir: './dist',
      distDir: './dist/src',
      rootDir: '.',
      srcDir: './src',
      pattern: ['**/*.ts', '!**/email/playground/**'],
      declaration: true,
    },
  ],
  declaration: true,
  clean: false,
  rootDir: '.',
})
