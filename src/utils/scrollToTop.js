import { useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

function ScrollToTop({ history, children }) {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const unlisten = history.listen(() => {
      window.scrollTo({ top: 0 })
    })
    return () => unlisten()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Fragment>{children}</Fragment>
}

export default withRouter(ScrollToTop)

