import React, {useState} from 'react';
import {useQuery} from "react-query";
import Drawer from "@material-ui/core/Drawer";
import {LinearProgress} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {Badge} from "@material-ui/core";
import {Wrapper, StyledButton} from "./App.styles";
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

    const [cartOpen, setCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([] as CartItemType[])

    const {data, isLoading, error} = useQuery<CartItemType[]>(
        'products',
                 getProducts
        )
    console.log(data)

   const getTotalItems = (items: CartItemType[]) => {
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
        {data!.map((item, i) => {
            return (
                <Wrapper key={i}>
                    <Drawer anchor={'right'} open={cartOpen} onClose={() => setCartOpen(false)}>
                         Cart goes here
                    </Drawer>
                    <StyledButton onClick={() => setCartOpen(true)}>
                        <Badge color={'error'} badgeContent={getTotalItems(cartItems)}>
                            <AddShoppingCartIcon/>
                        </Badge>
                    </StyledButton>
                    <Grid container spacing={3}>
                        {data?.map((item: CartItemType) => (
                            <Grid item key={item.id} xs={12} sm={4}>
                                <Item item={item} handleAddToCard={handleAddToCard}/>
                            </Grid>
                        ))}
                    </Grid>
                </Wrapper>
            )
        })}
    </div>
  );
}

export default App;
