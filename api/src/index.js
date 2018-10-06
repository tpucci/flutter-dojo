import Koa from "koa";

const app = new Koa();

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// response

app.use(async ctx => {
  ctx.body = {
    data: [
      { id: 1, city: "Paris", temperature: 25 },
      { id: 2, city: "London", temperature: 14 }
    ]
  };
});

app.listen(3000);
console.log("Listening on port ", 3000);
