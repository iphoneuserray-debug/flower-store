import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { ShoppingCart, X } from "lucide-react"

// 👉 模拟购物车数量（以后换成全局状态）
const cartCount = 3

export function Cart() {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative me-4 bg-transparent hover:bg-transparent"
                >
                    {/* 购物车图标 */}
                    <ShoppingCart />

                    {/* 🔴 红色数字 */}
                    {cartCount > 0 && (
                        <span className="
                            absolute -top-1 -right-1
                            min-w-[18px] h-[18px]
                            px-1
                            flex items-center justify-center
                            rounded-full
                            bg-red-500 text-white text-xs font-bold
                            shadow
                        ">
                            {cartCount}
                        </span>
                    )}
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <div className="flex justify-between items-center">
                        <DrawerTitle>Cart</DrawerTitle>

                        {/* ❗修复：必须用 button 包裹 */}
                        <DrawerClose asChild>
                            <button className="p-1 hover:bg-gray-100 rounded">
                                <X />
                            </button>
                        </DrawerClose>
                    </div>
                </DrawerHeader>

                <div className="no-scrollbar overflow-y-auto px-4">
                    {/* Cart items */}
                </div>

                <DrawerFooter>
                    <Button disabled>Check Out</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}