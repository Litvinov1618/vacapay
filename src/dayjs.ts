import dayjs from 'dayjs'
import dayjsBusinessDays from '@backtolife/dayjs-business-days'
import 'dayjs/locale/uk.js'

const options = {
    holidays: [
        '2021-01-01',
        '2021-01-07',
        '2021-03-08',
        '2021-05-02',
        '2021-05-03',
        '2021-05-10',
        '2021-06-20',
        '2021-06-28',
        '2021-08-24',
        '2021-10-14',
        '2021-12-27',
    ],
    holidayFormat: 'YYYY-MM-DD',
}

dayjs.extend(dayjsBusinessDays, options)

dayjs.locale('uk')

export default dayjs