import type { ErrorComponentProps } from "@tanstack/react-router";

import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/react-router";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: state => state.id === rootRouteId,
  });

  // eslint-disable-next-line react/purity
  console.error("DefaultCatchBoundary Error:", error);

  return (
    <div>
      <ErrorComponent error={error} />
      <div>
        <button
          onClick={() => {
            router.invalidate();
          }}
        >
          Try Again
        </button>
        {isRoot
          ? (
              <Link
                to="/"
              >
                Home
              </Link>
            )
          : (
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  router.history.back();
                }}
              >
                Go Back
              </Link>
            )}
      </div>
    </div>
  );
}
