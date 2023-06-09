import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import type { AppRouter } from "../../../serverless/src/trpc/router";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import react, { type ReactNode, Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

export const trpc = createTRPCReact<AppRouter>();

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/.netlify/functions/run",
    }),
  ],
});

const queryClient = new QueryClient();

type TRPCProviderProps = {
  children: ReactNode | undefined;
};

export function TRPCProvider({ children }: TRPCProviderProps) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <QueryErrorBoundary>
          <Suspense fallback="Loading...">{children}</Suspense>
        </QueryErrorBoundary>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

type QueryErrorBoundaryProps = {
  children: ReactNode | undefined;
};

export function QueryErrorBoundary({ children }: QueryErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={QueryErrorBoundaryFallback}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function QueryErrorBoundaryFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      There was an error!
      <button type="button" onClick={() => resetErrorBoundary()}>
        Try again
      </button>
    </div>
  );
}
