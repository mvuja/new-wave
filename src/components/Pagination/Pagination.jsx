import './_pagination.scss'

const Pagination = ({ page, limit, total, onNext, onPrev }) => {
  const totalPages = Math.ceil(total / limit)
  if (totalPages <= 1) return null

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={onPrev}
        disabled={page <= 1}
      >
        ← Prev
      </button>

      <span className="pagination-info">
        Page {page} of {totalPages}
        <span className="pagination-count"> &nbsp;({total} items)</span>
      </span>

      <button
        className="pagination-btn"
        onClick={onNext}
        disabled={page * limit >= total}
      >
        Next →
      </button>
    </div>
  )
}

export default Pagination

