import React, { useState } from "react";
import "./NonVeg.css";

function NonVeg() {
    const [quantities, setQuantities] = useState({
        butterChicken: 0,
        chickenBiryani: 0,
        muttonCurry: 0,
        fishCurry: 0,
        eggCurry: 0,
        prawnMasala: 0,
    });

    const [cart, setCart] = useState({});
    const [step, setStep] = useState("menu");
    const [userDetails, setUserDetails] = useState({});
    const [paymentMethod, setPaymentMethod] = useState("");
    const [finalOrder, setFinalOrder] = useState(null);

    const prices = {
        butterChicken: 300,
        chickenBiryani: 250,
        muttonCurry: 350,
        fishCurry: 280,
        eggCurry: 180,
        prawnMasala: 400,
    };

    const increase = (item) => {
        setQuantities((prev) => ({ ...prev, [item]: prev[item] + 1 }));
    };

    const decrease = (item) => {
        setQuantities((prev) => ({
            ...prev,
            [item]: Math.max(prev[item] - 1, 0),
        }));
    };

    const addToCart = (item) => {
        const qty = quantities[item];
        if (qty === 0) {
            alert("Please increase quantity before adding to cart.");
            return;
        }
        setCart((prev) => ({ ...prev, [item]: (prev[item] || 0) + qty }));
        setQuantities((prev) => ({ ...prev, [item]: 0 }));
    };

    const totalPrice = Object.entries(cart).reduce(
        (tot, [item, qty]) => tot + prices[item] * qty,
        0
    );

    const placeOrder = () => {
        if (Object.keys(cart).length === 0) {
            alert("Cart is empty!");
            return;
        }
        setStep("details");
    };

    const submitUserDetails = (details) => {
        setUserDetails(details);
        setStep("payment");
    };

    const confirmPayment = () => {
        if (!paymentMethod) {
            alert("Select a payment method");
            return;
        }
        const orderData = {
            items: cart,
            user: userDetails,
            payment: paymentMethod,
            total: totalPrice,
            date: new Date().toLocaleString(),
        };
        setFinalOrder(orderData);
        setCart({});
        setStep("success");
    };

    // ===========================================
    // USER DETAILS FORM
    // ===========================================
    if (step === "details") {
        return <UserDetailsForm onSubmit={submitUserDetails} total={totalPrice} />;
    }

    // ===========================================
    // PAYMENT PAGE
    // ===========================================
    if (step === "payment") {
        return (
            <PaymentPage
                total={totalPrice}
                setPaymentMethod={setPaymentMethod}
                confirmPayment={confirmPayment}
            />
        );
    }

    // ===========================================
    // SUCCESS PAGE
    // ===========================================
    if (step === "success") {
        return <OrderSuccess order={finalOrder} />;
    }

    // ===========================================
    // MAIN MENU PAGE
    // ===========================================
    return (
        <div className="nv1">
            <h1>NON-VEG MENU</h1>

            <div className="nonveg-row">
                <DishCard
                    img="https://www.licious.in/blog/wp-content/uploads/2023/01/Shutterstock_2047827035-1024x683.jpg"
                    name="Butter Chicken"
                    price={300}
                    qty={quantities.butterChicken}
                    increase={() => increase("butterChicken")}
                    decrease={() => decrease("butterChicken")}
                    add={() => addToCart("butterChicken")}
                />

                <DishCard
                    img="https://as1.ftcdn.net/v2/jpg/04/86/31/00/1000_F_486310052_Rmgg6kkKsHyxF6c4Za8ZujcO3nND1aCL.jpg"
                    name="Chicken Biryani"
                    price={250}
                    qty={quantities.chickenBiryani}
                    increase={() => increase("chickenBiryani")}
                    decrease={() => decrease("chickenBiryani")}
                    add={() => addToCart("chickenBiryani")}
                />

                <DishCard
                    img="https://www.chefkunalkapur.com/wp-content/uploads/2021/03/Mutton-Roganjosh-scaled.jpg?v=1620401698"
                    name="Mutton Curry"
                    price={350}
                    qty={quantities.muttonCurry}
                    increase={() => increase("muttonCurry")}
                    decrease={() => decrease("muttonCurry")}
                    add={() => addToCart("muttonCurry")}
                />
            </div>

            <div className="nonveg-row">
                <DishCard
                    img="https://www.allchickenrecipes.com/wp-content/uploads/2018/09/Easy-Chicken-Tikka-Masala-Recipe.jpg"
                    name="Fish Curry"
                    price={280}
                    qty={quantities.fishCurry}
                    increase={() => increase("fishCurry")}
                    decrease={() => decrease("fishCurry")}
                    add={() => addToCart("fishCurry")}
                />

                <DishCard
                    img="https://rumkisgoldenspoon.com/wp-content/uploads/2022/08/Prawn-masala-recipe.jpg"
                    name="Egg Curry"
                    price={180}
                    qty={quantities.eggCurry}
                    increase={() => increase("eggCurry")}
                    decrease={() => decrease("eggCurry")}
                    add={() => addToCart("eggCurry")}
                />

                <DishCard
                    img="https://i.ytimg.com/vi/80pnHP7h8Lw/maxresdefault.jpg"
                    name="Prawn Masala"
                    price={400}
                    qty={quantities.prawnMasala}
                    increase={() => increase("prawnMasala")}
                    decrease={() => decrease("prawnMasala")}
                    add={() => addToCart("prawnMasala")}
                />
            </div>

            <div className="cart">
                <h2>Your Cart</h2>
                {Object.keys(cart).length === 0 ? (
                    <p>Cart is empty.</p>
                ) : (
                    <>
                        <ul>
                            {Object.entries(cart).map(([item, qty]) => (
                                <li key={item}>
                                    {item.replace(/([A-Z])/g, " $1").trim()} — {qty} × ₹
                                    {prices[item]} = ₹{qty * prices[item]}
                                </li>
                            ))}
                        </ul>

                        <h3>Total: ₹{totalPrice}</h3>
                        <button onClick={placeOrder}>Place Order</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default NonVeg;

// ======================
// REUSABLE DISH CARD
// ======================
function DishCard({ img, name, price, qty, increase, decrease, add }) {
    return (
        <div className="nv2">
            <img src={img} alt={name} />
            <h2>{name}</h2>
            <p>₹{price}</p>

            <button onClick={decrease}>-</button>
            <span>{qty}</span>
            <button onClick={increase}>+</button>

            <button onClick={add}>Add to Cart</button>
        </div>
    );
}

// ======================
// USER DETAILS FORM
// ======================
function UserDetailsForm({ onSubmit, total }) {
    const [details, setDetails] = useState({ name: "", phone: "", address: "" });

    const submit = (e) => {
        e.preventDefault();
        onSubmit(details);
    };

    return (
        <div className="user-form">
            <h2>Enter Your Delivery Details</h2>

            <form onSubmit={submit}>
                <input
                    type="text"
                    placeholder="Full Name"
                    required
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="Mobile Number"
                    required
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                />

                <textarea
                    placeholder="Full Address"
                    required
                    onChange={(e) => setDetails({ ...details, address: e.target.value })}
                />

                <h3>Amount to Pay: ₹{total}</h3>
                <button type="submit">Proceed to Payment</button>
            </form>
        </div>
    );
}

// ======================
// PAYMENT PAGE
// ======================
function PaymentPage({ total, setPaymentMethod, confirmPayment }) {
    return (
        <div className="payment-box">
            <h2>Choose Payment Method</h2>

            <label>
                <input
                    type="radio"
                    name="pay"
                    value="Cash On Delivery"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
            </label>

            <label>
                <input
                    type="radio"
                    name="pay"
                    value="UPI"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI (PhonePe / Google Pay)
            </label>

            <label>
                <input
                    type="radio"
                    name="pay"
                    value="Card"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Debit / Credit Card
            </label>

            <h3>Total: ₹{total}</h3>
            <button onClick={confirmPayment}>Confirm Payment</button>
        </div>
    );
}

// ======================
// ORDER SUCCESS PAGE
// ======================
function OrderSuccess({ order }) {
    return (
        <div className="success-box">
            <h2>🎉 Your Order is Confirmed!</h2>

            <p><b>Name:</b> {order.user.name}</p>
            <p><b>Phone:</b> {order.user.phone}</p>
            <p><b>Address:</b> {order.user.address}</p>

            <h3>Ordered Items</h3>
            <ul>
                {Object.entries(order.items).map(([item, qty]) => (
                    <li key={item}>
                        {item.replace(/([A-Z])/g, " $1").trim()} — {qty}
                    </li>
                ))}
            </ul>

            <p><b>Payment Method:</b> {order.payment}</p>
            <p><b>Total Paid:</b> ₹{order.total}</p>
            <p><b>Order Time:</b> {order.date}</p>

            <h3>Thank you! Enjoy your meal </h3>
        </div>
    );
}
