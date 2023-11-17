import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header";
import CreateCustomer from "./CreateCustomer";
import ViewCustomerData from "./ViewCustomerData";
import axios from "axios";

function App() {
    const [customerData, setCustomerData] = useState([]);
    const [showCustomerData, setShowCustomerData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/customers");
                setCustomerData(response.data);
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };

        fetchData();
    }, [customerData]);

    return (
        <>
            <Header
                onFetchCustomerData={() => setShowCustomerData(true)}
                onGetCreateCustomer={() => setShowCustomerData(false)}
            />
            {!showCustomerData ? (
                <CreateCustomer
                    customerData={customerData}
                    setCustomerData={setCustomerData}
                />
            ) : (
                <div className="container">
                    <h2 className="my-4 text-center text-muted">Kundendaten</h2>
                    <div className="table-responsive small">
                        <table className="table table-striped table-sm">
                            <thead className="text-center">
                                <tr>
                                    <th scope="col">Vorname</th>
                                    <th scope="col">Nachname</th>
                                    <th scope="col">E-Mail</th>
                                    <th scope="col">Telefonnummer</th>
                                    <th scope="col">Einstellungen</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {customerData.map(customer => (
                                    <ViewCustomerData
                                        key={customer.id}
                                        id={customer.id}
                                        firstName={customer.first_name}
                                        lastName={customer.last_name}
                                        email={customer.email}
                                        phoneNumber={customer.phone_number}
                                        setCustomerData={setCustomerData}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default App;