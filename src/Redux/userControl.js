import { loginFailure, loginStart, loginSuccess, logut } from "./userRedux";
import { toast } from "react-toastify";

async function redux_logoutUser(dispatch) {
    dispatch(logut());
}

function redux_adminLogin(dispatch, res) {
    if (res) {
        toast("C возвращением, " + res.user.username);
        // changeToken(res.data.token, res.data.username);
        dispatch(loginSuccess(res));
    }
}

export { redux_adminLogin, redux_logoutUser };
