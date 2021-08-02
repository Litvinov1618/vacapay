<script lang="ts">
    import Employee from './Employee.svelte'

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
                },
            ],
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
            ],
        },
    ]

    const changeEmployeeVacationDays =
        (selectedEmployee: EmployeeData, selectedVacation: Vacation, daysToDeduct: number) => {
        const newEmployeeList = employeeList.map(employee => {
            if (employee.name !== selectedEmployee.name) return employee
            return { ...employee, vacations: employee.vacations.map(vacation => {
                if (vacation.type !== selectedVacation.type) return vacation
                return { ...vacation, vacationDays: vacation.vacationDays - daysToDeduct }
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

    export interface EmployeeData {
        name: string
        position: string
        employeeType: EmployeeType
        vacations: Array<Vacation>
    }

    export type EmployeeList = Array<EmployeeData>;
</script>

<main class="Main">
    <h1 class="Main-Header">Vacapay alfa</h1>
    {#each employeeList as employee}
        <Employee employee={employee} changeEmployeeVacationDays={changeEmployeeVacationDays} />
    {/each}
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

</style>