import {
  InputAdornment,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { ThemeInput } from "components/Auth/auth";
import React, { useRef, useState } from "react";
import uploadIcon from "assets/upload-icon.png";
import calendarIcon from "assets/calendar-icon.png";

export function Inputs({
  label,
  select,
  upload,
  date,
  name,
  placeholder,
  items,
}) {
  const classes = useStyles();
  const [item, setItem] = useState(items ? items[0] : null);
  const avatar = useRef();

  return (
    <div
      className="flex_box"
      style={{ justifyContent: "space-between", paddingRight: "25%" }}
    >
      <Typography
        variant="body2"
        style={{ fontSize: 16, fontWeight: 300, width: "40%" }}
      >
        {label}
      </Typography>
      {select ? (
        <ThemeInput
          margin="dense"
          name={name}
          select
          variant="outlined"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          style={{ marginBottom: 20, width: 334 }}
        >
          {items.map((value) => (
            <MenuItem
              key={"country" + value}
              value={value}
              className={classes.menuItem}
            >
              {value}
            </MenuItem>
          ))}
        </ThemeInput>
      ) : upload ? (
        <ThemeInput
          margin="dense"
          placeholder="Загрузить изображение"
          type="text"
          variant="outlined"
          onClick={() => avatar.current.click()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img src={uploadIcon} alt="" />
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: 20, width: 334 }}
          disabled
        />
      ) : date ? (
        <ThemeInput
          margin="dense"
          placeholder={placeholder}
          type="text"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img src={calendarIcon} alt="" />
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: 20, width: 334 }}
        />
      ) : (
        <ThemeInput
          margin="dense"
          name={name}
          type="text"
          variant="outlined"
          placeholder={placeholder}
          style={{ marginBottom: 20, width: 334 }}
        />
      )}
      <input name={name} type="file" ref={avatar} style={{ display: "none" }} />
    </div>
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
}));
