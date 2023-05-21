#!/bin/bash

ssh -i "late night worm hole.pem" root@ec2-3-83-68-163.compute-1.amazonaws.com <<'ENDSSH'

nvm use 16.20
cd ../home/ec2-user/dash3/
ls -al
git stash
git pull
npm install
ng build --configration production
sudo cp -r dist/login-demo/* /usr/share/nginx/html
echo "moved file"
sudo systemctl restart nginx
echo "restarted nginx"

ENDSSH