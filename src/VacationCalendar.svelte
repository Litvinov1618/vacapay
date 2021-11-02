<script type="ts">
    import { Datepicker } from 'svelte-calendar'
    import dayjs from './dayjs'

    let startWorkingStore, endWorkingStore

    $: daysWorked = dayjs($endWorkingStore?.selected).businessDiff(dayjs($startWorkingStore?.selected), 'day')
</script>

<div class="VacationCalendar">
    {#if daysWorked}
        <div style="color: #b08624;">
            Днiв вiдпрацьовано: {daysWorked}
        </div>
    {/if}
    <div class="VacationCalendar-DatePickers">
        <div>
            <p>Вступив на посаду:</p>
            <Datepicker
                start={dayjs().add(-100, 'year').toDate()}
                startOfWeekIndex={1}
                bind:store={startWorkingStore}
            />
        </div>
        <div>
            <p>Звiльнився:</p>
            <Datepicker start={dayjs().add(-100, 'year').toDate()} startOfWeekIndex={1} bind:store={endWorkingStore} />
        </div>
    </div>
</div>

<style>
    .VacationCalendar {
        padding: 30px 0;
    }

    .VacationCalendar-DatePickers {
        display: flex;
        justify-content: space-between;
        width: 360px;
        margin: 0 auto;
    }
</style>
