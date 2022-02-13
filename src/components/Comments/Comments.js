const Comments = props => {
    return (
        <div>
            <div
                dangerouslySetInnerHTML={{__html: props.contents}}
            />
        </div>
    )
}

export default Comments;