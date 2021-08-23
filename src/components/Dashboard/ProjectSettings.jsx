import {
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  makeStyles,
  MenuItem,
  Tooltip,
  Typography,
  Zoom,
} from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";
import { ThemeInput } from "components/Auth/auth";
import React, { useCallback, useEffect, useState } from "react";
import goust from "assets/goust-icon.webp";
import success from "assets/success.svg";
import fail from "assets/fail.svg";
import warning from "assets/warning.svg";
import pending from "assets/pending.svg";
import copyIcon from "assets/copy-icon.png";
import { GoldToggleButton } from "shared/Buttons/buttons";
import { GoldButton } from "shared/Buttons/buttons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import {
  viewMerchant,
  confirmMerchant,
  baseURL,
  getHistoryList,
  getStatusList,
  getTypeList,
  editMerchant,
  getToken,
  getMerchantStatistics,
} from "store/reducer";
import { ValidatedInput } from "./Inputs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { setAlert, setBackdrop } from "store/actionCreators";
import { NavLink, useHistory } from "react-router-dom";
import { Statistics } from "./Statistics";
import SelectCurrency from "./SelectCurrency";

const settingsFormValidation = Yup.object({
  success_url: Yup.string().optional(),
  fail_url: Yup.string().optional(),
  status_url: Yup.string().optional(),
});

