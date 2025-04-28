# date-plugin-vanilla
Format Date using Date plugin

Chainable Date Formatter Plugin

✨ Features
📅 Format a date easily
➕ Add days and months
🌍 Support for locales and timezones
🔗 Fully chainable methods
🪶 Tiny, no external dependencies
📥 Installation

npm install get-formatted-date

or

yarn add get-formatted-date
🚀 Usage

import { GetFormattedDate } from 'get-formatted-date';

// Initialize
const dateObj = new GetFormattedDate(new Date());

// Chain methods
const updatedDate = dateObj.addDays(5).addMonths(2).date;

console.log(updatedDate); // new Date object 5 days and 2 months later

📚 API
new GetFormattedDate(date: Date, format?: string)
Parameters:
- date (Date): Initial date
- format (string, optional): Format string (like "YYYY-MM-DD")
.addDays(days: number)
- Adds the given number of days.
- Returns the current instance for chaining.
.addMonths(months: number)
- Adds the given number of months.
- Returns the current instance for chaining.
.format(formatString: string)
- (Coming Soon) Formats the current date as per the given pattern.
🌍 Locale and Timezone Support
(Coming Soon)
- Support for passing locale (like en-US, fr-FR)
- Support for passing timezone (like Asia/Kolkata, America/New_York)
⚡ Example

const formattedDate = new GetFormattedDate(new Date())
  .addDays(3)
  .addMonths(1)
  .date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

console.log(formattedDate);

🛠️ Todo
- [x] Chainable API
- [ ] Custom Date Formatter (like format('YYYY-MM-DD'))
- [ ] Locale & Timezone formatting
- [ ] Plugin Size Optimization
📃 License
MIT License © 2025
