const Norti = ({error}) => {
    if (error === null){
        return null
    }
    return (
        <div>
            {error}
        </div>
    )
}

export default Norti