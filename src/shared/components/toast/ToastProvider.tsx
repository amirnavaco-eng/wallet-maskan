"use client";

import * as React from "react";
import { Snackbar, Alert } from "@mui/material";

type ToastSeverity = "success" | "error" | "info";

interface ToastState {
  open: boolean;
  message: string;
  severity: ToastSeverity;
}

interface ToastContextValue {
  showToast: (message: string, severity?: ToastSeverity) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ToastState>({
    open: false,
    message: "",
    severity: "success",
  });

  const showToast = React.useCallback(
    (message: string, severity: ToastSeverity = "success") => {
      setState({ open: true, message, severity });
    },
    [],
  );

  const handleClose = () => setState((s) => ({ ...s, open: false }));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={state.open}
        autoHideDuration={2200}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ maxWidth: 480, mx: "auto", left: 0, right: 0 }}
      >
        <Alert
          onClose={handleClose}
          severity={state.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 3,
            color: "#fff",
            "& .MuiAlert-icon": {
              color: "#fff",
            },
            "& .MuiAlert-action": {
              color: "#fff",
            },
          }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
