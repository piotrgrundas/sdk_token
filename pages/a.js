import { useAuthState, useAuth } from "@saleor/sdk";
import Link from "next/link";
import { useEffect } from "react";

export default () => {
  const state = useAuthState();

  return (
    <div>
      <h1>Page a</h1>
      <ul>
        <li>
          <Link passHref href="/b">
            <a>B page</a>
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
};
