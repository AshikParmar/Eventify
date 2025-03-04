import React from "react";
import { Snackbar, Alert } from "@mui/material";

const GlobalSnackbar = ({
  open,
  message = "", 
  severity = "info", 
  onClose,
  duration = 3000,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message || "Something went wrong!"} 
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
