// "use client"
// import FetchServerOrder from '@/components/FetchServerOrder'
// // Done:(COMPLETED) Seperate Payments in Server Side Component "FetchServerOrder"
// import { Button } from '@/components/ui/button'
// import { PRODUCT_CATEGORIES } from '@/lib/config'
// import { useCart } from '@/lib/hooks/use-cart'
// import { cn, formatPrice } from '@/lib/utils'
// import { trpc } from '@/trpc/client'
// import { Check, Loader2, X } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import React, { useEffect, useState } from 'react'

// const Page = () => {

//     const router = useRouter()
//     const { items, removeItem } = useCart()
//     const productIds = items.map(({ product }) => product.id)

//     const [isMounted, setIsMounted] = useState<boolean>(false)
//     let _returnObject = {
//         orderId: "",
//         razorpaySignature: "",
//         paymentId: ""
//     }

//     const cartTotal = items.reduce((total, { product }) => total + product.price, 0)
//     const fee = 1

//     useEffect(() => {
//         setIsMounted(true)

//     }), []

//     useEffect(() => {
//         const loadRazorScript = async () => {
//             try {
//                 const razorScript = document.createElement("script");
//                 razorScript.src = "https://checkout.razorpay.com/v1/checkout.js";
//                 razorScript.async = true;
//                 document.body.appendChild(razorScript);
//             } catch (error) {
//                 console.error("Failed to Load Razorpay Script!")
//             }
//         }
//     })


//     //Done(Failed): Try API Way for Payments instead of trpc
//     const orderOptions = FetchServerOrder({ productIds })!
//     // const options = orderOptions.options!
//     console.log("orderOptions: ", orderOptions)

//     //     useEffect(() => {

//     //         if (isPaymentComplete) {
//     //             //Done (COMPLETED): Implement Payment Success Logic
//     //             console.log("Inside RazorpayResult Condition", Result, "Payment Status:", isPaymentComplete)

//     //             // refetch()
//     //             // const isVerified = razorpayVerifyQuery

//     //             /* if (razorpayVerifyQuery === true) {
//     //                  console.log("Payment Verify Logic", payloadOrderId)

//     //                  // router.push(`/thank-you?orderId=${payloadOrderId}`)
//     //              } else {
//     //                  console.log("Payment Verification Failed", payloadOrderId)
//     //              }
//     //  */

//     //         }
//     //     }), [isPaymentComplete]


//     /* Payment Object Handler Function */
//     // const razorpayResponse = (response: any) => {

//     //     console.log("Payment Object: ", response,
//     //         "razorpay_payment_id: ", response.razorpay_payment_id,
//     //         "razorpay_order_id: ", response.razorpay_order_id,
//     //         "razorpay_signature: ", response.razorpay_signature,);

//     //     let razorpayResults = []
//     //     razorpayResults[0] = response.razorpay_payment_id;
//     //     razorpayResults[1] = response.razorpay_order_id;
//     //     razorpayResults[2] = response.razorpay_signature;

//     // setResult(razorpayResults)
//     // setIsPaymentComplete(true);
//     // }

//     // const { data: razorpayOrderData, isLoading, mutate: razorpayOrderQuery } = trpc.payment.createSession.useMutation(
//     // {
//     //     enabled: isPaymentComplete === false,
//     //     refetchInterval: (data) => data?.order.id === undefined ? 1000 : false
//     // }
//     // )


//     // const serverOrder = razorpayOrderQuery?.order
//     // console.log("razorpayOrderQuery: ", serverOrder)


//     /* Wait for fetch values from backend to Assign to variables  */
//     // if (razorpayOrderQuery.data !== undefined) {
//     //     razorpayOrder = razorpayOrderQuery.data!.order
//     //     payloadOrderId = razorpayOrderQuery.data!.payloadOrderId
//     //     const razorpayServerOptions = razorpayOrderQuery.data!.orderOptions

//     // razorpayOptions = {
//     //     key: razorpayServerOptions.key,
//     //     amount: razorpayOrder.amount,
//     //     currency: razorpayOrder.currency,
//     //     orderId: razorpayOrder.id,
//     //     name: razorpayServerOptions.name,
//     //     receipt: razorpayOrder.receipt,
//     //     notes: razorpayOrder.notes,
//     //     description: razorpayOrder.description,
//     //     handler: razorpayResponse
//     // }
//     // console.log("OrderOptionsInsideFn: ", razorpayOptions)
//     // }

//     // console.log("amount:", razorpayOrder?.amount)

//     const { data: razorpayVerifyQuery, refetch } = trpc.payment.updateOrder.useQuery(_returnObject, { enabled: false })

//     const createRazorpaySession = async (razorpayOrderOptions: any) => {
//         // razorpayOrderQuery.refetch()
//         console.log("inside BtnFn: ", razorpayOrderOptions)
//         let paymentObject = new (window as any).Razorpay(razorpayOrderOptions);
//         paymentObject.open();
//         console.log("Payment Object: ", paymentObject)

//         _returnObject = {
//             orderId: paymentObject.razorpay_order_id,
//             razorpaySignature: paymentObject.razorpay_signature,
//             paymentId: paymentObject.razorpay_payment_id
//         }

//         refetch()

//         if (razorpayVerifyQuery?.success === true)
//             router.push(`/thank-you?orderId=${paymentObject.razorpay_order_id}`)
//     }

//     return (
//         <div className='bg-white'>
//             <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
//                 <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
//                     Shopping Cart
//                 </h1>
//                 <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
//                     <div className={cn(
//                         "lg:col-span-7",
//                         { "rounded-lg border-2 border-dashed border-zinc-200 p-12": isMounted && items.length === 0, }
//                     )}>
//                         <h2 className='sr-only'>Items in your shopping cart</h2>
//                         {
//                             isMounted && items.length === 0
//                                 ? (
//                                     <div className='flex h-full flex-col items-center justify-center space-y-1'>
//                                         <div aria-hidden='true' className='relative mb-4 h-40 w-40 text-muted-foreground'>
//                                             <Image src='/Images/hippo-empty-cart.png' alt='empty cart image' loading='eager' fill />
//                                         </div>
//                                         <h3 className='font-semibold text-2xl'>Your Cart is Empty</h3>
//                                         <p className='text-muted-foreground text-center'>
//                                             Whoops! Nothing to show here.
//                                         </p>
//                                     </div>
//                                 )
//                                 : null}

//                         <ul className={cn({
//                             "divide-y divide-gray-200 border-b border-t border-gray-200": isMounted && items.length > 0
//                         })}>
//                             {
//                                 isMounted && items.map(({ product }) => {
//                                     const label = PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label
//                                     const { image } = product.images[0]

//                                     return (
//                                         <li key={product.id} className='flex py-6 sm:py-10'>
//                                             <div className='flex-shrink-0'>
//                                                 <div className='relative h-24 w-24'>
//                                                     {
//                                                         typeof image !== 'string' && image.url
//                                                             ? (
//                                                                 <Image
//                                                                     fill
//                                                                     src={image.url}
//                                                                     alt='product image'
//                                                                     className='h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48'
//                                                                 />
//                                                             )
//                                                             : null
//                                                     }
//                                                 </div>
//                                             </div>
//                                             <div className='ml-4 flex-col flex justify-between flex-1 sm:ml-6'>
//                                                 <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
//                                                     <div>
//                                                         <div className='flex justify-between'>
//                                                             <h3 className='text-sm'>
//                                                                 <Link
//                                                                     className='font-medium text-gray-700 hover:text-gray-800'
//                                                                     href={`/books/${product.id}`}
//                                                                 >{product.name}</Link>
//                                                             </h3>
//                                                         </div>
//                                                         <div className='mt-1 flex text-sm'>
//                                                             <p className='text-muted-foreground'>Category:{label}</p>
//                                                         </div>
//                                                         <p className='mt-1 text-sm font-medium text-gray-900'>{formatPrice(product.price)}</p>
//                                                     </div>
//                                                     <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
//                                                         <div className='absolute right-0 top-0'>
//                                                             <Button aria-label='remove product' onClick={() => removeItem(product.id)} variant='ghost'>
//                                                                 <X className='h-5 w-6' aria-hidden='true' />
//                                                             </Button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
//                                                     <Check className='h-5 w-5 flex-shrink-0 text-green-500' />
//                                                     <span>In Stock</span>
//                                                 </p>
//                                             </div>
//                                         </li>
//                                     )
//                                 })
//                             }
//                         </ul>
//                     </div>
//                     <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
//                         <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
//                         <div className='mt-6 space-y-4'>
//                             <div className='flex items-center justify-between'>
//                                 <p className='text-sm text-gray-600'>Subtotal</p>
//                                 <p className='text-sm text-gray-900 font-medium'>
//                                     {
//                                         isMounted
//                                             ? formatPrice(cartTotal)
//                                             : (
//                                                 <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
//                                             )
//                                     }
//                                 </p>
//                             </div>
//                             <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
//                                 <div className='flex items-center text-sm text-muted-foreground'>
//                                     <span>Flat transaction fee</span>
//                                 </div>
//                                 <div className='text-sm font-medium text-gray-900'>
//                                     {isMounted
//                                         ? formatPrice(fee)
//                                         : (
//                                             <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
//                                         )}
//                                 </div>
//                             </div>
//                             <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
//                                 <div className='text-base font-medium text-gray-900'>Order Total</div>
//                                 <div className='text-base font-medium text-gray-900'>
//                                     {
//                                         isMounted
//                                             ? formatPrice(cartTotal + fee)
//                                             : (
//                                                 <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
//                                             )
//                                     }
//                                 </div>
//                             </div>
//                         </div>
//                         <div className='mt-6'>
//                             <Button
//                                 // disabled={orderOptions === undefined || items.length === 0}
//                                 className='w-full'
//                                 size='lg'
//                                 onClick={() => createRazorpaySession(orderOptions)/* */}
//                             >

//                                 {/*razorpayOrderQuery.isLoading*/ isMounted
//                                     ? "Checkout"
//                                     : (<Loader2 className='h-4 w-4 animate-spin ml-1.5' />)}
//                             </Button>
//                         </div>
//                     </section>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default Page
