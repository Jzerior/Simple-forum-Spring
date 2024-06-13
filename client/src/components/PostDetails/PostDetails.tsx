import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post3 } from "../Post/Post3";

interface PostData {
  _id: string;
  name: string;
  content: string;
  author: string;
  likes: [string];
  commentsCount: string;
}

export const PostDetails = () => {
  const [data, setData] = useState<PostData | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/post/post/${id}`);
      const responseData = await response.json();
      if (response.ok) {
        setData(responseData.data);
      } else {
        console.log(`Error: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const removePost = (postId: string) => {
    console.log(postId)
    window.location.href = '/';
  };

  // Renderuj Post3 tylko wtedy, gdy dane są załadowane
  return data ? <Post3 {...data} onDelete={removePost} /> : <div>Loading...</div>;
};
