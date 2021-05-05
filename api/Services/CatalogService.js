const Catalog = require('../models/Catalog');

exports.getCatalog = async (req, res) => {
    try {
        Catalog.find({}, (err, result) => {
            if (err) return res.status(400).send({ error: err })
            res.status(200).send(result)
        })

    } catch (err) {
        res.status(400).send(err);
    }
}

exports.addCatalog = async (req, res) => {
    try {
        if (req.body == undefined) return res.send({ error: "All Filed is Required" })

        if (isNaN(req.body.price)) return res.send({ error: "Price is in invalid format!!" })
        if (isNaN(req.body.ram)) return res.send({ error: "Ram is in invalid format!!" })
        const phoneCatalogue = new Catalog({
            ...req.body,
            imageFileName: req.files.imageFileName[0].filename
        });
        const result = await phoneCatalogue.save();

        if (!result) {
            return res.status(400).send("Add phone in catalog failed");
        }
        return res.status(201).send({ msg: "Phone add successfully", phone: result });

    } catch (err) {
        res.status(400).send(err);
    }
}

exports.getCatalogById = async (req, res) => {
    try {
        Catalog.findById(req.params.id, (err, result) => {
            if (err) return res.status(400).send({ error: err })
            res.status(200).send(result)
        })

    } catch (err) {
        res.status(400).send(err);
    }
}

exports.updateCatalog = async (req, res) => {
    try {

        const phoneResult = await Catalog.findById(req.params.id)
        if (!phoneResult) return res.status(404).send({ msg: "PhoneCatalogue Not Found!!" })
        let updatePhoneCatalog = {};
        if (req.files.imageFileName) {
            updatePhoneCatalog = {
                ...req.body,
                imageFileName: req.files.imageFileName[0].filename
            }
        }
        else {
            updatePhoneCatalog = {
                ...req.body
            }
        }

        await Catalog.findOneAndUpdate({ _id: req.params.id }, updatePhoneCatalog)
        const updatedPhoneCatalog = await Catalog.find({ _id: req.params.id })

        res.status(200).send({ msg: "Phone updated successfully!!", Phone: updatedPhoneCatalog })

    } catch (err) {
        res.status(400).send({ msg: "PhoneCatalogue not found", err });
    }
}

exports.removeCatalog = async (req, res) => {
    try {
        const phoneDeleteCatalog = await Catalog.findOneAndDelete({ _id: req.params.id })

        if (!phoneDeleteCatalog) {
            return res.status(404).send({ msg: "Phone not found in catalog" })
        }

        res.status(200).send({
            Msg: "Phone Deleted Sucessfully!!!",
            DeletedPhone: phoneDeleteCatalog
        })

    } catch (err) {
        res.status(400).send({ msg: "Phone not found in catalog", error: err });
    }
}

