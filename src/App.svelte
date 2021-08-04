<script lang="ts">
    import Employee from './Employee.svelte'
    import EmployeeForm from './EmployeeForm.svelte'
    import employeeList from './stores'

    let employeeTypeFilter = ''
    let employeeNameFilter = ''

    $: employeeTypes = (() => {
        const employeeTypes = []
        $employeeList
            .map(employee =>
                !employeeTypes.includes(employee.employeeType) && employeeTypes.push(employee.employeeType)
            )

        return employeeTypes
    })()

    $: filteredEmployeeList = $employeeList
        .filter((value) => {
            if (employeeNameFilter) {
                return value.employeeType === employeeTypeFilter &&
                    value.name.toLocaleLowerCase().includes(employeeNameFilter.toLocaleLowerCase())
            }

            return value.employeeType === employeeTypeFilter
        })
        .sort((a, b) => a.name.localeCompare(b.name, 'ua'))

    let isEmployeeFormShown = false

    const {
        changeEmployeeVacationDays,
        removeEmployee,
        changeEmployeeInfo,
        changeEmployeeTotalVacationDays,
    } = employeeList
</script>

<main class="Main">
    <h1 class="Main-Header">Vacapay alfa</h1>
    <div>
        <button
            on:click={() => isEmployeeFormShown = true}
            style="background: CadetBlue"
        >
            Додати працівника
        </button>
        {#if isEmployeeFormShown}
            <EmployeeForm
                onAddEmployee={(newEmployee) => {
                    employeeList.addEmployee(newEmployee)
                    isEmployeeFormShown = false
                    employeeTypeFilter = newEmployee.employeeType
                }}
                employeeTypes={employeeTypes}
            />
        {/if}
    </div>
    <div class="Main-Filters">
        {#each employeeTypes as filter}
            <button
                on:click={() => employeeTypeFilter = filter}
                class="Main-Filter"
                style={filter === employeeTypeFilter ? 'border: 1px solid #15bd2e;' : ''}
            >
                {filter}
            </button>
        {/each}
    </div>
    {#if filteredEmployeeList.length || employeeNameFilter}
        <div>
            <label>Знайти працівника: <input type="text" bind:value={employeeNameFilter}></label>
        </div>
    {/if}
    {#each filteredEmployeeList as employee (employee.name)}
        <Employee
            employee={employee}
            changeEmployeeVacationDays={changeEmployeeVacationDays}
            removeEmployee={removeEmployee}
            changeEmployeeInfo={changeEmployeeInfo}
            changeEmployeeTotalVacationDays={changeEmployeeTotalVacationDays}
        />
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
</style>