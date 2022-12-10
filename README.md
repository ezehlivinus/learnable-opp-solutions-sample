# learnable-opp-solutions-sample
This is a sample solution for some of the tasks
- `book.js` was demo requested during the Q/A session
- `movies.js` is a sample solution for movie API/App
- `statistics.js` is a sample solution for the descriptive statistics system/app

## Usage
- clone the repo and cd into the directory such that you are on `learnable-opp-solutions-sample`
- To run the solution, make sure you have [nodejs](https://nodejs.org) installed
- use the following command terminal
```bash
# run statistics.js
node statistics.js

# run movies.js
node movies.js

```
- You can change the inputs to see a different output

## Sample output
- If the `statistics.js` is run as it is on this repository, the results look like
```bash
➜  learnable-opp-solutions-sample git:(main) ✗ node statistics.js
===============Instantiating an object of Descriptive Statistics =================

The object:  DescriptiveStatistic { X: [ 10, 15, 17, 15, 18, 21 ] } instantiation was successful

===============Displaying result for central tendencies=================

Total number of observations, n is  6
The mean of the observations is:  16
the median of the observations is:  16
the mode of the observations is:  15

===============Displaying result for measure of dispersion=================

the range of the observations is:  11

the variance of the observations is:  { populationVariance: 11.333333333333334, sampleVariance: 13.6 }

the standard Deviation of the observations is:  { populationSD: 3.37, sampleSD: 3.69 }

the mean Deviation of the observations is:  {
  MDaboutMean: 2.67,
  MDAboutMode: 'not implemented',
  MDAboutMedian: 'not implemented'
}

the quartile Deviation of the observations is: yet to be implemented
```
