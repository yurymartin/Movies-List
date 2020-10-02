import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SiderBar from "../components/SiderBar";
import Title from "../components/Title";
import ButtonCustom from "../components/ButtonCustom";
import Grid from "@material-ui/core/Grid";
import Check from "../components/Check";
import InputRow from "../components/InputRow";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../data/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(10),
  },
  input_time: {
    width: "50%",
  },
}));

const AddTurn = (props) => {
  const history = useHistory();
  let { id } = useParams();
  const classes = useStyles();
  const initialState = {
    time: "",
    status: false,
    movies_id: id,
  };
  const [data, setData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validate = () => {
    if (!data.time) {
      return false;
    } else {
      return true;
    }
  };

  const handleChangeStatus = (response) => {
    setData({ ...data, status: response });
  };

  const handleSavePress = async (e) => {
    e.preventDefault();
    try {
      const resultValidate = validate();
      if (resultValidate) {
        await db.collection("turns").doc().set(data);
        history.push(`/turnos/${id}`);
        setData({ ...initialState });
        alert("El turno se guardo exitosamente");
      } else {
        alert("Revise los campos, Porfavor");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Content = () => {
    return (
      <main className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Title title={"Turnos"} variant={"h3"} />
          </Grid>
          <Grid item xs={12}>
            <InputRow
              name="time"
              label={"Turno"}
              type={"time"}
              onChange={handleInputChange}
              value={data.time}
            />
          </Grid>
          <Grid item xs={12}>
            <Check
              name="status"
              value={data.status}
              label={"Activo?"}
              onChange={handleChangeStatus}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonCustom
              label={"Guardar"}
              color={"primary"}
              fullWidth={false}
              onClick={handleSavePress}
            />
          </Grid>
        </Grid>
      </main>
    );
  };

  return (
    <>
      <SiderBar>
        <Content />
      </SiderBar>
    </>
  );
};

export default AddTurn;
