import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";

const ShoppingCart = () => {
    const { actions: {closeCart}, state } = useShoppingCart();

    return (
        <Offcanvas show={state.isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                {state.cartContent.map(item => (
                    <CartItem key={item.id} {...item} />
                ))}
                <div className="ms-auto fw-bold fs-5">
                    Total{" "}
                    {formatCurrency(
                    state.cartContent.reduce((total, cartItem) => {
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