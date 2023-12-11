import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";
import axios from "axios";
import isEqual from "lodash/isEqual";

import Header from "./header/Header";
import CreateCustomer from "./createCustomer/CreateCustomer";
import ViewCustomer from "./viewCustomer/ViewCustomer";

function App() {
    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/customers");
                const newData = response.data;

                if (!isEqual(newData, customerData)) {
                    setCustomerData(newData);
                }
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };

        fetchCustomerData();
    }, [customerData]);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<CreateCustomer customerData={customerData} setCustomerData={setCustomerData} />} />
                <Route path="view" element={<ViewCustomer customerData={customerData} setCustomerData={setCustomerData} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
