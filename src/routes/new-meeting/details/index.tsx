import DetailsForm from "../../../components/details-form";
import './styles.css';

const Details = () => {
    return (
        <div>
            <h1 className="header">Add Meeting</h1>
            <div className="details-container">
                <DetailsForm />
            </div>
        </div>
    )
}

export default Details;