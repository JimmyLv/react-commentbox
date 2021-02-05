import React from "react";
import { useLocalStorageValue } from "./useLocalStorageValue";

const CommentContext = React.createContext();

const remove_comment_tree = (id, comments) => {
  let set = new Set([id]);
  for (;;) {
    const son = comments
      .filter((x) => set.has(x.replyTo) && !set.has(x.id))
      .map((x) => x.id);
    console.log("set->", set, "son->", son);
    if (son.length <= 0) {
      break;
    } else {
      son.forEach((v) => set.add(v));
    }
  }
  return comments.filter((x) => !set.has(x.id));
};

export function CommentProvider({ children }) {
  console.log("children", children);
  //平铺方式
  const [comments, setComments] = useLocalStorageValue("comments", []);

  const submitComment = (replyTo, text) => {
    if (!text) {
      alert('please input text!')
      return;
    }
    const comment = {
      id: +new Date(),
      text: text,
      replyTo: replyTo,
      author: "Mr.Right",
      likes: 0,
      dislikes: 0,
    };
    setComments([...comments, comment]);
  };
  const removeComment = (id) => {
    setComments(remove_comment_tree(id, comments));
  };
  const likesAction = (id, oper) => {
    const like_plus = oper === "like" ? 1 : 0;
    const dislike_plus = oper === "dislike" ? 1 : 0;
    setComments(
      comments.map((x) =>
        x.id === id
          ? {
              ...x,
              likes: x.likes + like_plus,
              dislikes: x.dislikes + dislike_plus,
            }
          : x
      )
    );
  };
  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        submitComment,
        removeComment,
        likesAction,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export function useComment() {
  return React.useContext(CommentContext);
}
