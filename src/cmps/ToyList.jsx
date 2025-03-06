import { ToyPreview } from './ToyPreview.jsx'
import { Link } from 'react-router-dom'
export function ToyList({ toys, onRemoveToy }) {


    return (
        <div className="toy-list">
            {toys.map(toy => {
                return (
                    <Link to={`/toy/${toy._id}`} key={toy._id}>
                        <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
                    </Link>
                )
            })};
        </div>
    )
}