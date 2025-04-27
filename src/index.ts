export function formatDate(date: Date | string, format: dateFormat) {
    let d = new Date(date);
    const map = {
        YYYY: d.getFullYear(),
        [format.indexOf("MMM") !== -1 ? 'MMM' : 'MM']: format.indexOf("MMM") !== -1 ?  getMonthMap().get(d.getMonth() + 1) : String(d.getMonth() + 1).padStart(2, '0'),
        DD: String(d.getDate()).padStart(2, '0'),
        HH: String(d.getHours()).padStart(2, '0'),
        mm: String(d.getMinutes()).padStart(2, '0'),
        ss: String(d.getSeconds()).padStart(2, '0')
    };
    let formattedPattern: string = format;
    for (const key in map) {
        formattedPattern = formattedPattern.replace(key, map[key]);
    }
    return formattedPattern;
}

function getMonthMap() {
    const map = new Map<any, any>();
    map.set(1, "Jan");
    map.set(2, "Feb");
    map.set(3, "Mar");
    map.set(4, "April");
    map.set(5, "May");
    map.set(6, "June");
    map.set(7, "July");
    map.set(8, "Aug");
    map.set(9, "Sept");
    map.set(10, "Oct");
    map.set(11, "Nov");
    map.set(12, "Dec");
    return map;
}

export function GetFormattedDate(date: Date | string, format?: dateFormat) {
    try {
        if (!date) {
            throw new Error("date is missing")
        }
        if (!format) {
            this.date = new Date(date);
        }
        else {
            this.date = formatDate(date, format);
        }
    } catch (error) {
        throw new Error("Date is not provided", { cause: error.message });
    }

}

GetFormattedDate.prototype.addDays = function (days: number) {
    try {
        if (!days) {
            throw new Error('Days are not provide in Function')
        }
        this.date.setDate(this.date.getDate() + days);
        return this;
    } catch (error) {
        throw new Error("Unable to add days as", { cause: error.message });
    }
}

/**
 * Add months in current date and return new date 
 * ex : new GetFormattedDate(new Date()).addMonth(3) // return new date with 3 month added
 */

GetFormattedDate.prototype.addMonths = function (months: number) {
    try {
        if (!months) {
            throw new Error('Months are not provide in Function')
        }
        this.date.setMonth(this.date.getMonth() + months);
        return this;
    } catch (error) {
        throw new Error("Unable to add months as", { cause: error.message });
    }
}
GetFormattedDate.prototype.addYear = function (years: number) {
    try {
        if (!years) {
            throw new Error('years are not provide in Function')
        }
        this.date.setFullYear(this.date.getFullYear() + years);
        return this;
    } catch (error) {
        throw new Error("Unable to add years as", { cause: error.message.message });
    }
}

GetFormattedDate.prototype.toLocaleString = function (locale: locale, zone?: timeZones) {
    try {
        if(!locale) throw new Error("locale is missin");
    } catch (error) {
        throw new Error("locale is missing" , {cause: error.message});
    }
    if (!zone)
        return this.date.toLocaleString(locale, {timeZone: "UTC"});
    return this.date.toLocaleString(locale, { timeZone: zone })
}

export function getDiffBetweenDates(firstDate: Date | string, secondDate: Date | string, options?: diffOptions): string {
    try {
        if (!firstDate) throw new Error('First date is missed');
        if (!secondDate) throw new Error('Second date is missed');

        const fd = new Date(firstDate);
        const sd = new Date(secondDate);
        const diffTime = Math.abs(sd.getTime() - fd.getTime());

        const diffSec = diffTime / 1000;
        const diffMin = diffSec / 60;
        const diffHours = diffMin / 60;
        const diffDays = diffHours / 24;
        const diffMonths = diffDays / 30;
        const diffYears = diffDays / 365;

        let value: number;
        let unit: string;

        if (options?.format) {
            switch (options.format) {
                case 'seconds':
                    value = diffSec;
                    unit = 'second';
                    break;
                case 'minutes':
                    value = diffMin;
                    unit = 'minute';
                    break;
                case 'hours':
                    value = diffHours;
                    unit = 'hour';
                    break;
                case 'days':
                    value = diffDays;
                    unit = 'day';
                    break;
                case 'months':
                    value = diffMonths;
                    unit = 'month';
                    break;
                default:
                    value = diffDays;
                    unit = 'day';
            }
        } else {
            const absDiffSec = Math.abs(diffSec);
            const absDiffMin = Math.abs(diffMin);
            const absDiffHours = Math.abs(diffHours);
            const absDiffDays = Math.abs(diffDays);
            const absDiffMonths = Math.abs(diffMonths);
            const absDiffYears = Math.abs(diffYears);

            if (absDiffSec < 60) {
                value = diffSec;
                unit = 'second';
            } else if (absDiffMin < 60) {
                value = diffMin;
                unit = 'minute';
            } else if (absDiffHours < 24) {
                value = diffHours;
                unit = 'hour';
            } else if (absDiffDays < 30) {
                value = diffDays;
                unit = 'day';
            } else if (absDiffMonths < 12) {
                value = diffMonths;
                unit = 'month';
            } else {
                value = diffYears;
                unit = 'year';
            }
        }

        const roundedValue = Math.floor(Math.abs(value));
        const plural = roundedValue === 1 ? '' : 's'; // pluralize if needed

        if (diffTime > 0) {
            return `${roundedValue} ${unit}${plural} ago`;
        } else {
            return `in ${roundedValue} ${unit}${plural}`;
        }

    } catch (error) {
        throw new Error('First and Second date both are needed', { cause: error.message })
    }

}





type dateFormat = 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM-DD-YYYY' | 'DD MMM, YYYY' | 'YYYY/MM/DD' | 'YYYY/MM/DD HH:mm:ss' | 'HH:mm:ss';

type locale = 'en-US' | 'en-GB' | 'fr-FR' | 'de-DE' | 'es-ES' | 'ja-JP' | 'zh-CN' | 'zh-TW' | 'hi-IN' | 'ar-SA' | 'ru-RU' | 'pt-BR' | 'th-TH' |
    'vi-VN' | 'sv-SE' | 'pl-PL' | 'ko-KR' | 'pt-BR' | 'ru-RU' | 'ar-SA' | 'it-IT' | 'nl-NL' | 'tr-TR'


type timeZones = 'Asia/Tokyo' | 'Asia/Kolkata' | 'America/New_York' | 'America/Chicago' | 'Europe/London' |
'Asia/Dubai' | 'Asia/Singapore' | 'Asia/Bangkok' | 'America/Los_Angeles' | 'America/Denver' | 'Europe/Paris' | 'Europe/Berlin' | 'Australia/Sydney' |
'Africa/Johannesburg' | 'America/Toronto' | 'America/Sao_Paulo' | 'Europe/Moscow' | 'Pacific/Auckland' | 'UTC' | 'Asia/Shanghai'

type diffFormatType = 'days' | 'months' | 'hours' | 'minutes' | 'seconds'

type diffOptions = {
    format: diffFormatType
}