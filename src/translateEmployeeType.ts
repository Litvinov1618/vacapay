import type { EmployeeType } from './types'

const translateEmployeeType = (employeeType: EmployeeType) => {
    switch (employeeType) {
        case 'administration': return 'Адміністрація'
        case 'fired': return 'Звільнені'
        case 'serviceStaff': return 'Обслуговуючий персонал'
        case 'supportStaff': return 'Допоміжний персонал'
        case 'teacher': return 'Вчителі'
        case 'technicalStaff': return 'Технічний персонал'
    }
}

export default translateEmployeeType