export function ToyPreview({ toy }) {
    return (
        <div className="toy-preview">
            <h2>{toy.name}</h2>
            <img src={toy.img} alt="" />
            <p>Price: {toy.price}</p>
        </div>
    )
}