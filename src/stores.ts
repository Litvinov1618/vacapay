import { writable } from 'svelte/store'
import { employeeList as initialEmployeeList } from './employeeList'
import type { EmployeeData, EmployeeList, Vacation } from './types'

const createEmployeeList = () => {
    const { subscribe, update } = writable(initialEmployeeList as EmployeeList)

    return {
        subscribe,
        removeEmployee:
            (employeeToRemove: EmployeeData) =>
                update(employeeList =>
                    employeeList.filter(employee => JSON.stringify(employee) !== JSON.stringify(employeeToRemove))
                ),
        changeEmployeeInfo:
            (employeeToChange: EmployeeData, newEmployeeInfo: EmployeeData) =>
                update(employeeList =>
                    employeeList.map(employee => {
                        if (JSON.stringify(employee) === JSON.stringify(employeeToChange)) {
                            return newEmployeeInfo
                        }
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
                    })),
        addEmployee: (employeeToAdd: EmployeeData) => update(employeeList => [...employeeList, employeeToAdd]),
    }
}

const employeeList = createEmployeeList()

export default employeeList