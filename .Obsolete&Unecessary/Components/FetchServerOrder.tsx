// // import CreatePayloadOrder from '@/lib/createPayloadOrder'
// import { getPayloadClient } from '@/lib/get-payload'
// import { Product } from '@/payload-types'
// import { trpc } from '@/trpc/client'
// import React, { useEffect, useState } from 'react'

// interface PaymentProps {
//     productIds: string[]
// }


// const FetchServerOrder = ({ productIds }: PaymentProps) => {

//     let razorpayOptions = undefined

//     const [isPaymentComplete, setIsPaymentComplete] = useState<boolean>(false)
//     const [Result, setResult] = useState<any>([])


//     /* Payment Object Handler Function */
//     const razorpayResponse = (response: any) => {

//         console.log("Payment Object: ", response,
//             "razorpay_payment_id: ", response.razorpay_payment_id,
//             "razorpay_order_id: ", response.razorpay_order_id,
//             "razorpay_signature: ", response.razorpay_signature,);

//         let razorpayResults = []
//         razorpayResults[0] = response.razorpay_payment_id;
//         razorpayResults[1] = response.razorpay_order_id;
//         razorpayResults[2] = response.razorpay_signature;

//         setResult(razorpayResults)
//         setIsPaymentComplete(true);
//     }

//     const { data: razorpayServer, isLoading, refetch, isFetched } = trpc.payment.createSession.useQuery(
//         { productIds },
//         {
//             enabled: razorpayOptions === undefined,
//             refetchInterval: (data) => data?.order.id === undefined ? 1000 : false
//         }
//     )

//     if (!isLoading) {
//         const razorpayServerOrder = razorpayServer!.order
//         const razorpayServerOrderOptions = razorpayServer!.orderOptions

//         razorpayOptions = {
//             key: razorpayServerOrderOptions.key,
//             amount: razorpayServerOrder.amount,
//             currency: razorpayServerOrder.currency,
//             orderId: razorpayServerOrder.id,
//             name: razorpayServerOrderOptions.name,
//             receipt: razorpayServerOrder.receipt,
//             notes: razorpayServerOrder.notes,
//             description: razorpayServerOrder.description,
//             handler: razorpayResponse
//         }

//         if (isFetched && razorpayOptions !== null) {

//             return (

//                 razorpayOptions!
//             )
//         }
//         else {
//             refetch
//         }

//     }
// }

// export default FetchServerOrder

