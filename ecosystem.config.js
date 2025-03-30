module.exports = {
  apps : [
    {
      name: 'r-typing',
      exec_mode: 'cluster',
      instances: 'max',
      script: './src/.output/server/index.mjs',
      args: 'start'
    }
  ],
  deploy : {
    production : {
      user : process.env.SERVER_USER,
      host : process.env.SERVER_IP,
      key  : process.env.KEY_PATH,
      ref  : process.env.SERVER_BRANCH,
      repo : 'git@github.com:reisuta/r-typing-web.git',
      path : process.env.SERVER_PATH,
      'post-deploy' : 'cd src && npm install && npm run build && cd ../ && pm2 reload ecosystem.config.js --env production'
    }
  }
}
