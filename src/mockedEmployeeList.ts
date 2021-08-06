const mockedEmployeeList = [
    {
        name: 'Давиденко Іван Олександрович',
        position: 'Вчитель української мови та літератури',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Монько Ніна Дмитрівна',
        position: 'Вчитель російської мови та літератури"',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Касярум Тетяна Володимирівна',
        position: 'Вчитель української мови та літератури',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Біла Тетяна Петрівна',
        position: 'Вчитель української мови та літератури',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Легка Юлія Миколаївна',
        position: 'Вчитель інформатики',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Дятлова Олена Анатоліївна',
        position: 'Вчитель',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Прохач Валентина Федорівна',
        position: 'Вчитель математики',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Калмикова Вікторія Валеріївна',
        position: 'Вчитель математики',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Уманська Тетяна Миколаївна',
        position: 'Вчитель фізики',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Лазарєва Тетяна Петрівна',
        position: 'Вчитель хімії',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Іголкіна Яна В’ячеславівна',
        position: 'Вчитель біології',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Цьомко Віта Степанівна',
        position: 'Вчитель історії',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Трубчанінова Тетяна Петрівна',
        position: 'Вчитель географії',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Григор’єв Артем Сергійович',
        position: 'Вчитель фізичної культури',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Морозова Тетяна Михайлівна',
        position: 'Методист з профорієнтації',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 42,
                totalDays: 42,
            },
        ],
    },
    {
        name: 'Перерва Світлана Вікторівна',
        position: 'Вчитель інформатики',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Щербина Ярослава Анатоліївна',
        position: 'Вчитель історії',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Вовк Ольга Вікторівна',
        position: 'Вчитель англійської мови',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Мазур Інна Сергіївна',
        position: 'Вчитель англійської мови',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Біда Юля Петрівна',
        position: 'Вчитель української мови та літератури',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Зайдуліна Вікторія Вікторівна',
        position: 'Вчитель англійської мови',
        employeeType: 'teacher',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Мятович Ірина Володимирівна',
        position: 'Директор',
        employeeType: 'administration',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            }
        ],
    },
    {
        name: 'Смьордова Ольга Володимирівна',
        position: 'Заступник директора з НВР',
        employeeType: 'administration',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            }
        ],
    },
    {
        name: 'Бабаніна Ольга Петрівна',
        position: 'Заступник директора з НВР',
        employeeType: 'administration',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            }
        ],
    },
    {
        name: 'Дем’яник Олена Геннадіївна',
        position: 'Заступник директора з ВР',
        employeeType: 'administration',
        vacations: [
            {
                type: 'main',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            }
        ],
    },
    {
        name: 'Оріян Анастасія Олександрівна',
        position: 'Практичний психолог',
        employeeType: 'supportStaff',
        vacations: [
            {
                totalDays: 56,
                vacationDays: 56,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Качан Анастасія Романівна',
        position: 'Соціальний педагог',
        employeeType: 'supportStaff',
        vacations: [
            {
                totalDays: 56,
                vacationDays: 56,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Петрова Віра Вікторівна',
        position: 'Завідуюча господарством',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 31,
                vacationDays: 31,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Школа Наталія Миколаївна',
        position: 'Інспектор з кадрів та діловодства',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 31,
                vacationDays: 31,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Сухар Ольга Іванівна',
        position: 'Інженер з охорони праці',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 31,
                vacationDays: 31,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Дузенко Яна Олегівна',
        position: 'Інженер-електронік',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 31,
                vacationDays: 31,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Казаков Сергій Геннадійович',
        position: 'Робітник',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Порошина Марина Василівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Петрухіна Людмила Іванівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Олійник Тетяна Олександрівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Кодиця Валентина Іванівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Бондаренко Наталія Олександрівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Сагайдачна Валентина Олексіївна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Назаренко Юрій Михайлович',
        position: 'Сторож',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Дубогрій Анатолій Іванович',
        position: 'Сторож',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Чорний Костянтин Григорович',
        position: 'Сторож',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Пічуєва Марина Іванівна',
        position: 'Медична сестра',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Волошина Олена Леонідівна',
        position: 'Бібліотекар',
        employeeType: 'technicalStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Казаков Сергій Геннадійович',
        position: 'Робітник',
        employeeType: 'serviceStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Порошина Марина Василівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'serviceStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Петрухіна Людмила Іванівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'serviceStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Олійник Тетяна Олександрівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'serviceStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Кодиця Валентина Іванівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'serviceStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Бондаренко Наталія Олександрівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'serviceStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Сагайдачна Валентина Олексіївна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'serviceStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Назаренко Юрій Михайлович',
        position: 'Сторож',
        employeeType: 'serviceStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Дубогрій Анатолій Іванович',
        position: 'Сторож',
        employeeType: 'serviceStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
    {
        name: 'Чорний Костянтин Григорович',
        position: 'Сторож',
        employeeType: 'serviceStaff',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'main',
            },
        ],
    },
]


export default mockedEmployeeList
