import type { VacationType } from './types'

const translateEmployeeType = (employeeType: VacationType) => {
    switch (employeeType) {
        case 'main': return 'Основна'
        case 'forSpecialNatureOfWork': return 'За особливий характер праці'
        case 'social': return 'Соціальна'
        case 'forEmployeeWish': return 'За бажанням працівника'
        case 'byAgreement': return 'За згодою сторін'
    }
}

export default translateEmployeeType