import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
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
                                <NavLink to={"/view"}>
                                    <img className="styleImg" src="../images/customer.svg" alt="View Customer Data" />
                                </NavLink>
                            </div>
                            <div className="col-6 d-flex justify-content-end align-items-center">
                                <NavLink to={"/"}>
                                    <img className="styleImg" src="../images/add.svg" alt="Add Customer" />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
