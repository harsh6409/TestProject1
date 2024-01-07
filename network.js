import axios from "axios";

const axiosInstant = axios.create({
    baseURL: "https://fakestoreapi.com/products/1",
    headers: {
        Accept: 'application/json'
    }
});

export async function normalGet() {

    try {
        var response = await axiosInstant.get();
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Network error 1.");
        }
    } catch (error) {
        console.log("Network: ", error);
    }
}