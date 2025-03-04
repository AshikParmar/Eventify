import React, { createContext, useContext, useState } from "react";
import GlobalSnackbar from "./GlobalSnackbar/GlobalSnackbar";
import GlobalDialog from "./GlobalDialog/GlobalDialog";

const GlobalUIContext = createContext();

export const GlobalUIProvider = ({ children }) => {
  // Snackbar State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Dialog State
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    content: "",
    onConfirm: null,
  });

  // Snackbar Handlers
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Dialog Handlers
  const showDialog = (title, content, onConfirm) => {
    setDialog({ open: true, title, content, onConfirm });
  };

  const closeDialog = () => {
    setDialog({ open: false, title: "", content: "", onConfirm: null });
  };

  return (
    <GlobalUIContext.Provider value={{ showSnackbar, showDialog, closeDialog }}>
      {children}

      {/* Global Snackbar */}
      <GlobalSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />

      {/* Global Dialog */}
      <GlobalDialog
        open={dialog.open}
        title={dialog.title}
        content={dialog.content}
        onClose={closeDialog}
        onConfirm={() => {
          if (typeof dialog.onConfirm === "function") {
            dialog.onConfirm();
          }
          closeDialog();
        }}
      />
    </GlobalUIContext.Provider>
  );
};

// Custom Hook to Use Global UI
export const useGlobalUI = () => useContext(GlobalUIContext);
