import { useContext } from "react";
import { ProductContext } from "../hoc/porductProvider";

export default function useProduct() {
  return useContext(ProductContext);
}
