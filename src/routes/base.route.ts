import { Router } from "express";

import v1Route from "@/routes/v1/v1.route";

import { hello } from "@/controllers/base.controller";

const router = Router();

router.get("/", hello);

router.use("/v1", v1Route);

export default router;
