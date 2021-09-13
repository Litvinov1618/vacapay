export type EmployeeType =
    'teacher' | 'administration' | 'supportStaff' | 'technicalStaff' | 'serviceStaff' | 'fired'
export type VacationType =
    'main' | 'forSpecialNatureOfWork' | 'social' | 'forEmployeeWish' | 'byAgreement'

export type Vacation = {
    type: VacationType
    isPaid: boolean
    vacationDays: number
    totalDays: number
}

export interface EmployeeData {
    id: string
    name: string
    position: string
    employeeType: EmployeeType
    vacations: Array<Vacation>
}

export type EmployeeList = Array<EmployeeData>