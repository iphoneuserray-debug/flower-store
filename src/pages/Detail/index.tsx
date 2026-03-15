import { Header } from "@/components/Header";
import Main from "./Main";
import Path from "@/components/Path";

export default function Detail() {
    return (
        <>
            <Header />
            <Path path={["detail"]} />
            <Main />
        </>)
}