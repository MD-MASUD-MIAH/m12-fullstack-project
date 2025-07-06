import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import "./checkoutForm.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
const CheckoutForm = ({ totalPrice, closeModal,orderData, fetchPlant }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure()
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret,setClientSecret] = useState('')

const {user} = useAuth()

  useEffect(()=>{

    const getClientSecret = async()=>{

        const {data} = await axiosSecure.post('/create-payments-intent',{


    quantity:orderData.quantity,
    plantId:orderData.plantId
        })

   
     
        setClientSecret(data.clientSecret)
    }

    getClientSecret()

  },[axiosSecure,orderData])



  const handleSubmit = async (event) => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const result = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if ( result.error) {
      console.log("[error]",result.error);
      setCardError(result.error.message);
      setProcessing(false);

      return;
    } else {
      console.log("[PaymentMethod]", result.paymentMethod);
      setCardError(null);
       setProcessing(false)
        const { error, paymentIntent } = await stripe.confirmCardPayment(
  clientSecret, // from backend
      {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName,
            email: user?.email
          },
        },
      }

    );

    if(error){

      setCardError(error?.message)
      return
    }

    
    if(paymentIntent.status==='succeeded'){

      orderData.transactionId = paymentIntent?.id 
try{





  
   const {data} =    await axiosSecure.post('/order',orderData)

     if(data.insertedId){

       toast.success('Order Placed Successfully')

      

       
     }

    
         const result = await axiosSecure.patch(
          `/quantity-update/${orderData?.plantId}`,
          { quantityToUpdate: orderData?.quantity, status: 'decrease' }
        )

        console.log(result.data);

fetchPlant()
    
}catch(err){

  console.log(err);
  
}finally{

  setProcessing(false)
  setCardError(null)
  closeModal()
}
    }
        console.log(paymentIntent);

          setProcessing(false)
    }
    
  };

  return (
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

      {cardError && <p className="text-red-500 py-4">{cardError}</p>}

      <div className="flex justify-between items-center ">
        <button className="pay" type="submit" disabled={!stripe || processing}>
          {processing ? (
            <ClockLoader className="mt-2.5" size={20}></ClockLoader>
          ) : (
            ` Pay ${totalPrice}`
          )}

        
        </button>

          <button className="btn bg-red-500" onClick={closeModal} type="button">
            Cancel
          </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
