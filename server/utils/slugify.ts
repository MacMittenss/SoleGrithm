export function slugify(input: string) {
  return input
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default slugify;
