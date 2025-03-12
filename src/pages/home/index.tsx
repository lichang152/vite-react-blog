import React, { useState } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import FloatButton from "../../components/floatButton";
import Menu from "../menu";
import "./index.css";
const Index = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <FloatButton
        icon={<UnorderedListOutlined />}
        text="打开菜单"
        diableMove={false}
        top={60}
        left={40}
        onBack={() => {
          setOpen(true);
        }}
      />
         <Drawer title="个人设置" onClose={onClose} open={open}>
        <Menu />
      </Drawer>
      <h1 className="head">刚好的工具集合</h1>
    </div>
  );
};
export default Index;
