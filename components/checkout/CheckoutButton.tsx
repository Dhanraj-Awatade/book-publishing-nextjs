import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/hooks/use-cart";

interface CheckoutButtonProps {
  productIds: string[];
  cartItemCount: number
  isAnyPaperback: boolean
  totalAmount: number
  selectedAddress: { id: string; house: string; state: string; pin: string; adressName: string; updatedAt: string; createdAt: string; road?: string | null | undefined; } | null | undefined
  setOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

const CheckoutButton = ({ productIds, cartItemCount, selectedAddress, isAnyPaperback, totalAmount, setOverlay }: CheckoutButtonProps) => {

  try {
    const razorScript = document.createElement("script");
    razorScript.src = "https://checkout.razorpay.com/v1/checkout.js";
    razorScript.async = true;
    document.body.appendChild(razorScript);
    console.log("Loaded Razorpay Script!");
  } catch (error) {
    console.error("Failed to Load Razorpay Script!");
  }

  let razorpayOptions = null;
  let orderOptions = null;
  const [orderId, setOrderId] = useState<string | null>(null)
  const [orderVerificationStatus, setOrderVerificationStatus] = useState<Boolean>(false)
  const router = useRouter()
  const { clearCart } = useCart()

  const selectedAddressId = selectedAddress ? selectedAddress.id : null
  const {
    data: razorpayServer,
    isLoading,
    refetch,
    isFetched,
    status,
  } = trpc.payment.createSession.useQuery(
    { productIds: productIds, addressId: selectedAddressId, isAnyPaperback, totalAmount },
    {
      enabled: razorpayOptions === null,
      retry: productIds.length !== 0,
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchInterval: (data) => (data?.order.id === undefined ? 1000 : false),
    }
  );

  /*------------------------- Add Product to User Logic Start ----------------------------------*/
  const {
    data: updatedUser,
    // isLoading,
    refetch: refetchUpdatedUser,
    // isFetched,
    // status,
  } = trpc.payment.addProductToUser.useQuery(
    orderId,
    {
      enabled: false,
      // enabled: orderId !== null,
      // retry: productIds.length !== 0,
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchInterval: (data) => (data?.order.id === undefined ? 1000 : false),
    }
  );
  // console.log("Outer orderId", orderId)
  // console.log("Checkout Button User", updatedUser)
  /*------------------------- Add Product to User Logic End ----------------------------------*/

  useEffect(() => {
    try {

      if (isFetched === true) {
        setOrderId(razorpayServer!.order.id)
        // console.log("orderId:", orderId)
      }

      if (orderVerificationStatus === true && isFetched) {
        refetchUpdatedUser()
        // console.log("UseEffect Checkout Button User", orderId)
        router.replace(`/thank-you?orderId=${/*razorpayServer?.order.id*/orderId}&isAnyPaperback=${isAnyPaperback}`)
        /* Clear Cart after checkout */
        clearCart()
      }

    } catch (error) {
      console.log(error)
    }

  }, [orderVerificationStatus, isFetched, razorpayServer, refetchUpdatedUser, router, isAnyPaperback, orderId])

  /*------------------------- Handler Function Start ----------------------------------*/
  async function razorpayHandler(response: any) {
    //   const router = useRouter();
    // const isOrderVerified = Razorpay.validateWebhookSignature(
    //   response.razorpay_payment_id,
    //   response.razorpay_order_id,
    //   response.razorpay_signature
    // );

    setOverlay(true)

    const functionRespose = {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: razorpayServer!.order.id,
      razorpay_signature: response.razorpay_signature,
      // token: token
    };

    const verifyOrderAPI = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/updateOrderStatus`,
      {
        method: "POST",
        body: JSON.stringify(functionRespose),
      }
    );
    const text = await verifyOrderAPI.json();
    // console.log("returned response", text);

    if (text.isPaymentVerified === true) setOrderVerificationStatus(true)
  }
  /*------------------------- Handler Function End ----------------------------------*/

  let paymentObject: any = null

  if (status === "success") {
    const razorpayServerOrder = razorpayServer.order;
    const razorpayServerOrderOptions = razorpayServer.orderOptions;

    razorpayOptions = {
      key: razorpayServerOrderOptions.key,
      amount: razorpayServerOrder.amount,
      currency: razorpayServerOrder.currency,
      order_id: razorpayServerOrder.id,
      name: "Saptarshee Publications",
      receipt: razorpayServerOrder.receipt,
      notes: razorpayServerOrder.notes,
      description: razorpayServerOrder.description,
      handler: razorpayHandler,
      prefill: {
        name: razorpayServerOrderOptions.name,
        email: razorpayServerOrderOptions.email,
      }
      // callback_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/updateOrderStatus`
    };

    if (isFetched && razorpayOptions !== null) {
      orderOptions = razorpayOptions
    } else {
      refetch;
    }
    paymentObject = new (window as any).Razorpay(orderOptions);

    paymentObject.on('payment.failed', function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });


  };
  return <Button
    disabled={cartItemCount === 0 || isAnyPaperback ? !selectedAddress : isAnyPaperback}
    className='w-full'
    size='lg'
    onClick={(e) => {
      try {
        paymentObject.open()
        e.preventDefault()
      } catch (error) {
        console.log(error);
      }

      // setOrderVerificationStatus(true)
    } /*createRazorpaySession(orderOptions) */}
  >

    {(!isLoading)
      ? "Checkout"
      : (<Loader2 className='h-4 w-4 animate-spin ml-1.5' />)}
  </Button>
}

export default CheckoutButton;
