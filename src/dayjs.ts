import dayjs from 'dayjs'
import dayjsBusinessDays from 'dayjs-business-days'
import 'dayjs/locale/uk.js'

dayjs.extend(dayjsBusinessDays)

dayjs.locale('uk')

export default dayjs