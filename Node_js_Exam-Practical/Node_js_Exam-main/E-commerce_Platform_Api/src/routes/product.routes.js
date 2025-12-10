const express = require("express");
const { verifytoken, Roleverify } = require("../middleware/verifytoken.middleware");
const uploadImage = require("../middleware/multer.middleware");
const { addProduct, EditProduct, DeleteProduct, Viewallproduct, viewSingleProduct } = require("../controller/product.controller");

const routes = express.Router();

routes.post("/Addproduct", verifytoken, Roleverify("Admin"), uploadImage.single("image"), addProduct);
routes.put("/Editproduct/:id", verifytoken, Roleverify("Admin"), uploadImage.single("image"), EditProduct);
routes.put("/Deleteproduct/:id", verifytoken, Roleverify("Admin"), DeleteProduct);
routes.get("/viewallproduct", verifytoken, Roleverify("Admin","User"), Viewallproduct);
routes.get("/viewSingleProduct/:id", verifytoken, Roleverify("Admin","User"), viewSingleProduct)

module.exports = routes;