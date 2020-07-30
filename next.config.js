module.exports = {
    devIndicators: {
      autoPrerender: true
    },
    env: {
      apiKey: 'AIzaSyCieTKzwZNEVJmQ65aIl_bxnLNO1ps_-Mg',
      authDomain: 'anuarioestadistico-1a99a.firebaseapp.com',
      databaseURL: 'https://anuarioestadistico-1a99a.firebaseio.com',
      projectId: 'anuarioestadistico-1a99a',
      storageBucket: 'anuarioestadistico-1a99a.appspot.com',
      messagingSenderId: '966171660290',
      appId: '1:966171660290:web:7ff08644a5312562e6d71b',
      measurementId: 'G-7Z6K8NVE76'
    },
    webpack (config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/
        },
        use: ['@svgr/webpack']
      })
  
      return config
    }
  }
  