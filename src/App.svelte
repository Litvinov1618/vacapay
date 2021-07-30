<script lang="ts">
    import EmployeeForm from './EmployeeForm.svelte'

    let isAddEmployeeFormOpened = false

    let employeeList: Array<Employee> = [
        {
            name: 'Пупкин Василий Василиевич',
            position: 'Охранник',
        },
        {
            name: 'Александровна Александра Александровна',
            position: 'Учитель',
        }
    ]

    const addEmployee = (newEmployee: Employee) => {
        employeeList = [...employeeList, newEmployee]
        isAddEmployeeFormOpened = false
    }
</script>

<script context="module" lang="ts">
    export type Position = 'Учитель' | 'Уборщица' | 'Охранник'

    export interface Employee {
        name: string
        position: Position
    }
</script>

<main class="Main">
    <h1 class="Main-Header">Vacapay alfa</h1>
    <button
        on:click={() => isAddEmployeeFormOpened = true}
        class="Main-AddButton"
    >
        Добавить нового сотрудника
    </button>
    {#if isAddEmployeeFormOpened}
        <EmployeeForm {addEmployee} />
    {/if}
    {#if employeeList}
        {#each employeeList as { name, position }}
            <div class="Main-Employee">
                <div><b>ФИО</b>: {name}</div>
                <div><b>Должность</b>: {position}</div>
            </div>
        {/each}
    {/if}
</main>

<style>
    .Main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    @media (min-width: 640px) {
        .Main {
            max-width: none;
        }
    }

    .Main-Header {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
        margin-top: 5px;
    }

    .Main-AddButton {
        text-align: start;
    }

    .Main-Employee {
        padding-bottom: 15px;
    }
</style>