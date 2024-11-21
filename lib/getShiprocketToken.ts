export const getShiprocketToken = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        email: process.env.SHIPROCKET_EMAIL as string,
        password: process.env.SHIPROCKET_PASS as string,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        //   redirect: 'follow'
    };

    try {
        const req = await fetch(
            "https://apiv2.shiprocket.in/v1/external/auth/login",
            requestOptions
        );
        const data = await req.json();

        // const data = await req
        // .json()
        // .then((data) => data.token)
        // .catch((error) => console.log(error));
        console.log("shiprocket token req success", data);
        return data.token as string;
    } catch (error) {
        console.log(error);
    }
};
