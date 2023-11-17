import React, { useState } from "react";
import axios from "axios";

function ViewCustomerData(props) {
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [showChangeCustomerData, setShowChangeCustomerData] = useState(false);

    const updateCustomer = async (id) => {
        try {
            await axios.put(`http://localhost:3001/customers/${id}`, {
                id: props.id,
                firstName: newFirstName || props.firstName,
                lastName: newLastName || props.lastName,
                email: newEmail || props.email,
                phoneNumber: newPhoneNumber || props.phoneNumber,
            })

            props.setCustomerData(prevData =>
                prevData.map(customer =>
                    customer.id === props.id
                        ? {
                            id: props.id,
                            firstName: newFirstName,
                            lastName: newLastName,
                            email: newEmail,
                            phoneNumber: newPhoneNumber,
                        }
                        : customer
                )
            );

            resetForm();

            setShowChangeCustomerData(false);

        } catch (error) {
            console.error("Error update customer:", error);
        }
    };


    const resetForm = () => {
        setNewFirstName("");
        setNewLastName("");
        setNewEmail("");
        setNewPhoneNumber("");
    };

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/customers/${id}`);

            props.setCustomerData(prevData =>
                prevData.filter(customer => customer.id !== id)
            );
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    const renderCustomerData = () => (
        <>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.email}</td>
            <td>{props.phoneNumber}</td>
        </>
    );

    const renderChangeInputs = () => (
        <>
            <td>
                <input
                    onChange={(e) => setNewFirstName(e.target.value)}
                    value={newFirstName}
                    type="text"
                    id="newFirstName"
                    autoComplete="off"
                />
            </td>
            <td>
                <input
                    onChange={(e) => setNewLastName(e.target.value)}
                    value={newLastName}
                    type="text"
                    id="newLastName"
                    autoComplete="off"
                />
            </td>
            <td>
                <input
                    onChange={(e) => setNewEmail(e.target.value)}
                    value={newEmail}
                    type="email"
                    id="newEmail"
                    autoComplete="off"
                />
            </td>
            <td>
                <input
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    value={newPhoneNumber}
                    type="tel"
                    id="newPhoneNumber"
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
            onClick={() => { updateCustomer(props.id) }}
            className="styleImg mx-2"
            src="../images/customerChange.svg"
            alt="change customer checked"
        />
    );

    return (
        <>
            <tr>
                {!showChangeCustomerData ? renderCustomerData() : renderChangeInputs()}
                <td>
                    {!showChangeCustomerData ? renderImgDataChange() : renderImgDataChangeChecked()}
                    <img
                        onClick={() => { deleteCustomer(props.id) }}
                        className="styleImg mx-2"
                        src="../images/delete.svg"
                        alt="delete customer data"
                    />
                </td>
            </tr >
        </>
    );
}

export default ViewCustomerData;