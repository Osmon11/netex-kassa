import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoldButton } from "shared/Buttons/buttons";
import { setAlert, setBackdrop } from "store/actionCreators";
import { deleteMerchant } from "store/reducer";

export function ConfirmDeleteProject({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const removeMerchant = () => {
    dispatch(setBackdrop(true));
    dispatch(
      deleteMerchant(match.params.id, (message, response) => {
        if (response) {
          history.push("/dashboard");
        } else {
          dispatch(setAlert({ open: true, severity: "error", message }));
        }
      })
    );
  };

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
          <Button
            className={classes.customBtn}
            variant='outlined'
            onClick={() => history.goBack()}
          >
            Отменить
          </Button>
          <GoldButton style={{ width: "45%" }} onClick={removeMerchant}>
            Удалить
          </GoldButton>
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
    width: "45%",
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
