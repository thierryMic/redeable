import React from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post'
/**
* @description Represents a category list
*/
export const PostList = (props) => {

    const { posts, vote, del, openEditPost } = props

    return (
        <div className='post-list'>

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
}