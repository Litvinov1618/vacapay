<script lang="ts">
    import Employee from './Employee.svelte'
    import VacationCalendar from './VacationCalendar.svelte'
    import { Link } from 'svelte-navigator'
    import DeleteIcon from './DeleteIcon.svelte'
    import { employeeList, employeeTypeFilter, employeeTypes } from './stores'

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

<main class="Home">
    <h1 class="Home-Header">Vacapay</h1>
    <div>
        <button on:click={() => (isVacationCalendarShown = !isVacationCalendarShown)} class="Home-AddEmployeeButton">
            Календар відпусток
        </button>
        {#if isVacationCalendarShown}
            <VacationCalendar />
        {/if}
    </div>
    <div class="Home-Filters">
        <button
            on:click={() => employeeTypeFilter.setType(null)}
            class="Home-Filter"
            style={$employeeTypeFilter || 'border-color: #15bd2e;'}
        >
            Всi
        </button>
        {#each Object.keys(employeeTypes) as employeeType}
            <button
                on:click={() => employeeTypeFilter.setType(employeeType)}
                class={`Home-Filter ${employeeType === 'fired' ? 'Home-Filter-Fired' : ''}`}
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
            <div class="Home-Search">
                <input type="text" bind:value={employeeNameFilter} name="search_employee" />
                {#if employeeNameFilter}
                    <div class="Home-SearchClear" on:click={() => (employeeNameFilter = '')}>
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
        <p style="color: #808080a1">Працівників не знайдено</p>
    {/if}
</main>

<style>
    .Home {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }

    .Home-Filters {
        padding: 10px;
        display: flex;
        justify-content: center;
    }

    .Home-Header {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
        margin-top: 5px;
        outline: none;
    }

    .Home-Filter {
        margin: 2px;
    }

    .Home-Filter-Fired {
        order: 100;
        margin-left: 10px;
        position: relative;
    }

    .Home-Filter-Fired::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: -7px;
        width: 1px;
        background-color: #ccc;
    }

    .Home-AddEmployeeButton {
        background: CadetBlue;
    }

    .Home-Search {
        position: relative;
        display: inline-block;
    }

    .Home-SearchClear {
        position: absolute;
        top: 10px;
        right: 6px;
        cursor: pointer;
    }
</style>
