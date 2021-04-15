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
import { ErrorMessage, useField } from "formik";

export function ValidatedInput({ children, ...props }) {
  const [field, meta] = useField(props);

  return (
    <ThemeInput
      {...field}
      {...props}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.error ? <ErrorMessage name={field.name} /> : ""}
      margin='dense'
      variant='outlined'
      style={{ marginBottom: 20, width: 334 }}
    >
      {children}
    </ThemeInput>
  );
}

export function Inputs({ label, select, upload, date, items, ...props }) {
  const classes = useStyles();
  const [item, setItem] = useState(items ? items[0] : null);
  const avatar = useRef();

  return (
    <div
      className='flex_box'
      style={{ justifyContent: "space-between", paddingRight: "25%" }}
    >
      <Typography
        variant='body2'
        style={{ fontSize: 16, fontWeight: 300, width: "40%" }}
      >
        {label}
      </Typography>
      {/* if type select */}
      {select ? (
        <ValidatedInput
          {...props}
          value={item}
          select
          onChange={(e) => setItem(e.target.value)}
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
        </ValidatedInput>
      ) : // if it needs to upload file
      upload ? (
        <ValidatedInput
          {...props}
          placeholder='Загрузить изображение'
          onClick={() => avatar.current.click()}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <img src={uploadIcon} alt='' />
              </InputAdornment>
            ),
          }}
          disabled
        />
      ) : // if date then input with mask
      date ? (
        <ValidatedInput
          {...props}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <img src={calendarIcon} alt='' />
              </InputAdornment>
            ),
          }}
        />
      ) : (
        // simple input
        <ValidatedInput {...props} />
      )}
      {/* it required to select and upload file  */}
      <input {...props} type='file' ref={avatar} style={{ display: "none" }} />
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
