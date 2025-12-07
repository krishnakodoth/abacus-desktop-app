function getMin(digits) {
  if (digits === 1) return 0;
  if (digits === 2) return 10;
  if (digits === 3) return 100;
  return 0;
}

function getMax(digits) {
  if (digits === 1) return 9;
  if (digits === 2) return 99;
  if (digits === 3) return 999;
  return 9;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomOperation() {
  return Math.random() < 0.5 ? '+' : '-';
}

function getRandomDigits() {
  return Math.floor(Math.random() * 3) + 1; // Returns 1, 2, or 3
}

export function generateQuestion({ digits, count, mixed = false, allowNegative = false }) {
  let min, max;
  
  if (mixed) {
    // For mixed mode, we'll generate each number with random digits
    min = null;
    max = null;
  } else {
    min = getMin(digits);
    max = getMax(digits);
  }
  
  const numbers = [];
  const operations = [];
  
  // Generate first number
  if (mixed) {
    const randomDigits = getRandomDigits();
    const firstMin = getMin(randomDigits);
    const firstMax = getMax(randomDigits);
    numbers.push(getRandomNumber(firstMin, firstMax));
  } else {
    numbers.push(getRandomNumber(min, max));
  }
  
  for (let i = 1; i < count; i++) {
    const operation = getRandomOperation();
    operations.push(operation);
    
    let nextNumber;
    let currentMin, currentMax;
    
    if (mixed) {
      const randomDigits = getRandomDigits();
      currentMin = getMin(randomDigits);
      currentMax = getMax(randomDigits);
      nextNumber = getRandomNumber(currentMin, currentMax);
    } else {
      currentMin = min;
      currentMax = max;
      nextNumber = getRandomNumber(min, max);
    }
    
    if (operation === '-') {
      const currentSum = calculatePartialAnswer(numbers, operations);
      
      if (!allowNegative) {
        // Ensure result is not negative
        while (currentSum - nextNumber < 0 && nextNumber > currentMin) {
          nextNumber = getRandomNumber(currentMin, Math.min(currentSum, currentMax));
        }
        // If still negative, ensure final result is at least 0
        if (currentSum - nextNumber < 0) {
          nextNumber = currentSum;
        }
      }
    }
    
    numbers.push(nextNumber);
  }
  
  return {
    numbers,
    operations,
  };
}

function calculatePartialAnswer(numbers, operations) {
  let result = numbers[0];
  
  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === '+') {
      result += numbers[i + 1];
    } else if (operations[i] === '-') {
      result -= numbers[i + 1];
    }
  }
  
  return result;
}

export function calculateAnswer(question) {
  const { numbers, operations } = question;
  return calculatePartialAnswer(numbers, operations);
}
