import React from "react";
import { Link, Outlet } from "react-router-dom";

export default () => {
    return <div>
      <div className="container">
          <Outlet />
      </div>
      <nav className="navbar fixed-bottom bg-body-tertiary pb-4">
        <div className="container-fluid justify-content-around">
          <Link className='fs-1 btn btn-outline-secondary border-0' to="/"><i className="bi bi-calendar"></i></Link>
          <Link className='fs-1 btn btn-outline-secondary border-0' to="/day-ones/new"><i className="bi bi-plus-square"></i></Link>
          <Link className='fs-1 btn btn-outline-secondary border-0' to="/profile"><i className="bi bi-person"></i></Link>
        </div>
      </nav>
    </div>
}