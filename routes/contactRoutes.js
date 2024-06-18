const express = require('express')
const { getContact, getContacts, postContact, updateContact, deleteContact } = require('../controllers/contactController')
const validateToken = require('../middleware/validateTokenHandler')

// Creating dedicated router
const router = express.Router()


// Validate the User
router.use(validateToken)

// Setting up routes
// GET ALL CONTACTS
// router.route("/").get(getContacts)
router.route("/").get(getContacts).post(postContact)
// // POST ONE
// router.route("/").post(postContact)

// GET ONE CONTACT
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)
// UPDATE ONE CONTACT
// router.route("/:id").put(updateContact)

// DELETE ONE CONTACT
// router.route("/:id").delete(deleteContact)



// Exporting the router
module.exports = router