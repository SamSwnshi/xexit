import {Router} from "express";
import {auth} from "../middleware/auth.middleware.js";
import {submitResignation,submitExitResponses,getResignationStatus,getNotifications} from "../controllers/user.controllers.js"

const router = Router();

router.post("/resign",auth,submitResignation)
router.post("/responses",auth,submitExitResponses)
router.post("/resignation_status",auth,getResignationStatus)
router.get('/notifications', auth, getNotifications);



export default router;