import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy }) {


    return (
        <div>
            <ul className="toy-list">
                {toys.map(toy => <li key={toy._id}><ToyPreview toy={toy} onRemoveToy={onRemoveToy}/></li>)}
            </ul>
        </div>
    )
}