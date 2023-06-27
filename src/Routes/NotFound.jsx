import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Mengembalikan ke halaman sebelumnya
  };

  return (
    <Box>
      <h1>404 | Not Found</h1>
      <Button data-testid="back" onClick={handleBackClick}>
        Back
      </Button>
    </Box>
  );
};

export default NotFound;
