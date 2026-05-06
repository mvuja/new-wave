import './_pagination.scss'

const Pagination = ({ page, limit, total, onNext, onPrev }) => {
  const totalPages = Math.ceil(total / limit)
  if (totalPages <= 1) return null

  return (
    <div className="pagination">
      <span className="pagination-info">
        Page {page} of {totalPages}
        <span className="pagination-count"> &nbsp;({total} items)</span>
      </span>

      <div className="pagination-buttons">
        <button
          className="pagination-btn"
          onClick={onPrev}
          disabled={page <= 1}
        >
          ← Prev
        </button>

        <button
          className="pagination-btn"
          onClick={onNext}
          disabled={page * limit >= total}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default Pagination

