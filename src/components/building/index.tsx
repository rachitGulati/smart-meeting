import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import './style.css';

const Building = ({ name }: Partial<IBuilding>) => <div className="building">
    <FontAwesomeIcon icon={faBuilding} fontSize={80} />
    <h4>{name}</h4>
</div>


const Buildings = ({buildings}: {buildings: IBuilding[]}) => <div className="buildings">
    {/* <h2>Buildings, Total: {buildings.length}</h2> */}
    <h2>Buildings</h2>
    <div className="container">
        {buildings.map((building: IBuilding) => <Building key={building.id} name={building.name} />)}
    </div>
</div>

export default Buildings;