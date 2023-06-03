const express = require('express');
const router = express.Router();
const { signup, login, getUser } = require('../controllers/userControllers');
const validateToken = require('../middleware/validateTokenHandler');

router.get('/current', validateToken , getUser);
router.post('/signup',  signup);
router.post('/login', login);


module.exports = router;
