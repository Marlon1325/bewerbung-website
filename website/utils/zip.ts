function zip(...arrays: any[]) {
  const length = Math.min(...arrays.map(arr => arr.length));
  return Array.from({ length }, (_, i) => arrays.map(arr => arr[i]));
}

export default zip;