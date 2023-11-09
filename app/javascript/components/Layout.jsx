import React from "react";
import { Link, Outlet } from "react-router-dom";

export default () => {
    return <div>
        <div className="container">
            <Outlet />
        </div>
        <nav className="navbar fixed-bottom bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/"><i className="bi bi-calendar"></i></Link>
          <Link to="/day-ones/new"><i className="bi bi-plus-square"></i></Link>
          <Link to="/profile"><i className="bi bi-person"></i></Link>
        </div>
      </nav>
    </div>
}