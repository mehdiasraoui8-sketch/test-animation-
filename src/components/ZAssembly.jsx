import zAssemblyImage from '../../4.PNG'
import motorOverlayImage from '../../overlay moteur.PNG'
import { toLayerStyle } from '../calibration'

function ZAssembly({ offset }) {
  return (
    <div className="machine-layer machine-layer--motion machine-layer--z" style={toLayerStyle(offset)}>
      <img src={zAssemblyImage} alt="Yellow Z-axis assembly" />
      <img src={motorOverlayImage} alt="Z-axis motor overlay" />
    </div>
  )
}

export default ZAssembly
