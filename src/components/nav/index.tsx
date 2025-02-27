import "./index.css";
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <ul className="app_url">
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/about">关于</Link>
          </li>
          <li>
            <Link to="/services">服务</Link>
          </li>
          <li>
            <Link to="/portfolio">作品集</Link>
          </li>
          <li>
            <Link to="/contact">联系</Link>
          </li>
          <li>
            <Link to="/blog">博客</Link>
          </li>
          <li>
            <Link to="/team">团队</Link>
          </li>
          <li>
            <Link to="/careers">招聘</Link>
          </li>
          <li>
            <Link to="/testimonials">评价</Link>
          </li>
          <li>
            <Link to="/faq">常见问题</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default App;
