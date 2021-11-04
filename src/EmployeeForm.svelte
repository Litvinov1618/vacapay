<script lang="ts">
    import { employeeList, employeeTypes } from './stores'
    import { Link, useNavigate } from 'svelte-navigator'

    import type { EmployeeType } from './types'

    let name: string, employeeType: EmployeeType, position: string
    const navigate = useNavigate()

    const handleFormSubmit = () => {
        if (name && employeeType && position) {
            employeeList.addEmployee({ name, employeeType, position, vacations: [] }).then(() => navigate('/'))
        }
    }
</script>

<form action="submit" on:submit|preventDefault={handleFormSubmit} class="EmployeeForm">
    <Link to="/">Назад</Link>
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
            {#each Object.keys(employeeTypes).filter(key => key !== 'fired') as employeeType}
                <option value={employeeType}>{employeeTypes[employeeType]}</option>
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
