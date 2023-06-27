import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Home from "./Routes/Home";
import Student from "./Routes/Student";
import AddStudent from "./Routes/AddStudent";
import EditStudent from "./Routes/EditStudent";
import NotFound from "./Routes/NotFound";

const App = () => {
  return (
    <>
      <Box className="navbar">
        <div className="studentInfo">
          <h2 className="studentName">Muhammad Fajar Insan Kamil</h2>
          <p className="studentId">FE4833867</p>
        </div>
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student/:id" element={<EditStudent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
