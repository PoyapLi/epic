#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
yarn run build

# cd 到构建输出的目录下
cd build

git init

git add .

git commit -am 'init'

git remote add origin git@github.com:PoyapLi/epic-website.git

git push -f origin master

cd -