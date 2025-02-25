import { Router } from "express";

import authRoute from "@/routes/v1/auth.route";

const router = Router();

router.use("/auth", authRoute);

export default router;
