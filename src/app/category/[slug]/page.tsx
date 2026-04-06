'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';

// Продукты для каждой категории
const productsData: Record<string, Array<{ name: string; slug: string; img: string; description: string; price?: string }>> = {
  'Производство электроники': [
    { name: 'Линия SMT-5000', slug: 'smt-5000', img: '/images/bg.jpg', description: 'Автоматическая линия поверхностного монтажа', price: 'от 15 000 000 ₽' },
    { name: 'Трафаретный принтер ST-2000', slug: 'st-2000', img: '/images/bg.jpg', description: 'Полуавтоматический принтер', price: 'от 1 200 000 ₽' },
    { name: 'Дозатор Jet-500', slug: 'jet-500', img: '/images/bg.jpg', description: 'Струйный дозатор', price: 'от 1 800 000 ₽' },
    { name: 'Установщик компонентов', slug: 'pick-place-3000', img: '/images/bg.jpg', description: 'Высокоскоростной монтаж', price: 'от 8 000 000 ₽' },
  ],
  'Производство микроэлектроники': [
    { name: 'Установка для монтажа кристаллов', slug: 'die-bonder-x1', img: '/images/bg.jpg', description: 'Точный монтаж чипов', price: 'от 12 000 000 ₽' },
    { name: 'Проволочный компаратор', slug: 'wire-bonder-pro', img: '/images/bg.jpg', description: 'Сварка проволокой', price: 'от 5 500 000 ₽' },
    { name: 'Печь для отжига', slug: 'annealing-furnace', img: '/images/bg.jpg', description: 'Термическая обработка', price: 'от 3 200 000 ₽' },
  ],
  'Измерения': [
    { name: 'Осциллограф DS-2000', slug: 'ds-2000', img: '/images/bg.jpg', description: '200 МГц, 4 канала', price: 'от 350 000 ₽' },
    { name: 'Мультиметр Digital Pro', slug: 'multimeter-digital', img: '/images/bg.jpg', description: '6.5 разрядов', price: 'от 120 000 ₽' },
    { name: 'Анализатор спектра', slug: 'spectrum-analyzer', img: '/images/bg.jpg', description: 'До 6 ГГц', price: 'от 850 000 ₽' },
    { name: 'Генератор сигналов', slug: 'signal-generator', img: '/images/bg.jpg', description: 'Произвольная форма', price: 'от 280 000 ₽' },
  ],
  'Испытательное оборудование': [
    { name: 'Климатическая камера', slug: 'climate-chamber', img: '/images/bg.jpg', description: 'От -70°C до +180°C', price: 'от 1 500 000 ₽' },
    { name: 'Вибростенд', slug: 'vibration-tester', img: '/images/bg.jpg', description: 'Испытания вибрацией', price: 'от 2 800 000 ₽' },
    { name: 'Камера соли и тумана', slug: 'salt-spray', img: '/images/bg.jpg', description: 'Коррозионные испытания', price: 'от 650 000 ₽' },
  ],
  'Метрология и поверка': [
    { name: 'Поверочный комплекс', slug: 'calibration-complex', img: '/images/bg.jpg', description: 'Поверка приборов', price: 'от 950 000 ₽' },
    { name: 'Калибратор', slug: 'calibrator-multi', img: '/images/bg.jpg', description: 'Многофункциональный', price: 'от 420 000 ₽' },
    { name: 'Эталон напряжения', slug: 'voltage-reference', img: '/images/bg.jpg', description: 'Класс точности 0.01', price: 'от 380 000 ₽' },
  ],
  '3D-принтеры': [
    { name: '3D-принтер Industrial X1', slug: 'industrial-x1', img: '/images/bg.jpg', description: 'Промышленный FDM принтер', price: 'от 1 500 000 ₽' },
    { name: '3D-принтер Pro 300', slug: 'pro-300', img: '/images/bg.jpg', description: 'SLA фотополимерный', price: 'от 850 000 ₽' },
    { name: '3D-принтер Desktop Mini', slug: 'desktop-mini', img: '/images/bg.jpg', description: 'Настольный для офиса', price: 'от 250 000 ₽' },
    { name: '3D-принтер Metal Pro', slug: 'metal-pro', img: '/images/bg.jpg', description: 'Печать металлом', price: 'от 5 000 000 ₽' },
  ],
  'Ручная пайка и визуальный контроль': [
    { name: 'Паяльная станция', slug: 'soldering-station', img: '/images/bg.jpg', description: 'Цифровая, 150W', price: 'от 45 000 ₽' },
    { name: 'Микроскоп стерео', slug: 'stereo-microscope', img: '/images/bg.jpg', description: 'Увеличение 7x-45x', price: 'от 85 000 ₽' },
    { name: 'Инспекционная система', slug: 'inspection-system', img: '/images/bg.jpg', description: 'Автоматический контроль', price: 'от 1 200 000 ₽' },
  ],
  'Программное обеспечение': [
    { name: 'CAD система Pro', slug: 'cad-pro', img: '/images/bg.jpg', description: 'Проектирование плат', price: 'от 150 000 ₽' },
    { name: 'CAM система', slug: 'cam-system', img: '/images/bg.jpg', description: 'Подготовка производства', price: 'от 200 000 ₽' },
    { name: 'Система управления', slug: 'mes-system', img: '/images/bg.jpg', description: 'MES для производства', price: 'от 500 000 ₽' },
  ],
  'Инженерная инфраструктура': [
    { name: 'Чистая комната', slug: 'clean-room', img: '/images/bg.jpg', description: 'Класс чистоты ISO 5', price: 'от 5 000 000 ₽' },
    { name: 'Вентиляционная система', slug: 'ventilation-system', img: '/images/bg.jpg', description: 'Промышленная вентиляция', price: 'от 1 800 000 ₽' },
    { name: 'Система очистки воды', slug: 'water-purification', img: '/images/bg.jpg', description: 'Деионизация', price: 'от 950 000 ₽' },
  ],
  'Оснащение производственных помещений': [
    { name: 'Антистатический верстак', slug: 'esd-workbench', img: '/images/bg.jpg', description: 'ESD защита', price: 'от 45 000 ₽' },
    { name: 'Стеллаж промышленный', slug: 'industrial-shelf', img: '/images/bg.jpg', description: 'Грузоподъемность 500 кг', price: 'от 25 000 ₽' },
    { name: 'Шкаф для хранения', slug: 'storage-cabinet', img: '/images/bg.jpg', description: 'Для компонентов', price: 'от 35 000 ₽' },
    { name: 'Стул антистатический', slug: 'esd-chair', img: '/images/bg.jpg', description: 'ESD, регулируемый', price: 'от 15 000 ₽' },
  ],
  'Производство электроники и ЭКБ': [
    { name: 'Линия сборки плат', slug: 'pcb-line', img: '/images/bg.jpg', description: 'Полный цикл производства', price: 'от 20 000 000 ₽' },
    { name: 'Оборудование для ЭКБ', slug: 'ekb-equipment', img: '/images/bg.jpg', description: 'Производство компонентов', price: 'от 10 000 000 ₽' },
  ],
  'Оборонно-промышленный комплекс': [
    { name: 'Специализированное оборудование ОПК', slug: 'opk-equipment', img: '/images/bg.jpg', description: 'По техническому заданию', price: 'по запросу' },
    { name: 'Системы контроля качества', slug: 'quality-control', img: '/images/bg.jpg', description: 'Военная приемка', price: 'по запросу' },
  ],
  'Космическая промышленность': [
    { name: 'Оборудование для космоса', slug: 'space-equipment', img: '/images/bg.jpg', description: 'Сертифицировано', price: 'по запросу' },
    { name: 'Вибростенд космический', slug: 'space-vibration', img: '/images/bg.jpg', description: 'Испытания спутников', price: 'от 15 000 000 ₽' },
  ],
  'Авиастроение': [
    { name: 'Оборудование для авиации', slug: 'aviation-equipment', img: '/images/bg.jpg', description: 'Сертификат FAA', price: 'по запросу' },
    { name: 'Контрольно-измерительное', slug: 'aviation-measurement', img: '/images/bg.jpg', description: 'Прецизионное', price: 'от 2 500 000 ₽' },
  ],
  'Автомобилестроение': [
    { name: 'Линия сборки электроники', slug: 'auto-electronics', img: '/images/bg.jpg', description: 'Для автоэлектроники', price: 'от 25 000 000 ₽' },
    { name: 'Тестер автомобильный', slug: 'auto-tester', img: '/images/bg.jpg', description: 'Диагностика', price: 'от 850 000 ₽' },
  ],
  'Энергетика': [
    { name: 'Оборудование для энергетики', slug: 'energy-equipment', img: '/images/bg.jpg', description: 'Высоковольтное', price: 'по запросу' },
    { name: 'Анализатор качества энергии', slug: 'power-analyzer', img: '/images/bg.jpg', description: 'Класс A', price: 'от 450 000 ₽' },
  ],
  'Телекоммуникации и связь': [
    { name: 'Тестер оптоволокна', slug: 'fiber-tester', img: '/images/bg.jpg', description: 'OTDR', price: 'от 350 000 ₽' },
    { name: 'Анализатор сетей', slug: 'network-analyzer', img: '/images/bg.jpg', description: '5G ready', price: 'от 1 200 000 ₽' },
  ],
  'Радиоэлектронная промышленность': [
    { name: 'Измерительные комплексы', slug: 'measurement-complex', img: '/images/bg.jpg', description: 'Для РЭП', price: 'от 1 500 000 ₽' },
    { name: 'Стенды испытаний', slug: 'test-stands', img: '/images/bg.jpg', description: 'Комплексные', price: 'от 3 000 000 ₽' },
  ],
  'Техническое перевооружение': [
    { name: 'Аудит производства', slug: 'production-audit', img: '/images/bg.jpg', description: 'Анализ текущего состояния', price: 'от 500 000 ₽' },
    { name: 'Проект модернизации', slug: 'modernization-project', img: '/images/bg.jpg', description: 'Разработка концепции', price: 'от 1 000 000 ₽' },
    { name: 'Внедрение под ключ', slug: 'turnkey-implementation', img: '/images/bg.jpg', description: 'Полный цикл работ', price: 'по запросу' },
  ],
  'Инжиниринг': [
    { name: 'Проектирование линий', slug: 'line-design', img: '/images/bg.jpg', description: '3D моделирование', price: 'от 800 000 ₽' },
    { name: 'Интеграция систем', slug: 'system-integration', img: '/images/bg.jpg', description: 'Автоматизация', price: 'от 1 500 000 ₽' },
  ],
  'Аудит и консалтинг': [
    { name: 'Технический аудит', slug: 'technical-audit', img: '/images/bg.jpg', description: 'Оценка оборудования', price: 'от 300 000 ₽' },
    { name: 'Консалтинг', slug: 'consulting', img: '/images/bg.jpg', description: 'Экспертные консультации', price: 'от 10 000 ₽/час' },
  ],
  'Поставка оборудования': [
    { name: 'Поставка под ключ', slug: 'turnkey-supply', img: '/images/bg.jpg', description: 'Логистика и таможня', price: 'индивидуально' },
    { name: 'Закупка за рубежом', slug: 'foreign-purchase', img: '/images/bg.jpg', description: 'Прямые контракты', price: 'индивидуально' },
  ],
  'Монтаж и пусконаладка': [
    { name: 'Монтаж оборудования', slug: 'equipment-installation', img: '/images/bg.jpg', description: 'Установка и подключение', price: 'от 200 000 ₽' },
    { name: 'Пусконаладка', slug: 'commissioning', img: '/images/bg.jpg', description: 'Настройка и тесты', price: 'от 300 000 ₽' },
  ],
  'Обучение персонала': [
    { name: 'Курс операторов', slug: 'operator-course', img: '/images/bg.jpg', description: '5 дней, практика', price: 'от 50 000 ₽' },
    { name: 'Курс инженеров', slug: 'engineer-course', img: '/images/bg.jpg', description: '10 дней, углублённый', price: 'от 80 000 ₽' },
  ],
  'Гарантийное обслуживание': [
    { name: 'Гарантия 1 год', slug: 'warranty-1year', img: '/images/bg.jpg', description: 'Стандартная', price: 'включено' },
    { name: 'Гарантия 3 года', slug: 'warranty-3years', img: '/images/bg.jpg', description: 'Расширенная', price: 'от 5% от стоимости' },
  ],
  'Постгарантийное обслуживание': [
    { name: 'Сервисный контракт', slug: 'service-contract', img: '/images/bg.jpg', description: 'Ежегодное ТО', price: 'от 100 000 ₽/год' },
    { name: 'Выезд специалиста', slug: 'specialist-visit', img: '/images/bg.jpg', description: 'По России', price: 'от 30 000 ₽' },
  ],
  'Ремонт оборудования': [
    { name: 'Диагностика', slug: 'diagnostics', img: '/images/bg.jpg', description: 'Выявление неисправностей', price: 'от 15 000 ₽' },
    { name: 'Ремонт плат', slug: 'board-repair', img: '/images/bg.jpg', description: 'Любой сложности', price: 'от 25 000 ₽' },
    { name: 'Замена компонентов', slug: 'component-replacement', img: '/images/bg.jpg', description: 'Оригинальные запчасти', price: 'по факту' },
  ],
  'Техническая поддержка': [
    { name: 'Поддержка 24/7', slug: 'support-24-7', img: '/images/bg.jpg', description: 'Телефон, email', price: 'от 50 000 ₽/мес' },
    { name: 'Удалённая помощь', slug: 'remote-help', img: '/images/bg.jpg', description: 'TeamViewer, AnyDesk', price: 'от 5 000 ₽/час' },
  ],
  'Запасные части': [
    { name: 'Оригинальные запчасти', slug: 'original-parts', img: '/images/bg.jpg', description: 'От производителей', price: 'по запросу' },
    { name: 'Расходные материалы', slug: 'consumables', img: '/images/bg.jpg', description: 'В наличии', price: 'по прайсу' },
  ],
  'Новости компании': [
    { name: 'Открытие нового офиса', slug: 'new-office', img: '/images/bg.jpg', description: '15 марта 2025 — Открыт офис в Санкт-Петербурге' },
    { name: 'Новый контракт', slug: 'new-contract', img: '/images/bg.jpg', description: '10 марта 2025 — Поставка оборудования для Роскосмоса' },
    { name: 'Выставка ChipEXPO', slug: 'chipexpo', img: '/images/bg.jpg', description: '5 марта 2025 — Приглашаем на наш стенд' },
  ],
  'Публикации в СМИ': [
    { name: 'Интервью в журнале', slug: 'interview', img: '/images/bg.jpg', description: 'Электронные компоненты, февраль 2025' },
    { name: 'Статья в газете', slug: 'article', img: '/images/bg.jpg', description: 'Ведомости, январь 2025' },
  ],
  'Пресс-релизы': [
    { name: 'Пресс-релиз Q4 2024', slug: 'press-q4', img: '/images/bg.jpg', description: 'Итоги года' },
    { name: 'Новое направление', slug: 'new-direction', img: '/images/bg.jpg', description: 'Запуск 3D печати' },
  ],
  'Видео': [
    { name: 'Презентация компании', slug: 'company-video', img: '/images/bg.jpg', description: '5 минут' },
    { name: 'Обзор оборудования', slug: 'equipment-review', img: '/images/bg.jpg', description: '15 минут' },
  ],
  'Выставки': [
    { name: 'ChipEXPO 2025', slug: 'chipexpo-2025', img: '/images/bg.jpg', description: '15-18 апреля, Москва, Крокус Экспо' },
    { name: 'ElectronTech 2025', slug: 'electrontech-2025', img: '/images/bg.jpg', description: '20-22 мая, Санкт-Петербург' },
    { name: 'IoT Solutions 2025', slug: 'iot-2025', img: '/images/bg.jpg', description: '10-12 июня, Москва' },
  ],
  'Конференции': [
    { name: 'Конференция по электронике', slug: 'electronics-conf', img: '/images/bg.jpg', description: '25 апреля, Москва', price: 'бесплатно' },
    { name: 'Форум производителей', slug: 'manufacturers-forum', img: '/images/bg.jpg', description: '15 мая, онлайн', price: 'бесплатно' },
  ],
  'Семинары': [
    { name: 'SMT технологии', slug: 'smt-seminar', img: '/images/bg.jpg', description: 'Обучающий семинар', price: '5 000 ₽' },
    { name: 'Пайка и монтаж', slug: 'soldering-seminar', img: '/images/bg.jpg', description: 'Практический курс', price: '8 000 ₽' },
  ],
  'Вебинары': [
    { name: 'Онлайн презентация', slug: 'online-presentation', img: '/images/bg.jpg', description: 'Новое оборудование', price: 'бесплатно' },
    { name: 'Вопрос-ответ', slug: 'qa-webinar', img: '/images/bg.jpg', description: 'С экспертами', price: 'бесплатно' },
  ],
  'История компании': [
    { name: '1995 — Основание', slug: 'history-1995', img: '/images/bg.jpg', description: 'Начало пути' },
    { name: '2005 — Лидер рынка', slug: 'history-2005', img: '/images/bg.jpg', description: '10 лет успеха' },
    { name: '2025 — 30 лет', slug: 'history-2025', img: '/images/bg.jpg', description: 'Современный этап' },
  ],
  'Руководство': [
    { name: 'Генеральный директор', slug: 'ceo', img: '/images/bg.jpg', description: 'Иванов Иван Иванович' },
    { name: 'Технический директор', slug: 'cto', img: '/images/bg.jpg', description: 'Петров Петр Петрович' },
  ],
  'Партнёры': [
    { name: 'Официальные дистрибьюторы', slug: 'distributors', img: '/images/bg.jpg', description: '15 компаний' },
    { name: 'Сертифицированные партнёры', slug: 'partners', img: '/images/bg.jpg', description: '50+ компаний' },
  ],
  'Сертификаты': [
    { name: 'ISO 9001', slug: 'iso-9001', img: '/images/bg.jpg', description: 'Система менеджмента качества' },
    { name: 'ISO 14001', slug: 'iso-14001', img: '/images/bg.jpg', description: 'Экологический менеджмент' },
  ],
  'Реквизиты': [
    { name: 'ООО Диполь Технологии', slug: 'requisites', img: '/images/bg.jpg', description: 'ИНН: 7701234567, ОГРН: 1157746123456' },
  ],
  'Вакансии': [
    { name: 'Инженер по продажам', slug: 'sales-engineer', img: '/images/bg.jpg', description: 'Опыт от 3 лет, Москва', price: 'от 150 000 ₽' },
    { name: 'Сервисный инженер', slug: 'service-engineer', img: '/images/bg.jpg', description: 'Командировки, опыт', price: 'от 120 000 ₽' },
    { name: 'Менеджер проектов', slug: 'project-manager', img: '/images/bg.jpg', description: 'Управление проектами', price: 'от 180 000 ₽' },
  ],
  'Стажировки': [
    { name: 'Стажировка для студентов', slug: 'internship', img: '/images/bg.jpg', description: '3 месяца, оплачиваемая', price: 'от 30 000 ₽' },
    { name: 'Летняя школа', slug: 'summer-school', img: '/images/bg.jpg', description: 'Июнь-август', price: 'от 40 000 ₽' },
  ],
  'Корпоративная культура': [
    { name: 'Командные мероприятия', slug: 'team-events', img: '/images/bg.jpg', description: 'Тимбилдинги' },
    { name: 'Спорт и здоровье', slug: 'sports', img: '/images/bg.jpg', description: 'Корпоративный спорт' },
  ],
  'Отзывы сотрудников': [
    { name: 'Отзыв инженера', slug: 'review-engineer', img: '/images/bg.jpg', description: 'Работаю 5 лет' },
    { name: 'Отзыв менеджера', slug: 'review-manager', img: '/images/bg.jpg', description: 'Отличная компания' },
  ],
  'Офисы и представительства': [
    { name: 'Москва', slug: 'office-moscow', img: '/images/bg.jpg', description: 'ул. Примерная, д. 1' },
    { name: 'Санкт-Петербург', slug: 'office-spb', img: '/images/bg.jpg', description: 'пр. Примерный, д. 2' },
    { name: 'Екатеринбург', slug: 'office-ekb', img: '/images/bg.jpg', description: 'ул. Примерная, д. 3' },
  ],
  'Отдел продаж': [
    { name: 'Менеджер 1', slug: 'manager-1', img: '/images/bg.jpg', description: 'Тел: +7 (495) 123-45-67', price: 'sales@dipaul.ru' },
    { name: 'Менеджер 2', slug: 'manager-2', img: '/images/bg.jpg', description: 'Тел: +7 (495) 123-45-68', price: 'sales2@dipaul.ru' },
  ],
  'Сервисный центр': [
    { name: 'Приём заявок', slug: 'service-reception', img: '/images/bg.jpg', description: 'Тел: +7 (495) 123-45-69', price: 'service@dipaul.ru' },
    { name: 'Горячая линия', slug: 'hotline', img: '/images/bg.jpg', description: '24/7', price: '8 (800) 555-35-35' },
  ],
  'Написать нам': [
    { name: 'Форма обратной связи', slug: 'contact-form', img: '/images/bg.jpg', description: 'Заполните форму на сайте' },
  ],
  'Наука и образование': [
    { name: 'Оборудование для ВУЗов', slug: 'university-equipment', img: '/images/bg.jpg', description: 'Учебные комплексы', price: 'по запросу' },
    { name: 'Лабораторные стенды', slug: 'lab-stands', img: '/images/bg.jpg', description: 'Для исследований', price: 'от 500 000 ₽' },
  ],
  'Транспортная инфраструктура': [
    { name: 'Системы для ЖД', slug: 'railway-systems', img: '/images/bg.jpg', description: 'Железнодорожная автоматика', price: 'по запросу' },
    { name: 'Метро оборудование', slug: 'metro-equipment', img: '/images/bg.jpg', description: 'Системы управления', price: 'по запросу' },
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
                          href={`/product/${product.slug}`}
                          className="group block"
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
