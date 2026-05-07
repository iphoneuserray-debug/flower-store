import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu } from 'lucide-react'
import NavDrawer from './NavDrawer'
import CartDrawer from './CartDrawer'
import { useCart } from '@/context/CartContext'
import Caution from './Caution'

export default function Header() {
    const { pathname } = useLocation()
    const { cartCount } = useCart()
    const [cartOpen, setCartOpen] = useState(false)
    const [navOpen, setNavOpen] = useState(false)
    const [cautionVisible, setCautionVisible] = useState(true)
    const [badgeKey, setBadgeKey] = useState(0)
    const prevCount = useRef(cartCount)
    const lastScrollY = useRef(0)
    const isHome = pathname === '/'

    useEffect(() => {
        if (cartCount > prevCount.current) setBadgeKey(k => k + 1)
        prevCount.current = cartCount
    }, [cartCount])

    useEffect(() => {
        setCautionVisible(true)
        lastScrollY.current = window.scrollY
    }, [pathname])

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY
            if (y > lastScrollY.current && y > 50) {
                setCautionVisible(false)
            } else if (y < lastScrollY.current) {
                setCautionVisible(true)
            }
            lastScrollY.current = y
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const iconsTop = isHome && cautionVisible ? '36px' : '8px'

    return (
        <>
            {isHome && <Caution visible={cautionVisible}>Pick Up Only at Melbourne Center Every Tuesday</Caution>}

            {/* Logo — only on non-home pages */}
            {!isHome && (
                <Link
                    to="/"
                    className="fixed hover:opacity-70 transition-opacity z-[40]"
                    style={{ top: '8px', left: '16px' }}
                >
                    <img src="/logo.jpg" alt="Garden Gallery" className="h-16 w-16 object-cover rounded-full" />
                </Link>
            )}

            {/* Right-side icons */}
            <div
                className="fixed right-0 flex items-center px-4 py-2 z-[100] pointer-events-none transition-[top] duration-300"
                style={{ top: iconsTop }}
            >
                <div className="flex items-center gap-1 pointer-events-auto">
                    {/* Cart */}
                    <button
                        onClick={() => setCartOpen(true)}
                        className="relative flex items-center justify-center w-10 h-10 hover:opacity-50 transition-opacity"
                    >
                        <ShoppingCart className="h-8 w-8" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" />
                        {cartCount > 0 && (
                            <span key={badgeKey} className="cart-pop absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-black text-white text-xs font-bold shadow">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Hamburger */}
                    <button
                        onClick={() => setNavOpen(true)}
                        className="flex items-center justify-center w-10 h-10 hover:opacity-50 transition-opacity"
                    >
                        <Menu className="h-8 w-8 text-gray-900" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" />
                    </button>
                </div>
            </div>

            {/* Spacer so content doesn't start behind header */}
            <div style={{ height: isHome ? '36px' : '52px' }} />

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            <NavDrawer open={navOpen} onClose={() => setNavOpen(false)} />
        </>
    )
}
