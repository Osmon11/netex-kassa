export const initialState = {
  user: true,
  authdialog: { open: false, login: true },
  currentDocumentationTab: { value: "Знакомство", index: 0 },
  merchants: [
    {
      merchant_id: "484192722",
      balance: "0.0000",
      name: "Netex KG",
      date_creation: "2021/04/28 14:15",
      status: {
        id: "2",
        slug: "active",
        name: "Активный",
      },
    },
    {
      merchant_id: "6346234",
      balance: null,
      name: "Pay24",
      date_creation: "2021/05/19 11:41",
      status: {
        id: "1",
        slug: "not-confirmed",
        name: "Не подтвержден",
      },
    },
  ],
  balance: [
    {
      merchant_id: 484192722,
      currencies: [
        {
          name: "KGS",
          balance: "10.0000",
          date_update: "2021/06/19 21:35",
        },
        {
          name: "RUB",
          balance: "0.0000",
        },
        {
          name: "KZT",
          balance: "0.0000",
          date_update: "2021/05/06 18:42",
        },
        {
          name: "USD",
          balance: "0.0000",
          date_update: "2021/05/06 18:42",
        },
      ],
    },
  ],
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
  alert: {
    open: false,
    severity: "success",
    message: "This is a success message!",
  },
};
