import { Header } from "@/components/Header";
import Main from "./Main";
import Path from "@/components/Path";

export default function Products() {
    return (
        <>
            <Header />
            <Path path={["products"]} />
            <Main />
        </>)
}