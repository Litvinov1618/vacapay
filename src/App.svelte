<script lang="ts">
    let employeeList: EmployeeList = [
        {
            name: 'Мятович Ірина Володимирівна',
            employeeType: 'Адміністрація',
            position: 'Директор',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
                {
                    type: 'За бажанням працівника',
                    isPaid: false,
                    vacationDays: 2,
                    totalDays: 2,
                }
            ]
        },
        {
            name: 'Давиденко Іван Олександрович',
            position: 'Вчитель української мови та літератури',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
                {
                    type: 'Соціальна',
                    isPaid: true,
                    vacationDays: 10,
                    totalDays: 10,
                }
            ]
        },
    ]

    const deductVacationPay = (name: string, selectedVacation: Vacation) => {
        const daysToDeduct = window.prompt(`На скільки днів ${name} бере відпустку?`);

        if (+daysToDeduct > selectedVacation.vacationDays) {
            alert('Кільіксть днів більша допустимої')
            return
        }

        if (daysToDeduct === '' || isNaN(+daysToDeduct)) {
            alert('Ви маєте передати число')
            return
        }

        const newEmployeeList = employeeList.map(employee => {
            if (employee.name !== name) return employee
            return { ...employee, vacations: employee.vacations.map(vacation => {
                if (vacation.type !== selectedVacation.type) return vacation
                return { ...vacation, vacationDays: vacation.vacationDays - +daysToDeduct }
            })}
        })

        employeeList = newEmployeeList
    }
</script>

<script context="module" lang="ts">
    export type EmployeeType = 'Вчитель' | 'Адміністрація' | 'Допоміжний персонал' | 'Технічний персонал' | 'Обслуговуючий персонал'
    export type VacationType = 'Основна'| 'За особливий характер праці' | 'Соціальна' | 'За бажанням працівника' | 'За згодою сторін'

    export type Vacation = {
        type: VacationType
        isPaid: boolean
        vacationDays: number
        totalDays: number
    }
    export interface Employee {
        name: string
        position: string
        employeeType: EmployeeType
        vacations: Array<Vacation>
    }

    export type EmployeeList = Array<Employee>;
</script>

<main class="Main">
    <h1 class="Main-Header">Vacapay alfa</h1>
    {#if employeeList}
        {#each employeeList as employee}
            <div class="Main-Employee">
                <div><b>ПІБ</b>: {employee.name}</div>
                <div><b>Посада</b>: {employee.position}</div>
                <div style="padding: 10px 0; border-bottom: 1px solid black"><b>Відпустки</b>:</div>
                {#each employee.vacations as vacation}
                    <div>
                        <b>{vacation.type}</b>: {vacation.vacationDays} з {vacation.totalDays} днів
                        {#if vacation.isPaid}
                            (Оплачувана)
                            {:else}
                            (Неоплачувана)
                        {/if}
                        <button on:click={() => deductVacationPay(employee.name, vacation)}>Відняти відпускні</button>
                    </div>
                {/each}
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


    .Main-Employee {
        padding: 15px;
        text-align: start;
        border: 2px solid green;
        margin-bottom: 15px;
    }
</style>