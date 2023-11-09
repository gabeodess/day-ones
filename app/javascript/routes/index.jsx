import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import DayOneForm from "../components/DayOneForm";
import Profile from "../components/Profile";
import Layout from "../components/Layout";

export default (
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/day-ones/new" element={<DayOneForm />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  </Router>
);
