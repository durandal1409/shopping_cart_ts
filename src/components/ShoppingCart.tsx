import { Offcanvas, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartClose } from "../store";
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";
import { RootState } from "../store";
import type { CartItemType } from "../store/slices/cartContentSlice";

const ShoppingCart = () => {

    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.cartOpen);
    const cartContent = useSelector((state: RootState) => state.cartContent);

    return (
        <Offcanvas show={isOpen} onHide={() => dispatch(cartClose())} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                {cartContent.map((item: CartItemType) => (
                    <CartItem key={item.id} {...item} />
                ))}
                <div className="ms-auto fw-bold fs-5">
                    Total{" "}
                    {formatCurrency(
                    cartContent.reduce((total: number, cartItem: CartItemType) => {
                        const item = storeItems.find(i => i.id === cartItem.id)
                        return total + (item?.price || 0) * cartItem.quantity
                    }, 0)
                    )}
                </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ShoppingCart;