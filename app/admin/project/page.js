"use client";

import axios from 'axios';
import { CONFIG } from '@/configuration';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Pagination from '@/components/Pagination';
import SortingArrow from '@/components/SortingArrow';
import { handleInputChange } from '@/helper/handleInputChange';
import Cookies from 'js-cookie';
import { formErrorHandler } from '@/helper/formErrorHandler';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';

const DashboardProjectPage = () => {
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [data, setData] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [activeSortBy, setActiveSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(5);

    //  model
    const [addModal, setAddModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        link: '',
        image: null,
        errors: []
    });

    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteItem, setDeleteItem] = useState({
        id: '',
        name: ''
    })

    // get all project
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const data = {
                perPage: dataPerPage,
                page: currentPage,
                searchTerm: searchTerm,
                sortOrder: sortOrder,
                sortBy: sortBy
            };
            const response = await axios.get(`${CONFIG.BackendURL}/api/project`, { params: data });
            if (response.data.success) {
                setData(response.data.data || []);
                setTotalItem(response.data.totalItems);
            } else {
                toast.warning("something went wrong!")
            }
        } catch (error) {
            console.log(error)
            toast.error("Network error or server not reachable!");
        } finally {
            setHasFetched(true);
            setLoading(false);
        }
    }, [dataPerPage, currentPage, searchTerm, sortOrder, sortBy, setData, setTotalItem]);

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleSortOrderChange = (order, sortField) => {
        setActiveSortBy(sortField)
        setSortBy(sortField);
        setSortOrder(order);
    };


    // create project start
    const handleChange = (event) => {
        handleInputChange(event, setFormData, formData);
    };
    const handleImageChange = (event) => {
        setFormData({
            ...formData,
            image: event.target.files[0],
            errors: {
                ...formData.errors,
                image: null,
            },
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setFormLoading(true);

        const postData = new FormData();
        postData.append('name', formData.name);
        postData.append('title', formData.title);
        postData.append('link', formData.link);
        if (formData.image) {
            postData.append('image', formData.image);
        }
        try {
            const token = Cookies.get('token');
            const response = await axios.post(`${CONFIG.BackendURL}/api/project/create`, postData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
            if (response.data.success) {
                setFormData((prev) =>
                    Object.keys(prev).reduce((acc, key) => {
                        if (key === 'errors') {
                            acc[key] = [];
                        } else if (key === 'image') {
                            acc[key] = null;
                        } else {
                            acc[key] = '';
                        }
                        return acc;
                    }, {})
                );
                toast.success(response.data.message);
                setAddModal(false)
                fetchData()
            } else {
                console.log(error)
                toast.warning("something went wrong!")
            }
        } catch (error) {
            formErrorHandler(error, setFormData);
        } finally {
            setFormLoading(false);
        }
    };

    const toggleAddModal = () => {
        setAddModal(prevShow => {
            if (prevShow) {
                setFormData(prev =>
                    Object.keys(prev).reduce((acc, key) => {
                        if (key === 'image') {
                            acc[key] = null;
                        } else if (key === 'errors') {
                            acc[key] = [];
                        } else {
                            acc[key] = '';
                        }
                        return acc;
                    }, {})
                );
            }
            return !prevShow;
        });
    };
    // create project end



    // delete project start
    const openDeleteModal = (id, name) => {
        setDeleteModal(true)
        setDeleteItem({ name: name ?? '', id: id ?? '' });
    }
    const handleDelete = async () => {
        try {
            const token = Cookies.get('token');
            const response = await axios.delete(`${CONFIG.BackendURL}/api/project/${deleteItem?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                const remainingItemsOnPage = data?.length - 1;
                if (remainingItemsOnPage === 0 && currentPage > 1) {
                    setCurrentPage(prev => prev - 1);
                } else {
                    fetchData();
                }
            } else {
                toast.warning("something went wrong!")
            }
        } catch (error) {
            toast.error("Network error or server not reachable!");
        } finally {
            setDeleteModal(false)
            setDeleteItem({ id: '', name: '' });
        }
    }
    // delete team end


    // update team start
    const [updateModal, setUpdateModal] = useState(false);
    const [updateItem, setUpdateItem] = useState({
        id: '',
        name: '',
        title: '',
        link: '',
        image: null,
        errors: []
    })
    const openUpdateModal = (project) => {
        setUpdateModal(true);
        setUpdateItem(prev => ({
            ...prev,
            id: project.id,
            name: project.name || '',
            title: project.title || '',
            image: null,
            link: project.link || ''
        }));
    };
    const handleUpdateFormChange = (event) => {
        handleInputChange(event, setUpdateItem, updateItem);
    };
    const handleUpdateImageChange = (event) => {
        setUpdateItem({
            ...updateItem,
            image: event.target.files[0],
            errors: {
                ...updateItem.errors,
                image: null,
            },
        });
    };

    const handleFormUpdate = async (e) => {
        e.preventDefault();
        setFormLoading(true)

        const postData = new FormData();
        postData.append('id', updateItem.id);
        postData.append('name', updateItem.name);
        postData.append('title', updateItem.title);
        postData.append('link', updateItem.link);
        if (updateItem.image) {
            postData.append('image', updateItem.image);
        }
        try {
            const token = Cookies.get('token');
            for (let pair of postData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            const response = await axios.post(`${CONFIG.BackendURL}/api/project/update`, postData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
            if (response.data.success) {
                toast.success(response.data.message)
                fetchData()
                setUpdateModal(false);
                setUpdateItem({
                    id: '',
                    name: '',
                    title: '',
                    link: '',
                    image: null,
                    errors: []
                })
            } else {
                toast.warning("something went wrong!")
            }
        } catch (error) {
            formErrorHandler(error, setUpdateItem);
        }
        finally {
            setFormLoading(false);
        }
    }
    // update service end
    return (
        <div className="py-4">
            <h4 className="mb-4">Project List</h4>

            <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                <div>
                    <select
                        className="custom-form-select form-select form-select-sm w-auto py-2"
                        value={dataPerPage}
                        onChange={(e) => setDataPerPage(Number(e.target.value))}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <div className="flex-grow-1">
                    <input
                        type="text"
                        className="form-control form-control-sm py-2"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div>
                    <button className="btn btn-outline-primary btn-sm py-2" onClick={toggleAddModal}>Add Project</button>
                </div>
            </div>

            <div>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : hasFetched && data?.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-bordered table-sm table-hover" style={{ fontSize: "14px" }}>
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th className="pointer">
                                        <SortingArrow
                                            level={`ID`}
                                            sortBy={`id`}
                                            sortOrder={sortOrder}
                                            activeSortBy={activeSortBy}
                                            handleSortOrderChange={handleSortOrderChange} />
                                    </th>
                                    <th className="pointer">
                                        <SortingArrow
                                            level={`Name`}
                                            sortBy={`name`}
                                            sortOrder={sortOrder}
                                            activeSortBy={activeSortBy}
                                            handleSortOrderChange={handleSortOrderChange} />
                                    </th>
                                    <th className="pointer">
                                        <SortingArrow
                                            level={`Title`}
                                            sortBy={`title`}
                                            sortOrder={sortOrder}
                                            activeSortBy={activeSortBy}
                                            handleSortOrderChange={handleSortOrderChange} />
                                    </th>
                                    <th className="text-center pb-2">Link</th>
                                    <th className="text-center pb-2">Image</th>
                                    <th className='text-center pb-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className='ps-3'>{(currentPage - 1) * dataPerPage + index + 1}</td>
                                        <td className='ps-3'>{item.id}</td>
                                        <td className='text-center'>{item.name}</td>
                                        <td className='text-center'>{item.title}</td>
                                        <td className='text-center'>{item.link}</td>
                                        <td className='text-center'>
                                            {
                                                item.image ?
                                                    <Image
                                                        src={`${CONFIG.BackendURL}/storage/${item.image}`}
                                                        alt="Team"
                                                        height={30}
                                                        width={30}
                                                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                                                    />
                                                    : <i className="fas fa-image fa-2x text-muted"></i>
                                            }
                                        </td>
                                        <td className='d-flex justify-content-center'>
                                            <button
                                                onClick={() => openUpdateModal(item)}
                                                className='btn btn-sm btn-success me-2'>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(item.id, item.name)}
                                                className='btn btn-sm btn-danger'>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            {
                                data?.length > 0 ?
                                    <div className="d-flex justify-content-end">
                                        <div>
                                            <Pagination totalItem={totalItem}
                                                dataPerPage={dataPerPage}
                                                currentPage={currentPage}
                                                handlePaginate={(pageNumber) => {
                                                    setCurrentPage(pageNumber)
                                                }} />
                                            <div className='d-flex justify-content-end paginationText'>
                                                showing {data && data?.length} out of {totalItem}
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                ) : hasFetched ? (
                    <div className="alert alert-warning text-center w-100 fw-bold">
                        No project found.
                    </div>
                ) : null}
            </div>

            <div>
                <Modal show={addModal} onHide={toggleAddModal} size="lg" centered>
                    <Modal.Body>
                        <div className="p-2">
                            <div className="d-flex justify-content-between py-3">
                                <h4 className="text-uppercase fw-bold">Add Project</h4>
                                <i role="button" aria-label="Close" onClick={toggleAddModal} className="fa fa-times" style={{ fontSize: '2rem', cursor: 'pointer' }}></i>
                            </div>

                            <form onSubmit={handleFormSubmit} className="pt-3" encType="multipart/form-data">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Project Name <span className="text-danger">*</span></label>
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="name"
                                            onChange={handleChange}
                                            className={`form-control ${formData?.errors?.name ? 'is-invalid' : ''}`}
                                        />
                                        <div className="invalid-feedback">{formData?.errors?.name}</div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Title <span className="text-danger">*</span></label>
                                        <input
                                            name="title"
                                            type="text"
                                            onChange={handleChange}
                                            className={`form-control ${formData?.errors?.title ? 'is-invalid' : ''}`}
                                        />
                                        <div className="invalid-feedback">{formData?.errors?.title}</div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Project Link</label>
                                        <input
                                            name="link"
                                            type="url"
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                        <div className="invalid-feedback">{formData?.errors?.link}</div>
                                    </div>



                                    <div className="col-md-6">
                                        <label className="form-label">Photo</label>
                                        <input
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className={`form-control ${formData?.errors?.image ? 'is-invalid' : ''}`}
                                        />
                                        <div className="invalid-feedback">{formData?.errors?.image}</div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button type="submit" className="btn btn-primary w-100 py-2" disabled={formLoading}>
                                        {formLoading ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={deleteModal} onHide={() => setDeleteModal(false)} centered>
                    <Modal.Body>
                        <div className='px-3 pt-5 pb-3'>
                            <h6 className='fw-bold text-center'>Are you sure want to delete
                                <span className='text-primary'> {deleteItem?.name ?? null}?</span></h6>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className='d-flex'>
                            <button onClick={() => setDeleteModal(false)} className='btn btn-outline-dark btn-sm fw-bold me-2'>
                                <i className="bi bi-x-circle me-1"></i> Close
                            </button>
                            <button onClick={handleDelete} className='btn btn-outline-danger btn-sm fw-bold'>
                                <i className="bi bi-trash me-1"></i> Delete
                            </button>
                        </div>

                    </Modal.Footer>
                </Modal>

                <Modal show={updateModal} onHide={() => setUpdateModal(false)} size="lg" centered>
                    <Modal.Body>
                        <div className="p-2">
                            <div className="d-flex justify-content-between py-3">
                                <h4 className="text-uppercase fw-bold">Update Project</h4>
                                <i role="button" aria-label="Close" onClick={() => setUpdateModal(false)} className="fa fa-times" style={{ fontSize: '2rem', cursor: 'pointer' }}></i>
                            </div>
                            <form onSubmit={handleFormUpdate} className="pt-3" encType="multipart/form-data">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Name <span className="text-danger">*</span></label>
                                        <input
                                            name="name"
                                            type="text"
                                            value={updateItem.name}
                                            placeholder="Full name"
                                            onChange={handleUpdateFormChange}
                                            className={`form-control ${updateItem?.errors?.name ? 'is-invalid' : ''}`}
                                        />
                                        <div className="invalid-feedback">{updateItem?.errors?.name}</div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Title <span className="text-danger">*</span></label>
                                        <input
                                            name="title"
                                            type="text"
                                            value={updateItem.title}
                                            onChange={handleUpdateFormChange}
                                            className={`form-control ${updateItem?.errors?.title ? 'is-invalid' : ''}`}
                                        />
                                        <div className="invalid-feedback">{updateItem?.errors?.title}</div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Project Link</label>
                                        <input
                                            name="link"
                                            type="url"
                                            value={updateItem.link}
                                            onChange={handleUpdateFormChange}
                                            className="form-control"
                                        />
                                        <div className="invalid-feedback">{updateItem?.errors?.link}</div>
                                    </div>



                                    <div className="col-md-6">
                                        <label className="form-label">Photo</label>
                                        <input
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleUpdateImageChange}
                                            className={`form-control ${updateItem?.errors?.image ? 'is-invalid' : ''}`}
                                        />
                                        <div className="invalid-feedback">{updateItem?.errors?.image}</div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button type="submit" className="btn btn-primary w-100 py-2" disabled={formLoading}>
                                        {formLoading ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default DashboardProjectPage;