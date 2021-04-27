import {
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";
import { ThemeInput } from "components/Auth/auth";
import React, { useEffect, useState } from "react";
import searchIcon from "assets/search-icon.png";
import copyIcon from "assets/copy-icon.png";
import { GoldToggleButton } from "shared/Buttons/buttons";
import { GoldButton } from "shared/Buttons/buttons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import { viewMerchant, confirmMerchant, baseURL } from "store/reducer";
import { ValidatedInput } from "./Inputs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { setAlert } from "store/actionCreators";

const settingsFormValidation = Yup.object({
  success_url: Yup.string().optional(),
  fail_url: Yup.string().optional(),
  status_url: Yup.string().optional(),
});

export function ProjectSettings({ match }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  // const md = useMediaQuery(theme.breakpoints.down("md"));
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const [tab, setTab] = useState("Инфо");
  const [tooltip, setTooltip] = useState({ a: false, b: false });
  const [currentMerchant, setCurrentMerchant] = useState(null);

  useEffect(() => {
    if (
      !currentMerchant ||
      currentMerchant.view.merchant_id !== match.params.id
    ) {
      dispatch(
        viewMerchant(match.params.id, (data) => {
          setCurrentMerchant(data);
        })
      );
    }
  }, [currentMerchant, match.params.id, dispatch]);

  function confirmMerchantHandler() {
    dispatch(
      confirmMerchant(currentMerchant.confirm_file, (error) => {
        if (Boolean(error)) {
          dispatch(setAlert({ open: true, severity: "error", message: error }));
        }
      })
    );
  }
  function closeTooltip() {
    setTimeout(() => setTooltip({ a: false, b: false }), 1500);
  }
  return (
    <>
      {!currentMerchant ||
      currentMerchant.view.merchant_id !== match.params.id ? (
        <div className="flex_box">
          <CircularProgress />
        </div>
      ) : (
        <section>
          <div className="flex_box" style={{ justifyContent: "space-between" }}>
            <span className="title" style={{ fontSize: 25 }}>
              {currentMerchant.view.name}
            </span>
            <span className="subtitle">Настройки проекта</span>
          </div>

          <ToggleButtonGroup
            exclusive
            value={tab}
            style={{
              minWidth: "100%",
              margin: "33px 0",
            }}
            onChange={(_, tab) => setTab(tab)}
          >
            <GoldToggleButton value="Инфо">Инфо</GoldToggleButton>
            <GoldToggleButton value="Настройки">Настройки</GoldToggleButton>
            <GoldToggleButton value="API">API</GoldToggleButton>
          </ToggleButtonGroup>

          {tab === "Инфо" && (
            <>
              <p className="subtitle">Всего: 0.008525172 BTC</p>
              <p className="subtitle">Ожидание: 0.00000000 BTC</p>
              <div
                className="flex_box"
                style={{ justifyContent: "space-between" }}
              >
                <span className="subtitle">История транзакций</span>
                <ThemeInput
                  margin="dense"
                  name="search"
                  type="text"
                  style={{ width: "40%" }}
                  placeholder="Поиск по адресу или TX"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <img src={searchIcon} alt="search" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </div>
              <Grid
                item
                xs={12}
                container
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                  marginTop: 40,
                  padding: 15,
                }}
              >
                <Grid item xs={3}>
                  <Typography variant="body2">Дата</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Адрес</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2">Сумма</Typography>
                </Grid>
              </Grid>
              {data.map((obj) => (
                <Grid
                  item
                  xs={12}
                  container
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                    padding: "25px 15px",
                  }}
                  key={obj.adress + obj.date}
                >
                  <Grid item xs={3}>
                    <Typography variant="body2">{obj.date}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">{obj.adress}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body2">{obj.sum}</Typography>
                  </Grid>
                </Grid>
              ))}
            </>
          )}

          {tab === "Настройки" && (
            <>
              {currentMerchant.view.status.name === "Не подтвержден" && (
                <>
                  <Typography variant="h4" style={{ color: "#C51A2C" }}>
                    Домен не подтвержден:
                  </Typography>
                  <ul className="projects">
                    <li>
                      <Typography variant="body1">
                        1.{" "}
                        <a
                          href={`${baseURL}/account/get-confirm-file/${currentMerchant.confirm_file}`}
                          style={{ textDecoration: "none" }}
                        >
                          <span className="project_link">Скачать</span>
                        </a>{" "}
                        {`${currentMerchant.confirm_file}.txt`}
                      </Typography>
                      <Typography variant="body1">
                        2. Разместите в корне сайта:{" "}
                        <a
                          className="doc_link"
                          href={currentMerchant.confirm_file_path}
                        >
                          {currentMerchant.confirm_file_path}
                        </a>
                      </Typography>
                      <Typography variant="body1">
                        3. Затем нажмите кнопку “Подтвердить”
                      </Typography>
                    </li>
                    <li>
                      <Button
                        variant="outlined"
                        style={{
                          width: 200,
                          color: "#FF9900",
                          fontSize: 18,
                          fontWeight: 300,
                          border: "1px solid #FF9900",
                          borderRadius: 8,
                          marginTop: 20,
                        }}
                        onClick={confirmMerchantHandler}
                      >
                        Подтвердить
                      </Button>
                    </li>
                  </ul>
                </>
              )}
              <Formik
                initialValues={{ ...currentMerchant.view.params }}
                validationSchema={settingsFormValidation}
              >
                <Form>
                  <div
                    className="flex_box"
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <span className="subtitle">URL успешной оплаты:</span>
                    <ValidatedInput
                      name="success_url"
                      style={{ width: "100%" }}
                      placeholder={`Например,`}
                    />
                  </div>
                  <div
                    className="flex_box"
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <span className="subtitle">URL неуспешной оплаты:</span>
                    <ValidatedInput
                      name="fail_url"
                      style={{ width: "100%" }}
                      placeholder={`Например,`}
                    />
                  </div>
                  <div
                    className="flex_box"
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <span className="subtitle">URL обработчика:</span>
                    <ValidatedInput
                      name="status_url"
                      style={{ width: "100%" }}
                      placeholder={`Например,`}
                    />
                  </div>
                </Form>
              </Formik>
              <p className="subtitle">Удалить кошелек</p>
              <Typography variant="body2" style={{ width: "45%" }}>
                Перед удалением убедитесь, что вы выбрали правильный кошелек.
                Удаление приведет к потере данных и средств на кошельке.
              </Typography>
              <Button
                style={{
                  borderColor: "#ff6f6f",
                  color: "#ff6f6f",
                  fontSize: 16,
                  width: 175,
                  height: 50,
                  marginTop: 20,
                }}
                variant="outlined"
              >
                Удалить
              </Button>
            </>
          )}

          {tab === "API" && (
            <>
              <p className="subtitle">Идентификатор приложения</p>
              <Typography variant="body2" style={{ lineHeight: "200%" }}>
                Используйте этот идентификатор для создания счета
              </Typography>
              <Typography variant="body2" style={{ lineHeight: "200%" }}>
                ID этого проекта:
                <span style={{ color: "#ff9900", marginLeft: 15 }}>
                  1665870464
                </span>
              </Typography>

              <p className="subtitle" style={{ marginTop: 65 }}>
                API
              </p>
              <Typography variant="body2" style={{ lineHeight: "200%" }}>
                Access to payments through API
              </Typography>
              <Typography variant="body2" style={{ lineHeight: "200%" }}>
                Для работы с API вам необходимо получить ключ безопасности и
                токен.
              </Typography>
              <div
                className="flex_box"
                style={{
                  marginTop: 20,
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <span className="subtitle" style={{ fontSize: 16 }}>
                  Ключ безопасности:
                </span>
                <ThemeInput
                  margin="dense"
                  name="key"
                  type="text"
                  style={{ width: "100%" }}
                  value="GykVo9jwGElNwJkcY7V8drVEgGLU3oVE"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          PopperProps={{
                            disablePortal: true,
                          }}
                          open={tooltip.a}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          title="Copied"
                          arrow
                          TransitionComponent={Zoom}
                        >
                          <CopyToClipboard
                            text="GykVo9jwGElNwJkcY7V8drVEgGLU3oVE"
                            onCopy={() => {
                              setTooltip({ ...tooltip, a: true });
                              closeTooltip();
                            }}
                          >
                            <img
                              src={copyIcon}
                              style={{ cursor: "pointer" }}
                              alt="content copy"
                            />
                          </CopyToClipboard>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  disabled
                />
              </div>
              <div
                className="flex_box"
                style={{
                  marginTop: 20,
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <span className="subtitle" style={{ fontSize: 16 }}>
                  Скопируйте этот токен:
                </span>
                <ThemeInput
                  margin="dense"
                  name="token"
                  type="text"
                  style={{ width: "100%" }}
                  value="phnBr6CPBuemFBPgzc2qN1zQEVbw4yp1Qf6OIHLwNRg55Ho39qFYMoUWjmDtY6ZC"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          PopperProps={{
                            disablePortal: true,
                          }}
                          open={tooltip.b}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          title="Copied"
                          arrow
                          TransitionComponent={Zoom}
                        >
                          <CopyToClipboard
                            text="phnBr6CPBuemFBPgzc2qN1zQEVbw4yp1Qf6OIHLwNRg55Ho39qFYMoUWjmDtY6ZC"
                            onCopy={() => {
                              setTooltip({ ...tooltip, b: true });
                              closeTooltip();
                            }}
                          >
                            <img
                              src={copyIcon}
                              style={{ cursor: "pointer" }}
                              alt="content copy"
                            />
                          </CopyToClipboard>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  disabled
                />
              </div>
              <GoldButton
                style={{
                  fontSize: 16,
                  minHeight: 50,
                  width: 200,
                  marginTop: 40,
                }}
              >
                Получить токен
              </GoldButton>
            </>
          )}
        </section>
      )}
    </>
  );
}

const data = [
  {
    date: "2021-01-13 18:37:46",
    adress: "https://my.biwse.com",
    sum: "0.000025172 BTC",
  },
  {
    date: "2021-01-07 10:21:51",
    adress: "https://my.biwse.com",
    sum: "0.008500000 BTC",
  },
];
