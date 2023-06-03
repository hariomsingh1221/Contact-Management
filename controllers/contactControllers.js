const expressAsyncHandler = require('express-async-handler');
const contactModel = require('../models/contactModel');

// @desc for contacts
// @route GET /api/contacts
// @access private
const getAllContacts = expressAsyncHandler(async (req, res) => {
    const contacts = await contactModel.find({ user_id: req.user.userId });
    res.send(contacts);
});

// @desc for contacts
// @route GET /api/contacts
// @access private
const getContactById = expressAsyncHandler(async (req, res) => {
    const contact_id = req.params.id;
    const contact = await contactModel.findById(contact_id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    res.send(contact);
});

// @desc for contacts
// @route POST /api/contacts
// @access private
const createContact = expressAsyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields are mendatory");
    }

    const contact = await contactModel.create({
        name,
        email,
        phone,
        user_id: req.user.userId
    });
    res.status(201).send(contact);
})

// @desc for contacts
// @route PUT /api/contacts
// @access private
const updateContact = expressAsyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.userId) {
        res.status(403);
        throw new Error("Unauthorised to update contact");
    }

    const updatedContact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

// @desc for contacts
// @route DELETE /api/contacts
// @access private
const deleteContact = expressAsyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.userId) {
        res.status(403);
        throw new Error("Unauthorised to update contact");
    }

    await contactModel.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };
