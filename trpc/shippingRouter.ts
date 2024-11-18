import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { getShiprocketToken } from "../lib/getShiprocketToken";
import { SHIPPING_MODE } from "../lib/config/constants";

export const shipmentRouter = router({

    /** Get all couriers available  */
    getAvailableCouriers: publicProcedure
        .input(
            z.object({
                pickup_postcode: z.number() /*.max(6).min(6)*/,
                delivery_postcode: z.number().or(z.null()),
                weight: z.number(),
                paymentMethod: z.string(),
            })
        )
        .query(async ({ input }) => {
            // const token: string | undefined = await getShiprocketToken();
            const {
                delivery_postcode,
                paymentMethod,
                pickup_postcode,
                weight,
            } = input;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            // if (token === undefined) {
            // console.log("token is undefined");
            // return;
            // }
            // myHeaders.append("Authorization", `Bearer ${token}`);

            const checkCourierOptions = {
                method: "GET",
                headers: myHeaders,
                // body: checkCourierBody,
            };
            try {
                if(!delivery_postcode){
                    console.log("delivery_postcode not available!");
                 return {err:"delivery_postcode not available!"}
                }
                const req2 = await getShiprocketToken().then(async (token) => {
                    if (token === undefined) {
                        console.error("token is undefined");
                        return {err:"token is undefined"};
                    }
                    myHeaders.append("Authorization", `Bearer ${token}`);
                    const req = await fetch(
                        `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${pickup_postcode}&
    delivery_postcode=${delivery_postcode}&weight=${weight}&cod=${
                            paymentMethod === "cod" ? 1 : 0
                        }&mode=${SHIPPING_MODE}`,
                        checkCourierOptions
                    );
                    const data = await req.json();
                    return data;
                });
                console.log("req2:", req2);
                return req2;
            } catch (error) {
                console.log(error);
            }
        }),
          /* Create an Order
    createOrder: publicProcedure.query(async () => {
        const token: string | undefined = await getShiprocketToken();

        // const createOrder = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (token === undefined) {
            console.log("token is undefined");
            return;
        }
        myHeaders.append("Authorization", `Bearer ${token}`);

        var orderBody = JSON.stringify({
            order_id: "224-447",
            order_date: "2019-07-24 11:11",
            pickup_location: "Jammu",
            channel_id: "5552557",
            comment: "Reseller: M/s Goku",
            billing_customer_name: "Naruto",
            billing_last_name: "Uzumaki",
            billing_address: "House 221B, Leaf Village",
            billing_address_2: "Near Hokage House",
            billing_city: "New Delhi",
            billing_pincode: "110002",
            billing_state: "Delhi",
            billing_country: "India",
            billing_email: "naruto@uzumaki.com",
            billing_phone: "9876543210",
            shipping_is_billing: true,
            shipping_customer_name: "",
            shipping_last_name: "",
            shipping_address: "",
            shipping_address_2: "",
            shipping_city: "",
            shipping_pincode: "",
            shipping_country: "",
            shipping_state: "",
            shipping_email: "",
            shipping_phone: "",
            order_items: [
                {
                    name: "Kunai",
                    sku: "chakra123",
                    units: 10,
                    selling_price: "900",
                    discount: "",
                    tax: "",
                    hsn: 441122,
                },
            ],
            payment_method: "Prepaid",
            shipping_charges: 0,
            giftwrap_charges: 0,
            transaction_charges: 0,
            total_discount: 0,
            sub_total: 9000,
            length: 10,
            breadth: 15,
            height: 20,
            weight: 2.5,
        });

        var createOrderOptions = {
            method: "POST",
            headers: myHeaders,
            body: orderBody,
        };
        try {
            const req = await fetch(
                "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
                createOrderOptions
            );
            const data = await req.json();
            console.log("Order Data", data);
        } catch (error) {
            console.log(error);
        }
        // };
    }),
    */

});
