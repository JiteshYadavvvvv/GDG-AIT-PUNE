export function isExternal(href?: string) {
  return Boolean(href?.startsWith("http"));
}

export function externalLinkProps(href?: string) {
  return isExternal(href) ? { target: "_blank", rel: "noreferrer" } : {};
}
