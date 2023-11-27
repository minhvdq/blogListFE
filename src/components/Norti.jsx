const Norti = ({ error }) => {
  if (error === null){
    return null
  }
  return (
    <div className="norti">
      {error}
    </div>
  )
}

export default Norti