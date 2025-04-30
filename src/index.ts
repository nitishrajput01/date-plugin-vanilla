export class DateFormatter {
    private date: Date;
    private format: dateFormat;
    private formatted?: string;

    constructor(date: Date | string, format: dateFormat, currentFormat?: dateFormat) {
        if (typeof date === 'string' && currentFormat) {
            switch (currentFormat) {
                case 'YYYY-MM-DD': {
                    const [year, month, day] = date.split('-').map(Number);
                    this.date = new Date(year, month - 1, day);
                    break;
                }
                case 'DD/MM/YYYY': {
                    const [day, month, year] = date.split('/').map(Number);
                    this.date = new Date(year, month - 1, day);
                    break;
                }
                case 'MM/DD/YYYY': {
                    const [month, day, year] = date.split('/').map(Number);
                    this.date = new Date(year, month - 1, day);
                    break;
                }
                case 'MM-DD-YYYY': {
                    const [month, day, year] = date.split('-').map(Number);
                    this.date = new Date(year, month - 1, day);
                    break;
                }
                case 'DD MMM, YYYY': {
                    const [day, monthStr, year] = date.replace(',', '').split(' ');
                    const monthMap = new Map(Array.from(getMonthMap().entries()).map(([k, v]) => [v.toLowerCase(), k]));
                    const month = monthMap.get(monthStr.toLowerCase());
                    if (!month) throw new Error(`Invalid month: ${monthStr}`);
                    this.date = new Date(Number(year), month - 1, Number(day));
                    break;
                }
                case 'YYYY/MM/DD': {
                    const [year, month, day] = date.split('/').map(Number);
                    this.date = new Date(year, month - 1, day);
                    break;
                }
                case 'YYYY/MM/DD HH:mm:ss': {
                    const [datePart, timePart] = date.split(' ');
                    const [year, month, day] = datePart.split('/').map(Number);
                    const [hours, minutes, seconds] = timePart.split(':').map(Number);
                    this.date = new Date(year, month - 1, day, hours, minutes, seconds);
                    break;
                }
                case 'HH:mm:ss': {
                    const [hours, minutes, seconds] = date.split(':').map(Number);
                    const now = new Date();
                    this.date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
                    break;
                }
                default:
                    throw new Error(`Unsupported currentFormat: ${currentFormat}`);
            }
        } else {
            this.date = new Date(date);
        }

        this.format = format;
    }

    public formatDate(): this {
        const d = this.date;
        const format = this.format;

        const map: Record<string, string> = {
            YYYY: d.getFullYear().toString(),
            [format.includes("MMM") ? 'MMM' : 'MM']: format.includes("MMM")
                ? getMonthMap().get(d.getMonth() + 1)
                : String(d.getMonth() + 1).padStart(2, '0'),
            DD: String(d.getDate()).padStart(2, '0'),
            HH: String(d.getHours()).padStart(2, '0'),
            mm: String(d.getMinutes()).padStart(2, '0'),
            ss: String(d.getSeconds()).padStart(2, '0'),
        };

        let formattedPattern: string = format;
        for (const key in map) {
            formattedPattern = formattedPattern.replace(key, map[key]);
        }
        this.formatted = formattedPattern;
        return this;
    }

    public TZ(timeZone: timeZones, locale: locale = 'en-US'): string {
        return new Intl.DateTimeFormat(locale, {
            timeZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(this.date);
    }

    public getFormatted(): string {
        return this.formatted ?? this.date.toString();
    }
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
            this.date = new DateFormatter(date, format).formatDate().getFormatted();
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
        if (!locale) throw new Error("locale is missin");
    } catch (error) {
        throw new Error("locale is missing", { cause: error.message });
    }
    if (!zone)
        return this.date.toLocaleString(locale, { timeZone: "UTC" });
    return this.date.toLocaleString(locale, { timeZone: zone })
}

export function getDiffBetweenDates(firstDate: Date | string, secondDate: Date | string, options?: { format: dateFormat }) {
    try {
        if (!firstDate) throw new Error('First date is missing');
        if (!secondDate) throw new Error('Second date is missing');

        if (typeof firstDate !== 'string' && !(firstDate instanceof Date)) {
            throw new Error('First date must be a string or Date object');
        }
        if (typeof secondDate !== 'string' && !(secondDate instanceof Date)) {
            throw new Error('Second date must be a string or Date object');
        }

        if (!options) {

            let fd: any, sd: any;
            if (typeof firstDate === 'string') {
                const [day, month, year] = firstDate.split('/');
                fd = new Date(`${year}-${month}-${day}`);
            } else {
                fd = new Date(firstDate);
            }

            if (typeof secondDate === 'string') {
                const [day, month, year] = secondDate.split('/');
                sd = new Date(`${year}-${month}-${day}`);
            } else {
                sd = new Date(secondDate);
            }

            return calculateDiff(fd, sd);

        }

        if (options && options.format) {
            const formatArr = ['YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY', 'MM-DD-YYYY', 'DD MMM, YYYY', 'YYYY/MM/DD', 'YYYY/MM/DD HH:mm:ss'];
            if (formatArr.indexOf(options.format) !== -1) {
                let fd = new DateFormatter(firstDate, options.format).formatDate().getFormatted();
                let sd = new DateFormatter(secondDate, options.format).formatDate().getFormatted();
                return calculateDiff(fd, sd);
            } else {
                throw new Error("Date format is not supported")
            }

        }

    } catch (error) {
        console.error(error);
        return null;
    }
}

function calculateDiff(fd, sd) {
    fd = new Date(fd);
    sd = new Date(sd);
    if (fd > sd) [fd, sd] = [sd, fd]; // Always fd <= sd

    const diffTime = sd - fd;
    const diffSec = diffTime / 1000;
    const diffMin = diffSec / 60;
    const diffHours = diffMin / 60;
    const diffDays = diffHours / 24;


    let years = sd.getFullYear() - fd.getFullYear();
    let months = sd.getMonth() - fd.getMonth();
    if (sd.getDate() < fd.getDate()) {
        months--;
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    return {
        seconds: diffSec,
        minutes: diffMin,
        hours: diffHours,
        days: diffDays,
        months: years * 12 + months,
        years: years
    };

}





type dateFormat = 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' |'MM-DD-YYYY' | 'DD MMM, YYYY' | 'YYYY/MM/DD' | 'YYYY/MM/DD HH:mm:ss' | 'HH:mm:ss';

type locale = 'en-US' | 'en-GB' | 'fr-FR' | 'de-DE' | 'es-ES' | 'ja-JP' | 'zh-CN' | 'zh-TW' | 'hi-IN' | 'ar-SA' | 'ru-RU' | 'pt-BR' | 'th-TH' |
    'vi-VN' | 'sv-SE' | 'pl-PL' | 'ko-KR' | 'pt-BR' | 'ru-RU' | 'ar-SA' | 'it-IT' | 'nl-NL' | 'tr-TR'


type timeZones = 'Asia/Tokyo' | 'Asia/Kolkata' | 'America/New_York' | 'America/Chicago' | 'Europe/London' |
    'Asia/Dubai' | 'Asia/Singapore' | 'Asia/Bangkok' | 'America/Los_Angeles' | 'America/Denver' | 'Europe/Paris' | 'Europe/Berlin' | 'Australia/Sydney' |
    'Africa/Johannesburg' | 'America/Toronto' | 'America/Sao_Paulo' | 'Europe/Moscow' | 'Pacific/Auckland' | 'UTC' | 'Asia/Shanghai'

type diffFormatType = 'days' | 'months' | 'hours' | 'minutes' | 'seconds'

type diffOptions = {
    format: diffFormatType
}
