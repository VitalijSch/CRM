import React from 'react';
import ViewCustomerData from './ViewCustomerData';

const CustomerList = ({ customerData, setCustomerData }) => {
    return (
        <div className="container">
            <h2 className="my-4 text-center text-muted">Kundendaten</h2>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <CustomerTableHeadings />
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
    );
}

const CustomerTableHeadings = () => (
    <thead className="text-center">
        <tr>
            <th scope="col">Vorname</th>
            <th scope="col">Nachname</th>
            <th scope="col">E-Mail</th>
            <th scope="col">Telefonnummer</th>
            <th scope="col">Einstellungen</th>
        </tr>
    </thead>
);

export default CustomerList;
