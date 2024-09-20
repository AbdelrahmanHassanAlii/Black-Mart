
export default function ProductCard({ image, name }) {
  return (
    <div >
    <img  src={image} alt={name} />
    <p >{name}</p>
  </div>
  )
}
