interface CautionProps {
    children: string;
    visible: boolean;
}

export default function Caution({ children, visible }: CautionProps) {
    return (
        <div
            className={`fixed top-0 left-0 z-50 w-full bg-[#EADBC8] text-[#3E3E3E] border-b border-white/40 backdrop-blur-sm transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
        >
            <p className="text-center text-sm font-semibold tracking-wide py-2">
                {children}
            </p>
        </div>
    );
}