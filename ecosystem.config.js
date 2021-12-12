module.exports = {
  apps: [
    {
      name: 'perfect_holiday_frontend',
      script: 'npm',
      args: 'start',
      watch: true,
      env: {
        REACT_APP_BASE: 'http://143.198.123.114:8080/',
        NODE_PATH: 'src',
      },
    },
  ],
};
