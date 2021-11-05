<script type="ts">
    import { Datepicker } from 'svelte-calendar'
    import dayjs from './dayjs'

    let startWorkingStore, endWorkingStore

    $: daysWorked = dayjs($endWorkingStore?.selected).businessDiff(dayjs($startWorkingStore?.selected))
</script>

<div class="DaysWorked-Calendar">
    {#if daysWorked}
        <div style="color: #b08624;">
            Днiв вiдпрацьовано: {daysWorked > 0 ? daysWorked : 0}
        </div>
    {/if}
    <div class="DaysWorked-Calendar-DatePickers">
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
    .DaysWorked-Calendar {
        padding-bottom: 25px;
    }

    .DaysWorked-Calendar-DatePickers {
        display: flex;
        justify-content: space-between;
        width: 360px;
        margin: 0 auto;
    }
</style>
