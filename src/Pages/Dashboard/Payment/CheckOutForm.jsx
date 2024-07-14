import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [cart, refetch , isLoading] = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    {
      isLoading ?  (
        <span>Loading...</span>
      ) : totalPrice > 0 && (
        axiosSecure
          .post("/create-payment-intent", { price: totalPrice })
          .then((res) => {
            console.log("client secret form backend ", res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
          })
      );
    }
  }, [axiosSecure, totalPrice, isLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error: methodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (error) {
      console.log("payment error", methodError);
      setError(methodError.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user?.email,
          price: totalPrice,
          date: new Date(),
          transactionId: paymentIntent.id,
          cartIds: cart.map(item => item._id),
          menuIds: cart.map(menu => menu.menuId),
          status: "pending",
        };
        const res = await axiosSecure.post('/payments', payment)
        console.log('payment saved', res.data);
        refetch(); 
        if(res.data?.paymentResult?.insertedId){
            Swal.fire({
                title: "Order Place Success!",
                text: "Your Order has been Submited.",
                icon: "success",
                iconColor : "green",
                showConfirmButton : false,
                timer : 1500
              });

              navigate('/dashboard/paymentHistory')
        }
        
      }
    }
  };
  return (
    <div>
      <h2 className="text-4xl text-center mb-10">
        Total Amount : ${totalPrice}
      </h2>

      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        
        <div className="text-center mt-4">
          <button
            className="btn btn-primary px-20 text-white"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
        </div>
        {error && <p className="text-red-500 my-2">{error}</p>}
        {transactionId && (
          <p className="text-green-500 my-2">
            Your Transaction Id : {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
