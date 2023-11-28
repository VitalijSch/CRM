import React, { useState } from "react";
import axios from "axios";

function ViewCustomerData({ id, firstName, lastName, email, phoneNumber, setCustomerData }) {
    const [newValues, setNewValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    });

    const [showChangeCustomerData, setShowChangeCustomerData] = useState(false);

    const handleInputChange = (e) => {
        setNewValues(prev => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    }

    const handleUpdateCustomer = async () => {
        try {
            await axios.put(`http://localhost:3001/customers/${id}`, {
                id: id,
                firstName: newValues.firstName || firstName,
                lastName: newValues.lastName || lastName,
                email: newValues.email || email,
                phoneNumber: newValues.phoneNumber || phoneNumber,
            });

            setCustomerData(prevData =>
                prevData.map(customer =>
                    customer.id === id
                        ? {
                            id: id,
                            firstName: newValues.firstName,
                            lastName: newValues.lastName,
                            email: newValues.email,
                            phoneNumber: newValues.phoneNumber,
                        }
                        :
                        customer
                )
            );

            setNewValues({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
            });

            setShowChangeCustomerData(false);

        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    const handleDeleteCustomer = async () => {
        try {
            await axios.delete(`http://localhost:3001/customers/${id}`);

            setCustomerData(prevData =>
                prevData.filter(customer => customer.id !== id)
            );
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    const renderCustomerData = () => (
        <>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{phoneNumber}</td>
        </>
    );

    const renderChangeInputs = () => (
        <>
            <td>
                <input
                    onChange={handleInputChange}
                    value={newValues.firstName}
                    type="text"
                    id="firstName"
                    autoComplete="off"
                />
            </td>
            <td>
                <input
                    onChange={handleInputChange}
                    value={newValues.lastName}
                    type="text"
                    id="lastName"
                    autoComplete="off"
                />
            </td>
            <td>
                <input
                    onChange={handleInputChange}
                    value={newValues.email}
                    type="email"
                    id="email"
                    autoComplete="off"
                />
            </td>
            <td>
                <input
                    onChange={handleInputChange}
                    value={newValues.phoneNumber}
                    type="tel"
                    id="phoneNumber"
                    autoComplete="off"
                />
            </td>
        </>
    );

    const renderImgDataChange = () => (
        <img
            onClick={() => { setShowChangeCustomerData(true) }}
            className="styleImg mx-2"
            src="../images/change.svg"
            alt="change customer"
        />
    );

    const renderImgDataChangeChecked = () => (
        <img
            onClick={handleUpdateCustomer}
            className="styleImg mx-2"
            src="../images/customerChange.svg"
            alt="change customer checked"
        />
    );

    return (
        <tr>
            {!showChangeCustomerData ? renderCustomerData() : renderChangeInputs()}
            <td>
                {!showChangeCustomerData ? renderImgDataChange() : renderImgDataChangeChecked()}
                <img
                    onClick={handleDeleteCustomer}
                    className="styleImg mx-2"
                    src="../images/delete.svg"
                    alt="delete customer data"
                />
            </td>
        </tr>
    );
}

export default ViewCustomerData;
