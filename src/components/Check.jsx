import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function Check({ label, onChange, value, name }) {
  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={handleChange}
            name={name}
            color="primary"
          />
        }
        label={label}
      />
    </FormGroup>
  );
}
