
import { readable, writable } from 'svelte/store'
import db from './firebase/firebase'
import type { EmployeeData, EmployeeType, Vacation } from './types'

const createEmployeeList = () => {
    const { subscribe, update, set } = writable([])

    const updateStore = () => {
        db.get().then(querySnapshot => {
            const employeeList = []
            querySnapshot.forEach(element => employeeList.push({ ...element.data(), id: element.id }))
    
            set(employeeList)
            console.log(employeeList)
        })
    }

    updateStore()

    return {
        subscribe,
        fireEmployee: (employeeId: string) => db.doc(employeeId).delete().then(updateStore),
        changeEmployeeInfo: (employeeId: string, newEmployeeInfo: EmployeeData) =>
            db.doc(employeeId).update(newEmployeeInfo).then(updateStore),
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
        addEmployee: (employeeToAdd: Omit<EmployeeData, 'id'>) => db.add(employeeToAdd).then(updateStore),
        addVacationsGroup: (selectedEmployee: EmployeeData, newVacationsGroup: Vacation) => db.doc(selectedEmployee.id)
            .update({ vacations: [ ...selectedEmployee.vacations, newVacationsGroup ] }).then(updateStore),
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

export const employeeTypes = readable<Array<EmployeeType>>(
    ['teacher', 'administration', 'supportStaff', 'technicalStaff', 'serviceStaff', 'fired']
)

const createEmployeeTypeFilter = () => {
    const { subscribe, set } = writable<EmployeeType | null>(null)
    return { subscribe, setType: (newType: EmployeeType) => set(newType) }
}

export const employeeTypeFilter = createEmployeeTypeFilter()
