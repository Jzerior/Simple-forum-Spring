import { Comment } from "./Comment";
import { AddComment } from "./AddComment";
import { useState } from "react";

type comment = {
  _id: string;
  content: string;
  likes: [string];
  author: string;
};

interface Props {
  postID: string;
  commentsCount: string;
  comments: [comment];
  refresh: () => void;
}

export const CommentSection = ({ comments, commentsCount, postID,refresh }: Props) => {

    return (
    <section className="bg-white dark:bg-gray-900 py-4 antialiased mt-4">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({commentsCount})
          </h2>
        </div>
        <AddComment postID={postID} refresh={refresh}/>
        {comments?.map((comment) => (
          <Comment key={comment._id} comment={comment} onDelete={refresh} postID={postID}/>
        ))}
      </div>
    </section>
  );
};
