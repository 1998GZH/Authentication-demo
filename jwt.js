const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const static = require("koa-static");
const Router = require("koa-router");

let router = new Router();
let app = new Koa();
// 用于生成jwt令牌
const jwt = require("jsonwebtoken");
// 校验jwt令牌
const jwtAuth = require("koa-jwt");
// jwt签名秘钥
const secret = "this is jwt secret message";

app.use(static("./public"));
app.use(bodyParser());

router.post("/login", async (ctx, next) => {
  ctx.body = {
    success: 0,
    message: "success login",
    // 签发jwt令牌
    token: jwt.sign({
      ...ctx.request.body,
      time: Date.now()
      /* data: {
        ...ctx.request.body,
        time: Date.now()
      },
      // 单位秒, 先设置一小时
      exp: ~~(Date.now() / 1000) * 60 * 60 */

    }, secret)
  };
});

/* router.post("/getJwtInfo",
  jwtAuth({
    secret
  }),
  async (ctx, next) => {
    console.log(ctx.headers.authorization.split(' '));
    // 如果jwtAuth验证令牌通过, 默认令牌中的信息将保存到ctx.state.user里
    let userInfo = ctx.state.user;
    console.log(userInfo);
    if (userInfo) {
      ctx.body = "getJwtInfo successful";
    } else {
      ctx.status = 401;
      ctx.body = {
        success: 1,
        message: "authentication failed"
      }
    }
  }); */

// jwtAuth执行返回一个中间件
app.use(jwtAuth({ secret }));
app.use(async (ctx, next) => {
  if (ctx.url === '/getJwtInfo') {
    let userInfo = ctx.state.user;
    if (userInfo) {
      ctx.body = "getJwtInfo successful";
    } else {
      ctx.status = 401;
      ctx.body = {
        success: 1,
        message: "authentication failed"
      }
    }
  }
});


app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, console.log("http://localhost:3000"));