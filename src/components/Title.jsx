import React from "react";
import { Typography } from "@material-ui/core";

const Title = ({ title, variant }) => {
  return (
    <Typography variant={variant} component="h2">
      {title}
    </Typography>
  );
};

export default Title;
