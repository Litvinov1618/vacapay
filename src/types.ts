export type EmployeeType =
    'Вчитель' | 'Адміністрація' | 'Допоміжний персонал' | 'Технічний персонал' | 'Обслуговуючий персонал' | 'Звільнені'
export type VacationType =
    'Основна' | 'За особливий характер праці' | 'Соціальна' | 'За бажанням працівника' | 'За згодою сторін'

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

export type EmployeeList = Array<EmployeeData>