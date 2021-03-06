const router = require('express').Router();

let { getCatalog, addCatalog, updateCatalog, removeCatalog, getCatalogById } = require("../Services/CatalogService");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/phone')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100)
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.originalname.split(".")[1])
    }
});
const cpUpload = multer({ storage: storage });
let upload = cpUpload.fields([{ name: 'imageFileName', maxCount: 1 }])

router.get("/phone", getCatalog);
router.post("/phone", upload, addCatalog);
router.get("/phone/:id", getCatalogById);
router.patch("/phone/:id", upload, updateCatalog);
router.delete("/phone/:id", removeCatalog);


module.exports = router;