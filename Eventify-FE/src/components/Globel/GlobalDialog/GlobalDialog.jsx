import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const GlobalDialog = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth >
      <DialogTitle sx={{ padding: "15px", fontSize: "18px", backgroundColor: "#1e40af", color: "#fff", textAlign: "center" }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ padding: "24px", marginTop: "10px", textAlign: "center" }}>
        {typeof content === "string" ? <p>{content}</p> : content}
      </DialogContent>
      <DialogActions sx={{ padding: "16px", borderTop: "2px solid #1e40af", justifyContent: "center", gap: "12px" }}>
        <Button onClick={onClose} sx={{ backgroundColor: "#e5e7eb", color: "#1f2937", px: 2, py: 1, borderRadius: "6px", "&:hover": { backgroundColor: "#d1d5db" } }}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} variant="contained" sx={{ backgroundColor: "#3b82f6", color: "#fff", px: 2, py: 1, borderRadius: "6px", "&:hover": { backgroundColor: "#1e3a8a" } }}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GlobalDialog;
