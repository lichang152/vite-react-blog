import React, { useState } from "react";
import "./index.css";
interface Props {
  onBack?: () => void;
}

const Index: React.FC<Props> = ({ onBack }) => {
  return <div>菜单</div>;
};
export default Index;
