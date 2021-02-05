/*
  模仿antd comment
 */
import React from 'react'

const CommentBox = ({ content, actions, author, avatar, children }) => {
  return <div className="ant-comment">
    <div className="ant-comment-inner">
      <div className="ant-comment-avatar">
        {avatar}
      </div>
      <div className="ant-comment-content">
        <div className="ant-comment-content-author"><span
          className="ant-comment-content-author-name">{author}</span></div>
        <div className="ant-comment-content-detail">{content}</div>
        {actions && <ul className="ant-comment-actions">
          {actions.map((action, i) => (<li key={i}>{action}</li>))}
        </ul>
        }
      </div>
    </div>
    {children && <div className="ant-comment-nested">
      {children}
    </div>}
  </div>
}
export default CommentBox
