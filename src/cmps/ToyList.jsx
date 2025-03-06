import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy }) {


    return (
        <div className="toy-list">
            {toys.map(toy => <ToyPreview key={toy._id} toy={toy} onRemoveToy={onRemoveToy} />)}
        </div>
    )
}