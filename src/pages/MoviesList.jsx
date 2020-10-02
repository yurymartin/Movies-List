import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SiderBar from "../components/SiderBar";
import Title from "../components/Title";
import TableMovies from "../components/TableMovies";
import ButtonCustom from "../components/ButtonCustom";
import ModalActions from "../components/ModalActions";
import Grid from "@material-ui/core/Grid";
import { db } from "../data/firebase";
import Loading from "../components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(10),
  },
}));

const MoviesList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [id, setId] = useState("");
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      setisLoading(true);
      const querySnapshot = await db
        .collection("movies")
        .onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setMovies(docs);
        });
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectMovieId = (id) => {
    setId(id);
  };

  const Content = () => {
    return (
      <main className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <Title title={"Películas"} variant={"h3"} />
          </Grid>
          <Grid item xs={2}>
            <ButtonCustom
              label={"Nueva Película"}
              color={"primary"}
              fullWidth={true}
              onClick={handleClickOpen}
            />
          </Grid>
        </Grid>
        <TableMovies
          data={movies}
          selectMovieId={selectMovieId}
          handleClickOpen={handleClickOpen}
        />
        <Loading isLoading={isLoading} />
        <ModalActions
          actions={1}
          isOpen={open}
          handleClose={handleClose}
          id={id}
          selectMovieId={selectMovieId}
        />
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

export default MoviesList;
