import blueTraverseImage from '../../3.PNG'
import blueTraverseOverlayImage from '../../overbleu.PNG'
import motorOverlayImage from '../../overlay moteur.PNG'
import { toLayerStyle } from '../calibration'

function BlueTraverse({ offset }) {
  return (
    <div className="machine-layer machine-layer--motion machine-layer--blue" style={toLayerStyle(offset)}>
      <img src={blueTraverseImage} alt="Blue central traverse" />
      <img src={motorOverlayImage} alt="Z-axis motor overlay" />
      <img src={blueTraverseOverlayImage} alt="Blue central traverse overlay" />
    </div>
  )
}

export default BlueTraverse
