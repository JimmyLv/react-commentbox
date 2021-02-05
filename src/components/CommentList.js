import React, { useMemo, useState } from "react";
import { useComment } from "../hooks/useComment";
import Avatar from "./Avatar";
import CommentBox from "./CommentBox";
import Dislikes from "./Dislikes";
import Likes from "./Likes";

const CommentList = ({ comment = {} }) => {
  const { submitComment, removeComment, likesAction, comments } = useComment();
  const { id = "", likes, dislikes, text, author } = comment;
  const [editingText, setEditingText] = useState(id ? null : "");
  const replyHeaderText = id ? `回复${author}` : "文章留言";
  const onCommentSubmit = (e) => {
    e.preventDefault();
    //提交回复
    submitComment(id, editingText);
    setEditingText(id ? null : "");
  };
  const subComments = useMemo(() => {
    return comments.filter((top) => top.replyTo === id);
  }, [comment, comments]);
  const childrenElement = useMemo(
    () => (
      <>
        {subComments.map((sub) => (
          <CommentList key={sub.id} comment={sub} />
        ))}
        {editingText !== null && (
          <div className="comment-edit-box">
            <form
              onSubmit={(e) => onCommentSubmit(e)}
              style={{ width: "100%" }}
            >
              <label htmlFor={`replyArea-${id}`}>{replyHeaderText}</label>
              <br />
              <textarea
                id={`replyArea-${id}`}
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <br />
              <input type="submit" />
            </form>
          </div>
        )}
      </>
    ),

    [editingText, subComments]
  );
  if (comment == null) {
    return childrenElement;
  } else {
    return (
      <CommentBox
        content={text}
        author={author}
        avatar={<Avatar />}
        actions={[
          <span onClick={() => likesAction(id, "like")}>
            <Likes count={likes} />
          </span>,
          <span onClick={() => likesAction(id, "dislike")}>
            <Dislikes count={dislikes} />
          </span>,
          <span onClick={() => editingText == null && setEditingText("")}>
            回复
          </span>,
          <span onClick={() => removeComment(id)}>删除</span>,
        ]}
      >
        {childrenElement}
      </CommentBox>
    );
  }
};

export default CommentList;
