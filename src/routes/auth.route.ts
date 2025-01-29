
import express,{Application} from 'express';

import bodyParser from 'body-parser';

import authController from '../controllers/auth.controller'
import  verifyToken  from '../middlewares/auth.middleware';

var jsonParser=bodyParser.json();


const router = express.Router();

router.post('/signup', jsonParser, authController.signup);
router.post('/login', jsonParser, authController.login);
router.get('/profile', verifyToken, authController.profile);




export default router