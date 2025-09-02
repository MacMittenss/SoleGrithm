import { useParams } from 'wouter'

export default function WorkDetailPage() {
  const params = useParams()
  
  return (
    <div className="work-detail-page">
      <section className="work-detail-hero">
        <h1>Project Details</h1>
        <p>Project ID: {params.id}</p>
      </section>
    </div>
  )
}