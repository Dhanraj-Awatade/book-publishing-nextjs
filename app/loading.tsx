// import { Skeleton } from "@/components/ui/skeleton";

import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <>
            <div className='flex flex-col w-full min-h-screen items-center justify-center'>
                <Loader2 className="animate-spin h-24 w-24 text-slate-950" />
            </div>
        </>
    )
}