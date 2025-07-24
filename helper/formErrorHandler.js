import { toast } from 'react-toastify';

export const formErrorHandler = (error, setFormData) => {
    if (error.response && error.response.data) {
        setFormData(prev => ({
            ...prev,
            errors: error.response.data.error || [],
        }));
        toast.error(error.response.data.message || "An error occurred!");
    } else {
        toast.error("Network error or server not reachable!");
    }
};

