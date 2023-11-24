export default {
  base: '/framerJS/dist/',
  build: {
    minify: 'terser',
    terserOptions: {
      keep_classnames: true,
    },
  }
}