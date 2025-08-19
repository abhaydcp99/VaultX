export function Card({ children, ...props }) {
  return (
    <div className="card" {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, ...props }) {
  return (
    <div className="card-header" {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, ...props }) {
  return <h3 className="card-title">{children}</h3>;
}

export function CardDescription({ children, ...props }) {
  return <p className="card-text">{children}</p>;
}

export function CardContent({ children, ...props }) {
  return <div className="card-body">{children}</div>;
}
