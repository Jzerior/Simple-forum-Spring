import PostList from "../PostList/PostList";

export const HomePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
        <header className="bg-blue-600 w-full p-4 text-white text-center text-2xl">
          Forum
        </header>
        <main className="w-full max-w-4xl mt-8 px-4">
          <PostList />
        </main>
      </div>
  )
};