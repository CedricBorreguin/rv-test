import React from "react";
import { Typography, IconButton, Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from 'clsx';
import ProductCard from "./ProductCard"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 10px",
  },
  row: {
    display: "flex",
    margin: "5px 0",
    alignItems: "flex-start",
  },
  spacer: {
    width: "5px",
  },
  title: {
    fontWeight: "500",
    fontSize: "1rem",
    margin: "auto 0",
  },
  titleOpen: {
    fontWeight: "600!important",
  },
  hr: {
    borderStyle: "none none solid none",
    borderWidth: "2px",
    height: "2px",
    margin: "auto 5px auto auto",
    flexGrow: "1",
    maxWidth: "30%",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    padding: "4px",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function ExpandableList(props) {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(props.initiallyExpanded);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <div className={classes.root} hidden={Object.values(props.products).length===0}>
      <div className={classes.row}>
        <Typography className={clsx(classes.title, {
            [classes.titleOpen]: expanded,
          })} component="h3">{props.title}</Typography>
        <div className={classes.spacer}></div>
        <hr className={classes.hr} />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon />
        </IconButton>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {props.products.map((item) => (
            <ProductCard key={item.id} title={item.translations.en.title} subtitle={item.translations.es.title}/>
          ))}
      </Collapse>
    </div>
  );
}

export default ExpandableList;
