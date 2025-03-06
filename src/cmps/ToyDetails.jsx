import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { toyService } from "../services/toy.service";
import { useEffect, useState } from "react";

export function ToyDetails() {

    const { toyId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [toy, setToy] = useState(null);

    useEffect(() => {
        toyService.get(toyId)
            .then(toy => setToy(toy))
            .catch(err => console.log('Cannot load toy'));
    }, [toyId]);


    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>{toy.name}</h1>
            <p>Price: {toy.price}</p>
            <img src={toy.img} alt={toy.name} />
            <h5>{toy.labels.map(label => label).join(", ")}</h5>
            <div>
                <Link to={`/toy/${toy.prevToyId}`} state={location.state}>Previous</Link>
                <span style={{ margin: '0 10px' }}></span>
                <Link to={`/toy/${toy.nextToyId}`} state={location.state}>Next</Link>
            </div>
        </section>
    );
}