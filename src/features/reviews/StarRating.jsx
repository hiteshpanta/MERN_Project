import { Star } from "lucide-react"
import { cn } from "../../lib/utils"

export default function StarRating({ value, max = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const rating = i + 1
        const diff = value - i

        // full star
        if (diff >= 1) {
          return (
            <Star
              key={i}
              className="h-4 w-4 fill-yellow-400 text-yellow-400"
            />
          )
        }

        // half star
        if (diff >= 0.5) {
          return (
            <div key={i} className="relative h-4 w-4">
              {/* empty star */}
              <Star className="h-4 w-4 text-muted-foreground" />

              {/* half filled */}
              <Star
                className="absolute left-0 top-0 h-4 w-4 fill-yellow-400 text-yellow-400"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            </div>
          )
        }

        // empty star
        return (
          <Star
            key={i}
            className="h-4 w-4 text-muted-foreground"
          />
        )
      })}
    </div>
  )
}
