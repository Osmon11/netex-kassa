import {
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import logoDark from "../../assets/logo-dark.png";
import cursor from "../../assets/cursor.png";
import loading from "../../assets/loading.png";
import timer from "../../assets/timer.png";
import copyDark from "../../assets/copy-icon-dark.png";
import qrCode from "../../assets/qr-code.png";
import btc from "../../assets/btc.png";
import eth from "../../assets/eth.png";
import dot from "../../assets/dot.png";
import etc from "../../assets/etc.png";
import usdt from "../../assets/usdt.png";
import ada from "../../assets/ada.png";
import link from "../../assets/link.png";
import ltc from "../../assets/ltc.png";
import xrp from "../../assets/xrp.png";
import bth from "../../assets/bth.png";
import "./style.css";
import { GoldButton } from "shared/Buttons/buttons";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function PaymentBody() {
  const classes = useStyles();
  const [paymentMethod, setMethod] = useState("BTC");
  const [timeleft, setTimeLeft] = useState(2400);
  const [tooltip, setTooltip] = useState({ a: false, b: false });
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  let minutes = Math.floor((timeleft % (60 * 60)) / 60);
  let seconds = Math.floor(timeleft % 60);

  useEffect(() => {
    if (paymentMethod) {
      const timer =
        timeleft > 0 && setInterval(() => setTimeLeft(timeleft - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeleft, paymentMethod]);
  function closeTooltip() {
    setTimeout(() => setTooltip({ a: false, b: false }), 1500);
  }
  return (
    <Container style={{ padding: !sm ? "0 140px" : xs ? "0 10px" : "0 100px" }}>
      {!sm && (
        <img src={logoDark} alt="logo" style={{ margin: "40px 0 100px" }} />
      )}
      <Paper className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item md={6} sm={12}>
            <Paper className={classes.innerPaper}>
              <div style={{ padding: "50px 40px 40px" }}>
                <Typography variant="body1" style={{ color: "#000" }}>
                  Оплата на сайте site-name.domen
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    color: "#FF9900",
                    margin: "10px 0 40px",
                    fontWeight: 500,
                  }}
                >
                  100$
                </Typography>
                <Typography variant="body1" style={{ color: "#000" }}>
                  #264040
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "#000", margin: "10px 0 36px" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas lobortis congue lorem et posuere.
                </Typography>
                <div
                  className="flex_box"
                  style={{ justifyContent: "space-between" }}
                >
                  <Typography
                    variant="body2"
                    style={{ color: "#000", fontWeight: 400 }}
                  >
                    Получатель
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#000", fontWeight: 400 }}
                  >
                    laslobit.cc
                  </Typography>
                </div>
                <div
                  className="flex_box"
                  style={{ justifyContent: "space-between" }}
                >
                  <Typography
                    variant="body2"
                    style={{ color: "#000", fontWeight: 400 }}
                  >
                    Номер счета
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#000", fontWeight: 400 }}
                  >
                    254857
                  </Typography>
                </div>
              </div>
              <Divider style={{ backgroundColor: "#A9A9A9" }} />
              <div style={{ padding: "40px 40px 50px" }}>
                <Typography
                  variant="body1"
                  style={{ color: "#1A1A1A", fontSize: 25, marginBottom: 25 }}
                >
                  Метод оплаты
                </Typography>
                <Grid container spacing={2}>
                  {data.map((obj) => (
                    <Grid item xl={4} md={6} sm={6} xs={12} key={obj.name}>
                      <Paper
                        className={classes.gridPaper}
                        style={{
                          borderColor:
                            paymentMethod === obj.name ? "#FF9900" : "#E6E6E6",
                        }}
                        onClick={() => setMethod(obj.name)}
                      >
                        <div className="flex_box">
                          <img
                            src={obj.icon}
                            alt=""
                            style={{ marginRight: 10 }}
                          />

                          <span>
                            <Typography
                              variant="subtitle2"
                              style={{ fontSize: 16, color: "#888" }}
                            >
                              {obj.name}
                            </Typography>
                            <Typography
                              variant="body1"
                              style={{ fontSize: 18, color: "#000" }}
                            >
                              {obj.amount}
                            </Typography>
                          </span>
                        </div>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Paper>
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            {paymentMethod ? (
              <section
                style={{
                  padding: !sm ? "50px 40px" : xs ? "25px 15px" : "0 40px 50px",
                }}
              >
                <div
                  className="flex_box"
                  style={{ justifyContent: "flex-start" }}
                >
                  <div
                    className="flex_box"
                    style={{ width: 120, justifyContent: "flex-start" }}
                  >
                    <img src={timer} alt="" />
                    <Typography
                      variant="body1"
                      style={{ color: "#000", margin: "0 15px 0 10px" }}
                    >
                      {`${minutes} : ${seconds}`}
                    </Typography>
                  </div>
                  <Typography
                    variant="body2"
                    style={{ color: "#000", maxWidth: "60%" }}
                  >
                    Оплатите заявку до окончания этого времени
                  </Typography>
                </div>
                <Typography
                  variant="body2"
                  style={{ color: "#000", margin: "50px 0 8px" }}
                >
                  Переведите
                </Typography>
                <div
                  className="neomorphism_box flex_box"
                  style={{ justifyContent: "space-between" }}
                >
                  <Typography
                    variant="body1"
                    style={{ color: "#000", fontWeight: 400 }}
                  >
                    0.005 BTC
                  </Typography>
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
                      text="0.005 BTC"
                      onCopy={() => {
                        setTooltip({ ...tooltip, a: true });
                        closeTooltip();
                      }}
                    >
                      <img
                        src={copyDark}
                        alt=""
                        style={{ cursor: "pointer" }}
                      />
                    </CopyToClipboard>
                  </Tooltip>
                </div>
                <Typography
                  variant="body2"
                  style={{ color: "#000", margin: "15px 0 8px" }}
                >
                  На кошелек
                </Typography>
                <div
                  className="neomorphism_box flex_box"
                  style={{
                    justifyContent: "space-between",
                    position: "relative",
                    paddingRight: 50,
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      color: "#000",
                      fontWeight: 400,
                      overflowX: "hidden",
                    }}
                  >
                    39uvqC8CFYnSHZthgPv27sMWmqFbGsdDyZ
                  </Typography>
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
                      text="39uvqC8CFYnSHZthgPv27sMWmqFbGsdDyZ"
                      onCopy={() => {
                        setTooltip({ ...tooltip, b: true });
                        closeTooltip();
                      }}
                    >
                      <img
                        src={copyDark}
                        alt=""
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          top: 15,
                          right: 20,
                        }}
                      />
                    </CopyToClipboard>
                  </Tooltip>
                </div>
                <Typography
                  variant="body2"
                  style={{ color: "#000", marginTop: 40 }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas lobortis congue lorem et posuere. Donec eget placerat
                  metus.
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "#000", margin: "20px 0 20px" }}
                >
                  Curabitur aliquam urna diam, id feugiat orci sagittis non. Ut
                  condimentum felis velit, nec imperdiet mi volutpat vel. Fusce
                  in justo id augue laoreet vulputate.
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "#000", marginBottom: 40 }}
                >
                  Nulla vitae est nulla. Cras quis lacinia ipsum, ut blandit
                  nulla. Aliquam vel purus eros. Cras quis nisi ut tortor rutrum
                  varius.
                </Typography>
                <div style={{ width: "100%", textAlign: "center" }}>
                  <img src={qrCode} alt="" />
                </div>
                <Typography
                  variant="body2"
                  style={{ color: "#000", textAlign: "center" }}
                >
                  QR-код для оплаты через приложение
                </Typography>
                {/* <Typography variant='body2'>
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
                    <span
                      className='doc_link'
                      onClick={() => {
                        copyToClipboard("39uvqC8CFYnSHZthgPv27sMWmqFbGsdDyZ");
                        setTooltip({ ...tooltip, b: true });
                        setTimeout(
                          () => setTooltip({ ...tooltip, b: false }),
                          1500
                        );
                      }}
                    >
                      Копировать номер кошелька
                    </span>
                  </Tooltip>
                </Typography> */}
              </section>
            ) : (
              <div
                className="flex_box"
                style={{ padding: "0 55px", height: "100%" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h4"
                      style={{
                        textAlign: "center",
                        margin: sm ? "40px 0 20px" : "0 0 70px",
                      }}
                    >
                      Выберите метод оплаты
                    </Typography>
                  </Grid>
                  {data.map((_, i) => (
                    <Grid item md={4} sm={6} xs={12} key={"example" + i}>
                      <Paper
                        elevation={0}
                        style={{
                          height: 65,
                          position: "relative",
                          backgroundColor: i === 0 ? "#CECECE" : "#EEEEEE",
                          border: "1px solid #E6E6E6",
                          borderRadius: 10,
                        }}
                      >
                        {i === 0 && (
                          <img className="cursor_img" src={cursor} alt="" />
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
          </Grid>
        </Grid>
      </Paper>
      <div className="flex_box" style={{ margin: "50px 0" }}>
        <img src={loading} alt="" style={{ marginRight: 20 }} />
        <Typography variant="body2" style={{ color: "#000" }}>
          Мы проверяем оплату автоматически, чтобы вам не приходилось обновлять
          страницу.
        </Typography>
      </div>
      <div className="flex_box">
        <GoldButton style={{ width: 250 }}>Отменить</GoldButton>
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    boxShadow: "0px 4px 89px rgba(0, 0, 0, 0.2)",
    borderRadius: 20,
    [theme.breakpoints.down("sm")]: {
      boxShadow: "none",
      backgroundColor: "inherit",
    },
  },
  innerPaper: {
    height: "100%",
    boxShadow: "13px 0px 28px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px 0px 0px 20px",
    [theme.breakpoints.down("sm")]: {
      boxShadow: "none",
      backgroundColor: "inherit",
    },
  },
  gridPaper: {
    padding: "10px 15px",
    border: "1px solid #E6E6E6",
    borderRadius: 10,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    cursor: "pointer",
  },
}));

// Payment methods
const data = [
  {
    name: "BTC",
    amount: 0.00001,
    icon: btc,
  },
  {
    name: "ETH",
    amount: 0.00001,
    icon: eth,
  },
  {
    name: "DOT",
    amount: 0.00001,
    icon: dot,
  },
  {
    name: "ETC",
    amount: 0.00001,
    icon: etc,
  },
  {
    name: "USDT",
    amount: 0.00001,
    icon: usdt,
  },
  {
    name: "ADA",
    amount: 0.00001,
    icon: ada,
  },
  {
    name: "LTC",
    amount: 0.00001,
    icon: ltc,
  },
  {
    name: "XRP",
    amount: 0.00001,
    icon: xrp,
  },
  {
    name: "BTH",
    amount: 0.00001,
    icon: bth,
  },
  {
    name: "LINK",
    amount: 0.00001,
    icon: link,
  },
];
