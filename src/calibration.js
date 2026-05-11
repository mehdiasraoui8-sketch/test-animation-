export const SCENE_SIZE = {
  width: 1617,
  height: 1035,
}

export const CONTROL_RANGE = {
  min: -100,
  max: 100,
}

export const DEFAULT_CONTROLS = {
  x: 0,
  y: 0,
  z: 0,
}

export const MOTION_AXES = {
  x: { x: -1, y: 0.2 },
  y: { x: 0, y: 1 },
  z: { x: -0.32, y: -1 },
}

export const MOTION_LIMITS = {
  x: 190,
  y: 145,
  z: 90,
}

export const CONTROLS = [
  {
    key: 'y',
    label: 'Y · green carriage',
    description: 'Moves the green traverses together on the fixed gray frame bars.',
  },
  {
    key: 'x',
    label: 'X · blue carriage',
    description: 'Slides the blue carriage on the gray bars mounted on the green traverses.',
  },
  {
    key: 'z',
    label: 'Z · yellow assembly',
    description: 'Moves the yellow assembly along its Z path relative to the blue carriage.',
  },
]

export function getAxisOffset(axisKey, value) {
  const vector = MOTION_AXES[axisKey]
  const distance = (value / 100) * MOTION_LIMITS[axisKey]

  return {
    x: vector.x * distance,
    y: vector.y * distance,
  }
}

export function combineOffsets(...offsets) {
  return offsets.reduce(
    (accumulator, offset) => ({
      x: accumulator.x + offset.x,
      y: accumulator.y + offset.y,
    }),
    { x: 0, y: 0 },
  )
}

export function toLayerStyle(offset) {
  return {
    transform: `translate(${(offset.x / SCENE_SIZE.width) * 100}%, ${(offset.y / SCENE_SIZE.height) * 100}%)`,
  }
}
