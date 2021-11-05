<script type="ts">
    export let employee: EmployeeData

    import AngleRightIcon from './AngleRightIcon.svelte'
    import TrashIcon from './TrashIcon.svelte'
    import type { EmployeeData } from './types'
    import Vacations from './Vacations.svelte'
    import { employeeList, employeeTypeFilter, employeeTypes, expandedEmployeeCardId } from './stores'

    const { changeEmployeeInfo, fireEmployee, changeEmployeeType } = employeeList

    $: isEmployeeCardOpened = $expandedEmployeeCardId === employee.id

    const handleInfoChange = (infoType: 'name' | 'position') => {
        const isName = infoType === 'name'
        const newInfo = prompt(isName ? 'ПІБ' : 'Посада', isName ? employee.name : employee.position)

        if (!newInfo) return

        changeEmployeeInfo(employee.id, {
            ...employee,
            name: isName ? newInfo : employee.name,
            position: isName ? employee.position : newInfo,
        })
    }

    const handleEmployeeTypeChange = event => {
        changeEmployeeType(employee, event.target.value)
        employeeTypeFilter.setType(event.target.value)
    }

    const handleFireEmployee = () => {
        if (!confirm('Ви точно бажаєте видалити цього працівника з бази даних?')) return
        fireEmployee(employee.id)
        expandedEmployeeCardId.setId('')
    }

    const isFired = employee.employeeType === 'fired'
    let isChangeEmployeeTypeFormShown = false
</script>

<div class={`Employee ${isFired ? 'Employee-Fired' : ''}`}>
    <div class="Employee-Header" on:click={() => expandedEmployeeCardId.setId(isEmployeeCardOpened ? '' : employee.id)}>
        <div class="Employee-HeaderInfo">
            <div on:dblclick={() => handleInfoChange('name')}>
                <b>ПІБ</b>: {employee.name}
            </div>
            <div on:dblclick={() => handleInfoChange('position')}>
                <b>Посада</b>: {employee.position}
            </div>
        </div>
        <AngleRightIcon dropped={isEmployeeCardOpened} />
    </div>
    <div hidden={!isEmployeeCardOpened} class="Employee-Vacations">
        <div class="Employee-VacationsHeader"><b>Відпустки</b>:</div>
        <Vacations {employee} />
        {#if !isChangeEmployeeTypeFormShown}
            <button on:click={() => (isChangeEmployeeTypeFormShown = true)}> Змінити категорію працівника </button>
        {:else}
            <select on:change={handleEmployeeTypeChange}>
                {#each Object.keys(employeeTypes) as employeeType}
                    <option value={employeeType} selected={employee.employeeType === employeeType}>
                        {employeeTypes[employeeType]}
                    </option>
                {/each}
            </select>
        {/if}
        {#if isFired}
            <button on:click={handleFireEmployee} class="Employee-Button">
                <TrashIcon />
            </button>
        {/if}
    </div>
</div>

<style>
    .Employee {
        text-align: start;
        border: 2px solid #15bd2e;
        margin: 10px 0;
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
        padding-bottom: 5px;
    }

    .Employee-Button {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 15px;
        margin: 0;
        display: block;
    }

    .Employee-Button:hover {
        background: #acacac3d;
        transition: 'background' 0.3s;
    }
</style>
