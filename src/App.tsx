import React, {useState} from 'react';
import {useQuery} from "react-query";
import Drawer from "@material-ui/core/Drawer";
import {LinearProgress} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {Badge} from "@material-ui/core";
import {Wrapper} from "./App.styles";
import Item from "./Item/Item";

export type CartItemType = {
    id: number
    category: string
    description: string
    image: string
    price: number
    title: string
    amount: number
}

const getProducts = async (): Promise<CartItemType[]> => {
    return await (await fetch('https://fakestoreapi.com/products')).json();
}

const App = () => {

    const [] = useState()

    const {data, isLoading, error} = useQuery<CartItemType[]>(
        'products',
                 getProducts
        )
    console.log(data)

   const getTotalItems = () => {
        return null
    }
    const handleAddToCard = (clickedItem: CartItemType) => {
        return null
    }
    const handleRemoveFromCard = () => {
        return null
    }

    if (isLoading){
        return <LinearProgress/>
    }
    if (error) {
        return <div>Something went wrong</div>
    }


  return (
    <div >
        {data!.map((item) => {
            return (
                <Item key={item.id} item={item} handleAddToCard={handleAddToCard}/>
            )
        })}
    </div>
  );
}

export default App;
