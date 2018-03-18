import React from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post'


/**
* @description renders a PostList component
*/
export const PostList = (props) => {

    const { posts, vote, del, openEditPost } = props

    //iterate through an array of posts and displays a Post compoenent for each
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