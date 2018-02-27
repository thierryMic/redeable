import React from 'react'

/**
* @description Represents a category list
*/
export const PostList = (props) => {

    const { posts } = props
    return (
        <div>
            {posts.map ( (p) => (
                <li key={p.id}> {p.title} </li>
            ))}

        </div>
    )
}
