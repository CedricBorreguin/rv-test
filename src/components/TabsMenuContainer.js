import React from "react";
import { Tab, Tabs, InputBase } from "@material-ui/core";
import TabContainer from "./TabContainer";
import { makeStyles } from "@material-ui/core/styles";
import { IoMdSearch } from "react-icons/io";

const _ = require("lodash");

const useStyles = makeStyles((theme) => ({
  tab: {
    textTransform: "capitalize",
  },
  search: {
    backgroundColor: "rgb(236,241,245)",
    padding: "10px",
  },
  searchContainer: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "flex-start",
  },
  searchIcon: {
    padding: "3px",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "5px",
    scale: "1.5",
  },
  inputRoot: {
    flexGrow: "1",
    marginLeft: "5px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    width: "100%",
  },
}));

function TabsMenuContainer(props) {
  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const [textQuery, setQuery] = React.useState("");

  const categories = [];
  Object.values(props.categories).forEach((categorie) => {
    if (Object.keys(categorie.subcategories).length > 0) {
      var tmpProducts = [];
      Object.values(categorie.subcategories).forEach((subcategorie) => {
        Object.values(subcategorie.products).forEach((product) => {
          tmpProducts.push(product);
        });
      });
      var tmpCategory = _.cloneDeep(categorie);
      tmpCategory.subcategories = [];
      tmpCategory.products = tmpProducts;
      categories.push(tmpCategory);
    } else {
      categories.push(_.cloneDeep(categorie));
    }
  });

  const [queryListCategories, setQueryListCategories] = React.useState(
    categories
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);

    var indexCount = 0;
    Object.values(categories).forEach(category=>{
      queryListCategories[indexCount].products = category.products.filter(item=>{
        return (item.translations.en.title.toLowerCase().includes(event.target.value) || item.translations.es.title.toLowerCase().includes(event.target.value));
      });
      indexCount++;
    });
    
  };

  return (
    <div>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        scrollButtons="auto"
        variant="fullWidth"
      >
        {props.categories.map((item) => (
          <Tab
            className={classes.tab}
            label={item.translations.en.title}
            key={item.id}
          />
        ))}
      </Tabs>
      <div className={classes.search}>
        <div className={classes.searchContainer}>
          <div className={classes.searchIcon}>
            <IoMdSearch />
          </div>
          <InputBase
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={handleQueryChange}
          />
        </div>
      </div>
      {textQuery.trim() === ""
        ? props.categories.map((item) => (
            <TabContainer
              key={item.id}
              products={item.products}
              subcategories={item.subcategories}
              value={tabValue}
              index={props.categories.indexOf(item)}
              className="tabContainer"
              expandSubcategories={false}
            />
          ))
        : null}
      {textQuery.trim() !== "" ? (
        <TabContainer
          products={[]}
          subcategories={queryListCategories}
          value={0}
          index={0}
          className="tabContainer"
          expandSubcategories={true}
        />
      ) : null}
    </div>
  );
}

export default TabsMenuContainer;
