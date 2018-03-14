import React from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post'
/**
* @description Represents a category list
*/
export const PostList = (props) => {

    const { posts, sortPosts, allowSort, vote, del, openEditPost } = props

    return (
        <div>
            {allowSort && (
                <label className=''> Sort by:
                    <select className=''
                            onChange = {(e) => {sortPosts(e.target.value)}}
                            defaultValue={process.env.REACT_APP_DEFAULT_SORT}
                    >
                        <option value="voteScore">Votes</option>
                        <option value="commentCount">Comments</option>
                        <option value="timestamp">Date</option>
                    </select>
                </label>
            )}

            {posts.map ( (p) => (<Post key={p.id}
                                       post={p}
                                       vote={vote}
                                       del={del}
                                       openEditPost={openEditPost}
                                />))}
        </div>
    )
}


PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    allowSort: PropTypes.bool.isRequired,
    sortPosts: PropTypes.func,
}