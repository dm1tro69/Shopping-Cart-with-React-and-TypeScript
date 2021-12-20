import React, {FC} from 'react';
import {Wrapper} from "./Item.styles";
import {Button} from "@material-ui/core";
import {CartItemType} from "../App";

type Props = {
  item: CartItemType
  handleAddToCard: (clickedItem: CartItemType) => void
}

const Item:FC<Props> = ({item, handleAddToCard}) => {
    return (
        <Wrapper>
            <img src={item.image} alt="img"/>
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h3>${item.price}</h3>
            </div>
            <Button onClick={() => handleAddToCard(item)}>
                Add to cart
            </Button>
        </Wrapper>
    );
};

export default Item;
