import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: 5,
  },
}));

export default function ButtonCustom({ label, color, fullWidth, onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color={color}
        fullWidth={fullWidth}
        onClick={onClick}
      >
        {label}
      </Button>
    </div>
  );
}
