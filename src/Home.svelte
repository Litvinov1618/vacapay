<script lang="ts">
    import { Link } from 'svelte-navigator'
    import Employee from './Employee.svelte'
    import DaysWorkedCalendar from './DaysWorkedCalendar.svelte'
    import DeleteIcon from './icons/DeleteIcon.svelte'
    import { employeeList, employeeTypeFilter, employeeTypes } from './stores'

    const name = 'Home'
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

    let isVacationCalendarShown = false
</script>

<main class={name}>
    <h1 class={`${name}-Header`}>Vacapay</h1>
    <div>
        <button
            on:click={() => (isVacationCalendarShown = !isVacationCalendarShown)}
            class={`${name}-AddEmployeeButton`}
        >
            Календар відпрацьованих днів
        </button>
        {#if isVacationCalendarShown}
            <DaysWorkedCalendar />
        {/if}
    </div>
    <div class={`${name}-Filters`}>
        <button
            on:click={() => employeeTypeFilter.setType(null)}
            class={`${name}-Filter`}
            style={$employeeTypeFilter || 'border-color: #15bd2e;'}
        >
            Всi
        </button>
        {#each Object.keys(employeeTypes) as employeeType}
            <button
                on:click={() => employeeTypeFilter.setType(employeeType)}
                class={`${name}-Filter ${employeeType === 'fired' ? `${name}-Filter-Fired` : ''}`}
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
            <div class={`${name}-Search`}>
                <input type="text" bind:value={employeeNameFilter} name="search_employee" />
                {#if employeeNameFilter}
                    <div class={`${name}-SearchClear`} on:click={() => (employeeNameFilter = '')}>
                        <DeleteIcon />
                    </div>
                {/if}
            </div>
        </label>
        <Link to="addEmployee">Додати працівника</Link>
    </div>
    {#if filteredEmployeeList.length}
        {#each filteredEmployeeList as employee (employee.id)}
            <Employee {employee} />
        {/each}
    {:else}
        <p class={`${name}-NoEmployeesMessage`}>Працівників не знайдено</p>
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
