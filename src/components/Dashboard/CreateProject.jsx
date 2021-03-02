import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import { ThemeInput } from "components/Auth/auth";
import React, { useState } from "react";
import checkIcon from "assets/check.png";
import { NavLink } from "react-router-dom";
import { GoldButton } from "shared/Buttons/buttons";

export function CreateProject() {
  const classes = useStyles();
  const [isSuccess, setSuccess] = useState(false);

  return (
    <section style={{ width: "100%", paddingLeft: "10%", paddingTop: 142 }}>
      <Paper
        style={{
          width: "50%",
          padding: "53px 81px",
          backgroundColor: "#2A2B31",
        }}
      >
        {isSuccess ? (
          <Success />
        ) : (
          <>
            <p
              className="title"
              style={{ textAlign: "center", marginTop: 0, marginBottom: 50 }}
            >
              Создать новый проект
            </p>
            <form>
              <Typography variant="body2" style={{ marginTop: 15 }}>
                Название проекта
              </Typography>
              <ThemeInput
                margin="dense"
                name="username"
                type="text"
                variant="outlined"
                placeholder="Введите название проекта"
                style={{ marginBottom: 10 }}
                fullWidth
              />
              <Typography variant="body2" style={{ marginTop: 15 }}>
                URL
              </Typography>
              <ThemeInput
                margin="dense"
                name="username"
                type="text"
                variant="outlined"
                placeholder="Введите URL"
                style={{ marginBottom: 10 }}
                fullWidth
              />
            </form>
            <div
              className="flex_box"
              style={{ justifyContent: "space-between", marginTop: 45 }}
            >
              <NavLink
                to="/dashboard"
                style={{ textDecoration: "none", width: "40%" }}
              >
                <Button className={classes.customBtn} variant="outlined">
                  Отмена
                </Button>
              </NavLink>
              <GoldButton
                style={{ minHeight: 50, width: "40%", fontSize: 16 }}
                onClick={() => setSuccess((isSuccess) => !isSuccess)}
              >
                Далее
              </GoldButton>
            </div>
          </>
        )}
      </Paper>
    </section>
  );
}

function Success() {
  return (
    <div className="flex_vertical">
      <img src={checkIcon} alt="" />
      <p className="title" style={{ marginTop: 10 }}>
        Успешно!
      </p>
      <p className="subtitle" style={{ textAlign: "center", marginTop: 40 }}>
        Ваш проект был успешно создан, для дальнейшем работы ваш проект должен
        пройти модерацию. Ожидайте проверку, ответ мы вышли Вам на почту в
        течении 72 часов
      </p>
      <NavLink
        to="/dashboard/steps"
        style={{ textDecoration: "none", width: "100%", textAlign: "center" }}
      >
        <GoldButton style={{ minHeight: 50, marginTop: 30, width: "40%" }}>
          Закрыть
        </GoldButton>
      </NavLink>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  customBtn: {
    width: "100%",
    minHeight: 50,
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    "&:hover": {
      color: "#fff",
      borderColor: "#fff",
    },
  },
}));
