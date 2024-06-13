import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Post2 } from '../Post/Post2';

interface PostData {
  id: number;
  name: string;
  content: string;
  author: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (page: number) => {
    try {
      const response = await fetch(`http://localhost:5000/post/postPage/${page}`);
      const data = await response.json();
      console.log(data.data.length)
      if (data.data.length === 0) {
        setHasMore(false);
        console.log("xd")
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data.data]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
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
          <Post2 key={post.id} {...post} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PostList;
