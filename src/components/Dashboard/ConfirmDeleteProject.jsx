import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { GoldButton } from "shared/Buttons/buttons";

export function ConfirmDeleteProject() {
  const classes = useStyles();
  return (
    <div className='flex_box'>
      <Paper className={classes.paper}>
        <Typography variant='h4' style={{ textAlign: "center", color: "#fff" }}>
          Вы действительно хотите удалить этот проект?
        </Typography>
        <Typography
          variant='body1'
          style={{
            color: "#74757D",
            fontSize: 18,
            textAlign: "center",
            marginTop: 15,
          }}
        >
          После удаления вы не сможете его восстановить
        </Typography>
        <div
          className='flex_box'
          style={{ justifyContent: "space-between", marginTop: 50 }}
        >
          <NavLink
            to='/dashboard'
            style={{ textDecoration: "none", width: "45%" }}
          >
            <Button className={classes.customBtn} variant='outlined'>
              Отменить
            </Button>
          </NavLink>
          <GoldButton style={{ width: "45%" }}>Удалить</GoldButton>
        </div>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "50%",
    background: "#2A2B31",
    padding: "73px 8%",
    margin: "100px 0",
  },
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
