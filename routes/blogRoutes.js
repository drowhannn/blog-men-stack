const express = require("express");
const blogController = require("../controllers/blogControllers");
const router = express.Router();

// blog routes
router.get("/create", blogController.blog_create);

router.get("/", blogController.blog_index);

router.post("/", blogController.blog_index_post);

router.get("/:id", blogController.blog_id);

router.delete("/:id", blogController.blog_id_delete);

module.exports = router;
