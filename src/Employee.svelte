<script type="ts">
    export let employee: EmployeeData

    import { getContext } from 'svelte'
    import AngleRightIcon from './icons/AngleRightIcon.svelte'
    import TrashIcon from './icons/TrashIcon.svelte'
    import Vacations from './Vacations.svelte'
    import { employeeList, employeeTypeFilter, employeeTypes, expandedEmployeeCardId } from './stores'
    import initCn from './cn'
    import type { EmployeeData } from './types'
    import DatepickerModal from './DatepickerModal.svelte'
    import dbTimestamp from './dbTimestamp'
    import dayjs from './dayjs'

    const cn = initCn('Employee')

    const { changeEmployeeInfo, deleteEmployee, changeEmployeeType, setEmployeeFiredAt, setEmployeeHiredAt } =
        employeeList

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

    const handleDeleteEmployee = () => {
        if (!confirm('Ви точно бажаєте видалити цього працівника з бази даних?')) return
        deleteEmployee(employee.id)
        expandedEmployeeCardId.setId('')
    }

    const isFired = employee.employeeType === 'fired'
    let isChangeEmployeeTypeFormShown = false

    const { open } = getContext('simple-modal')
</script>

<div class={`${cn()} ${isFired ? cn('Fired') : ''}`}>
    <div class={cn('Header')} on:click={() => expandedEmployeeCardId.setId(isEmployeeCardOpened ? '' : employee.id)}>
        <div class={cn('HeaderInfo')}>
            <div on:dblclick={() => handleInfoChange('name')}>
                <b>ПІБ</b>: {employee.name}
            </div>
            <div on:dblclick={() => handleInfoChange('position')}>
                <b>Посада</b>: {employee.position}
            </div>
        </div>
        <AngleRightIcon dropped={isEmployeeCardOpened} />
    </div>
    <div hidden={!isEmployeeCardOpened} class={cn('Vacations')}>
        <div>
            <b>Дата прийняття</b>:
            {#if employee?.hiredAt}
                {employee?.hiredAt?.toDate().toLocaleDateString('uk-UA') || '--'}
            {:else}
                <button
                    on:click={() =>
                        open(DatepickerModal, {
                            onClose: date => setEmployeeHiredAt(employee.id, dbTimestamp.fromDate(date)),
                        })}
                >
                    Додати дату прийняття
                </button>
            {/if}
        </div>
        <div>
            <b>Дата звільнення</b>:
            {#if employee?.firedAt}
                {employee?.firedAt?.toDate().toLocaleDateString('uk-UA') || '--'}
            {:else}
                <button
                    on:click={() =>
                        open(DatepickerModal, {
                            onClose: date =>
                                confirm(
                                    'Ви точно бажаєте вказати дату звільнення? У такому разі співробітника буде переведено до категорії "Звільнені"',
                                ) &&
                                setEmployeeFiredAt(employee.id, dbTimestamp.fromDate(date)) &&
                                changeEmployeeType(employee, 'fired') &&
                                employeeTypeFilter.setType('fired'),
                        })}
                >
                    Додати дату звільнення
                </button>
            {/if}
        </div>
        {#if employee?.firedAt && employee?.hiredAt}
            <b>Кількість відпрацьованих днів: </b>{dayjs(employee?.firedAt?.toDate()).businessDiff(
                dayjs(employee?.hiredAt?.toDate()),
            )}
        {/if}
        <div class={cn('VacationsHeader')}><b>Відпустки</b>:</div>
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
        <button on:click={handleDeleteEmployee} class={cn('Button')}>
            <TrashIcon />
        </button>
    </div>
</div>

<style lang="scss">
    .Employee {
        text-align: start;
        border: 2px solid #15bd2e;
        margin: 10px 0;

        &-Fired {
            border-color: #bd1b15;
        }

        &-Header {
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            padding: 15px;
        }

        &-HeaderInfo {
            display: flex;
            flex-direction: column;
        }

        &-Vacations {
            padding: 15px;
            padding-top: 0;
        }

        &-VacationsHeader {
            border-bottom: 1px solid #000;
            margin-bottom: 5px;
            padding-bottom: 5px;
        }

        &-Button {
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 4px;
            border-radius: 15px;
            margin: 0;
            display: block;

            &:hover {
                background: #acacac3d;
                transition: 'background' 0.3s;
            }
        }
    }
</style>
