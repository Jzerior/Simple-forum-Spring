
import { AddPost } from "../AddPost/AddPost";
import PostList from "../PostList/PostList";

export const HomePage = () => {
    return (
        <div className="flex flex-col items-center">
        <main className="w-full max-w-4xl mt-8 px-4">
          <div className="w-full flex justify-center">
          <button className="">Add</button>
          </div>
          <AddPost/>
          <PostList />
        </main>
      </div>
  )
};