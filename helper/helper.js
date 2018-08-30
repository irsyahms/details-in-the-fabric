module.exports = function (rating) {
  let result = '';

  for (var i = 0; i < rating; i++) {
    result += '*';
  }

  return result;
}
