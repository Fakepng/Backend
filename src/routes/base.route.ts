import { Router } from "express";

import { hello } from "@/controllers/base.controller";

const router = Router();

router.get("/", hello);

export default router;
