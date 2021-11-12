<script type="ts">
    import { getContext } from 'svelte'
    import { employeeList, vacationTypes } from './stores'
    import AddVacationGroupForm from './AddVacationGroupForm.svelte'
    import DeductVacationsModal from './DeductVacationsModal.svelte'
    import type { EmployeeData, Vacation } from './types'

    export let employee: EmployeeData

    const { changeEmployeeTotalVacationDays, addCompensation } = employeeList

    const handleTotalVacationDaysChange = (vacation: Vacation) => {
        const newTotalVacationDays = prompt(vacationTypes[vacation.type], vacation.totalDays.toLocaleString())

        if (!newTotalVacationDays) return

        if (newTotalVacationDays === '' || isNaN(+newTotalVacationDays)) {
            alert('Ви маєте передати число')
            handleTotalVacationDaysChange(vacation)
        }

        changeEmployeeTotalVacationDays(employee, vacation, +newTotalVacationDays)
    }

    const calculateCompensation = (employee: EmployeeData, vacation: Vacation) => {
        const oneDayCost = +prompt('Вкажіть вартість одного дня')
        if (oneDayCost && typeof oneDayCost === 'number' && !isNaN(oneDayCost)) {
            addCompensation(employee, vacation, oneDayCost * vacation.vacationDays)
        }
    }

    const { open } = getContext('simple-modal')
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
            <button
                on:click={() => open(DeductVacationsModal, { selectedEmployee: employee, selectedVacation: vacation })}
            >
                Відняти відпускні
            </button>
        {:else if vacation.isPaid && !vacation?.compensation}
            <button on:click={() => calculateCompensation(employee, vacation)}> Порахувати компенсацію </button>
        {:else if vacation.isPaid}
            {vacation.compensation}
        {/if}
    </div>
{/each}
<AddVacationGroupForm {employee} />
