module.exports = {
  apps: [
    {
      name: 'fs-arca-task',
      script: './dist/index.js',
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--max_old_space_size=8092'
      },
      env_production: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--max_old_space_size=8092'
      }
    }
  ]
};