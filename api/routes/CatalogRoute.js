const router = require('express').Router();

var catalog = require("../Services/CatalogService");

var { getCatalog, addCatalog, updateCatalog, removeCatalog } = catalog

router.get("/phone", getCatalog);
router.post("/phone", addCatalog);
router.patch("/phone/:id", updateCatalog);
router.delete("/phone/:id", removeCatalog);


module.exports = router;