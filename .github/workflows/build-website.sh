#!/bin/bash

DEPLOY_PK="$1"

mkdir tmp
ABSOLUTE_TMP=$(echo "$(cd "$(dirname "$tmp")"; pwd -P)/$(basename "tmp")")
echo "$DEPLOY_PK" > ./tmp/deploy-key
chmod 0600 ./tmp/deploy-key
npm i

# ZenesisUK/zx.ui.differenceViewer
echo ">>> Cloning existing website..."
git config --global user.email "deployment@zenesis.com"
git config --global user.name "Automated Deployment for ZenesisUK/zx.ui.differenceViewer.qooxdoo.github.io"
git clone -c core.sshCommand="/usr/bin/ssh -i $ABSOLUTE_TMP/deploy-key" git@github.com:ZenesisUK/zx.ui.differenceViewer.zenesisuk.github.io.git --depth=1 ./tmp/zx.ui.differenceViewer.zenesisuk.github.io

echo
echo ">>> Building website..."
npx qx deploy --out=./tmp/zx.ui.differenceViewer.zenesisuk.github.io

cd ./tmp/zx.ui.differenceViewer.zenesisuk.github.io
if [[ ! -d .git ]] ; then
    echo "The checked out zx.ui.differenceViewer.zenesisuk.github.io is not a .git repo!"
    exit 1
fi

git add .
git commit -m 'automatic deployment from ZenesisUK/zx.ui.differenceViewer/.github/workflows/build-website.sh'
git push

