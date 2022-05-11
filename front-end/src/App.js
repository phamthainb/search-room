import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React from "react";
import SearchRoom from "./SearchRoom";
import Login from "./Login";
import Room from "./Room";

class SiderDemo extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<SearchRoom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </Router>
    );
  }
}

export default SiderDemo;
