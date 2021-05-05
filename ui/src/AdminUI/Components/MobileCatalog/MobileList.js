import React, { useEffect, useState } from 'react'

import * as actions from '../../../Actions/MobileCatalogAction';
import { useMobileCatalogDispatch, useMobileCatalogState } from '../../../Context/MobileCatalogContext';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Spinner } from "reactstrap";
import './MobileList.css';
import ModalDelete from "./ModalDelete";
import ModalDetails from "./ModalDetails";
import Header from "../Header/Header";
import AddMobile from "./AddMobile";
import EditMobile from "./EditMobile";
import config from '../../../config';

function MobileList(props) {
    let mobileCatalogDispatch = useMobileCatalogDispatch();
    let { mobilecatalogs } = useMobileCatalogState();

    let [isModalOpen, setIsModalOpen] = useState(false);
    let [isAddModalOpen, setIsAddModalOpen] = useState(false);
    let [isEditModalOpen, setIsEditModalOpen] = useState(false);
    let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    let [mobile, setMobile] = useState({});
    let [isLoading, setIsLoading] = useState(true);

    // eslint-disable-next-line
    useEffect(async () => {
        await actions.getAllMobileCatalog(mobileCatalogDispatch);
        setIsLoading(false)
    }, []); //eslint-disable-line

    const toggle = (data) => {
        setMobile(data)
        setIsModalOpen(!isModalOpen)
    }

    const toggleDelete = (data) => {
        setMobile(data)
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }

    const toggleEdit = (data) => {
        setMobile(data)
        setIsEditModalOpen(!isEditModalOpen)
    }

    const toggleAdd = () => {
        setMobile({})
        setIsAddModalOpen(!isAddModalOpen)
    }

    let data = null;
    data = mobilecatalogs.map(m => {
        let image = config.phone_image_path + m.imageFileName;
        data = (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 my-4" key={m._id}>
                <Card className="product-card">
                    <CardImg top src={image} alt="Phone Image" height="100px" className="align-self-center mt-5 mb-3" />
                    <CardBody className="text-center">
                        <CardTitle tag="h4"><b>
                            <p onClick={() => { toggle(m) }} style={{ color: "#FD886E" }}>{m.name}</p></b>
                        </CardTitle>
                        <CardText>
                            <div>
                                <div className="font-weight-bold">
                                    $ {m.price}
                                </div>
                                <div className="text-secondary">
                                    {m.description}
                                </div>
                            </div>
                        </CardText>
                        <div>
                            <Button className="mr-3 primary-btn" onClick={() => toggleEdit(m)}>Edit</Button>
                            <Button className="secondary-btn" onClick={() => toggleDelete(m)}>Delete</Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
        return data;
    })

    return (
        <>
            <Header />
            {isLoading ? (
                <div className="text-center">
                    <Spinner className="phone-spinner" />
                </div>
            ) : (
                <div className="page-content container">
                    <div className="d-flex align-items-center header justify-content-between">
                        <div className="bg-custom" />
                        <h2>Phone List</h2>
                        <Button className="secondary-btn" onClick={() => { toggleAdd() }}>Add + </Button>
                    </div>
                    <div className="row list-body">
                        {data}
                    </div>
                </div>
            )}
            <ModalDetails
                isModalOpen={isModalOpen}
                toggle={toggle}
                mobile={mobile}
            />

            {isAddModalOpen &&
                <AddMobile
                    isAddModalOpen={isAddModalOpen}
                    toggleAdd={toggleAdd}
                />}

            <EditMobile
                isEditModalOpen={isEditModalOpen}
                toggleEdit={toggleEdit}
                mobileData={mobile}
            />

            <ModalDelete
                isDeleteModalOpen={isDeleteModalOpen}
                toggleDelete={toggleDelete}
                mobile={mobile}
            />
        </>
    )
};

export default MobileList;