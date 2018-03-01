import React from 'react'
import { Link }  from 'react-router-dom'

/**
* @description Represents a category list
*/
export const PostList = (props) => {

    const { posts } = props

    return (
        <div>
            {posts.map ( (p) => (
                <li key={p.id}>
                	<Link className='post-title' to= {`/post/${p.id}`}>{p.title}</Link>
                	<p className='post-details'>{p.author}</p>
                	<p className='post-details'>{p.commentCount}</p>
                	<p className='post-details'>{p.voteScore}</p>
                 </li>
            ))}

        </div>
    )
}
