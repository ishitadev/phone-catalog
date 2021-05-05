import React from 'react'

import * as actions from '../../../Actions/MobileCatalogAction';
import { useMobileCatalogDispatch } from '../../../Context/MobileCatalogContext';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import './MobileList.css';

function ModalDelete(props) {

    let mobileCatalogDispatch = useMobileCatalogDispatch();
    let {isDeleteModalOpen,toggleDelete,mobile} = props;

    const remove = async (id) => {
        await actions.removeMobileCatalog(mobileCatalogDispatch, id);
        await actions.getAllMobileCatalog(mobileCatalogDispatch);
        toggleDelete(mobile)
    }

    return (
        <Modal isOpen={isDeleteModalOpen} toggle={toggleDelete} centered>
            <ModalHeader toggle={toggleDelete}>Delete Phone</ModalHeader>
            <ModalBody>
                <div>
                    Are you sure to delete <b>{mobile.name}</b>?
                </div>
            </ModalBody>
            <ModalFooter>
                <div className="d-flex align-items-center justify-content-between w-100">
                    <div></div>
                    <div className="d-flex align-items-center">
                        <Button className="secondary-btn mr-3" onClick={() => toggleDelete(mobile)}>No</Button>
                        <Button type="submit" className="primary-btn"  onClick={() => remove(mobile._id)} >Yes</Button>
                    </div>
                </div>
            </ModalFooter>
        </Modal>
    )
}
export default ModalDelete;