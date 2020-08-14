import React from "react";
import { Tab, Tabs, InputBase } from "@material-ui/core";
import TabContainer from "./TabContainer";
import { makeStyles } from "@material-ui/core/styles";
import { IoMdSearch } from "react-icons/io";
import { COLOR_LIGHT_BLUE, COLOR_BLUE } from "../constants";

const _ = require("lodash");

const useStyles = makeStyles((theme) => ({
  search: {
    backgroundColor: COLOR_LIGHT_BLUE,
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
    display: "flex"
  },
  inputRoot: {
    flexGrow: "1",
    marginLeft: "5px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    width: "100%",
  },
  tabContainer: {
    backgroundColor: COLOR_LIGHT_BLUE,
    minHeight: "100vh",
    marginTop: "0",
    paddingTop: "1px",
  },
  tabsRoot: {
    minHeight: "40px",
  },
  tabsIndicator: {
    backgroundColor: COLOR_BLUE,
  },
  tabRoot: {
    textTransform: "capitalize",
  },
  tabSelectedText: {
    fontWeight: "900",
    color: COLOR_BLUE,
  },
}));

function TabsMenuContainer(props) {
  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(0);

  const [categories, setCategories] = React.useState([]);
  const [textQuery, setQuery] = React.useState("");
  const [queryListCategories, setQueryListCategories] = React.useState([]);

  React.useEffect(() => {
    let categories = [];

    Object.values(props.categories).forEach((categorie) => {
      if (Object.keys(categorie.subcategories).length > 0) {
        const tmpProducts = [];
        Object.values(categorie.subcategories).forEach((subcategorie) => {
          Object.values(subcategorie.products).forEach((product) => {
            tmpProducts.push(product);
          });
        });
        const tmpCategory = _.cloneDeep(categorie);
        tmpCategory.subcategories = [];
        tmpCategory.products = tmpProducts;
        categories.push(tmpCategory);
      } else {
        categories.push(_.cloneDeep(categorie));
      }
    });

    setCategories(categories);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);

    let queryListCategories = _.cloneDeep(categories);

    let indexCount = 0;
    Object.values(categories).forEach((category) => {
      queryListCategories[indexCount].products = category.products.filter(
        (item) => {
          return (
            item.translations.en.title
              .toLowerCase()
              .includes(event.target.value) ||
            item.translations.es.title
              .toLowerCase()
              .includes(event.target.value)
          );
        }
      );
      indexCount++;
    });

    setQueryListCategories(queryListCategories);
  };

  return (
    <div>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        scrollButtons="auto"
        variant="fullWidth"
        classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
      >
        {props.categories.map((item) => (
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelectedText }}
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
              className={classes.tabContainer}
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
          className={classes.tabContainer}
          expandSubcategories={true}
        />
      ) : null}
    </div>
  );
}

export default TabsMenuContainer;
