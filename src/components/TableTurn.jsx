import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CreateIcon from "@material-ui/icons/Create";
import MenuIcon from "@material-ui/icons/Menu";
import LockIcon from "@material-ui/icons/Lock";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { IconButton } from "@material-ui/core";
import { db } from "../data/firebase";

const useStyles = makeStyles({
  table_container: {
    marginTop: 30,
  },
  icon: {
    marginRight: 5,
  },
});

export default function TableCustom({ data, selectMovieId, handleClickOpen }) {
  const classes = useStyles();

  const handleDelete = async (id) => {
    await db.collection("turns").doc(id).delete();
  };

  const captureMovieId = (id) => {
    selectMovieId(id);
    handleClickOpen();
  };

  return (
    <TableContainer component={Paper} className={classes.table_container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Turno</TableCell>
            <TableCell align="left">Estado</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell align="left">{row.time}</TableCell>
              <TableCell align="left">
                {row.status ? "Activo" : "Inactivo"}
              </TableCell>
              <TableCell align="left">
                {/* <IconButton
                  className={classes.icon}
                  // onClick={() => captureMovieId(row.id)}
                >
                  <CreateIcon />
                </IconButton> */}
                {/* <IconButton className={classes.icon}>
                  <MenuIcon />
                </IconButton> */}
                {/* <IconButton className={classes.icon}>
                  <LockIcon />
                </IconButton> */}
                <IconButton
                  className={classes.icon}
                  onClick={() => handleDelete(row.id)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
