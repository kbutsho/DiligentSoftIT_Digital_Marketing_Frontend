"use client";

import { ROLE } from "@/constant/role";
import { handelInputChange } from "@/helper/handelInputChange";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CONFIG } from '@/configuration';

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        errors: []
    });

    useEffect(() => {
        const role = Cookies.get('role');
        const token = Cookies.get('token');
        if (token && role) {
            if (role === ROLE.ADMIN) {
                router.push('/admin/dashboard');
            }
        }
    }, [router]);

    const handleChange = (event) => {
        handelInputChange(event, setFormData, formData);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { errors, ...postData } = formData;
            const response = await axios.post(`${CONFIG.API}/auth/login`, postData);
            if (response.data.success) {
                setFormData((prev) =>
                    Object.keys(prev).reduce((acc, key) => {
                        acc[key] = key === 'errors' ? [] : '';
                        return acc;
                    }, {})
                );
            }
            toast.success(response.data.message);
            if (response.data.token && response.data.role) {
                Cookies.set('role', response.data.role, { expires: CONFIG.EXPIRED_IN / 1440 });
                Cookies.set('token', response.data.token, { expires: CONFIG.EXPIRED_IN / 1440 });
            }
            if (response.data.role === ROLE.ADMIN) {
                router.push('/admin/dashboard');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setFormData({
                    ...formData,
                    errors: error.response.data.error || [],
                });
                toast.error(error.response.data.message || "An error occurred");
            } else {
                toast.error("Network error or server not reachable");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}>
            <div className="row justify-content-center w-100">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title mb-4 text-center">Login</h3>
                            <form onSubmit={handleFormSubmit}>
                                {/* Email input */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`form-control ${formData?.errors?.email ? 'is-invalid' : ''}`}
                                    />
                                    <small className="validation-error">
                                        {formData?.errors?.email || null}
                                    </small>
                                </div>

                                {/* Password input */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`form-control ${formData?.errors?.password ? 'is-invalid' : ''}`}
                                    />
                                    <small className="validation-error">
                                        {formData?.errors?.password || null}
                                    </small>
                                </div>

                                {/* Submit button */}
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LoginPage;
