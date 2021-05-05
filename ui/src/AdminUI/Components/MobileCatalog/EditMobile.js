import React, { useEffect, useState } from 'react'

import * as actions from '../../../Actions/MobileCatalogAction';

import { useMobileCatalogDispatch, useMobileCatalogState } from '../../../Context/MobileCatalogContext';
import { ModalHeader, Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import config from "../../../config";

function EditMobile(props) {
    let { isEditModalOpen, toggleEdit, mobileData } = props;
    let { error } = useMobileCatalogState();
    let mobileCatalogDispatch = useMobileCatalogDispatch();
    let [mobile, setMobile] = useState({});
    let [validation, setValidation] = useState("");
    let [valid, setValid] = useState(true);
    let [image, setImage] = useState(null);

    useEffect(() => {
        if (mobileData != null) {
            let i = <img src={config.phone_image_path + mobileData.imageFileName} height="100px" width="100px" alt={mobileData.name} />;
            setImage(i);
            setMobile({
                id: mobileData._id,
                name: mobileData.name,
                manufacturer: mobileData.manufacturer,
                description: mobileData.description,
                color: mobileData.color,
                price: mobileData.price,
                imageFileName: mobileData.imageFileName,
                screen: mobileData.screen,
                processor: mobileData.processor,
                ram: mobileData.ram
            })
        }
    }, [mobileData])

    const handleChange = (event) => {
        const { name, value } = event.target
        setMobile({
            ...mobile,
            [name]: value
        })
    }

    const onFileChange = (event) => {
        let err = {};
        const imageFile = event.target.files[0];
        const { name } = event.target
        if (imageFile) {
            setMobile({
                ...mobile,
                [name]: imageFile
            })
            setImage(null);
            if (!imageFile) {
                setValid(false)
                err["image"] = "Please uplaod image.";
            }
            else if (typeof imageFile !== "undefined") {
                if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
                    setValid(false)
                    err["image"] = "Must be an image format."
                }
                else {
                    setValid(true)
                }
            }
            setValidation(err);
        }
    }

    const reset = () => {
        setImage(null);
        setMobile({});
        setValidation("");
        error = "";
    }

    const editMobileCatalog = async (event) => {
        event.preventDefault();
        if (await validate() && valid) {
            const data = new FormData()
            data.append('name', mobile.name)
            data.append('manufacturer', mobile.manufacturer)
            data.append('description', mobile.description)
            data.append('color', mobile.color)
            data.append('price', mobile.price)
            data.append('imageFileName', mobile.imageFileName)
            data.append('screen', mobile.screen)
            data.append('processor', mobile.processor)
            data.append('ram', mobile.ram)
            await actions.updateMobileCatalog(mobileCatalogDispatch, mobile.id, data);
            await actions.getAllMobileCatalog(mobileCatalogDispatch);
            toggleEdit(mobile)
        }
    }

    const validate = () => {
        let err = {};
        let isValid = true;
        if (!mobile.name) {
            isValid = false;
            err["name"] = "Please enter name.";
        }

        if (!mobile.manufacturer) {
            isValid = false;
            err["manufacturer"] = "Please enter manufacturer.";
        }

        if (!mobile.description) {
            isValid = false;
            err["description"] = "Please enter description.";
        }

        if (!mobile.color) {
            isValid = false;
            err["color"] = "Please enter color.";
        }

        if (!mobile.price) {
            isValid = false;
            err["price"] = "Please enter price.";
        }
        if (!mobile.screen) {
            isValid = false;
            err["screen"] = "Please enter screen.";
        }
        if (!mobile.processor) {
            isValid = false;
            err["processor"] = "Please enter processor.";
        }
        if (!mobile.ram) {
            isValid = false;
            err["ram"] = "Please enter ram.";
        }

        setValidation(err)
        return isValid;
    }

    return (
        <>
            <Modal isOpen={isEditModalOpen} toggle={toggleEdit} centered scrollable className="common-modal">
                <ModalHeader toggle={toggleEdit}>Edit Phone Details</ModalHeader>
                <ModalBody>
                    <div className="page-content" style={{ height: "100%" }} >
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <input type="hidden" name="id" value={mobile.id} />
                                    <div className="form-group row">
                                        <label className="col-form-label col-lg-3">Name <span
                                            className="text-danger">*</span></label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" name="name"
                                                placeholder="Enter Name"
                                                value={mobile.name}
                                                onChange={handleChange}
                                            />
                                            <div className="error">{validation["name"]}</div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-form-label col-lg-3 d-flex">Manufacture <span
                                            className="text-danger">*</span></label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" name="manufacturer"
                                                placeholder="Enter Manufacture Name"
                                                value={mobile.manufacturer}
                                                onChange={handleChange}
                                            />
                                            <div className="error">{validation["manufacturer"]}</div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-form-label col-lg-3 d-flex">Description <span
                                            className="text-danger">*</span></label>
                                        <div className="col-lg-9">
                                            <textarea rows="3" name="description" cols="3"
                                                className="form-control" placeholder="Enter Description"
                                                aria-invalid="true"
                                                value={mobile.description}
                                                onChange={handleChange}></textarea>
                                            <div className="error">{validation["description"]}</div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-form-label col-lg-3">Color <span
                                            className="text-danger">*</span></label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" name="color"
                                                placeholder="Enter Color"
                                                value={mobile.color}
                                                onChange={handleChange}
                                            />
                                            <div className="error">{validation["color"]}</div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-form-label col-lg-3">Price <span
                                            className="text-danger">*</span></label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="number" name="price"
                                                placeholder="Enter Price"
                                                value={mobile.price}
                                                onChange={handleChange}
                                            />
                                            <div className="error">{validation["price"]}</div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-form-label col-lg-3">Image <span
                                            className="text-danger">*</span></label>
                                        <div className="col-lg-9">
                                            <input className="form-control phone-file" type="file" name="imageFileName"
                                                onChange={onFileChange}
                                            />
                                            <div className="mb-2 error">{validation["image"]}</div>
                                            {image}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-form-label col-lg-3">Screen <span
                                            className="text-danger">*</span></label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" name="screen"
                                                placeholder="Enter Screen"
                                                value={mobile.screen}
                                                onChange={handleChange}
                                            />
                                            <div className="error">{validation["screen"]}</div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-form-label col-lg-3">Processor <span
                                            className="text-danger">*</span></label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" name="processor"
                                                placeholder="Enter Processor"
                                                value={mobile.processor}
                                                onChange={handleChange}
                                            />
                                            <div className="error">{validation["processor"]}</div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-form-label col-lg-3">RAM <span
                                            className="text-danger">*</span></label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="number" name="ram"
                                                placeholder="Enter Ram"
                                                value={mobile.ram}
                                                onChange={handleChange}
                                            />
                                            <div className="error">{validation["ram"]}</div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="error">{error}</div>
                        <div className="d-flex align-items-center">
                            <Button onClick={reset} className="secondary-btn mr-3" type="reset">Reset</Button>
                            <Button type="submit" className="primary-btn" onClick={editMobileCatalog} >Edit</Button>
                        </div>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default EditMobile;