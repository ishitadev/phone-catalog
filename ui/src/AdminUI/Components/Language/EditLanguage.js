import React, { useEffect, useState } from 'react'

import * as actions from '../../../Actions/LanguageAction';

import { useMobileCatalogDispatch, useMobileCatalogState } from '../../../Context/LanguageContext';


function EditLanguage(props) {
    var { error, mobilecatalog } = useMobileCatalogState();
    var mobileCatalogDispatch = useMobileCatalogDispatch();
    var [name, setName] = useState("");
    var [description, setDescription] = useState("");
    var [validation, setValidation] = useState("");
    var [id, setId] = useState(props.match.params.id);

    useEffect(async () => {
        await actions.getMobileCatalogById(mobileCatalogDispatch, id);
    }, [])

    useEffect(async () => {
        if (mobilecatalog != null) {
            setName(mobilecatalog.name)
            setDescription(mobilecatalog.description)
        }
    }, [mobilecatalog])



    const reset = () => {
        setName("");
        setDescription("");
        setValidation("");
        error = "";
        mobilecatalog = "";
    }

    const editmobilecatalog = async (event) => {
        event.preventDefault();
        if (await validate()) {
            const data = {
                name,
                description
            }
            await actions.updateMobileCatalog(mobileCatalogDispatch, id, data);
            props.history.push('/')
        }
    }

    const validate = () => {
        let err = {};
        let isValid = true;

        if (!name) {
            isValid = false;
            err["name"] = "Please enter name.";
        }

        if (!description) {
            isValid = false;
            err["description"] = "Please enter description.";
        }

        setValidation(err)
        return isValid;
    }
    return (
        <>
            <div className="page-content" style={{ height: "100%" }} >
                <div class="content-wrapper">
                    <div class="page-header page-header-light">
                        <div class="page-header-content header-elements-md-inline" style={{ height: "55px" }}>
                            <div class="page-title d-flex">
                                <h4><span class="font-weight-semibold">Edit language </span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>
                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="#" class="breadcrumb-item">Edit Language</a>
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

                                    </div>

                                    <div class="card-body">
                                        <form onSubmit={editmobilecatalog} onReset={reset}>
                                            <input type="hidden" name="id" value={id} />


                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Name <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="name" name="name"
                                                        value={name} onChange={(e) => setName(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["name"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Description <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <textarea rows="3" name="description" cols="3" class="form-control" placeholder="Enter Description" aria-invalid="true"
                                                        value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                                    <div className="validation-invalid-label">{validation["description"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row mb-0">
                                                <div class="col-lg-10 ml-lg-auto">
                                                    <button type="reset" style={{ borderColor: "#26a69a" }} class="btn btn-light"
                                                    >Reset<i class="icon-reset ml-2"></i></button>
                                                    <button type="submit" class="btn bg-teal-400 ml-3">Edit <i class="icon-paperplane ml-2"></i></button>
                                                    <div style={{ color: "red", fontSize: "18px", paddingTop: "5px" }}>{error}</div>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>


                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default EditLanguage;