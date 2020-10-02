import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ButtonCustom from "./ButtonCustom";
import Grid from "@material-ui/core/Grid";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(7),
  },
  header_main: {
    flexDirection: "row",
  },
}));

const itemsDrawer = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Películas",
    path: "/",
  },
  {
    name: "Turnos",
    path: "/",
  },
  {
    name: "Administradoras",
    path: "/",
  },
  {
    name: "Perfil",
    path: "/",
  },
  {
    name: "Cerrar sesíon",
    path: "/",
  },
];

export default function SiderBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {itemsDrawer.map((item, index) => (
              <Link
                to={item.path}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <>
                  <ListItem button>
                    <ListItemText primary={item.name} />
                  </ListItem>
                  <Divider />
                </>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
      {props.children}
    </div>
  );
}
