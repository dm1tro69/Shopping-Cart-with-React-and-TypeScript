import React, {FC} from 'react';
import {CartItemType} from "../App";
import {Wrapper} from "./CartItem.styles";
import {Button} from "@material-ui/core";

type Props = {
    item: CartItemType
    addToCart: (clickedItem: CartItemType) => void
    removeFromCart: (id: number) => void
}

const CartItem:FC<Props> = ({item, removeFromCart, addToCart}) => {
    return (
        <Wrapper>
            <div>
                <h3>{item.title}</h3>
                <div className={'information'}>
                    <p>Price: ${item.price}</p>
                    <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
                </div>
                <div className={'buttons'}>
                    <Button
                        size={'small'}
                        disableElevation
                        onClick={() => removeFromCart(item.id)}
                        variant={'contained'}>
                        -
                    </Button>
                    <p>{item.amount}</p>
                    <Button
                        size={'small'}
                        disableElevation
                        onClick={() => addToCart(item)}
                        variant={'contained'}>
                        +
                    </Button>
                </div>
            </div>
            <img src={item.image} alt="img"/>
        </Wrapper>
    );
};

export default CartItem;
