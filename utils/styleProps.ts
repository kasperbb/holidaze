export function maxLines(n: number) {
  return {
    display: '-webkit-box',
    lineClamp: n,
    WebkitLineClamp: n,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }
}
