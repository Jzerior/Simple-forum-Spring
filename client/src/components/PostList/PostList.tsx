import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Post3 } from '../Post/Post3';

interface PostData {
  _id: string;
  name: string;
  content: string;
  author: string;
  likes: [string];
  commentsCount: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (page: number) => {
    try {
      console.log("xd")
      const response = await fetch(`http://localhost:8080/api/posts`);
      const data = await response.json();
      console.log(data.length)
      // if (data.length === 0) {
      //   setHasMore(false);
      // } else {
         console.log(data)
      //   setPosts((prevPosts) => [...prevPosts, ...data]);
      // }
      setPosts(data)
      console.log(posts)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const removePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: 'center' }}>You have seen it all</p>}
      >
        {posts.map((post) => (
          <Post3 key={post._id} {...post} onDelete={removePost} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PostList;
