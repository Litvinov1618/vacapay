<script lang="ts">
    export let employee: EmployeeData

    import { employeeList, vacationTypes } from './stores'
    import type { EmployeeData, VacationType } from './types'

    let isAddVacationGroupFormShown = false

    let totalDays: number, isPaid: boolean, vacationType: VacationType

    const handleNewVacationsGroupSubmit = () => {
        employeeList.addVacationsGroup(employee, {
            isPaid,
            type: vacationType,
            vacationDays: totalDays,
            totalDays,
        })

        isAddVacationGroupFormShown = false
    }
</script>

{#if !isAddVacationGroupFormShown}
    <div>
        <button on:click={() => (isAddVacationGroupFormShown = true)}>Додати новий тип відпустки</button>
    </div>
{/if}
{#if isAddVacationGroupFormShown}
    <form action="submit" on:submit|preventDefault={handleNewVacationsGroupSubmit}>
        <select bind:value={vacationType}>
            {#each Object.keys(vacationTypes) as type}
                <option value={type}>{vacationTypes[type]}</option>
            {/each}
        </select>
        <input type="number" placeholder="Кількість днів" bind:value={totalDays} />
        <select bind:value={isPaid}>
            <option value={true}>Оплачувана</option>
            <option value={false}>Неоплачувана</option>
        </select>
        <div>
            <button type="submit">Додати</button>
        </div>
    </form>
{/if}
