export default (initialClass: string) => (subclass?: string) => subclass ? `${initialClass}-${subclass}` : initialClass
