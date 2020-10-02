import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "50%",
  },
}));

export default function Loading({ isLoading }) {
  const classes = useStyles();

  return (
    <>
      {isLoading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : null}
    </>
  );
}
