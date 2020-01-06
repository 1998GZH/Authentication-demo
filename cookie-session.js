const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const session = require("koa-session");
const bodyParser = require("koa-bodyparser");


let router = new Router();
let app = new Koa();

app.use(static("./public"));
app.keys = ["sessionSignenKeys", "some secret keys"];
const sessionConfig = {
  key: "gzhblog:Session",
  maxAge: 36000000,
  httpOnly: true,
  signed: true
}
app.use(session(sessionConfig, app));


app.use(bodyParser());
router.post("/login", async (ctx, next) => {
  const userInfo = {
    ...ctx.request.body,
    time: Date.now()
  }
  ctx.session.userInfo = userInfo;
  ctx.body = {
    success: 0,
    message: `welcome ${userInfo.username}`
  };
});
router.post("/getUserInfo", async (ctx, next) => {
  ctx.body = ctx.session.userInfo;
});



app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, console.log("http://localhost:3000"));