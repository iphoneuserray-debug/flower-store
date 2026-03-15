import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "./ui/breadcrumb";

interface Props {
    path: string[];
}

export default function Path({ path }: Props) {
    return (<div className="bg-gray-100 h-12 content-center">
        <Breadcrumb className="ms-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {path.map((value) => <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">{value}</BreadcrumbLink>
                    </BreadcrumbItem></>)}
            </BreadcrumbList>
        </Breadcrumb>
    </div>)
}