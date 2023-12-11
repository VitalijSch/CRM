import React, { useState } from "react";
import axios from "axios";
import validate from "./validation/CustomerValidation";

function CreateCustomer({ customerData, setCustomerData }) {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    });

    const [error, setError] = useState({});

    const isInputDataValid = () => {
        const err = validate(values);
        setError(err);
        return Object.values(err).every(value => value === "");
    };

    const addCustomerToData = (newCustomer) => {
        setCustomerData([...customerData, newCustomer]);
    };

    const saveCustomer = async () => {
        if (isInputDataValid()) {
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
                            {error.firstName && <span className="text-danger">{error.firstName}</span>}
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
                            {error.lastName && <span className="text-danger">{error.lastName}</span>}
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
                            {error.email && <span className="text-danger">{error.email}</span>}
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
                            {error.phoneNumber && <span className="text-danger">{error.phoneNumber}</span>}
                        </div>
                        <button onClick={saveCustomer} className="w-100 btn btn-lg btn-primary mt-4">Hinzufügen</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCustomer;
