import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./styling.css";
import {Box, Select, Table,
  Button,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  TableContainer
} from "@chakra-ui/react";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/student")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setFilteredStudents(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: "DELETE",
      });

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
      setFilteredStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (event) => {
    const selectedFaculty = event.target.value;
    setSelectedFaculty(selectedFaculty);

    if (selectedFaculty === "All") {
      setFilteredStudents(students);
    } else {
      const filteredData = students.filter(
        (student) => student.faculty === selectedFaculty
      );
      setFilteredStudents(filteredData);
    }
  };

  return (
    <>
      <Navbar />
      <Box>
        <label htmlFor="filter">Filter by Faculty:</label>
        <Select
          id="filter"
          value={selectedFaculty}
          onChange={handleFilterChange}
          data-testid="filter"
        >
          <option value="All">All</option>
          <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
          <option value="Fakultas Ilmu Sosial dan Politik">
            Fakultas Ilmu Sosial dan Politik
          </option>
          <option value="Fakultas Teknik">Fakultas Teknik</option>
          <option value="Fakultas Teknologi Informasi dan Sains">
            Fakultas Teknologi Informasi dan Sains
          </option>
        </Select>

        {isLoading ? (
          <p className="loading">Loading ...</p>
        ) : (
          <TableContainer>

            <Table id="table-student">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Full Name</Th>
                  <Th>Faculty</Th>
                  <Th>Program Study</Th>
                  <Th>Option</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredStudents.map((student, index) => (
                  <Tr key={student.id} className="student-data-row">
                    <Td>{index + 1}</Td>
                    <Td>
                      <Link to={`/student/${student.id}`}>
                        {student.fullname}
                      </Link>
                    </Td>
                    <Td>{student.faculty}</Td>
                    <Td>{student.programStudy}</Td>
                    <Td>
                      <Button
                        onClick={() => handleDelete(student.id)}
                        data-testid={`delete-${student.id}`}
                        className="delete-button"
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default Student;
