import React from 'react'
import { Link }  from 'react-router-dom'
import PropTypes from 'prop-types'
import { Post } from './Post'
/**
* @description Represents a category list
*/
export const PostList = (props) => {

    const { posts, sortPosts, allowSort } = props

    return (
        <div>
            {allowSort && (
                <label className=''> Sort by:
                    <select className='' onChange = {(e) => {sortPosts(e.target.value)}}>
                        <option value="voteScore">Votes</option>
                        <option value="commentCount">Comments</option>
                        <option value="timestamp">Date</option>
                    </select>
                </label>
            )}

            {posts.map ( (p) => (<Post key={p.id} post={p} />))}
        </div>
    )
}


PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    allowSort: PropTypes.bool.isRequired,
    sortPosts: PropTypes.func,
}