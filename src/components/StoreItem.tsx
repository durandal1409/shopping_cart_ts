import { Card, Button } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { increaseCartQuantity, decreaseCartQuantity, removeFromCart } from "../store";
import { RootState } from "../store";
import type { CartItemType } from "../store/slices/cartContentSlice";

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

const StoreItem = ({id, name, price, imgUrl}: StoreItemProps) => {
    const dispatch = useDispatch();
    const cartContent = useSelector((state: RootState) => state.cartContent);
    
    const quantity = cartContent.find((item: CartItemType) => item.id === id)?.quantity || 0;
    return (
        <Card className="h-100">
            <Card.Img src={imgUrl} variant="top" height="200px" style={{objectFit: "cover"}} />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => dispatch(increaseCartQuantity(id))}>+ Add To Cart</Button>
                    ): (
                        <div className="d-flex align-items-center flex-column" style={{gap: "0.5rem"}}>
                            <div className="d-flex align-items-center justify-content-center" style={{gap: "0.5rem"}}>
                                <Button onClick={() => dispatch(decreaseCartQuantity(id))}>-</Button>
                                    <div>
                                        <span className="fs-3">{quantity}</span> in cart
                                    </div>
                                <Button onClick={() => dispatch(increaseCartQuantity(id))}>+</Button>
                            </div>
                            <Button variant="danger" size="sm" onClick={() => dispatch(removeFromCart(id))}>Remove</Button>
                        </div>
                    ) 
                }
                </div>
            </Card.Body>
        </Card>
    )
}

export default StoreItem;