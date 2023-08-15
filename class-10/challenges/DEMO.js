// 2D arrays

// Can represent many things.

// For example, a bitmap image is a 2D array:

let bitmapNull = 
[
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
];

let bitmap0 = 
[
  [ 0, 0, 1, 0, 0 ],
  [ 0, 1, 0, 1, 0 ],
  [ 0, 1, 0, 1, 0 ],
  [ 0, 1, 0, 1, 0 ],
  [ 0, 0, 1, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
];

let bitmap6 = 
[
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
];

let bitmap7 = 
[
  [ 0, 0, 0, 0, 0 ],
  [ 0, 1, 1, 1, 0 ],
  [ 0, 0, 0, 1, 0 ],
  [ 0, 0, 1, 0, 0 ],
  [ 0, 0, 1, 0, 0 ],
  [ 0, 0, 1, 0, 0 ],
];

let bitmap8 = 
[
  [ 0, 1, 1, 1, 0 ],
  [ 0, 1, 0, 1, 0 ],
  [ 0, 1, 1, 1, 0 ],
  [ 0, 1, 0, 1, 0 ],
  [ 0, 1, 0, 1, 0 ],
  [ 0, 1, 1, 1, 0 ],
];

let bitmap9 = 
[
  [ 0, 0, 1, 0, 0 ],
  [ 0, 1, 0, 1, 0 ],
  [ 0, 0, 1, 1, 0 ],
  [ 0, 0, 0, 1, 0 ],
  [ 0, 1, 0, 1, 0 ],
  [ 0, 0, 1, 0, 0 ],
];
// Now, lets figure out some things.
// For example, how many 1's are in each 

let countOnes = (array2D) => {
  let oneCounter = 0;
  for(let i=0; i<array2D.length; i++) {
    // i is from 0 to 5 ( total is 6 )
    for(let j=0; j<array2D[i].length; j++) {
      // j is from 0 to _ (total is )
      let n = array2D[i][j];
      if(n === 1) {
        oneCounter++;
      }
    }
  }
  return oneCounter;
}
console.log(countOnes(bitmap0))
console.log(countOnes(bitmap7))
console.log(countOnes(bitmap8))
console.log(countOnes(bitmap9))