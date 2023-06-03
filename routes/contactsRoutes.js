const express = require('express');
const router = express.Router();
const { getAllContacts, createContact, updateContact, deleteContact, getContactById} = require('../controllers/contactControllers');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getAllContacts).post(createContact);
router.route('/:id').get(getContactById).put(updateContact).delete(deleteContact);;

module.exports = router;
