import axios from "axios";

const token = "5641214977:AAF3zNOl_nnYh5va0MxEKVsdhfzHHZ1YuKU";
const feedback_accounts = ["5775759209", "123798231", "503970397"];

const api_url =
    "https://api.telegram.org/bot[TOKEN]/sendMessage?chat_id=[USER_ID]&parse_mode=markdown&text=";

export const notifyAdmin = (text) => {
    if (token.length < 1) return;
    let send_url = api_url.replace("[TOKEN]", token);
    feedback_accounts.forEach((account) => {
        axios.get(encodeURI(send_url.replace("[USER_ID]", account) + text));
    });
};
