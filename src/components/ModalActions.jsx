import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputRow from "./InputRow";
import { makeStyles } from "@material-ui/core/styles";
import ButtonCustom from "./ButtonCustom";
import { db } from "../data/firebase";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function AlertDialog({
  actions,
  isOpen,
  handleClose,
  id,
  selectMovieId,
}) {
  const classes = useStyles();
  const initialState = {
    name: "",
    date: "",
    status: "",
  };
  const [data, setData] = useState(initialState);

  useEffect(() => {
    if (id) {
      getMovieById();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validate = () => {
    if (!data.name || !data.date || !data.status) {
      return false;
    } else {
      return true;
    }
  };

  const handleSavePress = async (e) => {
    e.preventDefault();
    try {
      const resultValidate = validate();
      if (resultValidate) {
        if (id) {
          await db.collection("movies").doc(id).update(data);
          setData({ ...initialState });
        } else {
          await db.collection("movies").doc().set(data);
          setData({ ...initialState });
        }
      } else {
        alert("Revise los campos, Porfavor");
      }
      closeAndReset();
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieById = async () => {
    const doc = await db.collection("movies").doc(id).get();
    console.log(doc.data());
    setData({ ...doc.data() });
  };

  const closeAndReset = () => {
    handleClose();
    selectMovieId("");
  };

  return (
    <div>
      <Dialog
        maxWidth="md"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          {actions == 1 ? "Nueva Película" : "Editar Película"}
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={closeAndReset}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <InputRow
              name="name"
              label={"Nombre de la Película"}
              type="text"
              onChange={handleInputChange}
              value={data.name}
            />
            <InputRow
              name="date"
              label={"Fecha de la Puclicación"}
              type="date"
              onChange={handleInputChange}
              value={data.date}
            />
            <InputRow
              name="status"
              label={"Estado"}
              type="select"
              onChange={handleInputChange}
              value={data.status}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.btn}>
          <ButtonCustom
            onClick={handleSavePress}
            color="primary"
            label={"GUARDAR"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
