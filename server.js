var settingsConfig = require('./app/config/settings/settings-config');

if (settingsConfig.settings.clusterEnabled === 1) {
    require('cluster-service').start({
        workers: './app/config/worker-config.js'
    });
}
else {
    require('./app/config/worker-config.js');
}
