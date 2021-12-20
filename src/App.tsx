import React, {useState} from 'react';
import {useQuery} from "react-query";
import Drawer from "@material-ui/core/Drawer";
import {LinearProgress} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {Badge} from "@material-ui/core";
import {Wrapper} from "./App.styles";

const getProducts = async () => {
    await (await fetch('https://fakestoreapi.com/products'))
}

const App = () => {
    const [] = useState()
  return (
    <div >
      App
    </div>
  );
}

export default App;
