import React from 'react'
import { Link }  from 'react-router-dom'
import PropTypes from 'prop-types'

/**
* @description Represents a category list
*/
export const PostList = (props) => {

    const { posts, sortPosts } = props

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


            <button className=''
                    // onClick={() => {sortPosts("timestamp")}}
                    onClick={() => {sortPosts("title")}}
            >
                sort
            </button>

        </div>
    )
}


PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    sortPosts: PropTypes.func.isRequired
}