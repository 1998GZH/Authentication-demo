# Authentication demo
## 1.基于KOA的用户鉴权demo
自己学习过程中的小样例, 方便日后复习用

**使用方法**

```shell
# 1.进入项目文件夹
cd Authentication-demo
# 2.安装依赖
yarn 或者 npm install
# 3.运行cookie-session鉴权样例
node cookie-session.js
# 4.运行jwt鉴权样例
node jwt.js
```

## 2.cookie-session鉴权
主要依赖的第三方库
- koa-session
## 3.jwt鉴权
主要依赖的第三方库
- koa-jwt
- jsonwebtoken

## 4.oAuth鉴权

使用的样例基于github平台进行oAuth鉴权

主要依赖第三方库

- axios