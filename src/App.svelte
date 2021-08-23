<script lang="ts">
    import Employee from './Employee.svelte'
    import EmployeeForm from './EmployeeForm.svelte'
    import DeleteIcon from './DeleteIcon.svelte'
    import { employeeList, EMPLOYEE_TYPES, employeeTypeFilter } from './stores'
    import translateEmployeeType from './translateEmployeeType'

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
        .sort((a, b) => a.name.localeCompare(b.name, 'ua'))

    let isEmployeeFormShown = false
</script>

<main class="Main">
    <h1 class="Main-Header">Vacapay alfa</h1>
    <div>
        <button on:click={() => (isEmployeeFormShown = !isEmployeeFormShown)} class="Main-AddEmployeeButton">
            Додати працівника
        </button>
        {#if isEmployeeFormShown}
            <EmployeeForm
                onAddEmployee={newEmployee => {
                    employeeList.addEmployee(newEmployee)
                    isEmployeeFormShown = false
                    employeeTypeFilter.setType(newEmployee.employeeType)
                }}
            />
        {/if}
    </div>
    <div class="Main-Filters">
        <button
            on:click={() => employeeTypeFilter.setType(null)}
            class="Main-Filter"
            style={$employeeTypeFilter || 'border-color: #15bd2e;'}
        >
            Всi
        </button>
        {#each EMPLOYEE_TYPES as employeeType}
            <button
                on:click={() => employeeTypeFilter.setType(employeeType)}
                class={`Main-Filter ${employeeType === 'fired' ? 'Main-Filter-Fired' : ''}`}
                style={employeeType === $employeeTypeFilter
                    ? employeeType === 'fired'
                        ? 'border-color: #bd1b15;'
                        : 'border-color: #15bd2e;'
                    : ''}
            >
                {translateEmployeeType(employeeType)}
            </button>
        {/each}
    </div>
    <div>
        <label for="search_employee">
            Знайти працівника:{' '}
            <div class="Main-Search">
                <input type="text" bind:value={employeeNameFilter} name="search_employee" />
                {#if employeeNameFilter}
                    <div class="Main-SearchClear" on:click={() => (employeeNameFilter = '')}>
                        <DeleteIcon />
                    </div>
                {/if}
            </div>
        </label>
    </div>
    {#if filteredEmployeeList.length}
        {#each filteredEmployeeList as employee (employee.name + Math.random())}
            <Employee {employee} />
        {/each}
    {:else}
        <p style="color: #808080a1">Працівників не знайдено </p>
    {/if}
</main>

<style>
    .Main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }

    .Main-Filters {
        padding: 10px;
        display: flex;
        justify-content: center;
    }

    .Main-Header {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
        margin-top: 5px;
    }

    .Main-Filter {
        margin: 2px;
    }

    .Main-Filter-Fired {
        order: 100;
        margin-left: 10px;
        position: relative;
    }

    .Main-Filter-Fired::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: -7px;
        width: 1px;
        background-color: #ccc;
    }

    .Main-AddEmployeeButton {
        background: CadetBlue;
    }

    .Main-Search {
        position: relative;
        display: inline-block;
    }

    .Main-SearchClear {
        position: absolute;
        top: 10px;
        right: 6px;
        cursor: pointer;
    }
</style>
