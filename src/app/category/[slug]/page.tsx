'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';

// Продукты для каждой категории
const productsData: Record<string, Array<{ name: string; img: string; description: string; price?: string }>> = {
  'Производство электроники': [
    { name: 'Линия SMT-5000', img: '/images/bg.jpg', description: 'Автоматическая линия поверхностного монтажа', price: 'от 15 000 000 ₽' },
    { name: 'Трафаретный принтер ST-2000', img: '/images/bg.jpg', description: 'Полуавтоматический принтер', price: 'от 1 200 000 ₽' },
    { name: 'Дозатор Jet-500', img: '/images/bg.jpg', description: 'Струйный дозатор', price: 'от 1 800 000 ₽' },
    { name: 'Установщик компонентов', img: '/images/bg.jpg', description: 'Высокоскоростной монтаж', price: 'от 8 000 000 ₽' },
  ],
  'Производство микроэлектроники': [
    { name: 'Установка для монтажа кристаллов', img: '/images/bg.jpg', description: 'Точный монтаж чипов', price: 'от 12 000 000 ₽' },
    { name: 'Проволочный компаратор', img: '/images/bg.jpg', description: 'Сварка проволокой', price: 'от 5 500 000 ₽' },
    { name: 'Печь для отжига', img: '/images/bg.jpg', description: 'Термическая обработка', price: 'от 3 200 000 ₽' },
  ],
  'Измерения': [
    { name: 'Осциллограф DS-2000', img: '/images/bg.jpg', description: '200 МГц, 4 канала', price: 'от 350 000 ₽' },
    { name: 'Мультиметр Digital Pro', img: '/images/bg.jpg', description: '6.5 разрядов', price: 'от 120 000 ₽' },
    { name: 'Анализатор спектра', img: '/images/bg.jpg', description: 'До 6 ГГц', price: 'от 850 000 ₽' },
    { name: 'Генератор сигналов', img: '/images/bg.jpg', description: 'Произвольная форма', price: 'от 280 000 ₽' },
  ],
  'Испытательное оборудование': [
    { name: 'Климатическая камера', img: '/images/bg.jpg', description: 'От -70°C до +180°C', price: 'от 1 500 000 ₽' },
    { name: 'Вибростенд', img: '/images/bg.jpg', description: 'Испытания вибрацией', price: 'от 2 800 000 ₽' },
    { name: 'Камера соли и тумана', img: '/images/bg.jpg', description: 'Коррозионные испытания', price: 'от 650 000 ₽' },
  ],
  'Метрология и поверка': [
    { name: 'Поверочный комплекс', img: '/images/bg.jpg', description: 'Поверка приборов', price: 'от 950 000 ₽' },
    { name: 'Калибратор', img: '/images/bg.jpg', description: 'Многофункциональный', price: 'от 420 000 ₽' },
    { name: 'Эталон напряжения', img: '/images/bg.jpg', description: 'Класс точности 0.01', price: 'от 380 000 ₽' },
  ],
  '3D-принтеры': [
    { name: '3D-принтер Industrial X1', img: '/images/bg.jpg', description: 'Промышленный FDM принтер', price: 'от 1 500 000 ₽' },
    { name: '3D-принтер Pro 300', img: '/images/bg.jpg', description: 'SLA фотополимерный', price: 'от 850 000 ₽' },
    { name: '3D-принтер Desktop Mini', img: '/images/bg.jpg', description: 'Настольный для офиса', price: 'от 250 000 ₽' },
    { name: '3D-принтер Metal Pro', img: '/images/bg.jpg', description: 'Печать металлом', price: 'от 5 000 000 ₽' },
  ],
  'Ручная пайка и визуальный контроль': [
    { name: 'Паяльная станция', img: '/images/bg.jpg', description: 'Цифровая, 150W', price: 'от 45 000 ₽' },
    { name: 'Микроскоп стерео', img: '/images/bg.jpg', description: 'Увеличение 7x-45x', price: 'от 85 000 ₽' },
    { name: 'Инспекционная система', img: '/images/bg.jpg', description: 'Автоматический контроль', price: 'от 1 200 000 ₽' },
  ],
  'Программное обеспечение': [
    { name: 'CAD система Pro', img: '/images/bg.jpg', description: 'Проектирование плат', price: 'от 150 000 ₽' },
    { name: 'CAM система', img: '/images/bg.jpg', description: 'Подготовка производства', price: 'от 200 000 ₽' },
    { name: 'Система управления', img: '/images/bg.jpg', description: 'MES для производства', price: 'от 500 000 ₽' },
  ],
  'Инженерная инфраструктура': [
    { name: 'Чистая комната', img: '/images/bg.jpg', description: 'Класс чистоты ISO 5', price: 'от 5 000 000 ₽' },
    { name: 'Вентиляционная система', img: '/images/bg.jpg', description: 'Промышленная вентиляция', price: 'от 1 800 000 ₽' },
    { name: 'Система очистки воды', img: '/images/bg.jpg', description: 'Деионизация', price: 'от 950 000 ₽' },
  ],
  'Оснащение производственных помещений': [
    { name: 'Антистатический верстак', img: '/images/bg.jpg', description: 'ESD защита', price: 'от 45 000 ₽' },
    { name: 'Стеллаж промышленный', img: '/images/bg.jpg', description: 'Грузоподъемность 500 кг', price: 'от 25 000 ₽' },
    { name: 'Шкаф для хранения', img: '/images/bg.jpg', description: 'Для компонентов', price: 'от 35 000 ₽' },
    { name: 'Стул антистатический', img: '/images/bg.jpg', description: 'ESD, регулируемый', price: 'от 15 000 ₽' },
  ],
  'Производство электроники и ЭКБ': [
    { name: 'Линия сборки плат', img: '/images/bg.jpg', description: 'Полный цикл производства', price: 'от 20 000 000 ₽' },
    { name: 'Оборудование для ЭКБ', img: '/images/bg.jpg', description: 'Производство компонентов', price: 'от 10 000 000 ₽' },
  ],
  'Оборонно-промышленный комплекс': [
    { name: 'Специализированное оборудование ОПК', img: '/images/bg.jpg', description: 'По техническому заданию', price: 'по запросу' },
    { name: 'Системы контроля качества', img: '/images/bg.jpg', description: 'Военная приемка', price: 'по запросу' },
  ],
  'Космическая промышленность': [
    { name: 'Оборудование для космоса', img: '/images/bg.jpg', description: 'Сертифицировано', price: 'по запросу' },
    { name: 'Вибростенд космический', img: '/images/bg.jpg', description: 'Испытания спутников', price: 'от 15 000 000 ₽' },
  ],
  'Авиастроение': [
    { name: 'Оборудование для авиации', img: '/images/bg.jpg', description: 'Сертификат FAA', price: 'по запросу' },
    { name: 'Контрольно-измерительное', img: '/images/bg.jpg', description: 'Прецизионное', price: 'от 2 500 000 ₽' },
  ],
  'Автомобилестроение': [
    { name: 'Линия сборки электроники', img: '/images/bg.jpg', description: 'Для автоэлектроники', price: 'от 25 000 000 ₽' },
    { name: 'Тестер автомобильный', img: '/images/bg.jpg', description: 'Диагностика', price: 'от 850 000 ₽' },
  ],
  'Энергетика': [
    { name: 'Оборудование для энергетики', img: '/images/bg.jpg', description: 'Высоковольтное', price: 'по запросу' },
    { name: 'Анализатор качества энергии', img: '/images/bg.jpg', description: 'Класс A', price: 'от 450 000 ₽' },
  ],
  'Телекоммуникации и связь': [
    { name: 'Тестер оптоволокна', img: '/images/bg.jpg', description: 'OTDR', price: 'от 350 000 ₽' },
    { name: 'Анализатор сетей', img: '/images/bg.jpg', description: '5G ready', price: 'от 1 200 000 ₽' },
  ],
  'Радиоэлектронная промышленность': [
    { name: 'Измерительные комплексы', img: '/images/bg.jpg', description: 'Для РЭП', price: 'от 1 500 000 ₽' },
    { name: 'Стенды испытаний', img: '/images/bg.jpg', description: 'Комплексные', price: 'от 3 000 000 ₽' },
  ],
  'Техническое перевооружение': [
    { name: 'Аудит производства', img: '/images/bg.jpg', description: 'Анализ текущего состояния', price: 'от 500 000 ₽' },
    { name: 'Проект модернизации', img: '/images/bg.jpg', description: 'Разработка концепции', price: 'от 1 000 000 ₽' },
    { name: 'Внедрение под ключ', img: '/images/bg.jpg', description: 'Полный цикл работ', price: 'по запросу' },
  ],
  'Инжиниринг': [
    { name: 'Проектирование линий', img: '/images/bg.jpg', description: '3D моделирование', price: 'от 800 000 ₽' },
    { name: 'Интеграция систем', img: '/images/bg.jpg', description: 'Автоматизация', price: 'от 1 500 000 ₽' },
  ],
  'Аудит и консалтинг': [
    { name: 'Технический аудит', img: '/images/bg.jpg', description: 'Оценка оборудования', price: 'от 300 000 ₽' },
    { name: 'Консалтинг', img: '/images/bg.jpg', description: 'Экспертные консультации', price: 'от 10 000 ₽/час' },
  ],
  'Поставка оборудования': [
    { name: 'Поставка под ключ', img: '/images/bg.jpg', description: 'Логистика и таможня', price: 'индивидуально' },
    { name: 'Закупка за рубежом', img: '/images/bg.jpg', description: 'Прямые контракты', price: 'индивидуально' },
  ],
  'Монтаж и пусконаладка': [
    { name: 'Монтаж оборудования', img: '/images/bg.jpg', description: 'Установка и подключение', price: 'от 200 000 ₽' },
    { name: 'Пусконаладка', img: '/images/bg.jpg', description: 'Настройка и тесты', price: 'от 300 000 ₽' },
  ],
  'Обучение персонала': [
    { name: 'Курс операторов', img: '/images/bg.jpg', description: '5 дней, практика', price: 'от 50 000 ₽' },
    { name: 'Курс инженеров', img: '/images/bg.jpg', description: '10 дней, углублённый', price: 'от 80 000 ₽' },
  ],
  'Гарантийное обслуживание': [
    { name: 'Гарантия 1 год', img: '/images/bg.jpg', description: 'Стандартная', price: 'включено' },
    { name: 'Гарантия 3 года', img: '/images/bg.jpg', description: 'Расширенная', price: 'от 5% от стоимости' },
  ],
  'Постгарантийное обслуживание': [
    { name: 'Сервисный контракт', img: '/images/bg.jpg', description: 'Ежегодное ТО', price: 'от 100 000 ₽/год' },
    { name: 'Выезд специалиста', img: '/images/bg.jpg', description: 'По России', price: 'от 30 000 ₽' },
  ],
  'Ремонт оборудования': [
    { name: 'Диагностика', img: '/images/bg.jpg', description: 'Выявление неисправностей', price: 'от 15 000 ₽' },
    { name: 'Ремонт плат', img: '/images/bg.jpg', description: 'Любой сложности', price: 'от 25 000 ₽' },
    { name: 'Замена компонентов', img: '/images/bg.jpg', description: 'Оригинальные запчасти', price: 'по факту' },
  ],
  'Техническая поддержка': [
    { name: 'Поддержка 24/7', img: '/images/bg.jpg', description: 'Телефон, email', price: 'от 50 000 ₽/мес' },
    { name: 'Удалённая помощь', img: '/images/bg.jpg', description: 'TeamViewer, AnyDesk', price: 'от 5 000 ₽/час' },
  ],
  'Запасные части': [
    { name: 'Оригинальные запчасти', img: '/images/bg.jpg', description: 'От производителей', price: 'по запросу' },
    { name: 'Расходные материалы', img: '/images/bg.jpg', description: 'В наличии', price: 'по прайсу' },
  ],
  'Новости компании': [
    { name: 'Открытие нового офиса', img: '/images/bg.jpg', description: '15 марта 2025 — Открыт офис в Санкт-Петербурге' },
    { name: 'Новый контракт', img: '/images/bg.jpg', description: '10 марта 2025 — Поставка оборудования для Роскосмоса' },
    { name: 'Выставка ChipEXPO', img: '/images/bg.jpg', description: '5 марта 2025 — Приглашаем на наш стенд' },
  ],
  'Публикации в СМИ': [
    { name: 'Интервью в журнале', img: '/images/bg.jpg', description: 'Электронные компоненты, февраль 2025' },
    { name: 'Статья в газете', img: '/images/bg.jpg', description: 'Ведомости, январь 2025' },
  ],
  'Пресс-релизы': [
    { name: 'Пресс-релиз Q4 2024', img: '/images/bg.jpg', description: 'Итоги года' },
    { name: 'Новое направление', img: '/images/bg.jpg', description: 'Запуск 3D печати' },
  ],
  'Видео': [
    { name: 'Презентация компании', img: '/images/bg.jpg', description: '5 минут' },
    { name: 'Обзор оборудования', img: '/images/bg.jpg', description: '15 минут' },
  ],
  'Выставки': [
    { name: 'ChipEXPO 2025', img: '/images/bg.jpg', description: '15-18 апреля, Москва, Крокус Экспо' },
    { name: 'ElectronTech 2025', img: '/images/bg.jpg', description: '20-22 мая, Санкт-Петербург' },
    { name: 'IoT Solutions 2025', img: '/images/bg.jpg', description: '10-12 июня, Москва' },
  ],
  'Конференции': [
    { name: 'Конференция по электронике', img: '/images/bg.jpg', description: '25 апреля, Москва', price: 'бесплатно' },
    { name: 'Форум производителей', img: '/images/bg.jpg', description: '15 мая, онлайн', price: 'бесплатно' },
  ],
  'Семинары': [
    { name: 'SMT технологии', img: '/images/bg.jpg', description: 'Обучающий семинар', price: '5 000 ₽' },
    { name: 'Пайка и монтаж', img: '/images/bg.jpg', description: 'Практический курс', price: '8 000 ₽' },
  ],
  'Вебинары': [
    { name: 'Онлайн презентация', img: '/images/bg.jpg', description: 'Новое оборудование', price: 'бесплатно' },
    { name: 'Вопрос-ответ', img: '/images/bg.jpg', description: 'С экспертами', price: 'бесплатно' },
  ],
  'История компании': [
    { name: '1995 — Основание', img: '/images/bg.jpg', description: 'Начало пути' },
    { name: '2005 — Лидер рынка', img: '/images/bg.jpg', description: '10 лет успеха' },
    { name: '2025 — 30 лет', img: '/images/bg.jpg', description: 'Современный этап' },
  ],
  'Руководство': [
    { name: 'Генеральный директор', img: '/images/bg.jpg', description: 'Иванов Иван Иванович' },
    { name: 'Технический директор', img: '/images/bg.jpg', description: 'Петров Петр Петрович' },
  ],
  'Партнёры': [
    { name: 'Официальные дистрибьюторы', img: '/images/bg.jpg', description: '15 компаний' },
    { name: 'Сертифицированные партнёры', img: '/images/bg.jpg', description: '50+ компаний' },
  ],
  'Сертификаты': [
    { name: 'ISO 9001', img: '/images/bg.jpg', description: 'Система менеджмента качества' },
    { name: 'ISO 14001', img: '/images/bg.jpg', description: 'Экологический менеджмент' },
  ],
  'Реквизиты': [
    { name: 'ООО Диполь Технологии', img: '/images/bg.jpg', description: 'ИНН: 7701234567, ОГРН: 1157746123456' },
  ],
  'Вакансии': [
    { name: 'Инженер по продажам', img: '/images/bg.jpg', description: 'Опыт от 3 лет, Москва', price: 'от 150 000 ₽' },
    { name: 'Сервисный инженер', img: '/images/bg.jpg', description: 'Командировки, опыт', price: 'от 120 000 ₽' },
    { name: 'Менеджер проектов', img: '/images/bg.jpg', description: 'Управление проектами', price: 'от 180 000 ₽' },
  ],
  'Стажировки': [
    { name: 'Стажировка для студентов', img: '/images/bg.jpg', description: '3 месяца, оплачиваемая', price: 'от 30 000 ₽' },
    { name: 'Летняя школа', img: '/images/bg.jpg', description: 'Июнь-август', price: 'от 40 000 ₽' },
  ],
  'Корпоративная культура': [
    { name: 'Командные мероприятия', img: '/images/bg.jpg', description: 'Тимбилдинги' },
    { name: 'Спорт и здоровье', img: '/images/bg.jpg', description: 'Корпоративный спорт' },
  ],
  'Отзывы сотрудников': [
    { name: 'Отзыв инженера', img: '/images/bg.jpg', description: 'Работаю 5 лет' },
    { name: 'Отзыв менеджера', img: '/images/bg.jpg', description: 'Отличная компания' },
  ],
  'Офисы и представительства': [
    { name: 'Москва', img: '/images/bg.jpg', description: 'ул. Примерная, д. 1' },
    { name: 'Санкт-Петербург', img: '/images/bg.jpg', description: 'пр. Примерный, д. 2' },
    { name: 'Екатеринбург', img: '/images/bg.jpg', description: 'ул. Примерная, д. 3' },
  ],
  'Отдел продаж': [
    { name: 'Менеджер 1', img: '/images/bg.jpg', description: 'Тел: +7 (495) 123-45-67', price: 'sales@dipaul.ru' },
    { name: 'Менеджер 2', img: '/images/bg.jpg', description: 'Тел: +7 (495) 123-45-68', price: 'sales2@dipaul.ru' },
  ],
  'Сервисный центр': [
    { name: 'Приём заявок', img: '/images/bg.jpg', description: 'Тел: +7 (495) 123-45-69', price: 'service@dipaul.ru' },
    { name: 'Горячая линия', img: '/images/bg.jpg', description: '24/7', price: '8 (800) 555-35-35' },
  ],
  'Написать нам': [
    { name: 'Форма обратной связи', img: '/images/bg.jpg', description: 'Заполните форму на сайте' },
  ],
  'Наука и образование': [
    { name: 'Оборудование для ВУЗов', img: '/images/bg.jpg', description: 'Учебные комплексы', price: 'по запросу' },
    { name: 'Лабораторные стенды', img: '/images/bg.jpg', description: 'Для исследований', price: 'от 500 000 ₽' },
  ],
  'Транспортная инфраструктура': [
    { name: 'Системы для ЖД', img: '/images/bg.jpg', description: 'Железнодорожная автоматика', price: 'по запросу' },
    { name: 'Метро оборудование', img: '/images/bg.jpg', description: 'Системы управления', price: 'по запросу' },
  ],
};

