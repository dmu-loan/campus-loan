export default function Brand({ admin = false }) {
  return (
    <a className="brand" href={admin ? '/admin' : '/'} aria-label={admin ? '빌려드립니다 관리자 홈' : '빌려드립니다 학생 홈'}>
      <span className="brand-mark" aria-hidden="true">빌</span>
      <span>
        <strong>빌려드립니다</strong>
        <small>{admin ? '총학생회 관리 페이지' : '한울타리 총학생회'}</small>
      </span>
    </a>
  );
}
