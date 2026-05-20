import blueTraverseImage from '../../3.PNG'
import blueTraverseOverlayImage from '../../overbleu.PNG'
import { toLayerStyle } from '../calibration'

function BlueTraverse({ offset }) {
  return (
    <div className="machine-layer machine-layer--motion machine-layer--blue" style={toLayerStyle(offset)}>
      <img src={blueTraverseImage} alt="Blue central traverse" />
      <img src={blueTraverseOverlayImage} alt="Blue central traverse overlay" />
    </div>
  )
}

export default BlueTraverse
