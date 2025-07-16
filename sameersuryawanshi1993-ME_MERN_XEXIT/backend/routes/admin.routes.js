import {Router} from "express";
import { auth,isAdmin } from "../middleware/auth.middleware.js";
import {viewAllResignations,concludeResignation,exitResponse} from "../controllers/admin.controllers.js"

const router = Router();

router.get('/resignations',auth,isAdmin, viewAllResignations);
router.put('/conclude_resignation',auth,isAdmin, concludeResignation );
router.get('/exit_responses',auth,isAdmin, exitResponse);

export default router;