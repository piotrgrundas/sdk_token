import Link from "next/link";

export default () => (
  <div>
    <h1>Page c</h1>
    <ul>
      <li>
        <Link passHref href="/a">
          <a>A page</a>
        </Link>
      </li>
      <li>
        <Link passHref href="/b">
          <a>B page</a>
        </Link>
      </li>
    </ul>
  </div>
);
