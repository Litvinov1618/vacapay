<script type="ts">
    import type { EmployeeData, Vacation } from './types'
    import { employeeList, vacationTypes } from './stores'
    import AddVacationsGroupForm from './AddVacationsGroupForm.svelte'

    export let employee: EmployeeData
    let compensations = []

    const { changeEmployeeTotalVacationDays, changeEmployeeVacationDays } = employeeList

    const handleTotalVacationDaysChange = (vacation: Vacation) => {
        const newTotalVacationDays = prompt(vacationTypes[vacation.type], vacation.totalDays.toLocaleString())

        if (!newTotalVacationDays) return

        if (newTotalVacationDays === '' || isNaN(+newTotalVacationDays)) {
            alert('Ви маєте передати число')
            handleTotalVacationDaysChange(vacation)
        }

        changeEmployeeTotalVacationDays(employee, vacation, +newTotalVacationDays)
    }

    const deductVacations = (selectedEmployee: EmployeeData, selectedVacation: Vacation) => {
        const daysToDeduct = window.prompt(`На скільки днів ${selectedEmployee.name} бере відпустку?`)

        if (!daysToDeduct) return

        if (+daysToDeduct < 14) {
            if (
                !confirm(
                    'Кількість днів менша за мінімальну: ' + 14 + '. Ви точно збираєтесь вказати цю кількість днів?',
                )
            )
                deductVacations(selectedEmployee, selectedVacation)
        }

        if (+daysToDeduct > selectedVacation.vacationDays) {
            alert('Кільіксть днів більша допустимої: ' + selectedVacation.vacationDays)
            deductVacations(selectedEmployee, selectedVacation)
        }

        if (daysToDeduct === '' || isNaN(+daysToDeduct)) {
            alert('Ви маєте передати число')
            deductVacations(selectedEmployee, selectedVacation)
        }

        changeEmployeeVacationDays(selectedEmployee, selectedVacation, +daysToDeduct)
    }
</script>

{#each employee.vacations as vacation (Math.floor(Math.random() * 1000))}
    <div on:dblclick={() => handleTotalVacationDaysChange(vacation)}>
        <b>{vacationTypes[vacation.type]}</b>: {vacation.vacationDays} з
        {vacation.totalDays} днів
        {#if vacation.isPaid}
            (Оплачувана)
        {:else}
            (Неоплачувана)
        {/if}
        {#if employee.employeeType !== 'fired'}
            <button on:click={() => deductVacations(employee, vacation)}>Відняти відпускні</button>
        {:else if vacation.isPaid}
            <button
                on:click={() =>
                    alert('Компенсацiя складає: ' + +prompt('Вкажіть вартість одного дня') * vacation.vacationDays + ' грн')}
                >Порахувати компенсацію</button
            >
        {/if}
    </div>
{/each}
<AddVacationsGroupForm {employee} />
