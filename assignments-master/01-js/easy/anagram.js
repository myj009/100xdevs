/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if (str1.length != str2.length) {
    return false;
  }
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  let mp = new Map();
  for (let i = 0; i < str1.length; i++) {
    if (mp.has(str1[i])) {
      let val = mp.get(str1[i]);
      mp.set(str1[i], val + 1);
    } else {
      mp.set(str1[i], 1);
    }
  }

  for (let i = 0; i < str2.length; i++) {
    if (!mp.has(str2[i])) {
      return false;
    }
    let val = mp.get(str2[i]) - 1;
    if (val == 0) {
      mp.delete(str2[i]);
    } else {
      mp.set(str2[i], val);
    }
  }

  return mp.size == 0;
}

module.exports = isAnagram;
