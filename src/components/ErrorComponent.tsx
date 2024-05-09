import React from "react"

const ErrorComponent = () => {
  const refreshPage = () => {
    window.location.reload()
  }

  return (
    <div className="error-container">
      <h1>Error Occurred....</h1>
      <button onClick={refreshPage}>Refresh Page</button>
    </div>
  )
}

export default ErrorComponent
