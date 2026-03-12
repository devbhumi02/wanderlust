const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
.route("/")
.get(WrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single('listing[image]'),
    WrapAsync(listingController.createListing)
    
);

// new route "GET" to serve form for create new list
router.get("/new",isLoggedIn,listingController.renderNewForm);
WrapAsync(listingController.renderNewForm);

router.route("/:id")
.get(WrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner, upload.single('listing[image]'),validateListing, WrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,WrapAsync(listingController.destroyListing));

// edit route "GET" - to serve form for edit 
router.get("/:id/edit",isLoggedIn,isOwner,WrapAsync(listingController.renderEditForm));

module.exports = router;