import React, { useState } from "react";
import "./Veg.css";

function Veg() {
    const [quantities, setQuantities] = useState({
        paneerButterMasala: 0,
        palakPaneer: 0,
        chanaMasala: 0,
        vegBiryani: 0,
        alooGobi: 0,
        vegKorma: 0,
    });

    const [cart, setCart] = useState({});
    const [step, setStep] = useState("menu");
    const [userDetails, setUserDetails] = useState({});
    const [paymentMethod, setPaymentMethod] = useState("");
    const [finalOrder, setFinalOrder] = useState(null);

    const prices = {
        paneerButterMasala: 250,
        palakPaneer: 200,
        chanaMasala: 180,
        vegBiryani: 220,
        alooGobi: 150,
        vegKorma: 230,
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
        <div className="v1">
            <h1>VEG MENU</h1>

            {/* ROW 1 */}
            <div className="veg">
                <DishCard
                    img="https://vegecravings.com/wp-content/uploads/2017/04/paneer-butter-masala-recipe-step-by-step-instructions.jpg"
                    name="Paneer Butter Masala"
                    price={250}
                    qty={quantities.paneerButterMasala}
                    increase={() => increase("paneerButterMasala")}
                    decrease={() => decrease("paneerButterMasala")}
                    add={() => addToCart("paneerButterMasala")}
                />

                <DishCard
                    img="https://www.corriecooks.com/wp-content/uploads/2022/06/Palak-Paneer-instant-pot.jpg"
                    name="Palak Paneer"
                    price={200}
                    qty={quantities.palakPaneer}
                    increase={() => increase("palakPaneer")}
                    decrease={() => decrease("palakPaneer")}
                    add={() => addToCart("palakPaneer")}
                />

                <DishCard
                    img="https://glebekitchen.com/wp-content/uploads/2017/03/chanamasalafront-2.jpg"
                    name="Chana Masala"
                    price={180}
                    qty={quantities.chanaMasala}
                    increase={() => increase("chanaMasala")}
                    decrease={() => decrease("chanaMasala")}
                    add={() => addToCart("chanaMasala")}
                />
            </div>

            {/* ROW 2 */}
            <div className="v8">
                <DishCard
                    img="https://www.livofy.com/health/wp-content/uploads/2023/03/fq5cs53_biryani-doubletree-by-hilton_625x300_12_April_22-1024x576.jpg"
                    name="Veg Biryani"
                    price={220}
                    qty={quantities.vegBiryani}
                    increase={() => increase("vegBiryani")}
                    decrease={() => decrease("vegBiryani")}
                    add={() => addToCart("vegBiryani")}
                />

                <DishCard
                    img="https://thumbs.dreamstime.com/b/aloo-gobi-traditional-indian-dish-cauliflower-potato-269095357.jpg"
                    name="Aloo Gobi"
                    price={150}
                    qty={quantities.alooGobi}
                    increase={() => increase("alooGobi")}
                    decrease={() => decrease("alooGobi")}
                    add={() => addToCart("alooGobi")}
                />

                <DishCard
                    img="https://www.indianhealthyrecipes.com/wp-content/uploads/2020/02/veg-kurma-vegetable-korma.jpg"
                    name="Veg Korma"
                    price={230}
                    qty={quantities.vegKorma}
                    increase={() => increase("vegKorma")}
                    decrease={() => decrease("vegKorma")}
                    add={() => addToCart("vegKorma")}
                />
            </div>

            {/* CART SECTION */}
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

export default Veg;

// ===========================================================
// REUSABLE MENU CARD COMPONENT
// ===========================================================
function DishCard({ img, name, price, qty, increase, decrease, add }) {
    return (
        <div className="v2">
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

// ===========================================================
// USER DETAILS FORM
// ===========================================================
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

// ===========================================================
// PAYMENT PAGE
// ===========================================================
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

// ===========================================================
// ORDER SUCCESS PAGE
// ===========================================================
function OrderSuccess({ order }) {
    return (
        <div className="success-box">
            <h2>🎉 Your Order is Confirmed!</h2>

            <p>
                <b>Name:</b> {order.user.name}
            </p>
            <p>
                <b>Phone:</b> {order.user.phone}
            </p>
            <p>
                <b>Address:</b> {order.user.address}
            </p>

            <h3>Ordered Items</h3>
            <ul>
                {Object.entries(order.items).map(([item, qty]) => (
                    <li key={item}>
                        {item.replace(/([A-Z])/g, " $1").trim()} — {qty}
                    </li>
                ))}
            </ul>

            <p>
                <b>Payment Method:</b> {order.payment}
            </p>
            <p>
                <b>Total Paid:</b> ₹{order.total}
            </p>
            <p>
                <b>Order Time:</b> {order.date}
            </p>

            <h3>Thank you! Enjoy your meal </h3>
        </div>
    );
}
