# date-time-plugin-minify, tiny plugin

Format Date using Date plugin

Chainable Date Formatter Plugin

**Features - **
Format a date easily
Add days and months
Support for locales and timezones
Fully chainable methods
Tiny, no external dependencies

**Installation - **

```javascript
npm i date-time-plugin-minify
```

or

```javascript
yarn add date-time-plugin-minify
```

# Usage - 

```javascript
import {formatDate, GetFormattedDate} from 'date-time-plugin-minify';
```

```javascript
// Initialize

const dateObj = new GetFormattedDate(new Date(), "YYYYY/MM/DD"); // return {date: "2025/05/12"}

const updatedDate = dateObj.addDays(5).addMonths(2).date; // support chaining methods.

// Chain methods

console.log(updatedDate); // new Date object 5 days and 2 months later


// const formatDateDate = formatDate(new Date(), "YYYY/MM/DD")

console.log(formatDateDate);
```



**- (Coming Soon) Formats the current date as per the given pattern.
 Locale and Timezone Support
(Coming Soon)
- Support for passing locale (like en-US, fr-FR)
- Support for passing timezone (like Asia/Kolkata, America/New_York)**

License [MIT License © 2025](https://github.com/nitishrajput01/date-plugin-vanilla/blob/main/LICENSE)
