<script type="ts">
    import { Datepicker } from 'svelte-calendar'
    import dayjs from './dayjs'
    import initCn from './cn'

    const cn = initCn('DaysWorkedCalendar')
    let startWorkingStore, endWorkingStore

    $: daysWorked = dayjs($endWorkingStore?.selected).businessDiff(dayjs($startWorkingStore?.selected))
</script>

<div class={cn()}>
    {#if daysWorked}
        <div class={cn('WorkedDays')}>
            Днiв вiдпрацьовано: {daysWorked > 0 ? daysWorked : 0}
        </div>
    {/if}
    <div class={cn('DatePickers')}>
        <div on:wheel|capture={e => e.stopPropagation()}>
            <p>Вступив на посаду:</p>
            <Datepicker
                start={dayjs().add(-100, 'year').toDate()}
                startOfWeekIndex={1}
                bind:store={startWorkingStore}
            />
        </div>
        <div on:wheel|capture={e => e.stopPropagation()}>
            <p>Звiльнився:</p>
            <Datepicker start={dayjs().add(-100, 'year').toDate()} startOfWeekIndex={1} bind:store={endWorkingStore} />
        </div>
    </div>
</div>

<style lang="scss">
    .DaysWorkedCalendar {
        padding-bottom: 25px;

        &-DatePickers {
            display: flex;
            justify-content: space-between;
            width: 360px;
            margin: 0 auto;
        }

        &-WorkedDays {
            color: #b08624;
        }
    }
</style>
