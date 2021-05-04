import React, { useEffect } from 'react'

import * as actions from '../../../Actions/LanguageAction';

import { useMobileCatalogDispatch, useMobileCatalogState } from '../../../Context/LanguageContext';

function LanguageList(props) {

    var mobileCatalogDispatch = useMobileCatalogDispatch();
    var { mobilecatalogs } = useMobileCatalogState();

    useEffect(async () => {
        await actions.getAllMobileCatalog(mobileCatalogDispatch);
    }, [])

    const edit = (id) => {
        props.history.push("/admin/editlanguage/" + id)
    }

    const remove = async (id) => {
        if (window.confirm('Are you sure to delete this mobile?')) {
            await actions.removeMobileCatalog(mobileCatalogDispatch, id);
            await actions.getAllMobileCatalog(mobileCatalogDispatch);
        }
    }

    var data = null;
    data = mobilecatalogs.map(m => {

        data = (
            <tr>
                <td>{m.name}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-center">
                    <div class="list-icons">
                        <div class="dropdown">
                            <a href="#" class="list-icons-item" data-toggle="dropdown">
                                <i class="icon-menu9"></i>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right">
                                <a onClick={() => edit(m._id)} class="dropdown-item"><i class="icon-pencil"></i>Edit</a>
                                <a onClick={() => remove(m._id)} class="dropdown-item"><i class="icon-cross2"></i>Delete</a>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>

        )
        return data;
    })

    const addlanguage = () => {
        props.history.push("/addlanguage");
    }


    return (
        <>
            <div className="page-content" style={{ height: "100%" }} >
                <div class="content-wrapper">

                    <div class="page-header page-header-light">
                        <div class="page-header-content header-elements-md-inline" style={{ height: "55px" }}>
                            <div class="page-title d-flex">
                                <h4> <span class="font-weight-semibold">Language List</span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/" class="breadcrumb-item">Language List</a>
                                </div>

                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>
                    </div>

                    <div class="content">

                        <div class="row" style={{ marginBottom: "50px" }}>
                            <div class="col-md-12">

                                <div class="card">
                                    <div class="card-header header-elements-inline">
                                        <h5 class="card-title"></h5>
                                        <div class="header-elements">
                                            <div class="list-icons">
                                                <button onClick={addlanguage} class="btn bg-teal-400 ml-3">Add <i class="icon-plus3 ml-2"></i></button>

                                            </div>
                                        </div>
                                    </div>

                                    <table class="table datatable-basic table-hover">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th colSpan="4" class="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {data}

                                        </tbody>
                                    </table>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LanguageList;