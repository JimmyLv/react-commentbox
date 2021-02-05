import React from "react";

const Avatar = ({
  imageUrl = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  maxWidth = 200,
}) => (
  <div className="ant-comment-avatar">
    <img src={imageUrl} alt="comment-avatar" style={{ maxWidth }} />
  </div>
);

export default Avatar;
