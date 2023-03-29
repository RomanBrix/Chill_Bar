import { Route, Routes } from "react-router-dom";
import OrderList from "./OrderList";
import SingleOrder from "./SingleOrder";

export default function Orders() {
    return (
        <Routes>
            <Route index element={<OrderList />} />
            <Route path=":id" element={<SingleOrder />} />
        </Routes>
    );
}
