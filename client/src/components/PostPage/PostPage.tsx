export const PostPage = () => {
    return (
        <div id="readProductModal" className="flex justify-center items-center md:inset-0 h-modal md:h-full">
          <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <form onSubmit={handleSumbit}>
                <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                  <div className=" text-gray-900 md:text-xl dark:text-white">
                    <h2 className="font-semibold text-3xl">
                      <Input
                        label=""
                        inputClassName={`${edit ? '' : 'pointer-events-none'} bg-transparent resize-none  w-full overflow-hidden  `}
                        value={namee} // poprawione: użycie value zamiast defaultValue
                        onChange={handleChangeName} // poprawione: użycie handleChangeName dla Input
                      />
                    </h2>
                    <p className="font-light text-gray-500 sm:mb-5 dark:text-gray-400">{author}</p>
                  </div>
                </div>
                <dl>
                  <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Details</dt>
                  <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                    <Textarea
                      ref={textareaRef}
                      label=""
                      inputClassName={`${edit ? '' : 'pointer-events-none'} bg-transparent resize-none w-full overflow-hidden`}
                      value={contente} // poprawione: użycie value zamiast defaultValue
                      onChange={handleChangeContent} // poprawione: użycie handleChangeContent dla Textarea
                    />
                  </dd>
                </dl>
                <div className={`flex justify-between items-center pb-4`}>
                <button type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleLike}>
                     Likes:{likeCount} 
                    </button>
                    <button type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleLike}>
                     Comments:{likeCount} 
                    </button>
                </div>
                <div className={` ${username == author ? 'block' : 'hidden'} flex justify-between items-center`}>
                  <div className={`flex items-center space-x-3 sm:space-x-4`}>
                    <button type="button" className={`text-white inline-flex items-center ${edit ? 'bg-green-700' : 'bg-primary-700'}  hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`} onClick={handleEdit}>
                      <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 012-2h4a1 1 010 2H4v10h10v-4a1 1 0112 0v4a2 2 012 0H4a2 2 01-2-2V6z" clipRule="evenodd"></path></svg>
                      Edit
                    </button>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add</button>
                  </div>
                  <button type="button" className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={handleDelete}>
                                    <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                    Delete
                  </button>
                </div>
                {location.pathname !== "/" && <CommentSection />}
              </form>
            </div>
          </div>
        </div>
      );
}