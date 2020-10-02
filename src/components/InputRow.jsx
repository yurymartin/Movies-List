import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { FormGroup, TextField, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import NativeSelect from "@material-ui/core/NativeSelect";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  input_time: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(-0.5),
    marginBottom: theme.spacing(2),
    width: "80%",
  },
}));

const InputRow = ({ type, label, onChange, value, name }) => {
  const classes = useStyles();

  return (
    <div>
      <FormGroup row>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography variant="overline" display="block" gutterBottom>
              {label}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {type == "select" ? (
              <>
                <NativeSelect
                  id={name}
                  name={name}
                  className={classes.input_time}
                  value={value}
                  onChange={onChange}
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="">
                    Seleccione Estado
                  </option>
                  <option value={1}>Activo</option>
                  <option value={2}>Inactivo</option>
                </NativeSelect>
              </>
            ) : (
              <TextField
                type={type}
                id={name}
                name={name}
                variant="outlined"
                size="small"
                className={classes.input_time}
                value={value}
                onChange={onChange}
                fullWidth
              />
            )}
          </Grid>
        </Grid>
      </FormGroup>
    </div>
  );
};

export default InputRow;
