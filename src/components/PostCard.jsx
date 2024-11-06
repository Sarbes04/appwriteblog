import React from 'react'
import appwriteService from "../appwrite/config"
import { Link  } from 'react-router-dom'

//idhar id ke aage dollar lagana padta hai, ye appwrite ka issue hai

//appwriteService.getFilePreview() mein image ki id dedo wo tumhe image ka preview dedega
export default function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />

            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}
