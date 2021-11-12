<script lang="ts">
    import Employee from './Employee.svelte'
    import DaysWorkedCalendar from './DaysWorkedCalendar.svelte'
    import DeleteIcon from './icons/DeleteIcon.svelte'
    import { employeeList, employeeTypeFilter, employeeTypes } from './stores'
    import initCn from './cn'
    import AddEmployeeForm from './AddEmployeeForm.svelte'

    const cn = initCn('Home')
    let employeeNameFilter = ''

    $: filteredEmployeeList = $employeeList
        .filter(value => {
            if ($employeeTypeFilter) {
                return value.employeeType === $employeeTypeFilter
            }

            return true
        })
        .filter(value => {
            if (employeeNameFilter) {
                return value.name.toLocaleLowerCase().includes(employeeNameFilter.toLocaleLowerCase())
            }

            return true
        })

    let isDaysWorkedCalendarShown = false
    let isAddEmployeeFormShown = false
</script>

<main class={cn()}>
    <h1 class={cn('Header')}>Vacapay</h1>
    <div>
        <button
            on:click={() => (isDaysWorkedCalendarShown = !isDaysWorkedCalendarShown)}
            class={cn('AddEmployeeButton')}
        >
            {isDaysWorkedCalendarShown ? 'Закрити' : 'Відкрити'} календар відпрацьованих днів
        </button>
        <button on:click={() => (isAddEmployeeFormShown = !isAddEmployeeFormShown)} class={cn('AddEmployeeButton')}>
            {isAddEmployeeFormShown ? 'Закрити' : 'Відкрити'} форму додавання працівника
        </button>
        {#if isDaysWorkedCalendarShown}
            <DaysWorkedCalendar />
        {/if}
        {#if isAddEmployeeFormShown}
            <AddEmployeeForm />
        {/if}
    </div>
    <div class={cn('Filters')}>
        <button
            on:click={() => employeeTypeFilter.setType(null)}
            class={cn('Filter')}
            style={$employeeTypeFilter || 'border-color: #15bd2e;'}
        >
            Всi працiвники
        </button>
        {#each Object.keys(employeeTypes) as employeeType}
            <button
                on:click={() => employeeTypeFilter.setType(employeeType)}
                class={`${cn('Filter')} ${employeeType === 'fired' ? cn('Filter-Fired') : ''}`}
                style={employeeType === $employeeTypeFilter
                    ? employeeType === 'fired'
                        ? 'border-color: #bd1b15;'
                        : 'border-color: #15bd2e;'
                    : ''}
            >
                {employeeTypes[employeeType]}
            </button>
        {/each}
    </div>
    <div>
        <label for="search_employee">
            Знайти працівника:{' '}
            <div class={cn('Search')}>
                <input type="text" bind:value={employeeNameFilter} name="search_employee" />
                {#if employeeNameFilter}
                    <div class={cn('SearchClear')} on:click={() => (employeeNameFilter = '')}>
                        <DeleteIcon />
                    </div>
                {/if}
            </div>
        </label>
    </div>
    {#if filteredEmployeeList.length}
        {#each filteredEmployeeList as employee (employee.id)}
            <Employee {employee} />
        {/each}
    {:else}
        <p class={cn('NoEmployeesMessage')}>Працівників не знайдено</p>
    {/if}
</main>

<style lang="scss">
    .Home {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
        &-Filters {
            padding: 10px;
            display: flex;
            justify-content: center;
        }

        &-Header {
            color: #ff3e00;
            text-transform: uppercase;
            font-size: 4em;
            font-weight: 100;
            margin-top: 5px;
            outline: none;
        }

        &-Filter {
            margin: 2px;
        }

        &-Filter-Fired {
            order: 100;
            margin-left: 10px;
            position: relative;

            &:before {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                left: -7px;
                width: 1px;
                background-color: #ccc;
            }
        }

        &-AddEmployeeButton {
            background: CadetBlue;
        }

        &-Search {
            position: relative;
            display: inline-block;
        }

        &-SearchClear {
            position: absolute;
            top: 10px;
            right: 6px;
            cursor: pointer;
        }

        &-NoEmployeesMessage {
            color: #808080a1;
        }
    }
</style>
