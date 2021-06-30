import {
  InputAdornment,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { ThemeInput } from "components/Auth/auth";
import React, { useRef, useState } from "react";
import uploadIcon from "assets/upload-icon.png";
import { ErrorMessage, useField } from "formik";
import { useDispatch } from "react-redux";
import { setFileToUpload } from "store/actionCreators";

export function ValidatedInput({ children, style, ...props }) {
  const [field, meta] = useField(props);

  return (
    <ThemeInput
      {...field}
      {...props}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.error ? <ErrorMessage name={field.name} /> : ""}
      variant='outlined'
      style={{ marginBottom: 20, width: 334, ...style }}
    >
      {children}
    </ThemeInput>
  );
}

export function Inputs({
  label,
  value,
  handleChange,
  select,
  upload,
  date,
  items,
  withoutLabel,
  ...props
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const avatar = useRef();
  const [fileInputsState, setInputState] = useState({});
  const [currentFileInput, setCurrentInput] = useState("");

  return (
    <div
      className='flex_box'
      style={{
        justifyContent: withoutLabel ? "flex-start" : "space-between",
        paddingRight: withoutLabel ? 0 : "25%",
      }}
    >
      {!withoutLabel && (
        <Typography
          variant='body2'
          style={{ fontSize: 16, fontWeight: 300, width: "40%" }}
        >
          {label}
        </Typography>
      )}
      {/* if type select */}
      {select ? (
        <ValidatedInput {...props} value={value} select onChange={handleChange}>
          {items.map((value) => (
            <MenuItem
              key={"country" + value.id}
              value={value.id}
              className={classes.menuItem}
            >
              {value.name}
            </MenuItem>
          ))}
        </ValidatedInput>
      ) : // if it needs to upload file
      upload ? (
        <ValidatedInput
          {...props}
          placeholder={
            Boolean(fileInputsState[props.name])
              ? fileInputsState[props.name].name
              : "Загрузить изображение"
          }
          onClick={() => {
            avatar.current.click();
            setCurrentInput(props.name);
          }}
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
        <ValidatedInput {...props} type='date' />
      ) : (
        // simple input
        <ValidatedInput {...props} />
      )}
      {/* it required to select and upload file  */}
      <input
        name='upload_file'
        type='file'
        ref={avatar}
        onChange={(e) => {
          let newState = { ...fileInputsState };
          dispatch(setFileToUpload({ [currentFileInput]: e.target.files[0] }));
          newState[currentFileInput] = e.target.files[0];
          setInputState(newState);
        }}
        style={{ display: "none" }}
      />
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
