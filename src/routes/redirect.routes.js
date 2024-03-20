import { Router } from "express";

import * as redirectController from "../controller/redirect.controller.js";

const router = Router();

router.get("/:slug", redirectController.redirectSlug);

export default router;

