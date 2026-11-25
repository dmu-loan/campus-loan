export function Record({ title, info, children }) {
  return (
    <article className="record">
      <div>
        <h3>{title}</h3>
        <small>{info}</small>
      </div>
      {children}
    </article>
  );
}
