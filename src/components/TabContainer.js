import React from "react";
import ExpandableList from "./ExpandableList";
import ProductCard from "./ProductCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "5px 10px",
  },
}));

function TabContainer(props) {
  const classes = useStyles();

  return (
    <div hidden={props.value !== props.index } component="div" className={props.className}>
      {props.products.map((item) => (
          <div className={classes.root}>
            <ProductCard key={item.id} title={item.translations.en.title} subtitle={item.translations.es.title} />
          </div>
          ))}
      {props.subcategories.map((item) => (
            <ExpandableList initiallyExpanded={props.expandSubcategories} key={item.id} title={item.translations.en.title +
              " (" +
              item.translations.es.title +
              ")"} products={item.products}/>
          ))}
    </div>
  );
}

export default TabContainer;
