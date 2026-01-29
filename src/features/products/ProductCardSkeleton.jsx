import { Skeleton } from "../../components/ui/skeleton";


export default function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="h-[200px] " />
      <div className="space-y-4 mt-4">
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 " />
        <Skeleton className="h-4 " />
      </div>
    </div>
  )
}
