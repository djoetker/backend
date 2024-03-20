import { Router } from "express";

import * as urlController from "../controller/url.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";


const router = Router();

router.post("/new", requireAuth, urlController.postNewUrl);
router.get("/user/all", requireAuth, urlController.getAllUrlsByUser);
router.delete("/delete/:urlId", requireAuth, urlController.deleteUrl);
router.get("/get/:urlId", urlController.getUrlById);
export default router;

