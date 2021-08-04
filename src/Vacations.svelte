<script type="ts">
    import type { EmployeeData, Vacation } from './types'
    import { employeeList } from './stores'
    import AddVacationsGroupForm from './AddVacationsGroupForm.svelte'

    export let employee: EmployeeData

    const { changeEmployeeTotalVacationDays, changeEmployeeVacationDays } = employeeList

    const handleTotalVacationDaysChange = (vacation: Vacation) => {
        const newTotalVacationDays = prompt(vacation.type, vacation.totalDays.toLocaleString())

        if (!newTotalVacationDays) return

        if (newTotalVacationDays === '' || isNaN(+newTotalVacationDays)) {
            alert('Ви маєте передати число')
            handleTotalVacationDaysChange(vacation)
        }

        changeEmployeeTotalVacationDays(employee, vacation, +newTotalVacationDays)
    }


    const deductVacationPay = (selectedEmployee: EmployeeData, selectedVacation: Vacation) => {
        const daysToDeduct = window.prompt(`На скільки днів ${selectedEmployee.name} бере відпустку?`)

        if (!daysToDeduct) return

        if (+daysToDeduct > selectedVacation.vacationDays) {
            alert('Кільіксть днів більша допустимої')
            deductVacationPay(selectedEmployee, selectedVacation)
        }

        if (daysToDeduct === '' || isNaN(+daysToDeduct)) {
            alert('Ви маєте передати число')
            deductVacationPay(selectedEmployee, selectedVacation)
        }

        changeEmployeeVacationDays(selectedEmployee, selectedVacation, +daysToDeduct)
    }
</script>

{#each employee.vacations as vacation (Math.floor(Math.random() * 1000))}
    <div on:dblclick={() => handleTotalVacationDaysChange(vacation)}>
        <b>{vacation.type}</b>: {vacation.vacationDays} з {vacation.totalDays} днів
        {#if vacation.isPaid}
            (Оплачувана)
            {:else}
            (Неоплачувана)
        {/if}
        <button on:click={() => deductVacationPay(employee, vacation)}>Відняти відпускні</button>
    </div>
{/each}
<AddVacationsGroupForm employee={employee} />