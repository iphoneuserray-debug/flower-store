import { Slider } from '@/components/ui/slider'

export interface Filters {
    priceRange: [number, number]
    inStock: 'all' | 'in' | 'out'
    tags: string[]
}

interface FilterPanelProps {
    maxPrice: number
    allTags: string[]
    filters: Filters
    onChange: (f: Filters) => void
}

export default function FilterPanel({ maxPrice, allTags, filters, onChange }: FilterPanelProps) {
    const setPrice = (v: number[]) => onChange({ ...filters, priceRange: [v[0], v[1]] as [number, number] })
    const setInStock = (v: Filters['inStock']) => onChange({ ...filters, inStock: v })
    const toggleTag = (tag: string) => {
        const next = filters.tags.includes(tag)
            ? filters.tags.filter(t => t !== tag)
            : [...filters.tags, tag]
        onChange({ ...filters, tags: next })
    }

    const isDefault = filters.inStock === 'all' && filters.tags.length === 0
        && filters.priceRange[0] === 0 && filters.priceRange[1] >= maxPrice

    return (
        <div className="flex flex-col gap-6 w-full lg:w-52 shrink-0">
            {/* Price */}
            <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-3">Price</p>
                <Slider
                    value={filters.priceRange}
                    onValueChange={setPrice}
                    min={0}
                    max={maxPrice || 800}
                    step={5}
                    className="mb-2"
                />
                <div className="flex justify-between text-xs text-black/50 tracking-wider">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                </div>
            </div>

            {/* Availability */}
            <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-3">Availability</p>
                <div className="flex flex-col gap-1.5">
                    {(['all', 'in', 'out'] as const).map(v => (
                        <button
                            key={v}
                            onClick={() => setInStock(v)}
                            className={`text-left text-xs uppercase tracking-widest py-1 transition-colors ${filters.inStock === v ? 'text-black font-semibold' : 'text-black/40 hover:text-black/70'}`}
                        >
                            {v === 'all' ? 'All' : v === 'in' ? 'In Stock' : 'Out of Stock'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tags */}
            {allTags.length > 0 && (
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-3">Tags</p>
                    <div className="flex flex-col gap-1.5">
                        {allTags.map(tag => (
                            <label key={tag} className="flex items-center gap-2 cursor-pointer group" onClick={() => toggleTag(tag)}>
                                <span className={`w-3.5 h-3.5 shrink-0 border flex items-center justify-center transition-colors ${filters.tags.includes(tag) ? 'border-black bg-black' : 'border-black/30 group-hover:border-black/60'}`}>
                                    {filters.tags.includes(tag) && (
                                        <svg viewBox="0 0 10 10" className="w-2 h-2 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <polyline points="1.5,5 4,7.5 8.5,2.5" />
                                        </svg>
                                    )}
                                </span>
                                <span className="text-xs uppercase tracking-widest text-black/60 group-hover:text-black transition-colors">
                                    {tag}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Reset */}
            {!isDefault && (
                <button
                    onClick={() => onChange({ priceRange: [0, maxPrice || 800], inStock: 'all', tags: [] })}
                    className="text-xs uppercase tracking-widest text-black/40 hover:text-black transition-colors text-left"
                >
                    Clear filters
                </button>
            )}
        </div>
    )
}
