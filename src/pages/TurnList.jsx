import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SiderBar from "../components/SiderBar";
import Title from "../components/Title";
import TableTurn from "../components/TableTurn";
import ButtonCustom from "../components/ButtonCustom";
import Grid from "@material-ui/core/Grid";
import { Link, useParams } from "react-router-dom";
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

const TurnList = () => {
  const classes = useStyles();
  let { id } = useParams();
  const [turns, setTurns] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      setisLoading(true);
      const response = await db
        .collection("turns")
        .where("movies_id", "==", id)
        .onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setTurns(docs);
        });
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  };

  const Content = () => {
    return (
      <main className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <Title title={"Turnos"} variant={"h3"} />
          </Grid>
          <Grid item xs={2}>
            <Link
              to={{
                pathname: `/agregar-turno/${id}`,
              }}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <ButtonCustom
                label={"Nuevo Turno"}
                color={"primary"}
                fullWidth={true}
              />
            </Link>
          </Grid>
        </Grid>
        <TableTurn data={turns} />
        <Loading isLoading={isLoading} />
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

export default TurnList;
