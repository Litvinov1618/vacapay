<script lang="ts">
    import Employee from './Employee.svelte'
    import EmployeeForm from './EmployeeForm.svelte'
    import { employeeList, employeeTypes, employeeTypeFilter } from './stores'
    import translateEmployeeType from './translateEmployeeType'

    let employeeNameFilter = ''

    $: filteredEmployeeList = $employeeList
        .filter((value) => {
            if (employeeNameFilter) {
                return value.employeeType === $employeeTypeFilter &&
                    value.name.toLocaleLowerCase().includes(employeeNameFilter.toLocaleLowerCase())
            }

            return value.employeeType === $employeeTypeFilter
        })
        .sort((a, b) => a.name.localeCompare(b.name, 'ua'))

    let isEmployeeFormShown = false
</script>

<main class="Main">
    <h1 class="Main-Header">Vacapay alfa</h1>
    <div>
        <button
            on:click={() => isEmployeeFormShown = true}
            class="Main-AddEmployeeButton"
        >
            Додати працівника
        </button>
        {#if isEmployeeFormShown}
            <EmployeeForm
                onAddEmployee={(newEmployee) => {
                    employeeList.addEmployee(newEmployee)
                    isEmployeeFormShown = false
                    employeeTypeFilter.setType(newEmployee.employeeType)
                }}
            />
        {/if}
    </div>
    <div class="Main-Filters">
        {#each $employeeTypes as employeeType}
            <button
                on:click={() => employeeTypeFilter.setType(employeeType)}
                class={`Main-Filter ${employeeType === 'fired' ? 'Main-Filter-Fired' : ''}`}
                style={employeeType === $employeeTypeFilter
                    ? (employeeType === 'fired' ? 'border-color: #bd1b15;' : 'border-color: #15bd2e;')
                    : ''
                }
            >
                {translateEmployeeType(employeeType)}
            </button>
        {/each}
    </div>
    {#if filteredEmployeeList.length || employeeNameFilter}
        <div>
            <label>Знайти працівника: <input type="text" bind:value={employeeNameFilter}></label>
        </div>
    {/if}
    {#each filteredEmployeeList as employee (employee.name)}
        <Employee employee={employee} />
    {/each}
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
</style>