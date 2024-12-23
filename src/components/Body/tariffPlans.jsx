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
import { Auth } from "components/Auth/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { GoldButton } from "shared/Buttons/buttons";
import { getTariffPlans } from "store/reducer";
import "./style.css";

export function RatesBody() {
  const theme = useTheme();
  // const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const state = useSelector((store) => store.reducer);
  const history = useHistory();
  const [dialog, setDialog] = useState({ open: false, login: true });

  useEffect(() => {
    if (Boolean(!state.tariffPlans)) {
      dispatch(getTariffPlans());
    }
  }, [state.tariffPlans, dispatch]);

  function openDialog() {
    if (state.user) {
      history.push("/dashboard");
      return;
    }
    setDialog({ open: true, login: false });
  }
  return (
    <Container>
      <Grid
        container
        spacing={!xs ? 8 : 0}
        style={{ padding: `0 ${xs ? 0 : 50}px` }}
      >
        <Grid item xs={12}>
          {Boolean(state.tariffPlans) ? (
            <>
              <p
                className='main_title'
                style={{ marginBottom: 0, marginTop: 150, width: "100%" }}
              >
                Доступные тарифы
              </p>
              <p
                className='title'
                style={{
                  fontSize: 25,
                  textAlign: "center",
                  width: "100%",
                  marginBottom: 50,
                }}
              >
                Выберите подходящий вам тариф
              </p>
            </>
          ) : (
            <div className='flex_box' style={{ height: "100vh" }}>
              <CircularProgress />
            </div>
          )}
        </Grid>
        {Boolean(state.tariffPlans) &&
          (!xs ? (
            <>
              {state.tariffPlans.map((plan) => (
                <Grid item sm={12} md={6} key={plan.name}>
                  <Paper
                    style={{
                      background: "#2A2B31",
                      borderRadius: 4,
                      padding: "30px 30px 60px",
                      textAlign: "center",
                    }}
                    elevation={0}
                  >
                    <p
                      className='title'
                      style={{ textAlign: "center", marginBottom: 15 }}
                    >
                      {plan.name}
                    </p>
                    <Typography
                      variant='h3'
                      style={{ color: "#FF9900", textAlign: "center" }}
                    >
                      {plan.percent}
                    </Typography>
                    <Typography variant='body1' style={{ textAlign: "center" }}>
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
                    <ul style={{ marginLeft: 50 }}>
                      {plan.description.split("\n-").map((text) => {
                        return (
                          <li
                            className='rates_list_item'
                            key={`${plan.name}=${text}`}
                          >
                            <Typography
                              variant='body1'
                              style={{ textAlign: "start" }}
                            >
                              {text}
                            </Typography>
                          </li>
                        );
                      })}
                    </ul>
                    <GoldButton
                      onClick={openDialog}
                      style={{
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
            </>
          ) : (
            <MobileVertion
              tariffPlans={state.tariffPlans}
              setAuthDialog={(options) => setDialog(options)}
            />
          ))}
      </Grid>

      <Auth
        open={dialog.open}
        login={dialog.login}
        setLogin={(login) => setDialog({ open: true, login })}
        handleClose={() => {
          setDialog({ ...dialog, open: false });
        }}
      />
    </Container>
  );
}

function MobileVertion(props) {
  const state = useSelector((store) => store.reducer);
  const history = useHistory();

  function openDialog() {
    if (state.user) {
      history.push("/dashboard");
      return;
    }
    props.setAuthDialog({ open: true, login: false });
  }
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
          margin: "0 5px",
          padding: "30px 0",
          display: "flex",
        }}
        elevation={0}
      >
        {props.tariffPlans.map((plan) => (
          <div className='rates_mobile'>
            <p
              className='title'
              style={{ textAlign: "center", marginBottom: 15 }}
            >
              {plan.name}
            </p>
            <Typography
              variant='h3'
              style={{ color: "#FF9900", textAlign: "center" }}
            >
              {plan.percent}
            </Typography>
            <Typography variant='body1' style={{ textAlign: "center" }}>
              {plan.name === "Unlimited pack" ? "за месяц" : "за транзакцию"}
            </Typography>
            <ul>
              {plan.description.split("-").map((text) => {
                return (
                  <li className='rates_list_item'>
                    <Typography variant='body1' style={{ textAlign: "start" }}>
                      {text}
                    </Typography>
                  </li>
                );
              })}
            </ul>
            <GoldButton
              onClick={openDialog}
              style={{
                minWidth: 135,
                minHeight: 60,
                marginTop: 30,
              }}
            >
              Начать
            </GoldButton>
            <p
              className='subtitle'
              style={{ textAlign: "start", marginTop: 30 }}
            >
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga
            </p>
          </div>
        ))}
      </Paper>
    </Grid>
  );
}
