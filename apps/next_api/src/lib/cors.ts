export function allowAllOriginsCorsHeaders() {
  // Works for public, non-credentialed, "simple" browser requests.
  // If you add credentials or custom headers (e.g. Authorization),
  // you’ll need an OPTIONS handler + explicit origin echoing.
  return {
    "Access-Control-Allow-Origin": "*",
  } as const;
}

