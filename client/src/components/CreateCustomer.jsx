import React from "react";
import { useState } from "react";
import axios from "axios";

function CreateCustomer({ customerData, setCustomerData }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const saveCustomer = async () => {
        try {
            await axios.post("http://localhost:3001/customers", {
                firstName,
                lastName,
                email,
                phoneNumber,
            });

            setCustomerData([
                ...customerData,
                { firstName, lastName, email, phoneNumber },
            ]);

            resetForm();
            
        } catch (error) {
            console.error("Error saving customer:", error);
        }
    };

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
    };

    return (
        <>
            <div className="container col-xl-10 col-lg-12 col-md-7 col-sm-7 px-4 py-5">
                <div className="row g-lg-5 py-5">
                    <div className="col-md-10 mx-auto col-lg-5">
                        <div className="p-4 p-md-4 border rounded-3 bg-body-tertiary">
                            <h1 className="text-center mb-5 text-muted">Kundendaten anlegen</h1>
                            <div className="form-floating my-3">
                                <input
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    type="text"
                                    className="form-control"
                                    id="fName"
                                    autoComplete="off"
                                    placeholder="firstName"
                                />
                                <label htmlFor="fName">Vorname</label>
                            </div>
                            <div className="form-floating my-3">
                                <input
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    type="text"
                                    className="form-control"
                                    id="lName"
                                    autoComplete="off"
                                    placeholder="lastName"
                                />
                                <label htmlFor="lName">Nachname</label>
                            </div>
                            <div className="form-floating my-3">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
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
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    value={phoneNumber}
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
        </>
    )
}

export default CreateCustomer;