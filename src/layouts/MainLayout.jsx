import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
        <Navbar />
        {/* // ! 13 */}
        <Outlet />
      </Container>
    </div>
  );
}

export default MainLayout;
