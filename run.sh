pm2 start --name "corona-bot" npm -- run bot
pm2 start --name "corona-scheduler" npm -- run scheduler
pm2 start --name "corona-web" npm -- run web
