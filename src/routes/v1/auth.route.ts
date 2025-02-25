import { Router } from "express";

import { registerV1 } from "@/controllers/v1/auth/register.controller";
import { loginV1 } from "@/controllers/v1/auth/login.controller";
import { refreshV1 } from "@/controllers/v1/auth/refresh.controller";

const router = Router();

router.post("/register", registerV1);
router.post("/login", loginV1);
router.post("/refresh", refreshV1);

export default router;
