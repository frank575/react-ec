module.exports = api => {
  const isTest = api.env('test')

  return {
    presets: [
      [ '@babel/preset-env', { modules: isTest ? 'auto' : false } ],
      // '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-runtime',
    ],
  }
}
