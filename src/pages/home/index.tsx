import { FloatButton } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

import "./index.css";
const Index = () => {
  return (
    <div>
      <FloatButton
        icon={<UnorderedListOutlined />}
        tooltip={<div>打开菜单</div>}
      />
      <h1 className="head">刚好的工具集合</h1>
    </div>
  );
};
export default Index;
