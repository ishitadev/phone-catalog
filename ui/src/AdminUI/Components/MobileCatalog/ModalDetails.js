import React from 'react'

import { Modal, ModalHeader, ModalBody } from "reactstrap";
import config from '../../../config';
import './MobileList.css';

function ModalDetails(props) {

    let { isModalOpen, toggle, mobile } = props;

    return (
        <Modal isOpen={isModalOpen} toggle={toggle} centered scrollable>
            <ModalHeader toggle={toggle}>Phone Details</ModalHeader>
            <ModalBody>
                <div className="text-center">
                    <img src={config.phone_image_path + mobile.imageFileName} alt="Phone Images" height="300px" width="300px" />
                </div>
                <div className="product-detail pt-3 text-center">
                    <div className="product-head">
                        <h6>{mobile.name}</h6>
                        <span>
                            Manufacturer : <u>{mobile.manufacturer}</u>
                        </span>
                        <div className="product-price font-weight-bold mt-2">
                            $ {mobile.price}
                        </div>
                    </div>
                    <div className="product-description">
                        <div className="about-detail my-3 p-3">
                            <h6>About item</h6>
                            <p className="mb-0">{mobile.description}</p>
                        </div>
                        <div className="product-info">
                            <table>
                                <tr>
                                    <td>Color :</td>
                                    <td>{mobile.color}</td>
                                </tr>
                                <tr>
                                    <td>Screen :</td>
                                    <td>{mobile.screen}</td>
                                </tr>
                                <tr>
                                    <td>Processor :</td>
                                    <td>{mobile.processor}</td>
                                </tr>
                                <tr>
                                    <td>RAM :</td>
                                    <td>{mobile.ram} GB</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                </div>
            </ModalBody>
        </Modal>
    )
}
export default ModalDetails;