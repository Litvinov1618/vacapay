<script>
    let isAddEmployeeFormOpened = true

    const showEmployee = () => isAddEmployeeFormOpened = true

    const addEmployee = (event) => {
        event.preventDefault();
        console.log(event);
    }
</script>

<main class="Main">
    <h1 class="Main-Header">Vacapay alfa</h1>
    <button on:click={showEmployee} class="Main-AddButton">Добавить нового сотрудника</button>
    {#if isAddEmployeeFormOpened}
        <form action="submit" on:submit={addEmployee} class="Main-Form">
            <label class="Main-Label">
                ФИО сотрудника
                <input type="text" class="Main-Input" placeholder="Пупкин Василий Василиевич">
            </label>
            <label class="Main-Label">
                Должность
                <select class="Main-Input">
                    <option value="" selected disabled hidden></option>
                    <option value="teacher">Учтитель</option>
                    <option value="housemaid">Уборщица</option>
                    <option value="guard">Охранник</option>
                </select>
            </label>
            <button type="submit">Добавить сотрудника</button>
        </form>
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

    .Main-AddButton {
        text-align: start;
    }
</style>