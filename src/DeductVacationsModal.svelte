<script lang="ts">
    export let selectedEmployee: EmployeeData, selectedVacation: Vacation

    import { getContext } from 'svelte'
    import { InlineCalendar } from 'svelte-calendar'
    import initCn from './cn'
    import dayjs, { HOLIDAYS } from './dayjs'
    import { employeeList } from './stores'
    import type { EmployeeData, Vacation } from './types'

    const cn = initCn('DeductVacationsModal')
    const MINIMUM_VACATION_DAYS = 14
    let startVacationStore, endVacationStore, errorMessage: string, vacationDays: number

    const { changeEmployeeVacationDays } = employeeList

    const countVacationDays = (start, end) => {
        let totalDays = Math.ceil(dayjs(end).diff(dayjs(start), 'day', true))

        HOLIDAYS.map(holiday => {
            if (dayjs(holiday).isBetween(dayjs(start), dayjs(end))) {
                --totalDays
            }
        })

        vacationDays = totalDays
    }

    const theme = {
        calendar: {
            width: '290px',
        },
    }

    const { close } = getContext('simple-modal')

    $: countVacationDays($startVacationStore?.selected, $endVacationStore?.selected)

    $: {
        if (
            vacationDays &&
            MINIMUM_VACATION_DAYS < selectedVacation.vacationDays &&
            vacationDays < MINIMUM_VACATION_DAYS
        ) {
            errorMessage = `Кількість днів менша за мінімальну: ${MINIMUM_VACATION_DAYS}. Ви точно збираєтесь вказати цю кількість днів?`
        } else if (vacationDays > selectedVacation.vacationDays) {
            errorMessage = 'Кільіксть днів більша допустимої: ' + selectedVacation.vacationDays
        } else errorMessage = ''
    }
</script>

<div>
    <div class={cn('Header')}>
        На скільки днів {selectedEmployee.name} бере відпустку?
    </div>
    <div class={cn('VacationDays')}>
        Кількість днів: {vacationDays > 0 ? vacationDays : 0}
    </div>
    <div class={cn('Calendars')}>
        <div class={cn('Calendar')} on:wheel|capture={e => e.stopPropagation()}>
            <p class={cn('CalendarLabel')}>Перший день:</p>
            <InlineCalendar {theme} start={new Date()} startOfWeekIndex={1} bind:store={startVacationStore} />
        </div>
        <div class={cn('Calendar')} on:wheel|capture={e => e.stopPropagation()}>
            <p class={cn('CalendarLabel')}>Останній день:</p>
            <InlineCalendar {theme} startOfWeekIndex={1} start={new Date()} bind:store={endVacationStore} />
        </div>
    </div>

    <div class={cn('Actions')}>
        {#if errorMessage}
            <div class={cn('ActionsError')}>{errorMessage}</div>
        {/if}
        <button
            on:click={() => changeEmployeeVacationDays(selectedEmployee, selectedVacation, vacationDays).then(close)}
            disabled={vacationDays > selectedVacation.vacationDays}
        >
            Відняти відпускні
        </button>
    </div>
</div>

<style lang="scss">
    .DeductVacationsModal {
        &-Header {
            padding: 0 15px 10px 15px;
            font-size: 20px;
            border-bottom: 1px solid #000000;
            margin: 0px -15px;
        }

        &-Calendars {
            display: flex;
            justify-content: space-between;
            margin-bottom: 50px;
            flex-wrap: wrap;
        }

        &-CalendarLabel {
            text-align: center;
            font-size: 20px;
        }

        &-Actions {
            text-align: center;
        }

        &-VacationDays {
            color: #eb7401;
            padding-top: 10px;
            font-size: 20px;
            text-align: center;
        }

        &-ActionsError {
            color: #ff0000;
            padding-bottom: 15px;
        }

        &-Calendar {
            margin: 0 auto;
        }
    }
</style>
