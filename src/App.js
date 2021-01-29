import React, {useMemo, useState} from "react";
import "./styles.css";

/*
  模仿antd comment
 */
const CommentBox = ({content, actions, author, avatar, children}) => {
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
const Avatar = () => (
    <div className="ant-comment-avatar"><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                             alt="comment-avatar"/></div>)
const Likes = ({count}) => {
    return <span>
        <span role="img" aria-label="like" className="anticon anticon-like">
            <svg viewBox="64 64 896 896"
                 focusable="false" data-icon="like"
                 width="1em" height="1em"
                 fill="currentColor"
                 aria-hidden="true"><path
                d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"/></svg>
        </span>
        <span className="comment-action">{count}</span>
    </span>
}
const Dislikes = ({count}) => (
    <span>
        <span role="img" aria-label="dislike" className="anticon anticon-dislike">
            <svg viewBox="64 64 896 896"
                 focusable="false"
                 data-icon="dislike" width="1em"
                 height="1em"
                 fill="currentColor"
                 aria-hidden="true"><path
                d="M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 00-26.5-5.4H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h129.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM184 456V172h81v284h-81zm627.2 160.4H496.8l9.6 198.4c.6 11.9-4.7 23.1-14.6 30.5-6.1 4.5-13.6 6.8-21.1 6.7a44.28 44.28 0 01-42.2-32.3L329 459.2V172h415.4a56.85 56.85 0 0133.6 51.8c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0119.6 43c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0119.6 43c0 9.7-2.3 18.9-6.9 27.3l-14 25.5 21.9 19a56.76 56.76 0 0119.6 43c0 19.1-11 37.5-28.8 48.4z"/></svg></span><span
        className="comment-action">{count}</span></span>
);
/*
  评论列表
 */
const CommentList = ({comment, comments, submitComment, removeComment, likesAction}) => {
    const {id = "", likes, dislikes, text, author} = comment || {};
    const [editingText, setEditingText] = useState(id ? null : "");
    const replyHeaderText = id ? `回复${author}` : "文章留言";
    const onCommentSubmit = e => {
        e.preventDefault();
        //提交回复
        submitComment(id, editingText);
        setEditingText(id ? null : "");
    }
    const subComments = useMemo(() => {
        return comments.filter(top => top.replyTo === id)
    }, [comment, comments])
    const childrenElement = useMemo(() => (
            <>
                {subComments.map(sub => (
                    <CommentList key={sub.id} comment={sub} comments={comments}
                                 submitComment={submitComment} removeComment={removeComment} likesAction={likesAction}/>
                ))}
                {editingText !== null && (<div className="comment-edit-box">
                    <form onSubmit={e => onCommentSubmit(e)} style={{width: '100%'}}>
                        <label htmlFor={`replyArea-${id}`}>{replyHeaderText}</label>
                        <br/>
                        <textarea id={`replyArea-${id}`} value={editingText}
                                  onChange={e => setEditingText(e.target.value)}/>
                        <br/>
                        <input type="submit"/>
                    </form>
                </div>)}
            </>)

        , [editingText, subComments])
    if (comment == null) {
        return childrenElement;
    } else {
        return <CommentBox content={text}
                           author={author}
                           avatar={<Avatar/>}
                           actions={[
                               <span onClick={() => likesAction(id,'like')}><Likes count={likes}/></span>,
                               <span onClick={() => likesAction(id,'dislike')}><Dislikes count={dislikes}/></span>,
                               <span onClick={() => editingText == null && setEditingText("")}>回复</span>,
                               <span onClick={() => removeComment(id)}>删除</span>]}>
            {childrenElement}
        </CommentBox>
    }
}
const remove_comment_tree = (id, comments) => {
    let set = new Set([id]);
    for (; ;) {
        const son = comments.filter(x => set.has(x.replyTo) && !set.has(x.id)).map(x => x.id);
        console.log('set->', set, 'son->', son)
        if (son.length <= 0) {
            break;
        } else {
            son.forEach(v => set.add(v));
        }
    }
    return comments.filter(x => !set.has(x.id))

}

export function useLocalStorageValue(key, initValue = "") {
    const [value, setValue] = React.useState(
        JSON.parse(localStorage.getItem(key)) || initValue
    );

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    // props, state

    return [value, setValue];
}

export default function App() {
    //平铺方式
    const [comments, setComments] = useLocalStorageValue('comments',[]);

    const submitComment = (replyTo, text) => {
        const comment = {
            id: +new Date(),
            text: text,
            replyTo: replyTo,
            author: 'Mr.Right',
            likes: 0,
            dislikes: 0,
        }
        setComments([...comments, comment]);
    }
    const removeComment = id => {
        setComments(remove_comment_tree(id, comments))
    }
    const likesAction = (id, oper) => {
        const like_plus = oper === 'like' ? 1 : 0;
        const dislike_plus = oper === 'dislike' ? 1 : 0;
        setComments(comments
            .map(x => x.id === id
                ? {...x,
                    likes: x.likes + like_plus,
                    dislikes: x.dislikes + dislike_plus}
                : x
            )
        )
    }
    return <div>
        <div className="article">
            <h2>
                中信证券获2020年新发公募托管产品数量、首募托管规模同业第一
            </h2>
            <h3><span>日期：2021-01-22 19:30:00</span>
            </h3>
            <div className="content">
                <p>
                    股权衍生品业务线是公司面向客户提供权益类产品交易的资本中介业务部门，为机构客户提供包括场外期权、境内收益互换、跨境收益互换等在内的场外衍生品交易服务，满足客户的全球资产配置，风险管理需求；为机构客户和零售客户提供挂钩权益类产品的收益凭证等结构化柜台产品，满足客户的财富管理，大类资产配置需求；为交易所交易的基金产品、场内期权产品提供流动性做市服务；为企业特定需求提供全流程的解决方案。
                </p>
            </div>
        </div>
        <div className="reply">
            <CommentList comment={null}
                         comments={comments}
                         submitComment={submitComment}
                         removeComment={removeComment}
                         likesAction={likesAction}/>
        </div>
    </div>
}
