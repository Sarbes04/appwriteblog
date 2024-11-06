import React, { useEffect, useState } from 'react'
import { PostForm, Container } from '../components'
import appwriteService from '../appwrite/config'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    //url mein available hoga slug udhar se lelenge useparams ki madad se 
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post){
                    setPosts(post)
                }
            })
        } else{
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null
}

export default EditPost