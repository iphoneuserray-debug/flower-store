import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Cart } from "../Cart"

export const Header = () => {
    return (<header>
        <div className="flex items-center gap-4">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                Garden Gallery
            </h1>
            <Link to="/" className="
            relative
            text-lg font-semibold text-gray-700
            after:content-['']
            after:absolute after:left-0 after:-bottom-1
            after:h-[2px] after:w-0
            after:bg-gray-700
            after:transition-all after:duration-300
            hover:after:w-full">Home</Link>
            <Link to="/products" className="
            relative
            text-lg font-semibold text-gray-700
            after:content-['']
            after:absolute after:left-0 after:-bottom-1
            after:h-[2px] after:w-0
            after:bg-gray-700
            after:transition-all after:duration-300
            hover:after:w-full">Subscription</Link>
            <Field orientation="horizontal">
                <Input type="search" placeholder="Search..." className="inline-full max-inline-64" />
                <Button>Search</Button>
            </Field>
            <Cart></Cart>
        </div>
    </header>)
}