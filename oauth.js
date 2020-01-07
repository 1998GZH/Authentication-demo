const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const queryString = require("querystring");
const bodyParser = require("koa-bodyparser");
const axios = require("axios");

let app = new Koa();
let router = new Router();
app.use(static("./public"));
app.use(bodyParser());

const config = {
  clientID: "8770c8613e11132df539",
  clientSecret: "5d12a7a4d130314f7db45cefa6e11177fa2557a0"
};
router.get("/gitHubOAuth", async (ctx, next) => {
  const path = `https://github.com/login/oauth/authorize?client_id=${config.clientID}`;
  ctx.redirect(path);
});
router.get("/oAuthCallback", async (ctx, next) => {
  const params = {
    client_id: config.clientID,
    client_secret: config.clientSecret,
    code: ctx.query.code
  }
  const getTokenUrl = 'https://github.com/login/oauth/access_token';
  let { data: token } = await axios.post(getTokenUrl, params);
  let access_token = queryString.parse(token)['access_token'];
  let starredUrl = `https://api.github.com/user/starred?access_token=${access_token}`;
  let {data: starredLists} = await axios.get(starredUrl);
  let data = [];
  for(let item of starredLists) {
    data.push({name: item.name, url: item.html_url});
  }
  let responseData = {
    success: 1,
    data
  }
  ctx.body = responseData;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, console.log("http://localhost:3000"));