import React from "react";

function Header({ onSetShowCustomerDataTrue, onSetShowCustomerDataFalse }) {
    return (
        <header className="bg-body-tertiary border-bottom py-2">
            <div className="container">
                <div className="row d-flex align-items-center">
                    <div className="col-8">
                        <h2 className="mb-0">CRM</h2>
                    </div>
                    <div className="container col-4">
                        <div className="row">
                            <div className="col-6 d-flex justify-content-end align-items-center">
                                <img onClick={onSetShowCustomerDataTrue} className="styleImg" src="../images/customer.svg" alt="View Customer Data" />
                            </div>
                            <div className="col-6 d-flex justify-content-end align-items-center">
                                <img onClick={onSetShowCustomerDataFalse} className="styleImg" src="../images/add.svg" alt="Add Customer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
