import {
  cloneElement,
  type CSSProperties,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'

type Size = {
  width: number
  height: number
}

export type StepAndRepeatProps = {
  children: ReactElement
  gap?: number
  animate?: boolean
  alternateDirection?: boolean
  /** Shared default speed in px/sec when row-specific speeds are not provided. */
  speed?: number
  /** Speed for even rows (0, 2, 4…). Negative = left, positive = right. */
  evenRowSpeed?: number
  /** Speed for odd rows (1, 3, 5…). Negative = left, positive = right. */
  oddRowSpeed?: number
  rotation?: number
  className?: string
  style?: CSSProperties
}

const emptySize: Size = {
  width: 0,
  height: 0,
}

function measureElement(node: HTMLElement): Size {
  const { width, height } = node.getBoundingClientRect()

  return {
    width: Number(width.toFixed(2)),
    height: Number(height.toFixed(2)),
  }
}

function isSameSize(current: Size, next: Size) {
  return current.width === next.width && current.height === next.height
}

export function StepAndRepeat({
  children,
  gap = 24,
  animate = false,
  alternateDirection = false,
  speed = 8,
  evenRowSpeed,
  oddRowSpeed,
  rotation = 0,
  className,
  style,
}: StepAndRepeatProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sampleRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState(emptySize)
  const [sampleSize, setSampleSize] = useState(emptySize)

  useEffect(() => {
    const container = containerRef.current
    const sample = sampleRef.current

    if (!container || !sample) {
      return
    }

    const measure = () => {
      const nextContainerSize = measureElement(container)
      const nextSampleSize = measureElement(sample)

      setContainerSize((currentSize) =>
        isSameSize(currentSize, nextContainerSize) ? currentSize : nextContainerSize,
      )
      setSampleSize((currentSize) =>
        isSameSize(currentSize, nextSampleSize) ? currentSize : nextSampleSize,
      )
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(container)
    observer.observe(sample)

    return () => {
      observer.disconnect()
    }
  }, [children])

  const tiles: ReactElement[] = []
  const rows: ReactElement[] = []

  // Compute expanded dimensions to cover container corners when rotated
  const theta = (rotation * Math.PI) / 180
  const cosA = Math.abs(Math.cos(theta))
  const sinA = Math.abs(Math.sin(theta))
  const gridWidth = rotation === 0
    ? containerSize.width
    : containerSize.width * cosA + containerSize.height * sinA
  const gridHeight = rotation === 0
    ? containerSize.height
    : containerSize.width * sinA + containerSize.height * cosA

  if (containerSize.width > 0 && containerSize.height > 0 && sampleSize.width > 0 && sampleSize.height > 0) {
    const columnStep = sampleSize.width + gap
    const rowStep = sampleSize.height + gap
    const rowCount = Math.ceil(gridHeight / rowStep) + 1

    if (animate) {
      const repeatCount = Math.max(
        2,
        Math.ceil(
          (gridWidth + sampleSize.width / 2 + columnStep * 2) / columnStep,
        ),
      )
      const travelDistance = repeatCount * columnStep

      for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
        const y = rowIndex * rowStep
        const xOffset = rowIndex % 2 === 0 ? 0 : sampleSize.width / 2
        const defaultEvenRowSpeed = -speed
        const defaultOddRowSpeed = alternateDirection ? speed : -speed
        const rowSpeed =
          rowIndex % 2 === 0
            ? (evenRowSpeed ?? defaultEvenRowSpeed)
            : (oddRowSpeed ?? defaultOddRowSpeed)
        const absSpeed = Math.abs(rowSpeed)
        const duration = absSpeed === 0 ? 0 : Number((travelDistance / absSpeed).toFixed(2))
        const reverseDirection = rowSpeed > 0
        const startOffset = reverseDirection ? xOffset - columnStep - travelDistance : xOffset - columnStep
        const endOffset = reverseDirection ? xOffset - columnStep : xOffset - columnStep - travelDistance

        rows.push(
          <div
            key={rowIndex}
            className="step-and-repeat__row"
            style={{ transform: `translateY(${y}px)`, height: `${sampleSize.height}px` }}
          >
            <div
              className="step-and-repeat__track step-and-repeat__track--animated"
              style={
                {
                  '--step-and-repeat-gap': `${gap}px`,
                  '--step-and-repeat-from': `${startOffset}px`,
                  '--step-and-repeat-to': `${endOffset}px`,
                  '--step-and-repeat-duration': `${duration}s`,
                  ...(absSpeed === 0 ? { animationPlayState: 'paused' } : {}),
                } as CSSProperties
              }
            >
              {Array.from({ length: repeatCount * 2 }, (_, tileIndex) => (
                <div key={`${rowIndex}-${tileIndex}`} className="step-and-repeat__tile">
                  {cloneElement(children)}
                </div>
              ))}
            </div>
          </div>,
        )
      }
    } else {
      for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
        const y = rowIndex * rowStep
        const xOffset = rowIndex % 2 === 0 ? 0 : sampleSize.width / 2

        for (
          let x = xOffset - columnStep;
          x < gridWidth + columnStep;
          x += columnStep
        ) {
          tiles.push(
            <div
              key={`${rowIndex}-${x}`}
              className="step-and-repeat__tile"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {cloneElement(children)}
            </div>,
          )
        }
      }
    }
  }

  const rootClassName = className ? `step-and-repeat ${className}` : 'step-and-repeat'

  return (
    <div ref={containerRef} className={rootClassName} style={style}>
      <div
        className="step-and-repeat__layer"
        aria-hidden="true"
        style={rotation !== 0 ? {
          width: `${gridWidth}px`,
          height: `${gridHeight}px`,
          left: `${(containerSize.width - gridWidth) / 2}px`,
          top: `${(containerSize.height - gridHeight) / 2}px`,
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center center',
        } : undefined}
      >
        {animate ? rows : tiles}
      </div>
      <div ref={sampleRef} className="step-and-repeat__sample" aria-hidden="true">
        {cloneElement(children)}
      </div>
    </div>
  )
}
