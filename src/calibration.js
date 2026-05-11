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
  x: { x: -1, y: 0.38 },
  y: { x: 0, y: 1 },
  z: { x: -0.5, y: -0.9 },
}

export const MOTION_LIMITS = {
  x: 240,
  y: 170,
  z: 120,
}

export const CONTROLS = [
  {
    key: 'y',
    label: 'Y · frame glide',
    description: 'Moves both green traverses together on the fixed gray guide bars.',
  },
  {
    key: 'x',
    label: 'X · blue traverse',
    description: 'Slides the blue carriage on the gray bars attached to the green traverses.',
  },
  {
    key: 'z',
    label: 'Z · yellow assembly',
    description: 'Raises and lowers the yellow assembly relative to the blue carriage.',
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
