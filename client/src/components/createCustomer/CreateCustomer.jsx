import React, { useState } from "react";
import axios from "axios";

function CreateCustomer({ customerData, setCustomerData }) {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    });

    const addCustomerToData = (newCustomer) => {
        setCustomerData([...customerData, newCustomer]);
    };

    const saveCustomer = async () => {
        try {
            const newCustomer = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phoneNumber: values.phoneNumber,
            };

            await axios.post("http://localhost:3001/api/customers", newCustomer);
            addCustomerToData(newCustomer);
            setValues({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
            });

        } catch (error) {
            console.error("Error saving customer:", error);
        }
    };

    const handleChange = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    return (
        <div className="container col-xl-10 col-lg-12 col-md-7 col-sm-7 px-4 py-5">
            <div className="row g-lg-5 py-5">
                <div className="col-md-10 mx-auto col-lg-5">
                    <div className="p-4 p-md-4 border rounded-3 bg-body-tertiary">
                        <h1 className="text-center mb-5 text-muted">Kundendaten anlegen</h1>
                        <div className="form-floating my-3">
                            <input
                                onChange={handleChange}
                                value={values.firstName}
                                type="text"
                                className="form-control"
                                id="firstName"
                                autoComplete="off"
                                placeholder="firstName"
                            />
                            <label htmlFor="firstName">Vorname</label>
                        </div>
                        <div className="form-floating my-3">
                            <input
                                onChange={handleChange}
                                value={values.lastName}
                                type="text"
                                className="form-control"
                                id="lastName"
                                autoComplete="off"
                                placeholder="lastName"
                            />
                            <label htmlFor="lastName">Nachname</label>
                        </div>
                        <div className="form-floating my-3">
                            <input
                                onChange={handleChange}
                                value={values.email}
                                type="email"
                                className="form-control"
                                id="email"
                                autoComplete="off"
                                placeholder="email"
                            />
                            <label htmlFor="email">E-Mail</label>
                        </div>
                        <div className="form-floating my-3">
                            <input
                                onChange={handleChange}
                                value={values.phoneNumber}
                                type="tel"
                                className="form-control"
                                id="phoneNumber"
                                autoComplete="off"
                                placeholder="phoneNumber"
                            />
                            <label htmlFor="phoneNumber">Telefonnummer</label>
                        </div>
                        <button onClick={saveCustomer} className="w-100 btn btn-lg btn-primary mt-4">Hinzufügen</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCustomer;
