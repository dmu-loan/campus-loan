import { Link } from "react-router-dom";
export function Brand() {
  return (
    <Link className="brand" to="/">
      <img src="/img/logo.png" alt="" />
      <span>
        빌려드립니다<small>한울타리 총학생회</small>
      </span>
    </Link>
  );
}
