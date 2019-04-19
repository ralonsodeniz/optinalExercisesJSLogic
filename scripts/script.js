function randomNumber(startNumber, endNumber) {
  const randomized = Math.floor(
    Math.random() * (endNumber - startNumber + 1) + startNumber
  );
  return randomized;
}

const arrayOfRandomNumbers = (length, maxValue, minValue) => {
  let tempArray = [];
  for (let index = 0; index < length; index++) {
    tempArray.push(randomNumber(minValue, maxValue));
  }
  return tempArray;
};

// QUESTION 1
const inputArray = [1, 2, 4, 591, 392, 391, 2, 5, 10, 2, 1, 1, 1, 20, 20];

// sort array from lowest to highest value
const sortInpuArray = array => {
  const sortedArray = array.reduce((accumulator, element) => {
    if (accumulator.length !== 0) {
      for (let index = 0; index < accumulator.length; index++) {
        const item = accumulator[index];
        const nextItem = accumulator[index + 1];
        if (element >= item) {
          if (element < nextItem && accumulator.length > index) {
            accumulator.splice(index + 1, 0, element);
            break;
          } else if (accumulator.length - 1 === index) {
            accumulator.push(element);
            break;
          }
        }
      }
    } else {
      accumulator.push(element);
    }
    return accumulator;
  }, []);

  // organize the array creating subarrays that contains repeated elements
  const organizeArray = array => {
    let baseArray = array.map(element => element);
    const finalArray = array.reduce((finalArrayTemp, item) => {
      let itemArray = [];
      for (let index = 0; index < baseArray.length; index++) {
        if (item === baseArray[index]) {
          itemArray.push(item);
          baseArray.splice(index, 1);
          index--;
        }
      }
      if (itemArray.length !== 0) {
        finalArrayTemp.push(itemArray);
      }
      return finalArrayTemp;
    }, []);
    return finalArray;
  };
  const organizedArray = organizeArray(sortedArray);

  return organizedArray;
};
const inputArraySorted = sortInpuArray(inputArray);
console.log(inputArray);
console.log(inputArraySorted);

// Bonus
const sourceArry = [
  "1",
  2,
  "4",
  "591",
  392,
  "391",
  2,
  5,
  "10",
  2,
  "1",
  "1",
  1,
  20,
  20
];

const stringAndNumbersSortedArray = array => {
  let numberArray = [];
  let stringArray = [];
  const finalArray = array.reduce((tempArray, element, elementIndex) => {
    switch (
      typeof element // we check if the element is a number or a string
    ) {
      case "string":
        stringArray.push(element);
        break;
      case "number":
        numberArray.push(element);
        break;
    }
    if (elementIndex + 1 == array.length) {
      numberArray.sort(function(a, b) {
        return a - b;
      });
      stringArray.sort();
      tempArray.push(numberArray, stringArray);
    }
    return tempArray;
  }, []);
  return finalArray;
};
const sourceArrySorted = stringAndNumbersSortedArray(sourceArry);
console.log(sourceArry);
console.log(sourceArrySorted);

// QUESTION 2
const randomNumberArray = arrayOfRandomNumbers(16, 10, 1);

const arrayOfSum = (array, target) => {
  const resultArray = array.reduce(
    (tempArray, element, elementIndex, sourceArray) => {
      sourceArray.forEach((sourceArrayItem, sourceArrayItemIndex) => {
        if (elementIndex !== sourceArrayItemIndex) {
          if (element + sourceArrayItem === target) {
            const sumArray = [
              ...sourceArray.slice(elementIndex, elementIndex + 1),
              ...sourceArray.slice(
                sourceArrayItemIndex,
                sourceArrayItemIndex + 1
              )
            ];
            sumArray.sort(function(a, b) {
              return a - b;
            });
            tempArray.unshift(sumArray);
            tempArray.forEach(
              (tempArrayItem, tempArrayIndex, tempArraySource) => {
                if (tempArrayIndex !== 0) {
                  if (
                    tempArrayItem[0] === tempArraySource[0][0] &&
                    tempArrayItem[1] === tempArraySource[0][1]
                  ) {
                    tempArray.splice(tempArrayIndex, 1);
                  }
                }
              }
            );
          }
        }
      });
      return tempArray;
    },
    []
  );
  return resultArray;
};

const arraySum = arrayOfSum(randomNumberArray, 13);
console.log(randomNumberArray, "13");
console.log(arraySum);

// QUESTION 3

function decToHex(number) {
  let hex = Number(number).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}

function fullColorHex(r, g, b) {
  const red = decToHex(r);
  const green = decToHex(g);
  const blue = decToHex(b);
  return "#" + red + green + blue;
}

function hexToDec(number) {
  let dec = parseInt(number, 16);
  return dec;
}

function fullColorDec(r, g, b) {
  const red = hexToDec(r);
  const green = hexToDec(g);
  const blue = hexToDec(b);
  return "rgb(" + red + "," + green + "," + blue + ")";
}

function hexToRGBToHex(value) {
  if (value.includes("rgb")) {
    value = value.replace("rgb(", "");
    value = value.replace(")", "");
    // here we could have used
    const rgbArray = value.split(",");
    // const r = value.slice(0, value.indexOf(",")); // with value.indexOf(",") we get the position inside the string of the next , so we can know until which position we do have to slice
    // value = value.replace(r + ",", "");
    // const g = value.slice(0, value.indexOf(","));
    // value = value.replace(g + ",", "");
    // const b = value.slice(0, value.length);
    // if we had used the split variant here would be
    const fullHex = fullColorHex(...rgbArray); // spread operator allows us to asing to the r,g,b parameters of the fullColorHex function directly the values of the rgbArray directly
    //const fullHex = fullColorHex(r, g, b);
    return fullHex;
  } else if (value.includes("#")) {
    value = value.replace("#", "");
    const r = value.slice(0, 2);
    value = value.replace(r, "");
    const g = value.slice(0, 2);
    value = value.replace(g, "");
    const b = value.slice(0, 2);
    const fullDec = fullColorDec(r, g, b);
    return fullDec;
  }
}

const newHex = hexToRGBToHex("rgb(84,87,81)");
console.log("rgb(84,87,81)", newHex);
const newDec = hexToRGBToHex("#545751");
console.log("#545751", newDec);
