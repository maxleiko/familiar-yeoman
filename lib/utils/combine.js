function fn(n, src, got, all) {
  if (n === 0) {
    if (got.length > 0) {
      all[all.length] = got;
    }
    return;
  }
  for (let j = 0; j < src.length; j++) {
    fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
  }
  return;
}

/**
 * combine(['a', 'b', 'c'])
 * => [ [ 'a' ],
 *      [ 'b' ],
 *      [ 'c' ],
 *      [ 'a', 'b' ],
 *      [ 'a', 'c' ],
 *      [ 'b', 'c' ],
 *      [ 'a', 'b', 'c' ] ]
 *
 * @param  {[type]} a       [description]
 * @param  {Number} [min=1] [description]
 * @return {[type]}         [description]
 */
function combine(a, min = 1) {
  const all = [];
  for (let i = min; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
};

module.exports = combine;
