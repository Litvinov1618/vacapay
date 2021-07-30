<script lang="ts">
    import type { Employee, Position } from './App.svelte'

    export let addEmployee: (newEmployee: Employee) => void

    let name: string, position: Position

    const handleFormSubmit = (event: Event) => {
        event.preventDefault()
        if (name && position) addEmployee({ name, position })
    }
</script>

<form action="submit" on:submit={handleFormSubmit} class="Main-Form">
    <label class="Main-Label">
        ФИО сотрудника
        <input
            type="text"
            class="Main-Input"
            placeholder="Пупкин Василий Василиевич"
            bind:value={name}
            required
        >
    </label>
    <label class="Main-Label">
        Должность
        <select class="Main-Input" bind:value={position} required>
            <option value="" selected disabled hidden></option>
            <option value="Учитель">Учтитель</option>
            <option value="Уборщица">Уборщица</option>
            <option value="Охранник">Охранник</option>
        </select>
    </label>
    <button type="submit">Добавить сотрудника</button>
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
</style>