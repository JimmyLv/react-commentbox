import React from "react";
import CommentList from "./components/CommentList";
import "./styles.css";

export default function App() {
  return (
    <div>
      <div className="article">
        <h2>中信证券获2020年新发公募托管产品数量、首募托管规模同业第一</h2>
        <h3>
          <span>日期：2021-01-22 19:30:00</span>
        </h3>
        <div className="content">
          <p>
            股权衍生品业务线是公司面向客户提供权益类产品交易的资本中介业务部门，为机构客户提供包括场外期权、境内收益互换、跨境收益互换等在内的场外衍生品交易服务，满足客户的全球资产配置，风险管理需求；为机构客户和零售客户提供挂钩权益类产品的收益凭证等结构化柜台产品，满足客户的财富管理，大类资产配置需求；为交易所交易的基金产品、场内期权产品提供流动性做市服务；为企业特定需求提供全流程的解决方案。
          </p>
        </div>
      </div>
      <div className="reply">
        <CommentList />
      </div>
    </div>
  );
}
