import React from "react";

const Avatar = ({
  imageUrl = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
}) => (
  <div className="ant-comment-avatar">
    <img src={imageUrl} alt="comment-avatar" />
  </div>
);

export default Avatar
