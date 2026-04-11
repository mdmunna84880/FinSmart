import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
    sendMessage,
    getSessions,
    getSession,
    deleteSession
} from "../controllers/chatController.js";
import { noCache } from "../middlewares/noCache.js";

const router = Router();

/** Protect all chat routes with JWT authentication. */
router.use(verifyJWT, (req, res, next)=>{
    if(req.method === "GET"){
        return noCache(req, res, next);
    }
    next();
});

router.post("/message", sendMessage);
router.get("/sessions", getSessions);
router.get("/sessions/:id", getSession);
router.delete("/sessions/:id", deleteSession);

export default router;
