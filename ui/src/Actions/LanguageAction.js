import * as ActionNames from '../ActionNames';
import axios from '../axios';

export const addMobileCatalog = async (mobileCatalogDispatch, mobileCatalog) => {
    await axios.post('/phone', mobileCatalog)
        .then(async (response) => {
            mobileCatalogDispatch({
                type: ActionNames.ADD_MOBILE_CATALOG,
                data: {
                    mobilecatalog: response.data
                }
            });
        }).catch(error => {
            mobileCatalogDispatch({
                type: ActionNames.ADD_MOBILE_CATALOG_FAILED,
                data: {
                    error: "Something Went Wrong"
                }
            });
        })
};


export const getAllMobileCatalog = async (mobileCatalogDispatch) => {
    await axios.get('/phone')
        .then(async (response) => {
            mobileCatalogDispatch({
                type: ActionNames.MOBILE_CATALOG_LIST,
                data: {
                    mobilecatalogs: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const removeMobileCatalog = async (mobileCatalogDispatch, id) => {
    await axios.delete('/phone/' + id)
        .then(async (response) => {
            mobileCatalogDispatch({
                type: ActionNames.REMOVE_MOBILE_CATALOG,
                data: {
                    mobilecatalog: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const getMobileCatalogById = async (mobileCatalogDispatch, id) => {
    await axios.get('/phone/' + id)
        .then(async (response) => {
            mobileCatalogDispatch({
                type: ActionNames.GET_MOBILE_CATALOG,
                data: {
                    mobilecatalog: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const updateMobileCatalog = async (mobileCatalogDispatch, id, mobileCatalog) => {
    await axios.patch('/phone/' + id, mobileCatalog)
        .then(async (response) => {
            mobileCatalogDispatch({
                type: ActionNames.UPDATE_MOBILE_CATALOG,
                data: {
                    mobilecatalog: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};
