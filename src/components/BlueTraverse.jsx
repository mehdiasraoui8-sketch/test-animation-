import blueTraverseImage from '../../3.PNG'
import { toLayerStyle } from '../calibration'

function BlueTraverse({ offset, children }) {
  return (
    <div className="machine-layer machine-layer--motion machine-layer--blue" style={toLayerStyle(offset)}>
      <img src={blueTraverseImage} alt="Blue central traverse" />
      {children}
    </div>
  )
}

export default BlueTraverse
