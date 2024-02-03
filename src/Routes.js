import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Profile from "./pages/Profile";


const routes = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      
      <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </>
  );
};

export default routes;
