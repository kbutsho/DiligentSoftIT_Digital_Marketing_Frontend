export const handleInputChange = (event, setFormData, formData) => {
    setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        errors: {
            ...formData.errors,
            [event.target.name]: null,
        },
    });
};