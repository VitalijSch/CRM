import React from "react";
import "../styles/styles.css";

function Header(props) {
    return (
        <>
            <header className="bg-body-tertiary border-bottom py-2">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-8">
                            <h2 className="mb-0">CRM</h2>
                        </div>
                        <div className="container col-4">
                            <div className="row">
                                <div className="col-6 d-flex justify-content-end align-items-center">
                                    <img onClick={props.onFetchCustomerData} className="styleImg" src="../images/customer.svg" alt="person icon" />
                                </div>
                                <div className="col-6 d-flex justify-content-end align-items-center">
                                    <img onClick={props.onGetCreateCustomer} className="styleImg" src="../images/add.svg" alt="add icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;