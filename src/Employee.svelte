<script type="ts">
    export let employee: EmployeeData
    export let changeEmployeeVacationDays:
        (selectedEmployee: EmployeeData, selectedVacation: Vacation, daysToDeduct: number) => void
    export let removeEmployee: (employeeToRemove: EmployeeData) => void

    import AngleRight from './AngleRight.svelte'
    import type { EmployeeData, Vacation } from './App.svelte'

    let isEmployeeContentOpened = false

    const deductVacationPay = (selectedEmployee: EmployeeData, selectedVacation: Vacation) => {
        const daysToDeduct = window.prompt(`На скільки днів ${selectedEmployee.name} бере відпустку?`)

        if (+daysToDeduct > selectedVacation.vacationDays) {
            alert('Кільіксть днів більша допустимої')
            return
        }

        if (daysToDeduct === '' || isNaN(+daysToDeduct)) {
            alert('Ви маєте передати число')
            return
        }

        changeEmployeeVacationDays(selectedEmployee, selectedVacation, +daysToDeduct)
    }
</script>

<div class="Employee">
    <div class="Employee-Header" on:click={() => isEmployeeContentOpened = !isEmployeeContentOpened}>
        <div class="Employee-HeaderInfo">
            <div><b>ПІБ</b>: {employee.name}</div>
            <div><b>Посада</b>: {employee.position}</div>
        </div>
        <AngleRight isDropped={isEmployeeContentOpened} />
    </div>
    <div hidden={!isEmployeeContentOpened}>
        <div class="Employee-VacationsHeader"><b>Відпустки</b>:</div>
        {#each employee.vacations as vacation}
            <div>
                <b>{vacation.type}</b>: {vacation.vacationDays} з {vacation.totalDays} днів
                {#if vacation.isPaid}
                    (Оплачувана)
                    {:else}
                    (Неоплачувана)
                {/if}
                <button on:click={() => deductVacationPay(employee, vacation)}>Відняти відпускні</button>
            </div>
        {/each}
        <button on:click={() => removeEmployee(employee)} class="Employee-Button">🗑</button>
    </div>
</div>

<style>
    .Employee {
        padding: 15px;
        text-align: start;
        border: 2px solid #15bd2e;
        margin-bottom: 15px;
    }

    .Employee-Header {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }

    .Employee-HeaderInfo {
        display: flex;
        flex-direction: column;
    }

    .Employee-VacationsHeader {
        padding: 10px 0;
        border-bottom: 1px solid #000;
        margin-bottom: 5px;
    }

    .Employee-Button {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 15px;
    }

    .Employee-Button:hover {
        background: #acacacc2;
        transition: background .3s;
    }
</style>