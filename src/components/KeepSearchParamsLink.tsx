import { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";

interface KeepSearchParamsLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: ReactNode;
}

export function KeepSearchParamsLink({
  to,
  children,
  ...props
}: KeepSearchParamsLinkProps) {
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();
  const newPath = search ? `${to}?${search}` : to;

  return (
    <Link to={newPath} {...props}>
      {children}
    </Link>
  );
}
