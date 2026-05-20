import leftTraverseImage from '../../traverse droite.PNG'
import rightTraverseImage from '../../2.PNG'
import leftTraverseOverlayImage from '../../overgreen traverse droite.png'
import rightTraverseOverlayImage from '../../overgreen travers gauch.png'
import { toLayerStyle } from '../calibration'

function GreenTraverses({ offset }) {
  const layerStyle = toLayerStyle(offset)

  return (
    <>
      <div className="machine-layer machine-layer--motion machine-layer--green" style={layerStyle}>
        <img src={rightTraverseImage} alt="Right green traverse with guide bars" />
        <img src={rightTraverseOverlayImage} alt="Right green traverse overlay" />
      </div>
      <div className="machine-layer machine-layer--motion machine-layer--green-overlay" style={layerStyle}>
        <img src={leftTraverseImage} alt="Left green traverse" />
        <img src={leftTraverseOverlayImage} alt="Left green traverse overlay" />
      </div>
    </>
  )
}

export default GreenTraverses
