# GCP Cost Estimation Automation Project

## Overview

This project automates the process of generating a cost estimate using the Google Cloud Platform Pricing Calculator. The automation script is developed using WebDriverIO and ensures that the user can fill out the calculator form with specified values and verify that the cost estimate is accurate. Additionally, due to changes in the website's functionality, the project includes a workaround for sending the estimate via email and verifying its receipt using Yopmail.

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Setup

Clone the repository:

```bash
git clone "https://github.com/YourUsername/GCP_Cost_Estimation_Automation_Project.git"
cd GCP_Cost_Estimation_Automation_Project
```

Install the dependencies:

```bash
npm install
```

## Project Structure
```
GCP_Cost_Estimation_Automation_Project/
├── allure-report
├── artifacts
├── node_modules
├── src
│   ├── config
│   │   └── wdio.conf.js
│   ├── po
│   │   ├── components
│   │   │   ├── calculator
│   │   │   ├── common
│   │   │   ├── searchResult
│   │   │   └── yopmail
│   │   │       └── index.js
│   │   └── pages
│   │       ├── base.page.js
│   │       ├── calculator.page.js
│   │       ├── index.js
│   │       ├── main.page.js
│   │       ├── searchResult.page.js
│   │       └── yopmail.page.js
│   └── test
│       ├── data
│       └── regression
│           └── googleCalculator.test.js
│       ├── sanity
│       └── smoke
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

## Running the Tests

### Run all tests in QA environment
```bash
npm run test:qa
```

### Run sanity tests in QA environment
```bash
npm run test:sanity:qa
```

### Run smoke tests in QA environment
```bash
npm run test:smoke:qa
```

### Run regression tests in QA environment
```bash
npm run test:regression:qa
```

### Run all tests in Production environment
```bash
npm run test:prod
```

# Run sanity tests in Production environment
```bash
npm run test:sanity:prod
```

### Run smoke tests in Production environment
```bash
npm run test:smoke:prod
```

### Run regression tests in Production environment
```bash
npm run test:regression:prod
```

### Generate and open Allure report
```bash
npm run allure-report
```
## Author
Jinson Stevenson Moreno Aguilar - jinson.moreno@gmail.com
