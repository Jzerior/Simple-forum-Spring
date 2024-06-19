import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post3 } from "../Post/Post3";
import { CommentSection } from "../CommentSection/CommentSection";

type comment = {
  _id: string;
  content: string;
  likes:[string];
  author:string;
}
interface PostData {
  _id: string;
  name: string;
  content: string;
  author: string;
  likes: [string];
  comments:[comment];
  commentsCount: string;
}

export const PostDetails = () => {
  const [data, setData] = useState<PostData>();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/post/post/${id}`);
      const responseData = await response.json();
      if (response.ok) {
        setData(responseData.data);
        setLoading(false);
      } else {
        console.log(`Error: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  const removePost = (postId: string) => {
    console.log(postId)
    window.location.href = '/';
  };


  return(
      <>
          <Post3 {...data} onDelete={removePost} />
          <CommentSection comments={data.comments} commentsCount={data.commentsCount} postID={data._id} refresh={fetchPost}/>
      </>
    )
};
