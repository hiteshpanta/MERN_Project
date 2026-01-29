import express from 'express';
import { notAllowed } from '../utils/notAllowed.js';
import { getUser, loginUser, registerUser, updateProfile } from '../controllers/userController.js';
import { checkUser } from '../middlewares/checkUser.js';



const router = express.Router();

router.route('/api/users/login').post(loginUser).all(notAllowed);
router.route('/api/users/register').post(registerUser).all(notAllowed);
router.route('/api/users').get(checkUser, getUser).patch(checkUser, updateProfile).all(notAllowed);


export default router;


