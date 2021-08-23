<script lang="ts">
    export let onAddEmployee: (newEmployee: Omit<EmployeeData, 'id'>) => void

    import { employeeTypes } from './stores'
    import translateEmployeeType from './translateEmployeeType'
    import type { EmployeeData, EmployeeType } from './types'

    let name: string, employeeType: EmployeeType, position: string

    const handleFormSubmit = () => {
        if (name && employeeType && position) onAddEmployee({ name, employeeType, position, vacations: [] })
    }
</script>

<form action="submit" on:submit|preventDefault={handleFormSubmit} class="EmployeeForm">
    <label class="EmployeeForm-Label">
        ПІБ Працівника
        <input type="text" class="EmployeeForm-Input" bind:value={name} required />
    </label>
    <label class="EmployeeForm-Label">
        Посада
        <input type="text" class="EmployeeForm-Input" bind:value={position} required />
    </label>
    <label class="EmployeeForm-Label">
        Тип посади
        <select class="EmployeeForm-Input" bind:value={employeeType} required>
            <option value="" selected disabled hidden />
            {#each $employeeTypes as employeeType}
                <option value={employeeType}>{translateEmployeeType(employeeType)}</option>
            {/each}
        </select>
    </label>
    <button type="submit">Додати працівника до бази</button>
</form>

<style>
    .EmployeeForm-Input {
        display: block;
        margin-top: 10px;
    }

    .EmployeeForm {
        max-width: 500px;
        margin: 0 auto;
        padding: 20px 0;
    }

    .EmployeeForm-Label {
        display: flex;
        flex-direction: column;
        text-align: start;
    }
</style>