// Данные для всех категорий
const categoryData: Record<string, {
  title: string;
  description: string;
  sidebar: string[];
}> = {
  equipment: {
    title: 'Оборудование',
    description: 'Оснащение предприятий инновационным технологическим, измерительным и испытательным оборудованием.',
    sidebar: [
      'Производство электроники',
      'Производство микроэлектроники',
      'Измерения',
      'Испытательное оборудование',
      'Метрология и поверка',
      '3D-принтеры',
      'Ручная пайка и визуальный контроль',
      'Программное обеспечение',
      'Инженерная инфраструктура',
      'Оснащение производственных помещений',
    ]
  },
  industries: {
    title: 'Отраслевые решения',
    description: 'Комплексные решения для различных отраслей промышленности.',
    sidebar: [
      'Оборонно-промышленный комплекс',
      'Производство электроники и ЭКБ',
      'Космическая промышленность',
      'Телекоммуникации и связь',
      'Радиоэлектронная промышленность',
      'Автомобилестроение',
      'Авиастроение',
      'Энергетика',
      'Наука и образование',
      'Транспортная инфраструктура',
    ]
  },
  services: {
    title: 'Услуги',
    description: 'Полный спектр услуг по модернизации и поддержке предприятий.',
    sidebar: [
      'Техническое перевооружение',
      'Инжиниринг',
      'Аудит и консалтинг',
      'Поставка оборудования',
      'Монтаж и пусконаладка',
      'Обучение персонала',
    ]
  },
  service: {
    title: 'Сервис',
    description: 'Гарантийное и постгарантийное обслуживание.',
    sidebar: [
      'Гарантийное обслуживание',
      'Постгарантийное обслуживание',
      'Ремонт оборудования',
      'Техническая поддержка',
      'Запасные части',
    ]
  },
  press: {
    title: 'Пресс-центр',
    description: 'Новости компании и публикации.',
    sidebar: [
      'Новости компании',
      'Публикации в СМИ',
      'Пресс-релизы',
      'Видео',
    ]
  },
  events: {
    title: 'Мероприятия',
    description: 'Выставки, конференции и семинары.',
    sidebar: [
      'Выставки',
      'Конференции',
      'Семинары',
      'Вебинары',
    ]
  },
  about: {
    title: 'О компании',
    description: 'Информация о компании.',
    sidebar: [
      'История компании',
      'Руководство',
      'Партнёры',
      'Сертификаты',
      'Реквизиты',
    ]
  },
  careers: {
    title: 'Работа в Диполе',
    description: 'Вакансии и возможности.',
    sidebar: [
      'Вакансии',
      'Стажировки',
      'Корпоративная культура',
      'Отзывы сотрудников',
    ]
  },
  contacts: {
    title: 'Контакты',
    description: 'Наши контакты.',
    sidebar: [
      'Офисы и представительства',
      'Отдел продаж',
      'Сервисный центр',
      'Написать нам',
    ]
  },
};

