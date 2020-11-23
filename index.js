/*
Imagine we have an image. We'll represent this image as a simple 2D array where every pixel is a 1 or a 0. The image you get is known to have a single rectangle of 0s on a background of 1s.

Write a function that takes in the image and returns one of the following representations of the rectangle of 0's: top-left coordinate and bottom-right coordinate OR top-left coordinate, width, and height.

image1 = [
  [1, 1, 1, 1, 1, 1, 1], // 0
  [1, 1, 1, 1, 1, 1, 1], // 1
  [1, 1, 1, 0, 0, 0, 1], // 2
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
]

return ((2, 3), (3, 5))

Sample output variations (only one is necessary):

findRectangle(image1) =>
  x: 3, y: 2, width: 3, height: 2
  2,3 3,5 -- row,column of the top-left and bottom-right corners

Other test cases:

image2 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0],
]

return ((4, 6), (4, 6))

findRectangle(image2) =>
  x: 6, y: 4, width: 1, height: 1
  4,6 4,6

image3 = [
  [1, 1, 1, 1, 1, 1, 1], 0
  [1, 1, 1, 1, 1, 1, 1], 1
  [1, 1, 1, 1, 1, 1, 1], 2
  [1, 1, 1, 1, 1, 0, 0], 3
  [1, 1, 1, 1, 1, 0, 0], 4
]

findRectangle(image3) =>
  x: 5, y: 3, width: 2, height: 2
  3,5 4,6
  
  // (5, 3), (6, 4)
  
image4 = [
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
]

findRectangle(image4) =>
  x: 0, y: 0, width: 1, height: 1
  0,0 0,0

image5 = [
  [0],
]

findRectangle(image5) =>
  x: 0, y: 0, width: 1, height: 1
  0,0 0,0

n: number of rows in the input image
m: number of columns in the input image
*/

/*

const image2 = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0],
];

const image3 = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0],
];

const image4 = [
    [0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
];

const image5 = [
    [0],
];

image1 = [
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 1],
  [1, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 0],
]

expected result:

[
    [[0,0],[0,0]],
    [[2,0],[2,0]],
    [[2,3],[3,5]],
    [[3,1],[5,1]],
    [[5,3],[6,4]],
    [[7,6],[7,6]],
  ]

*/

// create image1 array with headers on rows and columns
const image1 = [
    // 0  1  2  3  4  5  6
    [1, 1, 1, 1, 1, 1, 1], // 0
    [1, 1, 1, 1, 1, 1, 1], // 1
    [1, 1, 1, 0, 0, 0, 1], // 2
    [1, 1, 1, 0, 0, 0, 1], // 3
    [1, 1, 1, 1, 1, 1, 1], // 4
];

// USSR
// Understand - 
// reword - given a 2D array of 1s and 0s, return the coordinate of the rectangle of 0s
// inputs - 2D array of arrays of integers
// outputs - 2D array of integers of coordinates
// examples - for example 3 above, // (5, 3), (6, 4)
    // for image1, [ [ 2, 3 ], [ 3, 5 ] ]
// Sudo Chop Stop - 
// Solve - 
// create 'findRec' function with 'image1' input
function findRec(image1) {
    // create variable for the rows with the length of the samples
    let rows = image1.length
    // same for columns
    let columns = image1[0].length
    // create result array
    let result = []
    // loop through with standard loop rows to find 0s
    for (let row = 0; row < rows; row++) {
        // loop through with standard loop columns to find 0s
        for (let column = 0; column < columns; column++) {
            // find all 0 coordinate of rectangle
            if (image1[row][column] == 0)
                // push all 0 coordinates into results array
                result.push([row, column])
        }
    }
    // print rectangle's top-left coordinate and bottom-right coordinate
    console.log([result[0], result[result.length - 1]])
}

findRec(image1)

// Refactor - 
