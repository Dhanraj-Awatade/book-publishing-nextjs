// // import CreatePayloadOrder from '@/lib/createPayloadOrder'
// import { getPayloadClient } from '@/lib/get-payload'
// import { getServerSideUser } from '@/lib/payload-utils'
// import { Product } from '@/payload-types'
// import { trpc } from '@/trpc/client'
// // import { cookies } from 'next/headers'
// import React, { useEffect, useState } from 'react'

// interface PaymentProps {
//     productIds: string[]
// }

// const FetchServerOrder = async ({ productIds }: PaymentProps) => {

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

//     const { data: serverUser, refetch } = trpc.payment.getSignedUser.useQuery()!

//     if (serverUser!.id === undefined) {
//         refetch()

//         console.log("User:", serverUser)
//         const serverOrderResponse = await fetch('/api/createRazorOrder', {
//             method: 'POST',
//             body: JSON.stringify({
//                 productIds: productIds,
//                 userId: serverUser!.id
//             })
//         })

//         const serverOrder = await serverOrderResponse.json()
//         razorpayOptions = {
//             key: process.env.RAZORPAY_KEY,
//             amount: serverOrder.amount,
//             currency: serverOrder.currency,
//             orderId: serverOrder.id,
//             name: serverUser!.email,
//             receipt: serverOrder.receipt,
//             notes: serverOrder.notes,
//             // description: razorpayServerOrder.description,
//             handler: razorpayResponse
//         }

//         // if (isFetched && razorpayOptions !== null) {
//         //     // const products = razorpayServer!.productArray
//         //     // const userId = razorpayServer!.userId
//         //     // const orderId = razorpayServerOrder.id

//         //     // const payloadOrder = CreatePayloadOrder({ products, userId, orderId })

//         //     return (
//         //         // console.log("Payment Window"))
//         //         // new (window as any).Razorpay(razorpayOptions).open())

//         //         razorpayOptions!
//         //         // console.log("Payment Window", "razorpayOptions: ", razorpayOptions)
//         //     )
//         // }
//         // else {
//         //     refetch
//         //     // console.log("Payment Window", "razorpayOptions: ", razorpayOptions)
//         // }

//     }

//     const createRazorpaySession = async (razorpayOrderOptions: any) => {
//         // razorpayOrderQuery.refetch()
//         console.log("inside BtnFn: ", razorpayOrderOptions)
//         let paymentObject = new (window as any).Razorpay(razorpayOrderOptions);
//         paymentObject.open();
//         console.log("Payment Object: ", paymentObject)

//         // _returnObject = {
//         //     orderId: paymentObject.razorpay_order_id,
//         //     razorpaySignature: paymentObject.razorpay_signature,
//         //     paymentId: paymentObject.razorpay_payment_id
//         // }

//         // if (razorpayVerifyQuery?.success === true)
//         //     router.push(`/thank-you?orderId=${paymentObject.razorpay_order_id}`)
//     }

// }
// // }

// export default FetchServerOrder

