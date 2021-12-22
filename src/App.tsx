import React, {useState} from 'react';
import {useQuery} from "react-query";
import Drawer from "@material-ui/core/Drawer";
import {LinearProgress} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {Badge} from "@material-ui/core";
import {Wrapper, StyledButton} from "./App.styles";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";

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
        return items.reduce((acc: number, item)=> {
          return acc + item.amount
        }, 0)
    }
    const handleAddToCard = (clickedItem: CartItemType) => {
        return setCartItems((prevState) => {
            const isItemInCart = prevState.find(item => item.id === clickedItem.id)
            if (isItemInCart){
                return prevState.map(item => (
                    item.id === clickedItem.id
                    ? {...item, amount: item.amount + 1}
                        : item
                ))
            }
            return [...prevState, {...clickedItem, amount: 1}]
        })
    }
    const handleRemoveFromCard = (id: number) => {
        setCartItems((prev) => (
            prev.reduce((acc, item) => {
                 if(item.id === id){
                     if (item.amount === 1) return acc
                     return [...acc, {...item, amount: item.amount - 1}]
                 }else {
                     return [...acc, item]
                 }
            }, [] as CartItemType[])
        ))
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
                         <Cart
                             addToCart={handleAddToCard}
                             cartItems={cartItems}
                             removeFromCart={handleRemoveFromCard}
                         />
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
