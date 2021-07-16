import { CircularProgress, makeStyles, MenuItem } from "@material-ui/core";
import { ThemeInput } from "components/Auth/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "store/actionCreators";
import { getCurrencies } from "store/reducer";

export default function SelectCurrency({ onChange = () => {} }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currencies, currentCurrency } = useSelector((store) => store.reducer);

  useEffect(() => {
    if (!currencies) {
      dispatch(getCurrencies());
    }
    if (!Boolean(currentCurrency) && Boolean(currencies)) {
      dispatch(setCurrency(currencies[0].alias));
    }
  }, [dispatch, currencies, currentCurrency]);
  return Boolean(currencies) ? (
    <ThemeInput
      name='currency'
      margin='dense'
      select
      variant='outlined'
      value={currentCurrency}
      onChange={(e) => {
        dispatch(setCurrency(e.target.value));
        onChange(e.target.value);
      }}
    >
      {currencies.map((c) => (
        <MenuItem
          key={c.name}
          value={c.alias}
          className={classes.menuItem}
          classes={{ selected: classes.selected }}
        >
          {c.alias}
        </MenuItem>
      ))}
    </ThemeInput>
  ) : (
    <div className='flex_box'>
      <CircularProgress />
    </div>
  );
}

const useStyles = makeStyles({
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
});
