
<!-- This feature is disabled because of low priority -->

<!-- <script lang="ts">
    import type { Employee, PositionType } from './App.svelte'

    export let addEmployee: (newEmployee: Employee) => void

    const positions = [
        {
            positionType: 'Вчитель',
            vacationDays: 56,
        },
        {
            positionType: 'Адміністрація',
            vacationDays: 56,
        },
        {
            vacationType: 'Допоміжний персонал',
            vacationDays: 56
        },
        {
            vacationType: 'Технічний персонал',
            vacationDays: 31,
        },
        {
            vacationType: 'Обслуговуючий персонал',
            vacationDays: 24,
        }
    ]

    let name: string, position: PositionType

    const handleFormSubmit = (event: Event) => {
        event.preventDefault()
        if (name && position) addEmployee({ name, position })
    }
</script>

<form action="submit" on:submit={handleFormSubmit} class="Main-Form">
    <label class="Main-Label">
        ПІБ Працівника
        <input
            type="text"
            class="Main-Input"
            bind:value={name}
            required
        >
    </label>
    <label class="Main-Label">
        Посада
        <input
            type="text"
            class="Main-Input"
            bind:value={name}
            required
        >
    </label>
    <label class="Main-Label">
        Тип посади
        <select class="Main-Input" bind:value={position} required>
            <option value="" selected disabled hidden></option>
        </select>
    </label>
    <button type="submit">Додати працівника до бази</button>
</form>

<style>
    .Main-Input {
        display: block;
        margin-top: 10px;
    }

    .Main-Form {
        max-width: 500px;
        margin: 0 auto;
        padding: 20px 0;
    }

    .Main-Label {
        display: flex;
        flex-direction: column;
        text-align: start;
    }
</style> -->