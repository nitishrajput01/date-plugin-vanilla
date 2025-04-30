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

**Save as dev dependency**

`npm i --save-dev date-time-plugin-minify`

# Usage - 

```javascript
import {DateDateFormatter, GetFormattedDate, getDiffBetweenDates} from 'date-time-plugin-minify';
```

```javascript
New API -  DateFormatter with timeZone and locale support.

// Accept param -  
// date either date object or string, 
// formatToCovert(In which format you want to convert date), 
// currentDateFormat(current date format as first param what is format of that date)

const df = new DateFormatter('04/24/2026', 'YYYY/MM/DD HH:mm:ss', 'MM/DD/YYYY'); 

console.log(df.formatDate().getFormatted()); // 2026/04/24 00:00:00

// TimeZone Support 
console.log(df.TZ('America/Denver')) // "04/23/2026, 12:30:00 PM";

// UTC Time
console.log(df.TZ("UTC")) // 04/23/2026, 06:30:00 PM

// locale support
console.log(df.TZ("Europe/Berlin", "de-DE")) // 23.04.2026, 20:30:00 // default locale "en-US"
```

~~formateDate~~

deprecated formatDate not support in version 1.1.4

```javascript

GetFormattedDate - 

const dateObj = new GetFormattedDate(new Date(), "YYYYY/MM/DD"); // return {date: "2025/05/12"}

const updatedDate = dateObj.addDays(5).addMonths(2).date; // support chaining methods.

// Chain methods

console.log(updatedDate); // new Date object 5 days and 2 months later


Get Difference between dates - 

// params firstDate: Date | string, Second Date : Date | string
getDiffBetweenDates("25/05/2025", "28/05/2025", options ? :{format: "DD/MM/YYYY"})  // default format DD/MM/YYYY, provide format as 3rd param"
 return {
            seconds: diffSec, // 43943
            minutes: diffMin, // 4343
            hours: diffHours, // 72
            days: diffDays, // 3
            months: years * 12 + months, // 0
            years: years // 0
      }

```

~~const formatDateDate = formatDate(new Date(), "YYYY/MM/DD")

console.log(formatDateDate);~~

** -
- Now Support for passing locale (like en-US, fr-FR) 
- Now Support for passing timezone (like Asia/Kolkata, America/New_York)**


**(Coming Soon) - 
 -Locale-aware date formatting 
 - Relative time support
 - Timezone conversion
 **

License [MIT License © 2025](https://github.com/nitishrajput01/date-plugin-vanilla/blob/main/LICENSE)
