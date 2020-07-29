module.exports = {
    devIndicators: {
      autoPrerender: true
    },
    env: {
      apiKey: 'AIzaSyBxMhy970uaqRh5xkI_E5JzR9_hzD1if5A',
      authDomain: 'anuarioestadistico2020.firebaseapp.com',
      databaseURL: 'https://anuarioestadistico2020.firebaseio.com',
      projectId: 'anuarioestadistico2020',
      storageBucket: 'anuarioestadistico2020.appspot.com',
      messagingSenderId: '1003799443077',
      appId: '1:1003799443077:web:463ec3bccff8095e331bec',
    //   measurementId: 'G-D4SJGYB081'
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
  