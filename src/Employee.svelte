<script type="ts">
    export let employee: EmployeeData

    import AngleRightIcon from './AngleRightIcon.svelte'
    import TrashIcon from './TrashIcon.svelte'
    import type { EmployeeData } from './types'
    import Vacations from './Vacations.svelte'
    import { employeeList } from './stores'

    let isEmployeeContentOpened = false
    const { changeEmployeeInfo, fireEmployee } = employeeList

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

    const isFired = employee.employeeType === 'Звільнені'
</script>

<div class={`Employee ${isFired ? 'Employee-Fired' : ''}`}>
    <div class="Employee-Header" on:click={() => isEmployeeContentOpened = !isEmployeeContentOpened}>
        <div class="Employee-HeaderInfo">
            <div on:dblclick={() => handleInfoChange('name')}><b>ПІБ</b>: {employee.name}</div>
            <div on:dblclick={() => handleInfoChange('position')}><b>Посада</b>: {employee.position}</div>
        </div>
        <AngleRightIcon isDropped={isEmployeeContentOpened} />
    </div>
    <div hidden={!isEmployeeContentOpened} class="Employee-Vacations">
        <div class="Employee-VacationsHeader"><b>Відпустки</b>:</div>
        <Vacations employee={employee} />
        {#if !isFired}
            <button
                on:click={() => {
                    confirm('Ви дійсно бажаєте звільнити цього працівника?') && fireEmployee(employee)
                }}
                class="Employee-Button"
            >
                <TrashIcon />
            </button>
        {/if}
    </div>
</div>

<style>
    .Employee {
        text-align: start;
        border: 2px solid #15bd2e;
        margin-bottom: 15px;
    }

    .Employee-Fired {
        border-color: #bd1b15;
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