const mockedEmployeeList = [
    {
        name: 'Давиденко Іван Олександрович',
        position: 'Вчитель української мови та літератури',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Монько Ніна Дмитрівна',
        position: 'Вчитель російської мови та літератури"',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Касярум Тетяна Володимирівна',
        position: 'Вчитель української мови та літератури',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Біла Тетяна Петрівна',
        position: 'Вчитель української мови та літератури',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Легка Юлія Миколаївна',
        position: 'Вчитель інформатики',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Дятлова Олена Анатоліївна',
        position: 'Вчитель',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Прохач Валентина Федорівна',
        position: 'Вчитель математики',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Калмикова Вікторія Валеріївна',
        position: 'Вчитель математики',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Уманська Тетяна Миколаївна',
        position: 'Вчитель фізики',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Лазарєва Тетяна Петрівна',
        position: 'Вчитель хімії',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Іголкіна Яна В’ячеславівна',
        position: 'Вчитель біології',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Цьомко Віта Степанівна',
        position: 'Вчитель історії',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Трубчанінова Тетяна Петрівна',
        position: 'Вчитель географії',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Григор’єв Артем Сергійович',
        position: 'Вчитель фізичної культури',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Морозова Тетяна Михайлівна',
        position: 'Методист з профорієнтації',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 42,
                totalDays: 42,
            },
        ],
    },
    {
        name: 'Перерва Світлана Вікторівна',
        position: 'Вчитель інформатики',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Щербина Ярослава Анатоліївна',
        position: 'Вчитель історії',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Вовк Ольга Вікторівна',
        position: 'Вчитель англійської мови',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Мазур Інна Сергіївна',
        position: 'Вчитель англійської мови',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Біда Юля Петрівна',
        position: 'Вчитель української мови та літератури',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Зайдуліна Вікторія Вікторівна',
        position: 'Вчитель англійської мови',
        employeeType: 'Вчитель',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            },
        ],
    },
    {
        name: 'Мятович Ірина Володимирівна',
        position: 'Директор',
        employeeType: 'Адміністрація',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            }
        ],
    },
    {
        name: 'Смьордова Ольга Володимирівна',
        position: 'Заступник директора з НВР',
        employeeType: 'Адміністрація',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            }
        ],
    },
    {
        name: 'Бабаніна Ольга Петрівна',
        position: 'Заступник директора з НВР',
        employeeType: 'Адміністрація',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            }
        ],
    },
    {
        name: 'Дем’яник Олена Геннадіївна',
        position: 'Заступник директора з ВР',
        employeeType: 'Адміністрація',
        vacations: [
            {
                type: 'Основна',
                isPaid: true,
                vacationDays: 56,
                totalDays: 56,
            }
        ],
    },
    {
        name: 'Оріян Анастасія Олександрівна',
        position: 'Практичний психолог',
        employeeType: 'Допоміжний персонал',
        vacations: [
            {
                totalDays: 56,
                vacationDays: 56,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Качан Анастасія Романівна',
        position: 'Соціальний педагог',
        employeeType: 'Допоміжний персонал',
        vacations: [
            {
                totalDays: 56,
                vacationDays: 56,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Петрова Віра Вікторівна',
        position: 'Завідуюча господарством',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 31,
                vacationDays: 31,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Школа Наталія Миколаївна',
        position: 'Інспектор з кадрів та діловодства',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 31,
                vacationDays: 31,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Сухар Ольга Іванівна',
        position: 'Інженер з охорони праці',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 31,
                vacationDays: 31,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Дузенко Яна Олегівна',
        position: 'Інженер-електронік',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 31,
                vacationDays: 31,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Казаков Сергій Геннадійович',
        position: 'Робітник',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Порошина Марина Василівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Петрухіна Людмила Іванівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Олійник Тетяна Олександрівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Кодиця Валентина Іванівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Бондаренко Наталія Олександрівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Сагайдачна Валентина Олексіївна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Назаренко Юрій Михайлович',
        position: 'Сторож',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Дубогрій Анатолій Іванович',
        position: 'Сторож',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Чорний Костянтин Григорович',
        position: 'Сторож',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Пічуєва Марина Іванівна',
        position: 'Медична сестра',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Волошина Олена Леонідівна',
        position: 'Бібліотекар',
        employeeType: 'Технічний персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Казаков Сергій Геннадійович',
        position: 'Робітник',
        employeeType: 'Обслуговуючий персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Порошина Марина Василівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'Обслуговуючий персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Петрухіна Людмила Іванівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'Обслуговуючий персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Олійник Тетяна Олександрівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'Обслуговуючий персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Кодиця Валентина Іванівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'Обслуговуючий персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Бондаренко Наталія Олександрівна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'Обслуговуючий персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Сагайдачна Валентина Олексіївна',
        position: 'Прибиральниця службових приміщень',
        employeeType: 'Обслуговуючий персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Назаренко Юрій Михайлович',
        position: 'Сторож',
        employeeType: 'Обслуговуючий персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Дубогрій Анатолій Іванович',
        position: 'Сторож',
        employeeType: 'Обслуговуючий персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
    {
        name: 'Чорний Костянтин Григорович',
        position: 'Сторож',
        employeeType: 'Обслуговуючий персонал',
        vacations: [
            {
                totalDays: 24,
                vacationDays: 24,
                isPaid: true,
                type: 'Основна',
            },
        ],
    },
]


export default mockedEmployeeList
