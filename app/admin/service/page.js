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

const DashboardservicePage = () => {
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
        title: "",
        icon: "",
        description: "",
        errors: []
    });

    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteItem, setDeleteItem] = useState({
        id: '',
        title: ''
    })

    // get all service
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
            const response = await axios.get(`${CONFIG.API}/service`, { params: data });
            if (response.data.success) {
                setData(response.data.data || []);
                setTotalItem(response.data.totalItems);
            } else {
                toast.warning("something went wrong!")
            }
        } catch (error) {
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


    // create service start
    const handleChange = (event) => {
        handleInputChange(event, setFormData, formData);
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setFormLoading(true);
        try {
            const { errors, ...postData } = formData;
            const token = Cookies.get('token');
            const response = await axios.post(`${CONFIG.API}/service/create`, postData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            if (response.data.success) {
                setFormData((prev) =>
                    Object.keys(prev).reduce((acc, key) => {
                        acc[key] = key === 'errors' ? [] : '';
                        return acc;
                    }, {})
                );
                toast.success(response.data.message);
                setAddModal(false)
                fetchData()
            } else {
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
                        acc[key] = key === 'errors' ? [] : '';
                        return acc;
                    }, {})
                );
            }
            return !prevShow;
        });
    };
    // create service end



    // delete service start
    const openDeleteModal = (id, title) => {
        setDeleteModal(true)
        setDeleteItem({ title: title ?? '', id: id ?? '' });
    }
    const handleDelete = async () => {
        try {
            const token = Cookies.get('token');
            const response = await axios.delete(`${CONFIG.API}/service/${deleteItem?.id}`, {
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
            setDeleteItem({ id: '', title: '' });
        }
    }
    // delete service end






    // update service start
    const [updateModal, setUpdateModal] = useState(false);
    const [updateItem, setUpdateItem] = useState({
        id: '',
        title: '',
        icon: '',
        description: '',
        errors: []
    })
    const openUpdateModal = (service) => {
        setUpdateModal(true);
        setUpdateItem(prev => ({
            ...prev,
            id: service.id,
            icon: service.icon || '',
            title: service.title || '',
            description: service.description || '',
        }));
    };
    const handleUpdateFormChange = (event) => {
        handleInputChange(event, setUpdateItem, updateItem);
    };
    const handleFormUpdate = async (e) => {
        e.preventDefault();
        setFormLoading(true)
        try {
            const { errors, ...postData } = updateItem;
            const token = Cookies.get('token');
            const response = await axios.post(`${CONFIG.API}/service/update`, postData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            if (response.data.success) {
                toast.success(response.data.message)
                fetchData()
                setUpdateModal(false);
                setUpdateItem({
                    id: '',
                    title: '',
                    icon: '',
                    description: '',
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
            <h4 className="mb-4">Service List</h4>

            <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                <div>
                    <select
                        className="custom-form-select form-select form-select-sm w-auto"
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
                        className="form-control form-control-sm py-1"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div>
                    <button className="btn btn-outline-primary btn-sm" onClick={toggleAddModal}>Create Service</button>
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
                        <table className="table table-bordered table-sm table-hover">
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
                                            level={`Title`}
                                            sortBy={`title`}
                                            sortOrder={sortOrder}
                                            activeSortBy={activeSortBy}
                                            handleSortOrderChange={handleSortOrderChange} />
                                    </th>
                                    <th className="pointer">
                                        <SortingArrow
                                            level={`Icon`}
                                            sortBy={`icon`}
                                            sortOrder={sortOrder}
                                            activeSortBy={activeSortBy}
                                            handleSortOrderChange={handleSortOrderChange} />
                                    </th>
                                    <th className="pointer">
                                        <SortingArrow
                                            level={`Description`}
                                            sortBy={`description`}
                                            sortOrder={sortOrder}
                                            activeSortBy={activeSortBy}
                                            handleSortOrderChange={handleSortOrderChange} />
                                    </th>
                                    <th className="pointer">
                                        <SortingArrow
                                            level={`Created At`}
                                            sortBy={`created_at`}
                                            sortOrder={sortOrder}
                                            activeSortBy={activeSortBy}
                                            handleSortOrderChange={handleSortOrderChange} />
                                    </th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className='ps-3'>{(currentPage - 1) * dataPerPage + index + 1}</td>
                                        <td className='ps-3'>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td className='text-center'><i className={`${item.icon}`}></i></td>
                                        <td className='text-center'>
                                            <span>{item.description.length > 50
                                                ? item.description.slice(0, 50) + '...'
                                                : item.description}</span>
                                        </td>
                                        <td className='text-center'>{new Date(item.created_at).toLocaleDateString()}</td>
                                        <td className='d-flex justify-content-center'>
                                            <button
                                                onClick={() => openUpdateModal(item)}
                                                className='btn btn-sm btn-success me-2'>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(item.id, item.title)}
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
                        No service found.
                    </div>
                ) : null}
            </div>

            <div>
                <Modal show={addModal} onHide={toggleAddModal} centered>
                    <Modal.Body>
                        <div className="p-2">
                            <div className="d-flex justify-content-between py-3">
                                <h4 className="text-uppercase fw-bold">Add New Service</h4>
                                <i role="button" aria-label="Close" onClick={toggleAddModal} className="fa fa-times" style={{ fontSize: '2rem', cursor: 'pointer' }}></i>
                            </div>
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-3">
                                    <label className="mb-2">Title <span className="text-danger">*</span></label>
                                    <input
                                        name="title"
                                        type="text"
                                        placeholder="Enter title"
                                        onChange={handleChange}
                                        className={`form-control ${formData?.errors?.title ? 'is-invalid' : ''}`} />
                                    <small className="validation-error">
                                        {formData?.errors?.title || null}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <label className="mb-2">Icon Class<span className="text-danger">*</span></label>
                                    <input
                                        name="icon"
                                        type="text"
                                        placeholder="e.g., fa fa-search"
                                        onChange={handleChange}
                                        className={`form-control ${formData?.errors?.icon ? 'is-invalid' : ''}`} />
                                    <small className="validation-error">
                                        {formData?.errors?.icon || null}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <label className="mb-2">Description <span className="text-danger">*</span></label>
                                    <textarea
                                        name="description"
                                        rows={6}
                                        placeholder="Write something..."
                                        onChange={handleChange}
                                        className={`form-control ${formData?.errors?.description ? 'is-invalid' : ''}`} />
                                    <small className="validation-error">
                                        {formData?.errors?.description || null}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary w-100 py-2" disabled={formLoading}>
                                        {formLoading ? "Submitting..." : "Submit"}
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
                                <span className='text-primary'> {deleteItem?.title ?? null}?</span></h6>
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

                <Modal show={updateModal} onHide={() => setUpdateModal(false)} centered>
                    <Modal.Body>
                        <div className="p-2">
                            <div className="d-flex justify-content-between py-3">
                                <h4 className="text-uppercase fw-bold">Update Service</h4>
                                <i role="button"
                                    aria-label="Close"
                                    onClick={() => setUpdateModal(false)}
                                    className="fa fa-times" style={{ fontSize: '2rem', cursor: 'pointer' }}></i>
                            </div>
                            <form onSubmit={handleFormUpdate}>
                                <div className="mb-3">
                                    <label className="mb-2">Title <span className="text-danger">*</span></label>
                                    <input
                                        name="title"
                                        type="text"
                                        value={updateItem.title}
                                        placeholder="Enter title"
                                        onChange={handleUpdateFormChange}
                                        className={`form-control ${updateItem?.errors?.title ? 'is-invalid' : ''}`} />
                                    <small className="validation-error">
                                        {updateItem?.errors?.title || null}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <label className="mb-2">Icon Class<span className="text-danger">*</span></label>
                                    <input
                                        name="icon"
                                        type="text"
                                        value={updateItem.icon}
                                        placeholder="e.g., fa fa-search"
                                        onChange={handleUpdateFormChange}
                                        className={`form-control ${updateItem?.errors?.icon ? 'is-invalid' : ''}`} />
                                    <small className="validation-error">
                                        {updateItem?.errors?.icon || null}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <label className="mb-2">Description <span className="text-danger">*</span></label>
                                    <textarea
                                        rows={6}
                                        name="description"
                                        value={updateItem.description}
                                        placeholder="Write something..."
                                        onChange={handleUpdateFormChange}
                                        className={`form-control ${updateItem?.errors?.description ? 'is-invalid' : ''}`} />
                                    <small className="validation-error">
                                        {updateItem?.errors?.description || null}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary w-100 py-2" disabled={formLoading}>
                                        {formLoading ? "Submitting..." : "Submit"}
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

export default DashboardservicePage;