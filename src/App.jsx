import { useMemo, useState } from 'react'
import axesReferenceImage from '../image_2026-05-07_164402938.png'
import './App.css'
import BlueTraverse from './components/BlueTraverse'
import GreenTraverses from './components/GreenTraverses'
import StaticFrame from './components/StaticFrame'
import ZAssembly from './components/ZAssembly'
import {
  CONTROLS,
  CONTROL_RANGE,
  DEFAULT_CONTROLS,
  SCENE_SIZE,
  combineOffsets,
  getAxisOffset,
} from './calibration'

function App() {
  const [controls, setControls] = useState(DEFAULT_CONTROLS)
  const [axisRanges, setAxisRanges] = useState(() => ({
    x: { ...CONTROL_RANGE },
    y: { ...CONTROL_RANGE },
    z: { ...CONTROL_RANGE },
  }))

  const offsets = useMemo(() => {
    const yOffset = getAxisOffset('y', controls.y)
    const xOffset = getAxisOffset('x', controls.x)
    const zOffset = getAxisOffset('z', controls.z)

    return {
      green: yOffset,
      blue: combineOffsets(yOffset, xOffset),
      yellow: combineOffsets(yOffset, xOffset, zOffset),
    }
  }, [controls])

  const handleControlChange = (axisKey) => (event) => {
    setControls((current) => ({
      ...current,
      [axisKey]: Number(event.target.value),
    }))
  }

  const clampValue = (value, min, max) => Math.min(Math.max(value, min), max)

  const handleRangeChange = (axisKey, bound) => (event) => {
    const nextValue = Number(event.target.value)

    setAxisRanges((current) => {
      const axisRange = {
        ...current[axisKey],
        [bound]: Number.isNaN(nextValue) ? 0 : nextValue,
      }

      if (axisRange.min > axisRange.max) {
        if (bound === 'min') {
          axisRange.max = axisRange.min
        } else {
          axisRange.min = axisRange.max
        }
      }

      setControls((currentControls) => ({
        ...currentControls,
        [axisKey]: clampValue(currentControls[axisKey], axisRange.min, axisRange.max),
      }))

      return {
        ...current,
        [axisKey]: axisRange,
      }
    })
  }

  const handleReset = () => {
    setControls((currentControls) => ({
      ...currentControls,
      ...Object.fromEntries(
        Object.entries(DEFAULT_CONTROLS).map(([axisKey, value]) => [
          axisKey,
          clampValue(value, axisRanges[axisKey].min, axisRanges[axisKey].max),
        ]),
      ),
    }))
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Interactive H-Bot reconstruction</p>
          <h1>Axis-aligned motion study</h1>
          <p className="hero-copy">
            Green traverses glide on the gray bars attached to the red towers, blue traverse glides
            on the gray bars attached between the green traverses, and yellow remains the Z stage on
            blue.
          </p>
        </div>
        <button
          className="reset-button"
          type="button"
          onClick={handleReset}
        >
          Reset axes
        </button>
      </section>

      <section className="workbench">
        <div className="machine-card">
          <div
            className="machine-stage"
            style={{ '--scene-width': SCENE_SIZE.width, '--scene-height': SCENE_SIZE.height }}
          >
            <StaticFrame />
            <GreenTraverses offset={offsets.green} />
            <BlueTraverse offset={offsets.blue} />
            <ZAssembly offset={offsets.yellow} />
          </div>
        </div>

        <aside className="control-card" aria-label="Axis controls">
          <div className="control-card__header">
            <h2>Controls</h2>
            <p>Use the sliders to inspect mechanically coherent combined motion.</p>
          </div>

          <div className="control-list">
            {CONTROLS.map(({ key, label, description }) => {
              const axisRange = axisRanges[key]

              return (
                <label className="control" key={key}>
                  <div className="control__header">
                    <span>{label}</span>
                    <output htmlFor={`axis-${key}`}>{controls[key]}</output>
                  </div>
                  <input
                    id={`axis-${key}`}
                    type="range"
                    min={axisRange.min}
                    max={axisRange.max}
                    value={controls[key]}
                    onChange={handleControlChange(key)}
                  />
                  <div className="control__range">
                    <label>
                      Min
                      <input
                        type="number"
                        value={axisRange.min}
                        onChange={handleRangeChange(key, 'min')}
                      />
                    </label>
                    <label>
                      Max
                      <input
                        type="number"
                        value={axisRange.max}
                        onChange={handleRangeChange(key, 'max')}
                      />
                    </label>
                  </div>
                  <span className="control__description">{description}</span>
                </label>
              )
            })}
          </div>

          <div className="reference-card">
            <img src={axesReferenceImage} alt="Axes reference showing X, Y and Z directions" />
            <div>
              <strong>Axes reference</strong>
              <p>Green on red-tower bars, blue on inter-green bars, yellow is Z on blue.</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default App
