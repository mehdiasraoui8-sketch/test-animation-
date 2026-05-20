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
  x: { x: 1, y: -0.62 },
  y: { x: 1, y: 0.58 },
  z: { x: 0, y: -1 },
}

export const MOTION_LIMITS = {
  x: 190,
  y: 145,
  z: 90,
}

export const CONTROLS = [
  {
    key: 'x',
    label: 'X · blue carriage',
    description: 'Slides the blue carriage on the gray bars mounted between the green traverses.',
  },
  {
    key: 'y',
    label: 'Y · green traverses',
    description: 'Moves the green traverses on the gray bars fixed to the red towers.',
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
