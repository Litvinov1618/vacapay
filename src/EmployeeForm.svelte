<script lang="ts">
    import { Link, useNavigate } from 'svelte-navigator'
    import initCn from './cn'
    import { employeeList, employeeTypes } from './stores'
    import type { EmployeeType } from './types'

    const cn = initCn('EmployeeForm')
    let employeeName: string, employeeType: EmployeeType, position: string
    const navigate = useNavigate()

    const handleFormSubmit = () => {
        if (employeeName && employeeType && position) {
            employeeList
                .addEmployee({ name: employeeName, employeeType, position, vacations: [] })
                .then(() => navigate('/'))
        }
    }
</script>

<form action="submit" on:submit|preventDefault={handleFormSubmit} class={cn()}>
    <Link to="/">Назад</Link>
    <label class={cn('Label')}>
        ПІБ Працівника
        <input type="text" class={cn('Input')} bind:value={employeeName} required />
    </label>
    <label class={cn('Label')}>
        Посада
        <input type="text" class={cn('Input')} bind:value={position} required />
    </label>
    <label class={cn('Label')}>
        Тип посади
        <select class={cn('Input')} bind:value={employeeType} required>
            <option value="" selected disabled hidden />
            {#each Object.keys(employeeTypes).filter(key => key !== 'fired') as employeeType}
                <option value={employeeType}>{employeeTypes[employeeType]}</option>
            {/each}
        </select>
    </label>
    <button type="submit">Додати працівника до бази</button>
</form>

<style lang="scss">
    .EmployeeForm {
        max-width: 500px;
        margin: 0 auto;
        padding: 20px 0;

        &-Input {
            display: block;
            margin-top: 10px;
        }

        &-Label {
            display: flex;
            flex-direction: column;
            text-align: start;
        }
    }
</style>