// Маппинг hash → индекс категории в sidebar
const hashToCategory: Record<string, number> = {
  '#defense': 0,
  '#electronics': 1,
  '#space': 2,
  '#telecom': 3,
  '#radio': 4,
  '#auto': 5,
  '#aviation': 6,
  '#energy': 7,
  '#science': 8,
  '#transport': 9,
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = categoryData[slug] || categoryData.equipment;

  const [activeCategory, setActiveCategory] = useState<string>(data.sidebar[0]);

  // Обработка hash при загрузке страницы
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hashToCategory[hash] !== undefined && slug === 'industries') {
      const index = hashToCategory[hash];
      if (data.sidebar[index]) {
        setActiveCategory(data.sidebar[index]);
      }
    }
  }, [data.sidebar, slug]);

  // Получаем товары для активной категории
  const products = productsData[activeCategory] || [];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Хлебные крошки */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-700 transition-colors">
                Главная
              </Link>
              <span>/</span>
              <Link href={`/category/${slug}`} className="hover:text-blue-700 transition-colors">
                {data.title}
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{activeCategory}</span>
            </div>
          </div>
        </div>

        {/* Заголовок и описание */}
        <section className="py-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Левое меню */}
              <aside className="lg:w-72 flex-shrink-0">
                <div className="sticky top-24">
                  <div className="mb-6">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Меню</span>
                  </div>
                  <nav className="space-y-1">
                    {data.sidebar.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`w-full text-left py-3 px-4 text-sm transition-colors rounded-sm ${
                          activeCategory === category
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Основной контент */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  {activeCategory}
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mb-12">
                  {products.length > 0
                    ? `Каталог: ${activeCategory}. Выберите подходящее оборудование.`
                    : `Информация о категории: ${activeCategory}`
                  }
                </p>

                {/* Карточки товаров */}
                {products.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-8">
                      {products.map((product, index) => (
                        <Link
                          key={index}
                          href="#"
                          className="group block"
                          onClick={(e) => e.preventDefault()}
                        >
                          <div className="border border-gray-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="h-64 bg-gray-100 overflow-hidden">
                              <img
                                src={product.img}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-gray-600 mb-3">
                                {product.description}
                              </p>
                              {product.price && (
                                <div className="text-blue-700 font-bold text-lg">
                                  {product.price}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Кнопка "Показать все" */}
                    <div className="mt-12 text-center">
                      <button className="border-2 border-gray-300 hover:border-blue-700 hover:bg-blue-700 text-gray-700 hover:text-white font-medium rounded-sm px-10 py-4 transition-all">
                        Показать все товары →
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">
                      Информация о данной категории готовится
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
