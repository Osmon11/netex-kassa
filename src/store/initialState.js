import cookie from "cookie_js";
import { AppAxios } from "./actions/sign";

if (Boolean(cookie.get("token"))) {
  AppAxios.defaults.headers.Authorization = cookie.get("token");
}

export const initialState = {
  user: Boolean(cookie.get("user")) && Boolean(cookie.get("token")),
  openBackdrop: false,
  currentDocumentationTab: { value: "Знакомство", index: 0 },
  currentCurrency: "",
  merchants: "",
  merchantDetails: {},
  balance: "",
  statistics: {},
  operationDetails: {},
  cashoutList: "",
  totalCashoutList: 0,
  cashoutSettingsList: "",
  addMerchant: {
    name: "",
    domain: "",
    country: 1,
    city: "",
    organization_type: 1,
    legal_name: "",
    activity_type: 1,
    company_reg_date: "",
    inn: "",
    okpo: "",
    bik: "",
    bank_name: "",
    checking_account: "",
    iban: "",
    decisions: "",
    charter: "",
    certificate: "",
    upload_file: "",
  },
  filesToUpload: {
    certificate: "",
    charter: "",
    decisions: "",
  },
  profileInfo: "",
  token: "",
  alert: {
    open: false,
    severity: "success",
    message: "This is a success message!",
  },
};
