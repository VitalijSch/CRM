import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";
import Header from "./header/Header";
import CreateCustomer from "./createCustomer/CreateCustomer";
import ViewCustomer from "./viewCustomer/ViewCustomer";
import axios from "axios";

function App() {
    const [customerData, setCustomerData] = useState([]);
    const [showCustomerData, setShowCustomerData] = useState(false);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/customers");
                setCustomerData(response.data);
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };

        fetchCustomerData();
    }, [customerData]);

    return (
        <>
            <Header
                onSetShowCustomerDataTrue={() => setShowCustomerData(true)}
                onSetShowCustomerDataFalse={() => setShowCustomerData(false)}
            />
            {showCustomerData ? (
                <ViewCustomer
                    customerData={customerData}
                    setCustomerData={setCustomerData}
                />
            ) : (
                <CreateCustomer
                    customerData={customerData}
                    setCustomerData={setCustomerData}
                />
            )}
        </>
    )
}

export default App;
