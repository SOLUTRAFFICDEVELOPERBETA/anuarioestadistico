module.exports = {
    devIndicators: {
        autoPrerender: true,
    },
    env: {
        apiKey: 'AIzaSyCCg7wmHI86CNpq9VdLv28dtHiNydSNeGw',
        authDomain: 'anuario-estadistico.firebaseapp.com',
        databaseURL: 'https://anuario-estadistico.firebaseio.com',
        projectId: 'anuario-estadistico',
        storageBucket: 'anuario-estadistico.appspot.com',
        messagingSenderId: '180604864462',
        // appId: '1:180604864462:web:4fef89e887cbfc6ac20d9f',
        // measurementId: 'G-WFRZ9NEGGD'
        
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/
            },
            use: ['@svgr/webpack']
        });

        return config;
    }
};
