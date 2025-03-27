import { Router } from 'express'
import { logout, login, register } from '../controller/auth.controller'
import { protect } from '../middleware/auth.middleware'
const router = Router()
router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)

export default router;