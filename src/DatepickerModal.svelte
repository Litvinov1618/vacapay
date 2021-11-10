<script lang="ts">
    export let onClose: (selectedDate: Date) => void

    import { getContext } from 'svelte'
    import { InlineCalendar } from 'svelte-calendar'
    import initCn from './cn'

    const cn = initCn('DatepickerModal')
    const { close } = getContext('simple-modal')
    let datepickerStore

    const theme = {
        calendar: {
            width: '550px',
        },
    }
</script>

<div on:wheel|capture={e => e.stopPropagation()}>
    <div class={cn('Header')}>
        <b>Обрана дата: </b>{$datepickerStore?.selected.toLocaleDateString('uk-UA')}
    </div>
    <div class={cn('CalendarWrapper')}>
        <InlineCalendar bind:store={datepickerStore} startOfWeekIndex={1} {theme} />
    </div>
    <div class={cn('Actions')}>
        <button
            class={cn('Button')}
            on:click={() => {
                onClose($datepickerStore?.selected)
                close()
            }}
        >
            Додати дату
        </button>
    </div>
</div>

<style lang="scss">
    .DatepickerModal {
        &-Header {
            padding: 0 15px 10px 15px;
            font-size: 20px;
            border-bottom: 1px solid #000000;
            margin: 0px -15px;
        }

        &-CalendarWrapper {
            padding: 10px 0;
            display: flex;
            justify-content: center;
        }

        &-Actions {
            display: flex;
            justify-content: center;
        }

        &-Button {
            padding: 10px;
            font-size: 20px;
        }
    }
</style>
