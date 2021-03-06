import { writable } from 'svelte/store'
import db from './firebase/firebase'
import type dbTimestamp from './dbTimestamp'
import type { EmployeeData, EmployeeType, Vacation, VacationType } from './types'

const createEmployeeList = () => {
    const { subscribe, set } = writable([])

    db.onSnapshot(doc => {
        const employeeList = []
        doc.forEach(element => employeeList.push({ ...element.data(), id: element.id }))

        set(employeeList.sort((a, b) => a.name.localeCompare(b.name, 'ua')))
    })

    const updateEmployeeInfo = (id: string, newData: Partial<EmployeeData>) => db.doc(id).update(newData)

    return {
        subscribe,
        deleteEmployee: (id: string) => db.doc(id).delete(),
        changeEmployeeInfo: (id: string, newInfo: EmployeeData) => updateEmployeeInfo(id, newInfo),
        changeEmployeeVacationDays: (employee: EmployeeData, selectedVacation: Vacation, daysToDeduct: number) =>
            updateEmployeeInfo(employee.id, {
                vacations: employee.vacations.map(vacation => {
                    if (vacation.type !== selectedVacation.type) return vacation
                    return { ...vacation, vacationDays: vacation.vacationDays - daysToDeduct }
                }),
            }),
        changeEmployeeTotalVacationDays: (
            employee: EmployeeData,
            selectedVacation: Vacation,
            newTotalVacationDays: number,
        ) =>
            updateEmployeeInfo(employee.id, {
                ...employee,
                vacations: employee.vacations.map(vacation => {
                    if (vacation.type !== selectedVacation.type) return vacation
                    return {
                        ...vacation,
                        totalDays: newTotalVacationDays,
                        vacationDays: newTotalVacationDays,
                    }
                }),
            }),
        addEmployee: (employee: Omit<EmployeeData, 'id'>) => db.add(employee),
        addVacationsGroup: (employee: EmployeeData, newVacationsGroup: Vacation) =>
            updateEmployeeInfo(employee.id, { vacations: [...employee.vacations, newVacationsGroup] }),
        changeEmployeeType: (employee: EmployeeData, newType: EmployeeType) =>
            updateEmployeeInfo(employee.id, { employeeType: newType }),
        setEmployeeHiredAt: (id: string, hiredAt: dbTimestamp) => updateEmployeeInfo(id, { hiredAt }),
        setEmployeeFiredAt: (id: string, firedAt: dbTimestamp) => updateEmployeeInfo(id, { firedAt }),
    }
}

export const employeeList = createEmployeeList()

export const vacationTypes: Record<VacationType, string> = {
    main: '??????????????',
    forSpecialNatureOfWork: '???? ?????????????????? ???????????????? ??????????',
    social: '??????????????????',
    forEmployeeWish: '???? ???????????????? ????????????????????',
    byAgreement: '???? ???????????? ????????????',
}

export const employeeTypes: Record<EmployeeType, string> = {
    administration: '??????????????????????????',
    fired: '??????????????????',
    serviceStaff: '?????????????????????????? ????????????????',
    supportStaff: '???????????????????? ????????????????',
    teacher: '??????????????',
    technicalStaff: '?????????????????? ????????????????',
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
