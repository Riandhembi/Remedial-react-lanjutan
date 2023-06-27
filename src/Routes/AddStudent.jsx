import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./styling.css";

const AddStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    fullname: "",
    profilePicture: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    programStudy: "",
    faculty: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let faculty = "";
      const { programStudy } = student;
      if (
        programStudy === "Ekonomi" ||
        programStudy === "Manajemen" ||
        programStudy === "Akuntansi"
      ) {
        faculty = "Fakultas Ekonomi";
      } else if (
        programStudy === "Administrasi Publik" ||
        programStudy === "Administrasi Bisnis" ||
        programStudy === "Hubungan Internasional"
      ) {
        faculty = "Fakultas Ilmu Sosial dan Politik";
      } else if (
        programStudy === "Teknik Sipil" ||
        programStudy === "Arsitektur"
      ) {
        faculty = "Fakultas Teknik";
      } else if (
        programStudy === "Matematika" ||
        programStudy === "Fisika" ||
        programStudy === "Informatika"
      ) {
        faculty = "Fakultas Teknologi Informasi dan Sains";
      }

      const newStudent = {
        ...student,
        faculty: faculty,
      };

      await fetch("http://localhost:3001/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      navigate("/student");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Box className="container">
        <h2>Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname">Full Name:</label>
            <Input
              type="text"
              name="fullname"
              id="fullname"
              value={student.fullname}
              onChange={handleChange}
              data-testid="name"
            />
          </div>
          <div>
            <label htmlFor="profilePicture">Profile Picture:</label>
            <Input
              type="text"
              name="profilePicture"
              id="profilePicture"
              value={student.profilePicture}
              onChange={handleChange}
              data-testid="profilePicture"
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <Input
              type="text"
              name="address"
              id="address"
              value={student.address}
              onChange={handleChange}
              data-testid="address"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <Input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={student.phoneNumber}
              onChange={handleChange}
              data-testid="phoneNumber"
            />
          </div>
          <div>
            <label htmlFor="birthDate">Birth Date:</label>
            <Input
              type="date"
              name="birthDate"
              id="birthDate"
              value={student.birthDate}
              onChange={handleChange}
              data-testid="date"
            />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <Input
              type="text"
              name="gender"
              id="gender"
              value={student.gender}
              onChange={handleChange}
              data-testid="gender"
            />
          </div>
          <div>
            <label htmlFor="programStudy">Program Study:</label>
            <Input
              type="text"
              name="programStudy"
              id="programStudy"
              value={student.programStudy}
              onChange={handleChange}
              data-testid="prody"
            />
          </div>
          <div>
            <label htmlFor="faculty">Faculty:</label>
            <Input
              type="text"
              name="faculty"
              id="faculty"
              value={student.faculty}
              readOnly
              data-testid="faculty"
            />
          </div>
          <Button type="submit" data-testid="add-btn">
            Add Student
          </Button>
        </form>
      </Box>
      <Footer />
    </>
  );
};

export default AddStudent;
