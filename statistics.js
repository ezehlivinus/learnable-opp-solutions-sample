/**
 * 2. Using ES6+ classes, prepare code that computes descriptive statistics. Use the refreshment below to refresh your memory.
 * i. The measures of central tendency: 3 of them 
 * ii. The measures of dispersion: 5 of them
 * Refreshment: https://www.cuemath.com/data/descriptive-statistics/
 */
// A simple class abstraction
class Statistics {
  constructor(X) {
    // Abstraction
    if (this.constructor.name === 'Statistics') {
      throw new Error('Statistics can only be implemented/extended in a subclass')
    }
    this.X = X ? X : []; // if X has value use it otherwise make it empty array
  }

  // Helps to validate and cleans X
  validate() {
    let xIsArray = Array.isArray(this.X)
    
    if (!xIsArray) {
      throw new Error('X must be an array')
    }

    if (this.X.length === 0) {
      throw new Error('X must have at least one element')
    }

    let cleanedX = []
    for (let number of this.X) {
      let x = Number(number)
      if (isNaN(x)) {
        throw new Error('All members of X must be a number', { cause: 'Some X are not number'})
      }

      cleanedX.push(x)
    }

    this.X = cleanedX

  }

  sum(numbers) {
    let total = 0
    for (let number of numbers) {
      total += number
    }

    return total;
  }

  isEven(number) {
    return number % 2 === 0
  }

  makeFrequencyTable(list) {
    const table = {};

    // Count the number of times each item appears in the list
    for (const observation of list) {
      // if the observation has been counted before then increment its count by one otherwise count it for the first time
      table[observation] = table[observation] ? table[observation] + 1 : 1;
    }

    return table; // this yields { observation: number-of-occurrence, ... }
  }

}

// To keep things simple we will just use one class
// A simple class inheritance
/**
 * Compute statistics for a given ungrouped observations 
 */
class DescriptiveStatistic extends Statistics {
  constructor(X) {
    super(X) // helps to construct the parent class (Statistics)
    this.validate() // make sure that X is valid
  }

  mean () {
    const zigmaX = this.sum(this.X)

    // Mean = {Sum of Observation} ÷ {Total numbers of Observations} 
    const _mean = zigmaX / this.X.length

    return _mean
  }

  median () {
    // Step 1: Sort the given data in increasing order.
    // sorting array changes the order of the array
    // copy the data to avoid distorting their natural order of the original data
    const data = [...this.X ] // ... this called destructuring
    let sortedData = data.sort((a, b) => a - b)

    // Step 2: Count the number of observations.
    let n = sortedData.length

    // Step 3:  check if the number of observations is even or odd
    if (this.isEven(n)) {
      // Step 3.1: If the number of observations is even use median formula: Median = [(n/2)th term + (n/2 + 1)th term]/2
      let indexOfFirstMidValue = n / 2
      let indexOfSecondMidValue = (n / 2) + 1

      let firstMidNumber = sortedData[indexOfFirstMidValue - 1] // we subtract 1 because array are zero indexed
      let secondMidNumber = sortedData[indexOfSecondMidValue - 1]
      
      let median = (firstMidNumber + secondMidNumber) / 2
      return median
    } else { // it is odd
      // Step 3.2: If the number of observations is odd use median formula: Median = [(n + 1)/2]th term
      let indexOfMidTerm = (n + 1) / 2
      let median = sortedData[indexOfMidTerm - 1]
      return median
    }

  }

  mode () {
    // we did not account for a tie

    // this yields { observation: number-of-occurrence, ... }
    const frequencies = this.makeFrequencyTable([ ...this.X ])
  
    // this yield [[the-observation, number-of-occurrence], [...], ...] but sorted
    const sorted = Object.entries(frequencies).sort((a, b) => a[1] - b[1]);

    return Number(sorted[sorted.length - 1][0]) // pick the most common item/observation
  }

  /**
   * Measure of dispersion
   */
  // 
  range() {
    const sorted = [...this.X ].sort((a, b) => a - b) //sorted the array

    const highestNumber = sorted[sorted.length - 1] // this last number in the array is the highest number
    const lowestNumber = sorted[0] // the first number in the array is the lowest number

    return highestNumber - lowestNumber
  }

  variance() {
    let mean = this.mean()
    let data = [...this.X ]

    let sum = 0
    for (let observation of data ) {
      sum += (observation - mean) ** 2
    }

    let n = data.length
    return {
      populationVariance: (sum) / (n),
      sampleVariance: (sum) / (n - 1)
    }
  }

  sampleVariance() {
    const variance = this.variance()

    return variance.sampleVariance

  }

  populationVariance() {
    const variance = this.variance()

    return variance.populationVariance
  }

  /**
   * 
   * Compute the population and sample deviation using actual mean
   */
  standardDeviation() {
    const variance = this.variance()

    return {
      populationSD: Number(Math.sqrt(variance.populationVariance).toFixed(2)),
      sampleSD: Number(Math.sqrt(variance.sampleVariance).toFixed(2))
    }
  }

  meanDeviation () {
    // Step 1: Calculate the value of the mean, mode, or median of the given data values. 
    // Here, this would be done on separate methods


    // compute mean deviation about the mean
    const MDaboutMean = this.meanDeviationAboutMean()

    let MDaboutMeanTo2DecimalPlaces = MDaboutMean.toFixed(2)
    return {
      MDaboutMean: Number(MDaboutMeanTo2DecimalPlaces),
      MDAboutMode: 'not implemented',
      MDAboutMedian: 'not implemented'
    }
  }

  meanDeviationAboutMean() {
    const mean = this.mean()
    const observations = [...this.X ]

    // Step 2: Subtract the value of the central point (here, mean) from each data point.
    // Step 3: Now take the absolute of the values obtained in step 2. 
    const absoluteData = observations.map((observation) => {
      let subtracted = observation - mean
      let absoluteOfSubtracted = Math.abs(subtracted)

      return absoluteOfSubtracted
    })

    // Take the sum of all the values obtained in step 3.
    const sum = this.sum(absoluteData)

    const _meanDeviationAboutMean = sum / observations.length

    return _meanDeviationAboutMean
  }

  quartileDeviation () {
    return 'yet to be implemented'
  }
}
const data = [10, 15, 17, 15, 18, 21]
console.log('===============Instantiating an object of Descriptive Statistics =================\n')

const descriptiveStatistic = new DescriptiveStatistic(data)
console.log('The object: ', descriptiveStatistic, 'instantiation was successful\n')

console.log('===============Displaying result for central tendencies=================\n')
console.log('Total number of observations, n is ', descriptiveStatistic.X.length)
const mean = descriptiveStatistic.mean()
console.log('The mean of the observations is: ', mean)

const median = descriptiveStatistic.median()
console.log('the median of the observations is: ', median)

const mode = descriptiveStatistic.mode()
console.log('the mode of the observations is: ', mode)

console.log('\n===============Displaying result for measure of dispersion=================\n')

const range = descriptiveStatistic.range()
console.log('the range of the observations is: ', range)


const variance = descriptiveStatistic.variance()
console.log('\nthe variance of the observations is: ', variance)


const standardDeviation = descriptiveStatistic.standardDeviation()
console.log('\nthe standard Deviation of the observations is: ', standardDeviation)

const meanDeviation = descriptiveStatistic.meanDeviation()
console.log('\nthe mean Deviation of the observations is: ', meanDeviation)

const quartileDeviation = descriptiveStatistic.quartileDeviation()
console.log('\nthe quartile Deviation of the observations is:', quartileDeviation)
