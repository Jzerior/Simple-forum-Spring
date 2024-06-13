import PostList from "../PostList/PostList";

export const HomePage = () => {
  const toAdd = () =>{
    window.location.href = '/newpost';
  }
    return (
        <div className="flex flex-col items-center">
        <main className="w-full max-w-4xl mt-8 px-4">
          <div className="w-full flex justify-center">
          <button className="" onClick={toAdd}>Add</button>
          </div>
          <PostList />
        </main>
      </div>
  )
};