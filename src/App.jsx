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

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Interactive H-Bot reconstruction</p>
          <h1>Axis-aligned motion study</h1>
          <p className="hero-copy">
            Gray bars are used as the visual guide paths: the green traverses move in Y, the blue
            traverse glides in X on the green bars, and the yellow assembly moves in Z relative to
            the blue carriage.
          </p>
        </div>
        <button
          className="reset-button"
          type="button"
          onClick={() => setControls(DEFAULT_CONTROLS)}
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
            {CONTROLS.map(({ key, label, description }) => (
              <label className="control" key={key}>
                <div className="control__header">
                  <span>{label}</span>
                  <output htmlFor={`axis-${key}`}>{controls[key]}</output>
                </div>
                <input
                  id={`axis-${key}`}
                  type="range"
                  min={CONTROL_RANGE.min}
                  max={CONTROL_RANGE.max}
                  value={controls[key]}
                  onChange={handleControlChange(key)}
                />
                <span className="control__description">{description}</span>
              </label>
            ))}
          </div>

          <div className="reference-card">
            <img src={axesReferenceImage} alt="Axes reference showing X, Y and Z directions" />
            <div>
              <strong>Axes reference</strong>
              <p>X follows the red diagonal, Y is vertical, and Z follows the blue diagonal.</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default App
