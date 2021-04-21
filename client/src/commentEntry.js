import React from 'react'

const CommentEntry = (comments) =>{

    console.log(comments);
    return(
        comments.comments.map( comment =>(
            <div>{comment.body}</div>
            )
        )
    )
}

export default CommentEntry;
