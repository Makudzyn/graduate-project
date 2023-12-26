export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

//Replace with array created from fetching
export function generateOptions() {
  return Array.from({ length: 15 }, (_, index) => index + 1);
}

export function getSelectedParam(
  paramName: string,
  searchParams: URLSearchParams,
): string {
  return searchParams.get(paramName) || "0";
}

export function createPlaceholder(polynomial: string): string {
  return "0".repeat(polynomial.length - 2) + "1";
}
