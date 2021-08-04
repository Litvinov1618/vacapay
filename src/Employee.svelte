<script type="ts">
    export let employee: EmployeeData
    export let changeEmployeeVacationDays:
        (selectedEmployee: EmployeeData, selectedVacation: Vacation, daysToDeduct: number) => void
    export let removeEmployee: (employeeToRemove: EmployeeData) => void
    export let changeEmployeeInfo: (employeeToChange: EmployeeData , newEmployeeInfo: EmployeeData) => void
    export let changeEmployeeTotalVacationDays:
        (selectedEmployee: EmployeeData, selectedVacation: Vacation, newDefaultVacationDays: number) => void

    import AngleRightIcon from './AngleRightIcon.svelte'
    import TrashIcon from './TrashIcon.svelte'
    import type { EmployeeData, Vacation } from './types'

    let isEmployeeContentOpened = false

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

    const handleInfoChange = (infoType: 'name' | 'position') => {
        const isName = infoType === 'name'
        const newInfo = prompt(isName ? 'ПІБ' : 'Посада', isName ? employee.name : employee.position)

        if (!newInfo) return

        changeEmployeeInfo(employee, {
            ...employee,
            name: isName ? newInfo : employee.name,
            position: isName ? employee.position : newInfo
        })
    }

    const handleTotalVacationDaysChange = (vacation: Vacation) => {
        const newTotalVacationDays = prompt(vacation.type, vacation.totalDays.toLocaleString())

        if (!newTotalVacationDays) return

        if (newTotalVacationDays === '' || isNaN(+newTotalVacationDays)) {
            alert('Ви маєте передати число')
            handleTotalVacationDaysChange(vacation)
        }

        changeEmployeeTotalVacationDays(employee, vacation, +newTotalVacationDays)
    }
</script>

<div class="Employee">
    <div class="Employee-Header" on:click={() => isEmployeeContentOpened = !isEmployeeContentOpened}>
        <div class="Employee-HeaderInfo">
            <div on:dblclick={() => handleInfoChange('name')}><b>ПІБ</b>: {employee.name}</div>
            <div on:dblclick={() => handleInfoChange('position')}><b>Посада</b>: {employee.position}</div>
        </div>
        <AngleRightIcon isDropped={isEmployeeContentOpened} />
    </div>
    <div hidden={!isEmployeeContentOpened} class="Employee-Vacations">
        <div class="Employee-VacationsHeader"><b>Відпустки</b>:</div>
        {#each employee.vacations as vacation}
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
        <button on:click={() => removeEmployee(employee)} class="Employee-Button">
            <TrashIcon />
        </button>
    </div>
</div>

<style>
    .Employee {
        text-align: start;
        border: 2px solid #15bd2e;
        margin-bottom: 15px;
    }

    .Employee-Header {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        padding: 15px;
    }

    .Employee-HeaderInfo {
        display: flex;
        flex-direction: column;
    }

    .Employee-Vacations {
        padding: 15px;
        padding-top: 0;
    }

    .Employee-VacationsHeader {
        border-bottom: 1px solid #000;
        margin-bottom: 5px;
    }

    .Employee-Button {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 15px;
        margin: 0;
    }

    .Employee-Button:hover {
        background: #acacac3d;
        transition: 'background' .3s;
    }
</style>