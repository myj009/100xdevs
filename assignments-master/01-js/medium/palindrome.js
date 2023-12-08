/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  if (str.length <= 1) {
    return true;
  }
  str = str.toLowerCase();
  let i = 0,
    j = str.length - 1;
  while (i < j) {
    while (i < j && !/[a-z]/.test(str[i])) {
      i++;
    }
    while (i < j && !/[a-z]/.test(str[j])) {
      j--;
    }
    if (str[i] != str[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
}

module.exports = isPalindrome;
