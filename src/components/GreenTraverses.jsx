import leftTraverseImage from '../../traverse droite.PNG'
import rightTraverseImage from '../../2.PNG'
import { toLayerStyle } from '../calibration'

function GreenTraverses({ offset, children }) {
  return (
    <div className="machine-layer machine-layer--motion machine-layer--green" style={toLayerStyle(offset)}>
      <img src={leftTraverseImage} alt="Left green traverse" />
      <img src={rightTraverseImage} alt="Right green traverse with guide bars" />
      {children}
    </div>
  )
}

export default GreenTraverses