export function ProjectSettings({ match }) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { merchantDetails, statistics, statusList, typeList, historyList } =
    useSelector((store) => store.reducer);
  const [tab, setTab] = useState("Статистика");
  const [tooltip, setTooltip] = useState({ a: false, b: false });
  const [currentMerchant, setCurrentMerchant] = useState({
    merchant_id: false,
  });
  let t = new Date();
  t.setDate(t.getDate() - 7);
  const [options, setOptions] = useState({
    operation_type: 1,
    date_from: t.toISOString().split("T")[0],
    date_to: new Date().toISOString().split("T")[0],
    status: 2,
    merchant_id: match.params.id,
  });

  const errorHandler = useCallback(
    function (error) {
      dispatch(setBackdrop(false));
      if (Boolean(error)) {
        dispatch(setAlert({ open: true, severity: "error", message: error }));
      }
    },
    [dispatch]
  );

  const getCurrentMerchant = useCallback(() => {
    dispatch(viewMerchant(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (
      Boolean(merchantDetails[match.params.id]) &&
      !currentMerchant.merchant_id
    ) {
      setCurrentMerchant(merchantDetails[match.params.id]);
    }
    if (
      currentMerchant.merchant_id !== match.params.id &&
      !Boolean(merchantDetails[match.params.id])
    ) {
      getCurrentMerchant();
    }
    if (!Boolean(statistics[match.params.id])) {
      dispatch(getMerchantStatistics(match.params.id, { currency: "KGS" }));
    }
  }, [
    currentMerchant,
    merchantDetails,
    statistics,
    match.params.id,
    getCurrentMerchant,
    dispatch,
  ]);
  useEffect(() => {
    if (!statusList) {
      dispatch(getHistoryList(errorHandler, options));
      dispatch(getStatusList(errorHandler));
      dispatch(getTypeList(errorHandler));
    }
  }, [statusList, dispatch, errorHandler, options]);

  function filterChangeHandler(newOptions) {
    dispatch(setBackdrop(true));
    setOptions(newOptions);
    dispatch(getHistoryList(errorHandler, newOptions));
  }

  function confirmMerchantHandler() {
    dispatch(setBackdrop(true));
    dispatch(
      confirmMerchant(currentMerchant.confirm_file, (error) => {
        dispatch(setBackdrop(false));
        if (Boolean(error)) {
          dispatch(setAlert({ open: true, severity: "error", message: error }));
        } else {
          getCurrentMerchant();
        }
      })
    );
  }
  function closeTooltip() {
    setTimeout(() => setTooltip({ a: false, b: false }), 1500);
  }
  function settingSubmit(fields) {
    dispatch(setBackdrop(true));
    dispatch(editMerchant(fields, match.params.id, errorHandler));
  }
  function getTokenHandler() {
    dispatch(setBackdrop(true));
    dispatch(
      getToken(currentMerchant.merchant_id, errorHandler, (new_api_token) => {
        dispatch(setBackdrop(false));
        dispatch(
          setAlert({
            open: true,
            severity: "success",
            message: "Сгенерирован новый ключ API!",
          })
        );
        setCurrentMerchant({
          ...currentMerchant,
          params: { ...currentMerchant.params, ...new_api_token },
        });
      })
    );
  }
  function DomenNotConfirmed() {
    return (
      <>
        <Typography variant='h4' style={{ color: "#C51A2C" }}>
          Домен не подтвержден:
        </Typography>
        <ul className='projects'>
          <li>
            <Typography variant='body1'>
              1.{" "}
              <a
                href={`${baseURL}/account/get-confirm-file/${currentMerchant.confirm_file}`}
                style={{ textDecoration: "none" }}
              >
                <span className='project_link'>Скачать</span>
              </a>{" "}
              {`${currentMerchant.confirm_file}.txt`}
            </Typography>
            <Typography variant='body1'>
              2. Разместите в корне сайта:{" "}
              <a
                className='project_link'
                style={{ textDecoration: "underline" }}
                href={currentMerchant.confirm_file_path}
              >
                {currentMerchant.confirm_file_path}
              </a>
            </Typography>
            <Typography variant='body1'>
              3. Затем нажмите кнопку “Подтвердить”
            </Typography>
          </li>
          <li>
            <Button
              variant='outlined'
              style={{
                width: 200,
                color: "#FF9900",
                fontSize: 18,
                fontWeight: 300,
                border: "1px solid",
                borderColor: "#FF9900",
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
    );
  }
  return (
    <>
      {!Boolean(currentMerchant) ||
      currentMerchant.merchant_id !== match.params.id ? (
        <div className='flex_box'>
          <CircularProgress />
        </div>
      ) : (
        <section>
          <div className='flex_box' style={{ justifyContent: "space-between" }}>
            <span className='title' style={{ fontSize: 25 }}>
              {currentMerchant.name}
            </span>
            <span className='subtitle'>Настройки проекта</span>
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
            <GoldToggleButton value='Статистика'>Статистика</GoldToggleButton>
            <GoldToggleButton value='Инфо'>Инфо</GoldToggleButton>
            <GoldToggleButton value='Настройки'>Настройки</GoldToggleButton>
            <GoldToggleButton value='API'>API</GoldToggleButton>
          </ToggleButtonGroup>

          {tab === "Статистика" && (
            <Grid container>
              {currentMerchant.status.name === "Не подтвержден" ? (
                <Grid item xs={12}>
                  <DomenNotConfirmed />
                </Grid>
              ) : (
                <Statistics merchant_id={match.params.id} />
              )}
            </Grid>
          )}

          {tab === "Инфо" && (
            <Grid container>
              {currentMerchant.status.name === "Не подтвержден" ? (
                <Grid item xs={12}>
                  <DomenNotConfirmed />
                </Grid>
              ) : (
                <>
                  <Grid
                    item
                    xs={12}
                    container
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <Grid item xs={12} style={{ padding: "12px 0px" }}>
                      <div
                        className='flex_box'
                        style={{
                          justifyContent: "space-between",
                        }}
                      >
                        <span className='subtitle' style={{ fontSize: "24px" }}>
                          История транзакций
                        </span>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      lg={3}
                      style={{ padding: "24px 48px 24px 0px" }}
                    >
                      {typeList && (
                        <ThemeInput
                          margin='dense'
                          name='operationType'
                          select
                          variant='outlined'
                          value={options.operation_type}
                          onChange={(e) => {
                            filterChangeHandler({
                              ...options,
                              operation_type: e.target.value,
                            });
                          }}
                          fullWidth
                        >
                          {typeList.map((type) => (
                            <MenuItem
                              key={type.name}
                              value={type.value}
                              className={classes.menuItem}
                              classes={{ selected: classes.selected }}
                            >
                              {type.name}
                            </MenuItem>
                          ))}
                        </ThemeInput>
                      )}
                    </Grid>
                    <Grid item xs={6} lg={4} style={{ padding: "24px" }}>
                      <div
                        className='flex_box'
                        style={{ justifyContent: "space-between" }}
                      >
                        <ThemeInput
                          name='date_from'
                          type='date'
                          variant='outlined'
                          margin='dense'
                          value={options.date_from}
                          onChange={(e) => {
                            filterChangeHandler({
                              ...options,
                              date_from: e.target.value,
                            });
                          }}
                          inputProps={{
                            max: new Date().toISOString().split("T")[0],
                          }}
                        />
                        <div style={{ margin: "0 10px" }}>-</div>
                        <ThemeInput
                          name='date_to'
                          type='date'
                          variant='outlined'
                          margin='dense'
                          value={options.date_to}
                          onChange={(e) => {
                            filterChangeHandler({
                              ...options,
                              date_to: e.target.value,
                            });
                          }}
                          inputProps={{
                            max: new Date().toISOString().split("T")[0],
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      lg={3}
                      style={{ padding: "24px 0px 24px 48px" }}
                    >
                      <div
                        className='flex_box'
                        style={{ justifyContent: "flex-end" }}
                      >
                        {statusList && (
                          <ThemeInput
                            margin='dense'
                            name='status'
                            select
                            variant='outlined'
                            value={options.status}
                            onChange={(e) => {
                              filterChangeHandler({
                                ...options,
                                status: e.target.value,
                              });
                            }}
                            fullWidth
                          >
                            {statusList.map((type) => (
                              <MenuItem
                                key={type.name}
                                value={type.value}
                                className={classes.menuItem}
                                classes={{ selected: classes.selected }}
                              >
                                {type.name}
                              </MenuItem>
                            ))}
                          </ThemeInput>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={1} lg={2} style={{ padding: "24px" }}>
                      <SelectCurrency
                        onChange={(currency) =>
                          filterChangeHandler({ ...options, currency })
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                      padding: "25px 15px",
                    }}
                  >
                    <Grid item xs={2}>
                      <Typography variant='body2'>Операция</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant='body2'>Дата</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        variant='body2'
                        style={{ textAlign: "center" }}
                      >
                        Сумма
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        variant='body2'
                        style={{ textAlign: "center" }}
                      >
                        Приход
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        variant='body2'
                        style={{ textAlign: "center" }}
                      >
                        Расход
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        variant='body2'
                        style={{ textAlign: "center" }}
                      >
                        Статус
                      </Typography>
                    </Grid>
                  </Grid>
                  {historyList ? (
                    historyList.map((obj, i) => {
                      const statusImg = [
                        null,
                        <img
                          src={pending}
                          style={{ width: 24 }}
                          title={obj.status.name}
                          alt=''
                        />,
                        <img
                          src={success}
                          style={{ width: 24 }}
                          title={obj.status.name}
                          alt=''
                        />,
                        <img
                          src={fail}
                          style={{ width: 24 }}
                          title={obj.status.name}
                          alt=''
                        />,
                        <img
                          src={fail}
                          style={{ width: 24 }}
                          title={obj.status.name}
                          alt=''
                        />,
                        <img
                          src={warning}
                          style={{ width: 24 }}
                          title={obj.status.name}
                          alt=''
                        />,
                        <img
                          src={success}
                          style={{ width: 24 }}
                          title={obj.status.name}
                          alt=''
                        />,
                      ];
                      return (
                        <Grid
                          item
                          xs={12}
                          container
                          onClick={() =>
                            history.push(
                              `/dashboard/operations/detail/${obj.operation_id}`
                            )
                          }
                          className={classes.operationItem}
                          key={obj.order_id + obj.date + i}
                        >
                          <Grid item xs={2}>
                            <Typography
                              variant='body2'
                              style={{ marginTop: "6px" }}
                            >
                              {obj.operation_type.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography
                              variant='body2'
                              style={{ marginTop: "6px" }}
                            >
                              {obj.date}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography
                              variant='body2'
                              style={{ textAlign: "center", marginTop: "6px" }}
                            >
                              {`${obj.sum} ${obj.main_currency}`}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography
                              variant='body2'
                              style={{ textAlign: "center", marginTop: "6px" }}
                            >
                              {Boolean(obj.debit)
                                ? `${obj.debit} ${obj.currency}`
                                : "---"}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography
                              variant='body2'
                              style={{ textAlign: "center", marginTop: "6px" }}
                            >
                              {Boolean(obj.credit) ? obj.credit : "---"}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            style={{ textAlign: "center", marginTop: "6px" }}
                          >
                            {statusImg[obj.status.value]}
                          </Grid>
                        </Grid>
                      );
                    })
                  ) : (
                    <Grid item xs={12}>
                      <div className='flex_box'>
                        <div style={{ textAlign: "center", marginTop: 100 }}>
                          <img src={goust} alt='' />
                          <Typography variant='h3' style={{ color: "#3E414E" }}>
                            Ничего не найдено
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          )}

          {tab === "Настройки" &&
            (currentMerchant.status.name === "Не подтвержден" ? (
              <DomenNotConfirmed />
            ) : (
              <>
                <Formik
                  initialValues={{ ...currentMerchant.params }}
                  validationSchema={settingsFormValidation}
                  onSubmit={settingSubmit}
                >
                  <Form>
                    <div
                      className='flex_box'
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        className='subtitle'
                        style={{ marginBottom: "8px" }}
                      >
                        URL успешной оплаты:
                      </span>
                      <ValidatedInput
                        name='success_url'
                        style={{ width: "100%" }}
                        placeholder={`Например, ${currentMerchant.params.domain}/success`}
                      />
                    </div>
                    <div
                      className='flex_box'
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        className='subtitle'
                        style={{ marginBottom: "8px" }}
                      >
                        URL неуспешной оплаты:
                      </span>
                      <ValidatedInput
                        name='fail_url'
                        style={{ width: "100%" }}
                        placeholder={`Например, ${currentMerchant.params.domain}/fail`}
                      />
                    </div>
                    <div
                      className='flex_box'
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        className='subtitle'
                        style={{ marginBottom: "8px" }}
                      >
                        URL обработчика:
                      </span>
                      <ValidatedInput
                        name='status_url'
                        style={{ width: "100%" }}
                        placeholder={`Например, ${currentMerchant.params.domain}/status`}
                      />
                    </div>
                    <GoldButton type='submit' style={{ width: 175 }}>
                      Сохранить
                    </GoldButton>
                  </Form>
                </Formik>
                <div style={{ marginTop: "60px" }}>
                  <p className='subtitle'>Удалить проект</p>
                  <Typography variant='body2' style={{ width: "45%" }}>
                    Перед удалением убедитесь, что вы выбрали правильный проект.
                    Удаление приведет к потере данных и средств на кошельке.
                  </Typography>
                  <NavLink
                    to={`${match.url}/delete`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      style={{
                        borderColor: "#ff6f6f",
                        color: "#ff6f6f",
                        fontSize: 16,
                        width: 175,
                        height: 50,
                        margin: "20px 0",
                      }}
                      variant='outlined'
                    >
                      Удалить
                    </Button>
                  </NavLink>
                </div>
              </>
            ))}

          {tab === "API" && (
            <>
              {currentMerchant.status.name === "Не подтвержден" ? (
                <DomenNotConfirmed />
              ) : (
                <>
                  <p
                    className='subtitle'
                    style={{ fontWeight: 450, fontSize: "24px" }}
                  >
                    Идентификатор приложения
                  </p>
                  <Typography variant='body2' style={{ lineHeight: "200%" }}>
                    Используйте этот идентификатор для создания счета
                  </Typography>
                  <Typography variant='body2' style={{ lineHeight: "200%" }}>
                    ID этого проекта:
                    <span
                      style={{
                        color: "#ff9900",
                        marginLeft: 15,
                        fontWeight: 450,
                      }}
                    >
                      {match.params.id}
                    </span>
                  </Typography>

                  <p
                    className='subtitle'
                    style={{ marginTop: 65, fontWeight: 450, fontSize: "24px" }}
                  >
                    API
                  </p>
                  <Typography variant='body2' style={{ lineHeight: "200%" }}>
                    Access to payments through API
                  </Typography>
                  <Typography variant='body2' style={{ lineHeight: "200%" }}>
                    Для работы с API вам необходимо получить API Key и Secret
                    Key.
                  </Typography>
                  <div
                    className='flex_box'
                    style={{
                      marginTop: 20,
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      className='subtitle'
                      style={{ fontSize: 16, marginBottom: "8px" }}
                    >
                      API Key:
                    </span>
                    <ThemeInput
                      name='key'
                      type='text'
                      style={{ width: "100%" }}
                      value={currentMerchant.params.api_key}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Tooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              open={tooltip.a}
                              disableFocusListener
                              disableHoverListener
                              disableTouchListener
                              title='Copied'
                              arrow
                              TransitionComponent={Zoom}
                            >
                              <CopyToClipboard
                                text={currentMerchant.params.api_key}
                                onCopy={() => {
                                  setTooltip({ ...tooltip, a: true });
                                  closeTooltip();
                                }}
                              >
                                <img
                                  src={copyIcon}
                                  style={{ cursor: "pointer" }}
                                  alt='content copy'
                                />
                              </CopyToClipboard>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      variant='outlined'
                      disabled
                    />
                  </div>
                  <div
                    className='flex_box'
                    style={{
                      marginTop: 20,
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      className='subtitle'
                      style={{ fontSize: 16, marginBottom: "8px" }}
                    >
                      Secret Key:
                    </span>
                    <ThemeInput
                      name='token'
                      type='text'
                      style={{ width: "100%" }}
                      value={currentMerchant.params.secret_key}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Tooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              open={tooltip.b}
                              disableFocusListener
                              disableHoverListener
                              disableTouchListener
                              title='Copied'
                              arrow
                              TransitionComponent={Zoom}
                            >
                              <CopyToClipboard
                                text={currentMerchant.params.secret_key}
                                onCopy={() => {
                                  setTooltip({ ...tooltip, b: true });
                                  closeTooltip();
                                }}
                              >
                                <img
                                  src={copyIcon}
                                  style={{ cursor: "pointer" }}
                                  alt='content copy'
                                />
                              </CopyToClipboard>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      variant='outlined'
                      disabled
                    />
                  </div>
                  <GoldButton
                    onClick={getTokenHandler}
                    style={{
                      fontSize: 16,
                      minHeight: 50,
                      width: 250,
                      margin: "40px 0",
                    }}
                  >
                    Сгенерировать новый ключ
                  </GoldButton>
                </>
              )}
            </>
          )}
        </section>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  menuItem: {
    color: "#ff9900",
    "&:hover": {
      backgroundColor: "#ff9900",
      color: "#fff",
    },
  },
  selected: {
    "&:hover": {
      color: "#ff9900",
    },
  },
  operationItem: {
    cursor: "pointer",
    borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
    padding: "25px 15px",
    "&:hover p": {
      color: "#ff9900",
    },
  },
}));
