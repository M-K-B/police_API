import { Application } from "jsr:@oak/oak";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts"; // add this
import router from "./routes/index.ts";

const app = new Application();

// Enable CORS globally

app.use(
  oakCors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

// Your routes after CORS

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(
    `${ctx.request.method} ${ctx.request.url.pathname} - ${ctx.response.status} (${ms}ms)`,
  );
});

app.use(router.routes());
app.use(router.allowedMethods());

export { app };
