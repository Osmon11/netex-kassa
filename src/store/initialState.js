export const initialState = {
  user: false,
  authdialog: { open: false, login: true },
  currentDocumentationTab: { value: "Знакомство", index: 0 },
  addMerchant: {},
  alert: {
    open: false,
    severity: "success",
    message: "This is a success message!",
  },
};
