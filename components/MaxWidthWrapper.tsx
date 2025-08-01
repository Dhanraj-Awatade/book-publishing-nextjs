import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const MaxWidthWrapper = ({
    classname,
    children
}: {
    classname?: string,
    children: ReactNode
}) => {
    return <div className={cn('"mx-auto w-full max-w-screen-3xl p-2.5 md:px-20"', classname)}>
        {children}
    </div>
}

export default MaxWidthWrapper;