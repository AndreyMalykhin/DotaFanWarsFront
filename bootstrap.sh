#!/usr/bin/env bash

projectDir="$1"
source "${projectDir}/.env"

if [ $DFWF_DEV = "1" ]; then
    sendfileStatus="off"
    nginxAction="stop"
else
    sendfileStatus="on"
    nginxAction="restart"
fi

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - \
&& sudo apt-get -y install build-essential nodejs nginx git

sudo rm -f /etc/nginx/sites-enabled/default \
&& sudo tee /etc/nginx/sites-available/dotafanwars_front > /dev/null <<EOF
server {
  listen ${DFWF_PORT};
  root ${projectDir}/build;
  index index.html;
  server_name ${DFWF_HOST};
  sendfile ${sendfileStatus};
  charset utf-8;
  location / {
    try_files \$uri \$uri/ /index.html;
  }
}
EOF
sudo ln -sf /etc/nginx/sites-available/dotafanwars_front /etc/nginx/sites-enabled/dotafanwars_front \
&& sudo service nginx ${nginxAction}

if [ $DFWF_DEV = "1" ]; then
    initCmd="true"
else
    initCmd="npm run build"
fi

cd "${projectDir}" \
&& npm install --no-bin-links \
&& eval "${initCmd}"
