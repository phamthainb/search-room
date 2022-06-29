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
          <Route path="/" exact element={<SearchRoom />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/room/:id" exact element={<Room />} />
        </Routes>
      </Router>
    );
  }
}

export default SiderDemo;
