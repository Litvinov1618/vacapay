<script lang="ts">
    import Employee from './Employee.svelte'
import EmployeeForm from './EmployeeForm.svelte';
    import { employeeList as initialEmployeeList } from './employeeList';

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

    let currentFilter: (value: EmployeeData) => boolean = () => false

    const getEmployeeTypes = (employeeList: EmployeeList) => {
        const employeeTypes = []
        employeeList.map(
            employee => !employeeTypes.includes(employee.employeeType) && employeeTypes.push(employee.employeeType)
        )

        return employeeTypes
    }

    $: filteredEmployeeList = employeeList.filter(currentFilter)

    let isEmployeeFormShown = false
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
            style="background: CadetBlue; border: none;"
        >
            Додати працівника
        </button>
        {#if isEmployeeFormShown}
            <EmployeeForm
                onAddEmployee={(newEmployee) => {
                    employeeList = [...employeeList, newEmployee]
                    isEmployeeFormShown = false
                }}
                employeeTypes={getEmployeeTypes(employeeList)}
            />
        {/if}
    </div>
    {#each getEmployeeTypes(employeeList) as filter}
        <button
            on:click={() => currentFilter = (value) => value.employeeType === filter}
            class="Main-Filter"
        >
            {filter}
        </button>
    {/each}
    {#each filteredEmployeeList as employee (employee.name)}
        <Employee employee={employee} changeEmployeeVacationDays={changeEmployeeVacationDays} />
    {/each}
</main>

<style>
    .Main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    @media (min-width: 640px) {
        .Main {
            max-width: none;
        }
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