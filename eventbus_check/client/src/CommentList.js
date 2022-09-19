import React,{useState,useEffect} from "react";
import axios from 'axios';
export default ({postId})=>{

    const [comments,setComments]=useState([]);

    const fetchData =async ()=>{
        const res= await axios.get(`http://post.com/posts/${postId}/comments`)
        console.log(res.data);
        setComments(res.data)
    }

    useEffect(()=>{
        fetchData();
    },[]); // eslint-disable-line react-hooks/exhaustive-deps
    const rederredComments=Object.values(comments).map(comment=>{
        return <li key={comment.id}>{comment.content}</li>
    })
    return <ul>{rederredComments}</ul>
}