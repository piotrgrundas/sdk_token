import Link from "next/link";

export default () => (
  <div>
    <h1>Page b</h1>
    <ul>
      <li>
        <Link passHref href="/a">
          <a>A page</a>
        </Link>
      </li>
      <li>
        <Link passHref href="/c">
          <a>C page</a>
        </Link>
      </li>
    </ul>
  </div>
);
