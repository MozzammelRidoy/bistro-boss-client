import { Elements } from "@stripe/react-stripe-js";
import SectionTile from "../../../Component/SectionTitle/SectionTile";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_PK);


const Payment = () => {
    return (
        <section>
            <SectionTile heading={'Payment'} subHeading={"Please Pay to Eat"}/>

            <div>

                <Elements stripe={stripePromise}>
                    <CheckOutForm/>
                </Elements>

            </div>
            
        </section>
    );
};

export default Payment;