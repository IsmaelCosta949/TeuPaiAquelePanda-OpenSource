import {
  Label,
  Slider as AriaSlider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
  type SliderProps as AriaSliderProps,
} from "react-aria-components"
import { cn } from "cn"

type SliderProps = Omit<AriaSliderProps<number>, "className"> & {
  className?: string
  /** Rótulo visível; o valor atual aparece ao lado via SliderOutput. */
  label: string
}

function Slider({ className, label, ...props }: SliderProps) {
  return (
    <AriaSlider
      data-slot="slider"
      className={cn(
        "flex w-full items-center gap-3 select-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <div className="flex shrink-0 gap-1 text-xs text-panda-gray dark:text-white/50">
        <Label>{label}:</Label>
        <SliderOutput />
      </div>
      <SliderTrack
        data-slot="slider-track"
        className="relative flex h-3 grow touch-none items-center"
      >
        {({ state }) => (
          <>
            <div className="absolute h-1 w-full overflow-hidden rounded-full bg-muted">
              <div
                data-slot="slider-range"
                className="h-full bg-panda-red"
                style={{ width: `${state.getThumbPercent(0) * 100}%` }}
              />
            </div>
            <SliderThumb
              data-slot="slider-thumb"
              className="top-1/2 relative block size-3 rounded-full border border-panda-red bg-white ring-ring/50 transition-shadow after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden dragging:ring-3"
            />
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  )
}

export { Slider }
