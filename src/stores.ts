import { readable, writable } from 'svelte/store'
import db from './firebase/firebase'
import type { EmployeeData, EmployeeType, Vacation } from './types'

const createEmployeeList = () => {
    const { subscribe, set } = writable([])

    const updateStore = () => {
        db.get().then(querySnapshot => {
            const employeeList = []
            querySnapshot.forEach(element => employeeList.push({ ...element.data(), id: element.id }))

            set(employeeList)
        })
    }

    const updateEmployeeInfo = (employeeId: string, newEmployeeData: unknown) =>
        db.doc(employeeId).update(newEmployeeData).then(updateStore)

    updateStore()

    return {
        subscribe,
        fireEmployee: (employeeId: string) => db.doc(employeeId).delete().then(updateStore),
        changeEmployeeInfo: (employeeId: string, newEmployeeInfo: EmployeeData) =>
            updateEmployeeInfo(employeeId, newEmployeeInfo),
        changeEmployeeVacationDays: (
            selectedEmployee: EmployeeData,
            selectedVacation: Vacation,
            daysToDeduct: number,
        ) =>
            updateEmployeeInfo(selectedEmployee.id, {
                vacations: selectedEmployee.vacations.map(vacation => {
                    if (vacation.type !== selectedVacation.type) return vacation
                    return { ...vacation, vacationDays: vacation.vacationDays - daysToDeduct }
                }),
            }),
        changeEmployeeTotalVacationDays: (
            selectedEmployee: EmployeeData,
            selectedVacation: Vacation,
            newTotalVacationDays: number,
        ) =>
            updateEmployeeInfo(selectedEmployee.id, {
                ...selectedEmployee,
                vacations: selectedEmployee.vacations.map(vacation => {
                    if (vacation.type !== selectedVacation.type) return vacation
                    return {
                        ...vacation,
                        totalDays: newTotalVacationDays,
                        vacationDays: newTotalVacationDays,
                    }
                }),
            }),
        addEmployee: (employeeToAdd: Omit<EmployeeData, 'id'>) => db.add(employeeToAdd).then(updateStore),
        addVacationsGroup: (selectedEmployee: EmployeeData, newVacationsGroup: Vacation) =>
            updateEmployeeInfo(selectedEmployee.id, { vacations: [...selectedEmployee.vacations, newVacationsGroup] }),
        changeEmployeeType: (employeeToChange: EmployeeData, newEmployeeType: EmployeeType) =>
            updateEmployeeInfo(employeeToChange.id, { employeeType: newEmployeeType }),
    }
}

export const employeeList = createEmployeeList()

export const EMPLOYEE_TYPES: Array<EmployeeType> = [
    'teacher',
    'administration',
    'supportStaff',
    'technicalStaff',
    'serviceStaff',
    'fired',
]

const createEmployeeTypeFilter = () => {
    const { subscribe, set } = writable<EmployeeType | null>(null)
    return { subscribe, setType: (newType: EmployeeType) => set(newType) }
}

export const employeeTypeFilter = createEmployeeTypeFilter()
