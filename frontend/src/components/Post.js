import React from 'react'

/**
* @description Represents a category list
*/
export const Post = (props) => {

    const { post } = props
    return (
        <div>
        	<p className='post-title'>{post.title}</p>
        	<p className='post-body'>{post.body}</p>
        	<p className='post-details'>{post.author}</p>
        	<p className='post-details'>{post.commentCount}</p>
        	<p className='post-details'>{post.voteScore}</p>

        	<button className="post-up">
                <span role='img' aria-label="thumbs up">&#128077;</span>
            </button>
            <button className="post-down">
                <span role='img' aria-label="thumbs down">&#128078;</span>
            </button>

			<button className="post-edit">Edit</button>
        	<button className="post-delete">Delete</button>
        </div>
    )
}
