// resources: https://www.compart.com/en/unicode/category/So?sort=-unicode&page=4
import React from 'react'
import { Link }  from 'react-router-dom'

const handleVote = (option, props) => {
    const {fetchData, post, reqVote, recVote} = props
    const url = post.parentId ? 'comments' : 'posts'
    option =JSON.stringify({option:option})
    fetchData(`${url}/${post.id}`, reqVote, recVote, {method:'POST', body:option})
}

/**
* @description Represents a category list
*/
export const Post = (props) => {
    const { post, openEditPost } = props
    return (
        <div>
            <Link className='post-title' to= {`/${post.category}/${post.id}`}>{post.title}</Link>

        	<p className='post-body'>{post.body}</p>
        	<p className='post-details'><label>Author   : {post.author}</label></p>
        	<p className='post-details'><label>Comments : {post.commentCount}</label></p>
        	<p className='post-details'><label>Votes : {post.voteScore}</label></p>

        	<button className="post-up" onClick={(o, p) => handleVote('upVote', props)}>
                <span role='img' aria-label="thumbs up">&#128077;</span>
            </button>
            <button className="post-down" onClick={(o, p) => handleVote('downVote', props)}>
                <span role='img' aria-label="thumbs down">&#128078;</span>
            </button>

			<button className="post-edit"
                    aria-label="edit"
                    onClick={() => {openEditPost(true, post)}}
            >&#128396;
            </button>
        	<button className="post-delete" aria-label="delete">&#128465;</button>
        </div>
    )
}
