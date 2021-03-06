// resources: https://www.compart.com/en/unicode/category/So?sort=-unicode&page=4
import React from 'react'
import { Link }  from 'react-router-dom'
import { Route } from 'react-router-dom'


/**
* @description detemines if the item is a post or a comment and make the relevant api call
*/
const handleVote = (option, props) => {
    const {vote, post} = props
    const url = post.parentId ? 'comments' : 'posts'
    option = JSON.stringify({option:option})
    vote(`${url}/${post.id}`, {method:'POST', body:option})
}


/**
* @description detemines if the item is a post or a comment and make the relevant api call
*/
const handleDelete = (props, history) => {
    const {del, post} = props
    const url = post.parentId ? 'comments' : 'posts'
    del(`${url}/${post.id}`, {method:'DELETE'})
    !post.parentId && history.push('/All')
}


/**
* @description renders a Post component
*/
export const Post = (props) => {
    const { post, openEditPost } = props
    return (
        <Route render={({ history }) => { return (
            <div className={'post ' + (post.parentId ? 'comment': '')}>
                <Link className='post-title'
                      to= {`/${post.category}/${post.id}`}>{post.title}
                </Link>

            	<p className='post-body'>{post.body}</p>

                <div className='post-footer'>
                    <div className='post-details'>
                    	<p className='post-detail'><label>Author   : {post.author}</label></p>

                        {/*only display comments if the item is a post (not a comment)*/}
                        {!post.parentId &&
                    	   <p className='post-detail'>
                                <label>Comments : {post.commentCount}</label>
                            </p>
                        }

                    	<p className='post-detail'><label>Votes : {post.voteScore}</label></p>
                    </div>


                    {/*command buttons for voting, editing and deleting*/}
                    <div className='post-actions'>
                    	<button className="post-action"
                                onClick={(o, p) => handleVote('upVote', props)}
                        >
                            <span role='img' aria-label="thumbs up">&#128077;</span>
                        </button>

                        <button className="post-action"
                                onClick={(o, p) => handleVote('downVote', props)}
                        >
                            <span role='img' aria-label="thumbs down">&#128078;</span>
                        </button>

            			<button className="post-action"
                                onClick={() => {openEditPost(true, post)}}
                        >
                            <span role='img' aria-label="edit">&#128396;</span>
                        </button>

                    	<button className="post-action"
                                onClick={(p) => handleDelete(props, history)}
                        >
                            <span role='img' aria-label="delete">&#128465;</span>
                        </button>
                    </div>
                </div>
            </div>
        )}}/>
    )
}
