import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Props {
    title: string;
    price: string;
    imgSrc: string;
    badge?: string;
    to?: string;
}


export default function ItemCard({ title, price, imgSrc, badge }: Props) {
    return (
        <Link to={`/detail/${title}`} >
            <Card className="relative max-w-[280px] mx-auto pt-0 overflow-hidden hover:shadow-lg">
                <img src={imgSrc} alt="Image" className="relative z-20 aspect-[4/5] object-cover" />
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                        {price}
                    </CardDescription>
                    <CardAction>
                        <Badge variant="secondary">{badge}</Badge>
                    </CardAction>
                </CardHeader>
            </Card>
        </Link >
    )
}