import { ToyPreview } from './ToyPreview.jsx'
import { Link } from 'react-router-dom'
export function ToyList({ toys, onRemoveToy }) {


    return (
        <div className="toy-list">
            {toys.map(toy =>
                <Link
                    to={`/toy/${toy._id}`}
                    state={{ modal: true }}
                    key={toy._id}
                >
                    <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
                </Link>
            )}
        </div>
    );
}