import { writable } from 'svelte/store'
import db from './firebase/firebase'
import type { EmployeeData, EmployeeType, Vacation, VacationType } from './types'

const createEmployeeList = () => {
    const { subscribe, set } = writable([])

    db.onSnapshot(doc => {
        const employeeList = []
        doc.forEach(element => employeeList.push({ ...element.data(), id: element.id }))

        set(employeeList.sort((a, b) => a.name.localeCompare(b.name, 'ua')))
    })

    const updateEmployeeInfo = (employeeId: string, newEmployeeData: unknown) =>
        db.doc(employeeId).update(newEmployeeData)

    return {
        subscribe,
        fireEmployee: (employeeId: string) => db.doc(employeeId).delete(),
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
        addEmployee: (employeeToAdd: Omit<EmployeeData, 'id'>) => db.add(employeeToAdd),
        addVacationsGroup: (selectedEmployee: EmployeeData, newVacationsGroup: Vacation) =>
            updateEmployeeInfo(selectedEmployee.id, { vacations: [...selectedEmployee.vacations, newVacationsGroup] }),
        changeEmployeeType: (employeeToChange: EmployeeData, newEmployeeType: EmployeeType) =>
            updateEmployeeInfo(employeeToChange.id, { employeeType: newEmployeeType }),
    }
}

export const employeeList = createEmployeeList()

export const vacationTypes: Record<VacationType, string> = {
    main: 'Основна',
    forSpecialNatureOfWork: 'За особливий характер праці',
    social: 'Соціальна',
    forEmployeeWish: 'За бажанням працівника',
    byAgreement: 'За згодою сторін',
}

export const employeeTypes: Record<EmployeeType, string> = {
    administration: 'Адміністрація',
    fired: 'Звільнені',
    serviceStaff: 'Обслуговуючий персонал',
    supportStaff: 'Допоміжний персонал',
    teacher: 'Вчителі',
    technicalStaff: 'Технічний персонал',
}

const createEmployeeTypeFilter = () => {
    const { subscribe, set } = writable<EmployeeType | null>(null)
    return { subscribe, setType: (newType: EmployeeType) => set(newType) }
}

const createExpandedEmployeeCardId = () => {
    const { subscribe, set } = writable('')
    return { subscribe, setId: (contentId: string) => set(contentId) }
}

export const expandedEmployeeCardId = createExpandedEmployeeCardId()

export const employeeTypeFilter = createEmployeeTypeFilter()
