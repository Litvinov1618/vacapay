<script lang="ts">
    import Employee from './Employee.svelte'
    import EmployeeForm from './EmployeeForm.svelte'
    import { employeeList as initialEmployeeList } from './employeeList'

    let employeeList: EmployeeList = initialEmployeeList as EmployeeList

    const changeEmployeeVacationDays =
        (selectedEmployee: EmployeeData, selectedVacation: Vacation, daysToDeduct: number) => {
        const newEmployeeList = employeeList.map(employee => {
            if (employee.name !== selectedEmployee.name) return employee
            return { ...employee, vacations: employee.vacations.map(vacation => {
                if (vacation.type !== selectedVacation.type) return vacation
                return { ...vacation, vacationDays: vacation.vacationDays - daysToDeduct }
            })}
        })

        employeeList = newEmployeeList
    }

    const getEmployeeTypes = (employeeList: EmployeeList) => {
        const employeeTypes = []
        employeeList
            .map(employee =>
                !employeeTypes.includes(employee.employeeType) && employeeTypes.push(employee.employeeType)
            )

        return employeeTypes
    }

    let employeeTypeFilter = ''
    let employeeNameFilter = ''

    $: filteredEmployeeList = employeeList
        .filter((value) => {
            if (employeeNameFilter) {
                return value.employeeType === employeeTypeFilter &&
                    value.name.toLocaleLowerCase().includes(employeeNameFilter.toLocaleLowerCase())
            }

            return value.employeeType === employeeTypeFilter
        })
        .sort((a, b) => a.name.localeCompare(b.name, 'ua'))

    let isEmployeeFormShown = false

    const removeEmployee = (employeeToRemove: EmployeeData) =>
        employeeList = employeeList.filter(employee => JSON.stringify(employee) !== JSON.stringify(employeeToRemove))

    const changeEmployeeInfo = (employeeToChange: EmployeeData, newEmployee: EmployeeData) => {
        employeeList = employeeList.map(employee => {
            if (JSON.stringify(employee) === JSON.stringify(employeeToChange)) {
                return newEmployee
            }

            return employee
        })
    }
</script>

<script context="module" lang="ts">
    export type EmployeeType = 'Вчитель' | 'Адміністрація' | 'Допоміжний персонал' | 'Технічний персонал' | 'Обслуговуючий персонал'
    export type VacationType = 'Основна'| 'За особливий характер праці' | 'Соціальна' | 'За бажанням працівника' | 'За згодою сторін'

    export type Vacation = {
        type: VacationType
        isPaid: boolean
        vacationDays: number
        totalDays: number
    }

    export interface EmployeeData {
        name: string
        position: string
        employeeType: EmployeeType
        vacations: Array<Vacation>
    }

    export type EmployeeList = Array<EmployeeData>;
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
                    employeeList = [...employeeList, newEmployee]
                    isEmployeeFormShown = false
                    employeeTypeFilter = newEmployee.employeeType
                }}
                employeeTypes={getEmployeeTypes(employeeList)}
            />
        {/if}
    </div>
    <div class="Main-Filters">
        {#each getEmployeeTypes(employeeList) as filter}
            <button
                on:click={() => employeeTypeFilter = filter}
                class="Main-Filter"
                style={filter === employeeTypeFilter ? 'border: 1px solid #15bd2e;' : ''}
            >
                {filter}
            </button>
        {/each}
    </div>
    {#if filteredEmployeeList.length}
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