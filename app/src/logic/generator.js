function getMin(digits) {
  if (digits === 1) return 1;
  if (digits === 2) return 10;
  if (digits === 3) return 100;
  return 1;
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
    
    let nextNumber;
    let currentMin, currentMax;
    
    if (mixed) {
      const randomDigits = getRandomDigits();
      currentMin = getMin(randomDigits);
      currentMax = getMax(randomDigits);
    } else {
      currentMin = min;
      currentMax = max;
    }
    
    if (operation === '-' && !allowNegative) {
      // For subtraction with no negative results allowed, 
      // calculate current sum using operations added so far (before pushing new operation)
      const currentSum = calculatePartialAnswer(numbers, operations);
      
      if (currentSum >= 0) {
        // Ensure result is not negative by limiting the subtraction number
        // to be at most the current sum
        const maxSubtract = Math.min(currentSum, currentMax);
        
        if (maxSubtract >= currentMin) {
          // Generate a number that won't make the result negative
          nextNumber = getRandomNumber(currentMin, maxSubtract);
        } else {
          // If currentSum is less than currentMin, set nextNumber to currentSum
          // This ensures result stays at 0 or positive
          nextNumber = Math.max(0, currentSum);
        }
      } else {
        // If current sum is already negative, set to 0
        nextNumber = 0;
      }
    } else {
      // For addition or when negative results are allowed, generate normally
      nextNumber = getRandomNumber(currentMin, currentMax);
    }
    
    operations.push(operation);
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
