<script lang="ts">
    export let selectedEmployee, selectedVacation

    import { getContext } from 'svelte'
    import { InlineCalendar } from 'svelte-calendar'
    import dayjs, { HOLIDAYS } from './dayjs'
    import { employeeList } from './stores'

    let startVacationStore, endVacationStore, errorMessage, vacationDays
    const MINIMUM_VACATION_DAYS = 14

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
    <div class="DeductVacationsModal-Header">
        На скільки днів {selectedEmployee.name} бере відпустку?
    </div>
    <div class="DeductVacationsModal-VacationDays">
        Кількість днів: {vacationDays > 0 ? vacationDays : 0}
    </div>
    <div class="DeductVacationsModal-Calendars">
        <div class="DeductVacationsModal-Calendar" on:wheel|capture={e => e.stopPropagation()}>
            <p class="DeductVacationsModal-CalendarLabel">Перший день:</p>
            <InlineCalendar {theme} start={new Date()} startOfWeekIndex={1} bind:store={startVacationStore} />
        </div>
        <div class="DeductVacationsModal-Calendar" on:wheel|capture={e => e.stopPropagation()}>
            <p class="DeductVacationsModal-CalendarLabel">Останній день:</p>
            <InlineCalendar {theme} startOfWeekIndex={1} start={new Date()} bind:store={endVacationStore} />
        </div>
    </div>

    <div class="DeductVacationsModal-Actions">
        {#if errorMessage}
            <div class="DeductVacationsModal-ActionsError">{errorMessage}</div>
        {/if}
        <button
            on:click={() => changeEmployeeVacationDays(selectedEmployee, selectedVacation, vacationDays).then(close)}
            disabled={vacationDays > selectedVacation.vacationDays}
        >
            Відняти відпускні
        </button>
    </div>
</div>

<style>
    .DeductVacationsModal-Header {
        padding: 0 15px 10px 15px;
        font-size: 20px;
        border-bottom: 1px solid #000000;
        margin: 0px -15px;
    }

    .DeductVacationsModal-Calendars {
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;
        flex-wrap: wrap;
    }

    .DeductVacationsModal-CalendarLabel {
        text-align: center;
        font-size: 20px;
    }

    .DeductVacationsModal-Actions {
        text-align: center;
    }

    .DeductVacationsModal-VacationDays {
        color: #eb7401;
        padding-top: 10px;
        font-size: 20px;
        text-align: center;
    }

    .DeductVacationsModal-ActionsError {
        color: #ff0000;
        padding-bottom: 15px;
    }

    .DeductVacationsModal-Calendar {
        margin: 0 auto;
    }
</style>
