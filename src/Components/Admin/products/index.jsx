import { Route, Routes } from "react-router-dom";
import ProducList from "./ProductList";

export default function AdminProducts() {
    return (
        <Routes>
            <Route index element={<ProducList />} />
            <Route path=":id" element={<>single</>} />
        </Routes>
    );
}
