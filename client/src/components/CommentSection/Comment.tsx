import { useAuthContext } from "../Auth/AuthContext";

type comment = {
    _id: string;
    content: string;
    likes:[string];
    author:string;
  }

  type Props = {
    postID: string;
    comment:comment;
    onDelete: (commentId: string) => void;
  }

export const Comment = ({postID,comment,onDelete}:Props) => {
    const handleDelete = async () => {
        try {
          const response = await fetch(`http://localhost:5000/post/deleteComment/${postID}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                commentId:comment._id
              }),
          });
          const dataa = await response.json();
          if (response.ok) {
            console.log(`Success: ${dataa.message}`);
            onDelete(comment._id);
          } else {
            console.log(`Error: ${dataa.message}`);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      const {username} = useAuthContext();
    return (
        <article className="p-6 text-base m-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                    alt="Michael Gough"></img>{comment.author}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Feb. 8, 2022</p>
                        </div>
                        {username==comment.author ? (
                          <>
                            <button type="button" className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={handleDelete}>
                              <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                              Delete
                            </button>
                          </>
                          ) : (<></>)}
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>
                </article>
    )
}