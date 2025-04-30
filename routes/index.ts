import { Router } from "../deps.ts";
import uk_crime_router from "./uk_crime_routes.ts";

const router = new Router();

router.use(
  "/api/v1",
  uk_crime_router.routes(),
  uk_crime_router.allowedMethods(),
);

export default router;
