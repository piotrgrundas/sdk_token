import Link from "next/link";
import { useAuthState, useAuth } from "@saleor/sdk";

export default () => {
  const { login } = useAuth();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    const { data } = await login({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    alert(data.tokenCreate.errors.length ? "FAILED" : "LOGGED IN");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <button type="submit">LOGIN</button>
      </form>
      <h1>INDEX</h1>
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
        <li>
          <Link passHref href="/c">
            <a>C page</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
