import { derived, writable } from 'svelte/store'
import mockedEmployeeList from './mockedEmployeeList'
import type { EmployeeData, EmployeeList, EmployeeType, Vacation } from './types'

const createEmployeeList = () => {
    const { subscribe, update } = writable(mockedEmployeeList as EmployeeList)

    return {
        subscribe,
        fireEmployee:
            (employeeToRemove: EmployeeData) =>
                update(employeeList =>
                    employeeList.map((employee: EmployeeData) => {
                        if (JSON.stringify(employee) !== JSON.stringify(employeeToRemove)) return employee
                        return { ...employee, employeeType: 'fired' }
                    })
                ),
        changeEmployeeInfo:
            (employeeToChange: EmployeeData, newEmployeeInfo: EmployeeData) =>
                update(employeeList =>
                    employeeList.map(employee => {
                        if (JSON.stringify(employee) === JSON.stringify(employeeToChange)) return newEmployeeInfo
                        return employee
                    })
                ),
        changeEmployeeVacationDays:
            (selectedEmployee: EmployeeData, selectedVacation: Vacation, daysToDeduct: number) =>
                update(employeeList =>
                    employeeList.map(employee => {
                        if (JSON.stringify(employee) !== JSON.stringify(selectedEmployee)) return employee
                        return { ...employee, vacations: employee.vacations.map(vacation => {
                            if (vacation.type !== selectedVacation.type) return vacation
                            return { ...vacation, vacationDays: vacation.vacationDays - daysToDeduct }
                        })}
                    })
                ),
        changeEmployeeTotalVacationDays:
            (selectedEmployee: EmployeeData, selectedVacation: Vacation, newTotalVacationDays: number) =>
                update(employeeList =>
                    employeeList.map(employee => {
                        if (JSON.stringify(employee) !== JSON.stringify(selectedEmployee)) return employee
                        return { ...employee, vacations: employee.vacations.map(vacation => {
                            if (vacation.type !== selectedVacation.type) return vacation
                            return {
                                ...vacation,
                                totalDays: newTotalVacationDays,
                                vacationDays: newTotalVacationDays,
                            }
                        })}
                    })
                ),
        addEmployee: (employeeToAdd: EmployeeData) => update(employeeList => [...employeeList, employeeToAdd]),
        addVacationsGroup: (selectedEmployee: EmployeeData, newVacationsGroup: Vacation) => update(employeeList => {
            const newEmployeeList = [ ...employeeList ]

            newEmployeeList
                .find(employee => JSON.stringify(employee) === JSON.stringify(selectedEmployee))
                .vacations.push(newVacationsGroup)

            return newEmployeeList
        }),
        changeEmployeeType: (employeeToChange: EmployeeData, newEmployeeType: EmployeeType) =>
            update(employeeList =>
                employeeList.map(employee => {
                    if (JSON.stringify(employee) !== JSON.stringify(employeeToChange)) return employee
                    return { ...employee, employeeType: newEmployeeType }
                })
            )
    }
}

export const employeeList = createEmployeeList()

export const employeeTypes = derived(employeeList, $employeeList => {
    const employeeTypes: Array<EmployeeType> = []
    $employeeList
        .map(employee => !employeeTypes.includes(employee.employeeType) && employeeTypes.push(employee.employeeType))

    return employeeTypes
})

const createEmployeeTypeFilter = () => {
    const { subscribe, set } = writable<EmployeeType | null>(null)
    return { subscribe, setType: (newType: EmployeeType) => set(newType) }
}

export const employeeTypeFilter = createEmployeeTypeFilter()
