import {
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoldButton } from "shared/Buttons/buttons";
import { getTariffPlans } from "store/reducer";
import "./style.css";

export function RatesBody() {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const state = useSelector((store) => store.reducer);

  useEffect(() => {
    if (Boolean(!state.tariffPlans)) {
      dispatch(getTariffPlans());
    }
  }, [state.tariffPlans, dispatch]);

  return (
    <Container>
      <Grid container spacing={3} style={{ padding: `0 ${xs ? 0 : 50}px` }}>
        <Grid item xs={12}>
          {Boolean(state.tariffPlans) ? (
            <>
              <p
                className="main_title"
                style={{ marginBottom: 0, marginTop: 150, width: "100%" }}
              >
                Доступные тарифы
              </p>
              <p
                className="title"
                style={{
                  fontSize: 25,
                  textAlign: "center",
                  width: "100%",
                  marginBottom: 100,
                }}
              >
                Выберите подходящий вам тариф
              </p>
            </>
          ) : (
            <div className="flex_box" style={{ height: "100vh" }}>
              <CircularProgress />
            </div>
          )}
        </Grid>
        {Boolean(state.tariffPlans) ? (
          !xs ? (
            <>
              {state.tariffPlans.map((plan) => (
                <Grid item sm={6} key={plan.name}>
                  <Paper
                    style={{
                      background: "#2A2B31",
                      borderRadius: 4,
                      padding: "30px 30px 60px",
                    }}
                    elevation={0}
                  >
                    <p
                      className="title"
                      style={{ textAlign: "center", marginBottom: 15 }}
                    >
                      {plan.name}
                    </p>
                    <Typography
                      variant="h3"
                      style={{ color: "#FF9900", textAlign: "center" }}
                    >
                      {plan.percent}
                    </Typography>
                    <Typography variant="body1" style={{ textAlign: "center" }}>
                      {plan.name === "Unlimited pack"
                        ? "за месяц"
                        : "за транзакцию"}
                    </Typography>
                    <Divider
                      style={{
                        backgroundColor: "#fff",
                        opacity: 0.2,
                        margin: "30px 0",
                      }}
                    />
                    <ul
                      style={{
                        marginLeft: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      {plan.description.split("-").map((text) => {
                        return (
                          <li
                            className="rates_list_item"
                            key={`${plan.name}=${text}`}
                          >
                            <Typography variant="body1">{text}</Typography>
                          </li>
                        );
                      })}
                    </ul>
                    <GoldButton
                      style={{
                        marginLeft: "50%",
                        transform: "translateX(-50%)",
                        minWidth: 250,
                        minHeight: 60,
                        marginTop: 80,
                      }}
                    >
                      Начать
                    </GoldButton>
                  </Paper>
                </Grid>
              ))}

              <Grid item md={6}>
                <p className="subtitle">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga
                </p>
              </Grid>

              <Grid item md={6}>
                <p className="subtitle">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga
                </p>
              </Grid>
            </>
          ) : (
            <MobileVertion />
          )
        ) : null}
      </Grid>
    </Container>
  );
}

function MobileVertion() {
  return (
    <Grid
      item
      xs={12}
      style={{
        display: "flex",
        overflowX: "auto",
        flexWrap: "nowrap",
        paddingBottom: 50,
      }}
    >
      <Paper
        style={{
          background: "#2A2B31",
          borderRadius: 4,
          margin: "0 30px",
          padding: "30px 0 60px",
          display: "flex",
        }}
        elevation={0}
      >
        <div className="rates_mobile">
          <p
            className="title"
            style={{ textAlign: "center", marginBottom: 15 }}
          >
            Базовый
          </p>
          <Typography
            variant="h3"
            style={{ color: "#FF9900", textAlign: "center" }}
          >
            0.5%
          </Typography>
          <Typography variant="body1" style={{ textAlign: "center" }}>
            за транзакцию
          </Typography>
          <ul>
            <li className="rates_list_item">
              <Typography variant="body1">Безлимитные инвойсы</Typography>
            </li>
            <li className="rates_list_item">
              <Typography variant="body1">Все валюты</Typography>
            </li>
            <li className="rates_list_item">
              <Typography variant="body1">Вывод без комиссии</Typography>
            </li>
            <li className="rates_list_item">
              <Typography variant="body1">Бесплатная поддержка</Typography>
            </li>
          </ul>
          <GoldButton
            style={{
              marginLeft: "50%",
              transform: "translateX(-50%)",
              minWidth: 125,
              minHeight: 60,
              marginTop: 80,
            }}
          >
            Начать
          </GoldButton>
          <p className="subtitle">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga
          </p>
        </div>

        <div className="rates_mobile">
          <p
            className="title"
            style={{ textAlign: "center", marginBottom: 15 }}
          >
            Безлимитный
          </p>
          <Typography
            variant="h3"
            style={{ color: "#FF9900", textAlign: "center" }}
          >
            2000%
          </Typography>
          <Typography variant="body1" style={{ textAlign: "center" }}>
            за месяц
          </Typography>
          <ul>
            <li className="rates_list_item">
              <Typography variant="body1">Безлимитные инвойсы</Typography>
            </li>
            <li className="rates_list_item">
              <Typography variant="body1">Все валюты</Typography>
            </li>
            <li className="rates_list_item">
              <Typography variant="body1">Вывод без комиссии</Typography>
            </li>
            <li className="rates_list_item">
              <Typography variant="body1">Бесплатная поддержка</Typography>
            </li>
          </ul>
          <GoldButton
            style={{
              marginLeft: "50%",
              transform: "translateX(-50%)",
              minWidth: 125,
              minHeight: 60,
              marginTop: 80,
            }}
          >
            Начать
          </GoldButton>
          <p className="subtitle">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga
          </p>
        </div>
      </Paper>
    </Grid>
  );
}
