import frameImage from '../../1.PNG'
import lowerTowersImage from '../../tour.PNG'

function StaticFrame() {
  return (
    <>
      <div className="machine-layer machine-layer--frame">
        <img src={frameImage} alt="Fixed H-Bot frame with gray guide bars" />
      </div>
      <div className="machine-layer machine-layer--foreground">
        <img src={lowerTowersImage} alt="Lower support towers" />
      </div>
    </>
  )
}

export default StaticFrame
