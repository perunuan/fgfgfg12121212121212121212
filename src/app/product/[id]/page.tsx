'use client';

import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';

// Категории, которые НЕ должны показывать характеристики и преимущества
const simpleContentCategories = [
  'Офисы и представительства',
  'Отдел продаж',
  'Сервисный центр',
  'Написать нам',
  'Руководство',
  'Вакансии',
  'Стажировки',
  'Отзывы сотрудников',
  'Корпоративная культура',
  'Новости компании',
  'Публикации в СМИ',
  'Пресс-релизы',
  'Видео',
  'Выставки',
  'Конференции',
  'Семинары',
  'Вебинары',
  'История компании',
  'Партнёры',
  'Сертификаты',
  'Реквизиты',
];

// Маппинг категорий для хлебных крошек
const categorySlugMap: Record<string, string> = {
  'Производство электроники': 'equipment',
  'Производство микроэлектроники': 'equipment',
  'Измерения': 'equipment',
  'Испытательное оборудование': 'equipment',
  'Метрология и поверка': 'equipment',
  '3D-принтеры': 'equipment',
  'Ручная пайка и визуальный контроль': 'equipment',
  'Программное обеспечение': 'equipment',
  'Инженерная инфраструктура': 'equipment',
  'Оснащение производственных помещений': 'equipment',
  'Оборонно-промышленный комплекс': 'industries',
  'Производство электроники и ЭКБ': 'industries',
  'Космическая промышленность': 'industries',
  'Телекоммуникации и связь': 'industries',
  'Радиоэлектронная промышленность': 'industries',
  'Автомобилестроение': 'industries',
  'Авиастроение': 'industries',
  'Энергетика': 'industries',
  'Наука и образование': 'industries',
  'Транспортная инфраструктура': 'industries',
  'Техническое перевооружение': 'services',
  'Инжиниринг': 'services',
  'Аудит и консалтинг': 'services',
  'Поставка оборудования': 'services',
  'Монтаж и пусконаладка': 'services',
  'Обучение персонала': 'services',
  'Гарантийное обслуживание': 'service',
  'Постгарантийное обслуживание': 'service',
  'Ремонт оборудования': 'service',
  'Техническая поддержка': 'service',
  'Запасные части': 'service',
  'Новости компании': 'press',
  'Публикации в СМИ': 'press',
  'Пресс-релизы': 'press',
  'Видео': 'press',
  'Выставки': 'events',
  'Конференции': 'events',
  'Семинары': 'events',
  'Вебинары': 'events',
  'История компании': 'about',
  'Руководство': 'about',
  'Партнёры': 'about',
  'Сертификаты': 'about',
  'Реквизиты': 'about',
  'Вакансии': 'careers',
  'Стажировки': 'careers',
  'Корпоративная культура': 'careers',
  'Отзывы сотрудников': 'careers',
  'Офисы и представительства': 'contacts',
  'Отдел продаж': 'contacts',
  'Сервисный центр': 'contacts',
  'Написать нам': 'contacts',
};

function getCategorySlug(category: string): string {
  return categorySlugMap[category] || 'equipment';
}

// === БАЗА ДАННЫХ ВСЕХ ТОВАРОВ ===
const productsData: Record<string, {
  name: string;
  img: string;
  price: string;
  category: string;
  description: string;
  characteristics?: Record<string, string>;
  features?: string[];
  email?: string;
  phone?: string;
  address?: string;
  position?: string;
  experience?: string;
  date?: string;
  location?: string;
}> = {
  // === ПРОИЗВОДСТВО ЭЛЕКТРОНИКИ ===
  'smt-5000': { name: 'Линия SMT-5000', img: '/images/bg.jpg', price: 'от 15 000 000 ₽', category: 'Производство электроники', description: 'Автоматическая линия поверхностного монтажа полной комплектации.', characteristics: { 'Производительность': 'до 25 000 компонентов/час', 'Точность установки': '±0.03 мм', 'Количество питателей': 'до 120 штук' }, features: ['Автоматическая смена насадок', 'Система технического зрения', 'Интеграция с MES'] },
  'st-2000': { name: 'Трафаретный принтер ST-2000', img: '/images/bg.jpg', price: 'от 1 200 000 ₽', category: 'Производство электроники', description: 'Полуавтоматический трафаретный принтер для нанесения паяльной пасты.', characteristics: { 'Точность печати': '±0.025 мм', 'Размер трафарета': 'до 737 × 737 мм', 'Тип привода': 'пневматический' }, features: ['Регулируемое давление', 'Система очистки трафарета', 'Удобная замена'] },
  'jet-500': { name: 'Дозатор Jet-500', img: '/images/bg.jpg', price: 'от 1 800 000 ₽', category: 'Производство электроники', description: 'Струйный дозатор для точного нанесения клея и паяльной пасты.', characteristics: { 'Тип дозирования': 'струйное', 'Мин. объем капли': '0.5 нл', 'Частота': 'до 500 точек/сек' }, features: ['Бесконтактное дозирование', 'Автоматическая калибровка', 'Программируемые паттерны'] },
  'pick-place-3000': { name: 'Установщик компонентов', img: '/images/bg.jpg', price: 'от 8 000 000 ₽', category: 'Производство электроники', description: 'Высокоскоростной автоматический установщик компонентов.', characteristics: { 'Скорость установки': 'до 15 000 комп/час', 'Точность': '±0.04 мм', 'Количество питателей': 'до 80' }, features: ['Высокая скорость', 'Точная установка', 'Широкий диапазон'] },

  // === ИЗМЕРЕНИЯ ===
  'ds-2000': { name: 'Осциллограф DS-2000', img: '/images/bg.jpg', price: 'от 350 000 ₽', category: 'Измерения', description: 'Цифровой осциллограф с полосой пропускания 200 МГц.', characteristics: { 'Полоса пропускания': '200 МГц', 'Количество каналов': '4', 'Частота дискретизации': '1 Гвыб/с' }, features: ['Сенсорный экран', 'Автоматические измерения', 'Декодирование протоколов'] },
  'multimeter-digital': { name: 'Мультиметр Digital Pro', img: '/images/bg.jpg', price: 'от 120 000 ₽', category: 'Измерения', description: 'Прецизионный мультиметр с высоким разрешением.', characteristics: { 'Разрядность': '6.5', 'Постоянное напряжение': 'до 1000 В', 'Интерфейс': 'USB, RS-232' }, features: ['Высокая точность', 'Автоматический выбор пределов', 'Интерфейс ПК'] },
  'spectrum-analyzer': { name: 'Анализатор спектра', img: '/images/bg.jpg', price: 'от 850 000 ₽', category: 'Измерения', description: 'Анализатор спектра до 6 ГГц для радиочастотных измерений.', characteristics: { 'Частотный диапазон': '9 кГц - 6 ГГц', 'Полоса разрешения': '10 Гц - 3 МГц', 'ДД': '-145 дБм/Гц' }, features: ['Широкий диапазон', 'Высокая чувствительность', 'Удобный интерфейс'] },
  'signal-generator': { name: 'Генератор сигналов', img: '/images/bg.jpg', price: 'от 280 000 ₽', category: 'Измерения', description: 'Генератор сигналов произвольной формы.', characteristics: { 'Частотный диапазон': '1 мкГц - 100 МГц', 'Разрешение': '14 бит', 'Каналы': '2' }, features: ['Произвольная форма', 'Высокое разрешение', 'Два канала'] },

  // === 3D-ПРИНТЕРЫ ===
  'industrial-x1': { name: '3D-принтер Industrial X1', img: '/images/bg.jpg', price: 'от 1 500 000 ₽', category: '3D-принтеры', description: 'Промышленный FDM 3D-принтер для печати крупногабаритных деталей.', characteristics: { 'Технология': 'FDM', 'Область печати': '400 × 400 × 400 мм', 'Точность': '±0.1 мм' }, features: ['Большая область печати', 'Промышленное качество', 'Закрытая камера'] },
  'pro-300': { name: '3D-принтер Pro 300', img: '/images/bg.jpg', price: 'от 850 000 ₽', category: '3D-принтеры', description: 'SLA фотополимерный 3D-принтер высокой точности.', characteristics: { 'Технология': 'SLA', 'Область печати': '192 × 120 × 200 мм', 'Точность XY': '0.047 мм' }, features: ['Высокая точность', 'Гладкая поверхность', 'Идеально для прототипов'] },
  'desktop-mini': { name: '3D-принтер Desktop Mini', img: '/images/bg.jpg', price: 'от 250 000 ₽', category: '3D-принтеры', description: 'Компактный настольный 3D-принтер для офиса.', characteristics: { 'Технология': 'FDM', 'Область печати': '150 × 150 × 150 мм', 'Вес': '8 кг' }, features: ['Компактный', 'Прост в использовании', 'Недорогой'] },
  'metal-pro': { name: '3D-принтер Metal Pro', img: '/images/bg.jpg', price: 'от 5 000 000 ₽', category: '3D-принтеры', description: 'Промышленный 3D-принтер для печати металлом.', characteristics: { 'Технология': 'DMLS', 'Область печати': '250 × 250 × 300 мм', 'Мощность лазера': '400 Вт' }, features: ['Печать металлом', 'Промышленное качество', 'Высокая прочность'] },

  // === МЕНЕДЖЕРЫ И КОНТАКТЫ (БЕЗ характеристик) ===
  'manager-1': { name: 'Менеджер 1', img: '/images/bg.jpg', price: '', category: 'Отдел продаж', description: 'Специалист по продажам оборудования', phone: '+7 (495) 123-45-67', email: 'sales@dipaul.ru' },
  'manager-2': { name: 'Менеджер 2', img: '/images/bg.jpg', price: '', category: 'Отдел продаж', description: 'Специалист по работе с ключевыми клиентами', phone: '+7 (495) 123-45-68', email: 'sales2@dipaul.ru' },

  // === ОФИСЫ (БЕЗ характеристик) ===
  'office-moscow': { name: 'Москва', img: '/images/bg.jpg', price: '', category: 'Офисы и представительства', description: 'Головной офис компании', address: 'ул. Примерная, д. 1, Москва, 123456', phone: '+7 (495) 123-45-67', email: 'info@dipaul.ru' },
  'office-spb': { name: 'Санкт-Петербург', img: '/images/bg.jpg', price: '', category: 'Офисы и представительства', description: 'Региональный офис', address: 'пр. Примерный, д. 2, Санкт-Петербург, 654321', phone: '+7 (812) 123-45-67', email: 'spb@dipaul.ru' },
  'office-ekb': { name: 'Екатеринбург', img: '/images/bg.jpg', price: '', category: 'Офисы и представительства', description: 'Региональный офис', address: 'ул. Примерная, д. 3, Екатеринбург, 112233', phone: '+7 (343) 123-45-67', email: 'ekb@dipaul.ru' },

  // === СЕРВИСНЫЙ ЦЕНТР (БЕЗ характеристик) ===
  'service-reception': { name: 'Приём заявок', img: '/images/bg.jpg', price: '', category: 'Сервисный центр', description: 'Приём заявок на сервисное обслуживание', phone: '+7 (495) 123-45-69', email: 'service@dipaul.ru' },
  'hotline': { name: 'Горячая линия', img: '/images/bg.jpg', price: '', category: 'Сервисный центр', description: 'Круглосуточная техническая поддержка', phone: '8 (800) 555-35-35' },

  // === ВАКАНСИИ (БЕЗ характеристик) ===
  'sales-engineer': { name: 'Инженер по продажам', img: '/images/bg.jpg', price: 'от 150 000 ₽', category: 'Вакансии', description: 'Требуется опытный инженер по продажам', experience: 'от 3 лет', location: 'Москва' },
  'service-engineer': { name: 'Сервисный инженер', img: '/images/bg.jpg', price: 'от 120 000 ₽', category: 'Вакансии', description: 'Требуется сервисный инженер', experience: 'от 2 лет', location: 'Москва, командировки' },
  'project-manager': { name: 'Менеджер проектов', img: '/images/bg.jpg', price: 'от 180 000 ₽', category: 'Вакансии', description: 'Требуется менеджер проектов', experience: 'от 5 лет', location: 'Москва' },

  // === СТАЖИРОВКИ (БЕЗ характеристик) ===
  'internship': { name: 'Стажировка для студентов', img: '/images/bg.jpg', price: 'от 30 000 ₽', category: 'Стажировки', description: 'Оплачиваемая стажировка для студентов технических ВУЗов', experience: '3 месяца', location: 'Москва' },
  'summer-school': { name: 'Летняя школа', img: '/images/bg.jpg', price: 'от 40 000 ₽', category: 'Стажировки', description: 'Летняя производственная практика', experience: 'Июнь-август', location: 'Москва' },

  // === НОВОСТИ (БЕЗ характеристик) ===
  'new-office': { name: 'Открытие нового офиса', img: '/images/bg.jpg', price: '', category: 'Новости компании', description: '15 марта 2025 — Открыт офис в Санкт-Петербурге', date: '15.03.2025' },
  'new-contract': { name: 'Новый контракт', img: '/images/bg.jpg', price: '', category: 'Новости компании', description: '10 марта 2025 — Поставка оборудования для Роскосмоса', date: '10.03.2025' },
  'chipexpo': { name: 'Выставка ChipEXPO', img: '/images/bg.jpg', price: '', category: 'Новости компании', description: '5 марта 2025 — Приглашаем на наш стенд', date: '05.03.2025' },

  // === ВЫСТАВКИ (БЕЗ характеристик) ===
  'chipexpo-2025': { name: 'ChipEXPO 2025', img: '/images/bg.jpg', price: '', category: 'Выставки', description: '15-18 апреля, Москва, Крокус Экспо', date: '15-18.04.2025', location: 'Москва, Крокус Экспо' },
  'electrontech-2025': { name: 'ElectronTech 2025', img: '/images/bg.jpg', price: '', category: 'Выставки', description: '20-22 мая, Санкт-Петербург', date: '20-22.05.2025', location: 'Санкт-Петербург' },
  'iot-2025': { name: 'IoT Solutions 2025', img: '/images/bg.jpg', price: '', category: 'Выставки', description: '10-12 июня, Москва', date: '10-12.06.2025', location: 'Москва' },

  // === КОНФЕРЕНЦИИ (БЕЗ характеристик) ===
  'electronics-conf': { name: 'Конференция по электронике', img: '/images/bg.jpg', price: 'бесплатно', category: 'Конференции', description: '25 апреля, Москва', date: '25.04.2025', location: 'Москва' },
  'manufacturers-forum': { name: 'Форум производителей', img: '/images/bg.jpg', price: 'бесплатно', category: 'Конференции', description: '15 мая, онлайн', date: '15.05.2025', location: 'Онлайн' },

  // === РУКОВОДСТВО (БЕЗ характеристик) ===
  'ceo': { name: 'Генеральный директор', img: '/images/bg.jpg', price: '', category: 'Руководство', description: 'Иванов Иван Иванович', position: 'Генеральный директор', experience: '15+ лет' },
  'cto': { name: 'Технический директор', img: '/images/bg.jpg', price: '', category: 'Руководство', description: 'Петров Петр Петрович', position: 'Технический директор', experience: '20+ лет' },

  // === ИСТОРИЯ КОМПАНИИ (БЕЗ характеристик) ===
  'history-1995': { name: '1995 — Основание', img: '/images/bg.jpg', price: '', category: 'История компании', description: 'Начало пути', date: '1995' },
  'history-2005': { name: '2005 — Лидер рынка', img: '/images/bg.jpg', price: '', category: 'История компании', description: '10 лет успеха', date: '2005' },
  'history-2025': { name: '2025 — 30 лет', img: '/images/bg.jpg', price: '', category: 'История компании', description: 'Современный этап', date: '2025' },

  // === ОСТАЛЬНЫЕ ТОВАРЫ С ХАРАКТЕРИСТИКАМИ ===
  'die-bonder-x1': { name: 'Установка для монтажа кристаллов', img: '/images/bg.jpg', price: 'от 12 000 000 ₽', category: 'Производство микроэлектроники', description: 'Точный монтаж чипов для микроэлектроники.', characteristics: { 'Точность': '±5 мкм', 'Скорость': 'до 5000 чипов/час', 'Тип': 'автоматический' }, features: ['Высокая точность', 'Автоматическая подача', 'Контроль качества'] },
  'wire-bonder-pro': { name: 'Проволочный компаратор', img: '/images/bg.jpg', price: 'от 5 500 000 ₽', category: 'Производство микроэлектроники', description: 'Сварка проволокой для микроэлектроники.', characteristics: { 'Диаметр проволоки': '15-500 мкм', 'Скорость': 'до 15 сварок/сек', 'Тип': 'ультразвуковой' }, features: ['Автоматическая сварка', 'Контроль качества', 'Надежность'] },
  'annealing-furnace': { name: 'Печь для отжига', img: '/images/bg.jpg', price: 'от 3 200 000 ₽', category: 'Производство микроэлектроники', description: 'Термическая обработка полупроводников.', characteristics: { 'Температура': 'до 1200°C', 'Объем': '50 л', 'Контроль': 'автоматический' }, features: ['Стабильность', 'Безопасность', 'Программируемые циклы'] },
  'climate-chamber': { name: 'Климатическая камера', img: '/images/bg.jpg', price: 'от 1 500 000 ₽', category: 'Испытательное оборудование', description: 'Испытания при различных температурах и влажности.', characteristics: { 'Температура': 'от -70°C до +180°C', 'Влажность': '10-98%', 'Объем': '1000 л' }, features: ['Точный контроль', 'Программируемые циклы', 'Безопасность'] },
  'vibration-tester': { name: 'Вибростенд', img: '/images/bg.jpg', price: 'от 2 800 000 ₽', category: 'Испытательное оборудование', description: 'Испытания вибрацией для электроники.', characteristics: { 'Частота': '5-3000 Гц', 'Нагрузка': 'до 500 кг', 'Ускорение': 'до 100g' }, features: ['Широкий диапазон', 'Автоматическое управление', 'Протоколы испытаний'] },
  'salt-spray': { name: 'Камера соли и тумана', img: '/images/bg.jpg', price: 'от 650 000 ₽', category: 'Испытательное оборудование', description: 'Коррозионные испытания материалов.', characteristics: { 'Температура': '35°C', 'Концентрация': '5% NaCl', 'Объем': '150 л' }, features: ['Стандарты ГОСТ/ISO', 'Автоматика', 'Надежность'] },
  'calibration-complex': { name: 'Поверочный комплекс', img: '/images/bg.jpg', price: 'от 950 000 ₽', category: 'Метрология и поверка', description: 'Поверка измерительных приборов.', characteristics: { 'Каналы': '8', 'Точность': '0.01%', 'Интерфейс': 'USB, LAN' }, features: ['Автоматическая поверка', 'Протоколы', 'Сертификация'] },
  'calibrator-multi': { name: 'Калибратор', img: '/images/bg.jpg', price: 'от 420 000 ₽', category: 'Метрология и поверка', description: 'Многофункциональный калибратор.', characteristics: { 'Тип': 'Универсальный', 'Точность': '0.05%', 'Диапазон': 'широкий' }, features: ['Портативность', 'Точность', 'Удобство'] },
  'voltage-reference': { name: 'Эталон напряжения', img: '/images/bg.jpg', price: 'от 380 000 ₽', category: 'Метрология и поверка', description: 'Эталон напряжения класса 0.01.', characteristics: { 'Класс': '0.01', 'Стабильность': 'Высокая', 'Диапазон': '1-1000 В' }, features: ['Эталон', 'Надежность', 'Сертификация'] },
  'soldering-station': { name: 'Паяльная станция', img: '/images/bg.jpg', price: 'от 45 000 ₽', category: 'Ручная пайка и визуальный контроль', description: 'Цифровая паяльная станция 150W.', characteristics: { 'Мощность': '150W', 'Температура': 'до 450°C', 'Тип': 'цифровая' }, features: ['Цифровой контроль', 'ESD защита', 'Быстрый нагрев'] },
  'stereo-microscope': { name: 'Микроскоп стерео', img: '/images/bg.jpg', price: 'от 85 000 ₽', category: 'Ручная пайка и визуальный контроль', description: 'Стереомикроскоп с увеличением 7x-45x.', characteristics: { 'Увеличение': '7x-45x', 'Подсветка': 'LED', 'Тип': 'стерео' }, features: ['Широкий угол', 'Регулировка', 'Комфорт'] },
  'inspection-system': { name: 'Инспекционная система', img: '/images/bg.jpg', price: 'от 1 200 000 ₽', category: 'Ручная пайка и визуальный контроль', description: 'Автоматический визуальный контроль.', characteristics: { 'Тип': 'AOI', 'Скорость': 'Высокая', 'Разрешение': '4K' }, features: ['Автоматика', 'Точность', 'Протоколы'] },
  'cad-pro': { name: 'CAD система Pro', img: '/images/bg.jpg', price: 'от 150 000 ₽', category: 'Программное обеспечение', description: 'Проектирование печатных плат.', characteristics: { 'Лицензия': 'бессрочная', 'Поддержка': '1 год', '3D': 'да' }, features: ['3D моделирование', 'Библиотеки компонентов', 'Экспорт'] },
  'cam-system': { name: 'CAM система', img: '/images/bg.jpg', price: 'от 200 000 ₽', category: 'Программное обеспечение', description: 'Подготовка производства.', characteristics: { 'Форматы': 'Gerber, ODB++', 'Проверка': 'DRC', 'Оптимизация': 'да' }, features: ['Автоматизация', 'Оптимизация', 'Интеграция'] },
  'mes-system': { name: 'Система управления', img: '/images/bg.jpg', price: 'от 500 000 ₽', category: 'Программное обеспечение', description: 'MES для производства.', characteristics: { 'Модули': 'Учет, Планирование', 'Интеграция': 'ERP', 'Аналитика': 'да' }, features: ['Контроль', 'Аналитика', 'Отчетность'] },
  'clean-room': { name: 'Чистая комната', img: '/images/bg.jpg', price: 'от 5 000 000 ₽', category: 'Инженерная инфраструктура', description: 'Чистое помещение класса чистоты ISO 5.', characteristics: { 'Класс': 'ISO 5', 'Площадь': 'до 100 м²', 'Климат': 'контроль' }, features: ['Контроль чистоты', 'Климат-контроль', 'Сертификация'] },
  'ventilation-system': { name: 'Вентиляционная система', img: '/images/bg.jpg', price: 'от 1 800 000 ₽', category: 'Инженерная инфраструктура', description: 'Промышленная вентиляция.', characteristics: { 'Производительность': '5000 м³/ч', 'Фильтрация': 'HEPA', 'Управление': 'автоматическое' }, features: ['Энергоэффективность', 'Автоматика', 'Надежность'] },
  'water-purification': { name: 'Система очистки воды', img: '/images/bg.jpg', price: 'от 950 000 ₽', category: 'Инженерная инфраструктура', description: 'Деионизация воды для производства.', characteristics: { 'Тип': 'Деионизатор', 'Производительность': '100 л/ч', 'Качество': 'высокое' }, features: ['Чистота', 'Надежность', 'Автоматика'] },
  'esd-workbench': { name: 'Антистатический верстак', img: '/images/bg.jpg', price: 'от 45 000 ₽', category: 'Оснащение производственных помещений', description: 'ESD верстак для работы с электроникой.', characteristics: { 'Размер': '1500 × 750 мм', 'Нагрузка': 'до 300 кг', 'ESD': 'защита' }, features: ['ESD защита', 'Регулировка высоты', 'Прочность'] },
  'industrial-shelf': { name: 'Стеллаж промышленный', img: '/images/bg.jpg', price: 'от 25 000 ₽', category: 'Оснащение производственных помещений', description: 'Промышленный стеллаж.', characteristics: { 'Грузоподъемность': '500 кг', 'Высота': '2000 мм', 'Полки': '5' }, features: ['Прочность', 'Модульность', 'Сборка'] },
  'storage-cabinet': { name: 'Шкаф для хранения', img: '/images/bg.jpg', price: 'от 35 000 ₽', category: 'Оснащение производственных помещений', description: 'Шкаф для хранения компонентов.', characteristics: { 'Объем': '200 л', 'Замок': 'да', 'Материал': 'металл' }, features: ['Безопасность', 'Вместимость', 'Организация'] },
  'esd-chair': { name: 'Стул антистатический', img: '/images/bg.jpg', price: 'от 15 000 ₽', category: 'Оснащение производственных помещений', description: 'ESD регулируемый стул.', characteristics: { 'Нагрузка': '120 кг', 'Высота': 'регулируемая', 'ESD': 'защита' }, features: ['ESD', 'Комфорт', 'Регулировка'] },
  'pcb-line': { name: 'Линия сборки плат', img: '/images/bg.jpg', price: 'от 20 000 000 ₽', category: 'Производство электроники и ЭКБ', description: 'Полный цикл производства печатных плат.', characteristics: { 'Производительность': 'Высокая', 'Автоматизация': 'Полная', 'Качество': 'высокое' }, features: ['Скорость', 'Интеграция', 'Качество'] },
  'ekb-equipment': { name: 'Оборудование для ЭКБ', img: '/images/bg.jpg', price: 'от 10 000 000 ₽', category: 'Производство электроники и ЭКБ', description: 'Производство электронных компонентов.', characteristics: { 'Тип': 'Комплексное', 'Точность': 'Высокая', 'Автоматизация': 'Полная' }, features: ['Комплексность', 'Точность', 'Надежность'] },
  'opk-equipment': { name: 'Специализированное оборудование ОПК', img: '/images/bg.jpg', price: 'по запросу', category: 'Оборонно-промышленный комплекс', description: 'Оборудование по техническому заданию.', characteristics: { 'Сертификация': 'Военная', 'Надежность': 'Повышенная', 'Качество': 'ГОСТ' }, features: ['Соответствие ГОСТ', 'Надежность', 'Безопасность'] },
  'quality-control': { name: 'Системы контроля качества', img: '/images/bg.jpg', price: 'по запросу', category: 'Оборонно-промышленный комплекс', description: 'Военная приемка и контроль.', characteristics: { 'Тип': 'Комплексный', 'Стандарты': 'Военные', 'Автоматика': 'да' }, features: ['Контроль', 'Стандарты', 'Надежность'] },
  'space-equipment': { name: 'Оборудование для космоса', img: '/images/bg.jpg', price: 'по запросу', category: 'Космическая промышленность', description: 'Сертифицированное космическое оборудование.', characteristics: { 'Сертификация': 'Космическая', 'Точность': 'Высокая', 'Надежность': 'Повышенная' }, features: ['Сертификация', 'Надежность', 'Качество'] },
  'space-vibration': { name: 'Вибростенд космический', img: '/images/bg.jpg', price: 'от 15 000 000 ₽', category: 'Космическая промышленность', description: 'Испытания спутников вибрацией.', characteristics: { 'Частота': '5-3000 Гц', 'Нагрузка': 'до 1000 кг', 'Точность': 'Высокая' }, features: ['Космические стандарты', 'Точность', 'Надежность'] },
  'aviation-equipment': { name: 'Оборудование для авиации', img: '/images/bg.jpg', price: 'по запросу', category: 'Авиастроение', description: 'Оборудование с сертификатом FAA.', characteristics: { 'Сертификация': 'FAA', 'Точность': 'Прецизионная', 'Качество': 'Высокое' }, features: ['Сертификация', 'Качество', 'Надежность'] },
  'aviation-measurement': { name: 'Контрольно-измерительное', img: '/images/bg.jpg', price: 'от 2 500 000 ₽', category: 'Авиастроение', description: 'Прецизионные измерения для авиации.', characteristics: { 'Точность': 'Прецизионная', 'Диапазон': 'Широкий', 'Стандарты': 'Авиационные' }, features: ['Точность', 'Стандарты', 'Надежность'] },
  'auto-electronics': { name: 'Линия сборки электроники', img: '/images/bg.jpg', price: 'от 25 000 000 ₽', category: 'Автомобилестроение', description: 'Линия для автоэлектроники.', characteristics: { 'Производительность': '1000 плат/час', 'Автоматизация': 'Полная', 'Качество': 'IATF 16949' }, features: ['Высокая скорость', 'Качество', 'Стандарты'] },
  'auto-tester': { name: 'Тестер автомобильный', img: '/images/bg.jpg', price: 'от 850 000 ₽', category: 'Автомобилестроение', description: 'Диагностика автомобильной электроники.', characteristics: { 'Тип': 'Диагностический', 'Интерфейсы': 'CAN, LIN', 'Точность': 'Высокая' }, features: ['Диагностика', 'Интерфейсы', 'Точность'] },
  'energy-equipment': { name: 'Оборудование для энергетики', img: '/images/bg.jpg', price: 'по запросу', category: 'Энергетика', description: 'Высоковольтное оборудование.', characteristics: { 'Напряжение': 'Высокое', 'Безопасность': 'Повышенная', 'Стандарты': 'Энергетические' }, features: ['Безопасность', 'Надежность', 'Стандарты'] },
  'power-analyzer': { name: 'Анализатор качества энергии', img: '/images/bg.jpg', price: 'от 450 000 ₽', category: 'Энергетика', description: 'Анализатор класса А.', characteristics: { 'Класс': 'A', 'Каналы': '4', 'Диапазон': 'Широкий' }, features: ['Точность', 'Анализ', 'Отчетность'] },
  'fiber-tester': { name: 'Тестер оптоволокна', img: '/images/bg.jpg', price: 'от 350 000 ₽', category: 'Телекоммуникации и связь', description: 'OTDR тестер для оптоволокна.', characteristics: { 'Дальность': 'до 100 км', 'Длина волны': '1310/1550 нм', 'Точность': 'Высокая' }, features: ['Точность', 'Портативность', 'Надежность'] },
  'network-analyzer': { name: 'Анализатор сетей', img: '/images/bg.jpg', price: 'от 1 200 000 ₽', category: 'Телекоммуникации и связь', description: 'Анализатор сетей 5G ready.', characteristics: { 'Стандарты': '5G', 'Диапазон': 'Широкий', 'Интерфейсы': 'Много' }, features: ['5G ready', 'Анализ', 'Универсальность'] },
  'measurement-complex': { name: 'Измерительные комплексы', img: '/images/bg.jpg', price: 'от 1 500 000 ₽', category: 'Радиоэлектронная промышленность', description: 'Комплексы для РЭП.', characteristics: { 'Тип': 'Комплексный', 'Точность': 'Высокая', 'Каналы': 'Много' }, features: ['Комплексность', 'Точность', 'Надежность'] },
  'test-stands': { name: 'Стенды испытаний', img: '/images/bg.jpg', price: 'от 3 000 000 ₽', category: 'Радиоэлектронная промышленность', description: 'Комплексные стенды.', characteristics: { 'Тип': 'Комплексный', 'Автоматизация': 'Полная', 'Протоколы': 'Много' }, features: ['Автоматика', 'Протоколы', 'Надежность'] },
  'university-equipment': { name: 'Оборудование для ВУЗов', img: '/images/bg.jpg', price: 'по запросу', category: 'Наука и образование', description: 'Учебные комплексы.', characteristics: { 'Тип': 'Учебное', 'Комплекты': 'Да', 'Поддержка': 'Да' }, features: ['Образование', 'Гибкость', 'Поддержка'] },
  'lab-stands': { name: 'Лабораторные стенды', img: '/images/bg.jpg', price: 'от 500 000 ₽', category: 'Наука и образование', description: 'Для исследований.', characteristics: { 'Тип': 'Исследовательское', 'Точность': 'Высокая', 'Гибкость': 'Да' }, features: ['Исследования', 'Точность', 'Гибкость'] },
  'railway-systems': { name: 'Системы для ЖД', img: '/images/bg.jpg', price: 'по запросу', category: 'Транспортная инфраструктура', description: 'Железнодорожная автоматика.', characteristics: { 'Тип': 'ЖД', 'Надежность': 'Высокая', 'Безопасность': 'Повышенная' }, features: ['Безопасность', 'Автоматика', 'Надежность'] },
  'metro-equipment': { name: 'Метро оборудование', img: '/images/bg.jpg', price: 'по запросу', category: 'Транспортная инфраструктура', description: 'Системы управления метро.', characteristics: { 'Тип': 'Метро', 'Надежность': 'Высокая', 'Стандарты': 'Транспортные' }, features: ['Безопасность', 'Управление', 'Стандарты'] },
  'production-audit': { name: 'Аудит производства', img: '/images/bg.jpg', price: 'от 500 000 ₽', category: 'Техническое перевооружение', description: 'Анализ текущего состояния.', characteristics: { 'Срок': '2-4 недели', 'Отчет': 'Полный', 'Эксперты': 'Да' }, features: ['Анализ', 'Рекомендации', 'Опыт'] },
  'modernization-project': { name: 'Проект модернизации', img: '/images/bg.jpg', price: 'от 1 000 000 ₽', category: 'Техническое перевооружение', description: 'Разработка концепции.', characteristics: { 'Срок': '1-3 месяца', 'Документация': 'Полная', '3D': 'Да' }, features: ['Проектирование', 'Оптимизация', '3D'] },
  'turnkey-implementation': { name: 'Внедрение под ключ', img: '/images/bg.jpg', price: 'по запросу', category: 'Техническое перевооружение', description: 'Полный цикл работ.', characteristics: { 'Срок': 'По договору', 'Гарантия': 'Полная', 'Поддержка': 'Да' }, features: ['Комплексность', 'Гарантия', 'Поддержка'] },
  'line-design': { name: 'Проектирование линий', img: '/images/bg.jpg', price: 'от 800 000 ₽', category: 'Инжиниринг', description: '3D моделирование.', characteristics: { 'Формат': '3D CAD', 'Срок': '2-6 недель', 'Документация': 'Полная' }, features: ['3D модели', 'Документация', 'Оптимизация'] },
  'system-integration': { name: 'Интеграция систем', img: '/images/bg.jpg', price: 'от 1 500 000 ₽', category: 'Инжиниринг', description: 'Автоматизация.', characteristics: { 'Тип': 'Комплексный', 'Протоколы': 'Много', 'Поддержка': 'Да' }, features: ['Автоматизация', 'Интеграция', 'Поддержка'] },
  'technical-audit': { name: 'Технический аудит', img: '/images/bg.jpg', price: 'от 300 000 ₽', category: 'Аудит и консалтинг', description: 'Оценка оборудования.', characteristics: { 'Срок': '1-2 недели', 'Отчет': 'Детальный', 'Эксперты': 'Да' }, features: ['Оценка', 'Рекомендации', 'Опыт'] },
  'consulting': { name: 'Консалтинг', img: '/images/bg.jpg', price: 'от 10 000 ₽/час', category: 'Аудит и консалтинг', description: 'Экспертные консультации.', characteristics: { 'Формат': 'Онлайн/Очный', 'Эксперты': 'Да', 'Опыт': '15+ лет' }, features: ['Экспертиза', 'Гибкость', 'Опыт'] },
  'turnkey-supply': { name: 'Поставка под ключ', img: '/images/bg.jpg', price: 'индивидуально', category: 'Поставка оборудования', description: 'Логистика и таможня.', characteristics: { 'Срок': 'По договору', 'Гарантия': 'Полная', 'Логистика': 'Мир' }, features: ['Логистика', 'Таможня', 'Гарантия'] },
  'foreign-purchase': { name: 'Закупка за рубежом', img: '/images/bg.jpg', price: 'индивидуально', category: 'Поставка оборудования', description: 'Прямые контракты.', characteristics: { 'Страны': 'Мир', 'Контракты': 'Прямые', 'Поддержка': 'Да' }, features: ['Прямые контракты', 'Поддержка', 'Опыт'] },
  'equipment-installation': { name: 'Монтаж оборудования', img: '/images/bg.jpg', price: 'от 200 000 ₽', category: 'Монтаж и пусконаладка', description: 'Установка и подключение.', characteristics: { 'Срок': 'По договору', 'Гарантия': '1 год', 'Специалисты': 'Да' }, features: ['Монтаж', 'Настройка', 'Гарантия'] },
  'commissioning': { name: 'Пусконаладка', img: '/images/bg.jpg', price: 'от 300 000 ₽', category: 'Монтаж и пусконаладка', description: 'Настройка и тесты.', characteristics: { 'Срок': 'По договору', 'Тесты': 'Полные', 'Протоколы': 'Да' }, features: ['Настройка', 'Тесты', 'Протоколы'] },
  'operator-course': { name: 'Курс операторов', img: '/images/bg.jpg', price: 'от 50 000 ₽', category: 'Обучение персонала', description: '5 дней, практика.', characteristics: { 'Длительность': '5 дней', 'Формат': 'Очный', 'Практика': 'Да' }, features: ['Практика', 'Сертификат', 'Опыт'] },
  'engineer-course': { name: 'Курс инженеров', img: '/images/bg.jpg', price: 'от 80 000 ₽', category: 'Обучение персонала', description: '10 дней, углублённый.', characteristics: { 'Длительность': '10 дней', 'Формат': 'Очный', 'Уровень': 'Углубленный' }, features: ['Углубленный', 'Сертификат', 'Опыт'] },
  'warranty-1year': { name: 'Гарантия 1 год', img: '/images/bg.jpg', price: 'включено', category: 'Гарантийное обслуживание', description: 'Стандартная гарантия.', characteristics: { 'Срок': '1 год', 'Поддержка': '24/7', 'Ремонт': 'Да' }, features: ['Гарантия', 'Поддержка', 'Ремонт'] },
  'warranty-3years': { name: 'Гарантия 3 года', img: '/images/bg.jpg', price: 'от 5% от стоимости', category: 'Гарантийное обслуживание', description: 'Расширенная гарантия.', characteristics: { 'Срок': '3 года', 'Поддержка': '24/7', 'Ремонт': 'Да' }, features: ['Расширенная', 'Поддержка', 'Выгода'] },
  'service-contract': { name: 'Сервисный контракт', img: '/images/bg.jpg', price: 'от 100 000 ₽/год', category: 'Постгарантийное обслуживание', description: 'Ежегодное ТО.', characteristics: { 'Срок': '1 год', 'ТО': '2 раза в год', 'Выезд': 'Да' }, features: ['ТО', 'Поддержка', 'Выезд'] },
  'specialist-visit': { name: 'Выезд специалиста', img: '/images/bg.jpg', price: 'от 30 000 ₽', category: 'Постгарантийное обслуживание', description: 'По России.', characteristics: { 'Регион': 'Россия', 'Срок': '1-3 дня', 'Эксперты': 'Да' }, features: ['Выезд', 'Эксперты', 'Оперативность'] },
  'diagnostics': { name: 'Диагностика', img: '/images/bg.jpg', price: 'от 15 000 ₽', category: 'Ремонт оборудования', description: 'Выявление неисправностей.', characteristics: { 'Срок': '1-3 дня', 'Отчет': 'Полный', 'Эксперты': 'Да' }, features: ['Диагностика', 'Отчет', 'Опыт'] },
  'board-repair': { name: 'Ремонт плат', img: '/images/bg.jpg', price: 'от 25 000 ₽', category: 'Ремонт оборудования', description: 'Любой сложности.', characteristics: { 'Сложность': 'Любая', 'Срок': '3-10 дней', 'Гарантия': 'Да' }, features: ['Любая сложность', 'Гарантия', 'Опыт'] },
  'component-replacement': { name: 'Замена компонентов', img: '/images/bg.jpg', price: 'по факту', category: 'Ремонт оборудования', description: 'Оригинальные запчасти.', characteristics: { 'Запчасти': 'Оригинал', 'Срок': 'По наличию', 'Гарантия': 'Да' }, features: ['Оригинал', 'Гарантия', 'Качество'] },
  'support-24-7': { name: 'Поддержка 24/7', img: '/images/bg.jpg', price: 'от 50 000 ₽/мес', category: 'Техническая поддержка', description: 'Телефон, email.', characteristics: { 'Режим': '24/7', 'Каналы': 'Телефон, email', 'Ответ': 'Быстрый' }, features: ['Круглосуточно', 'Каналы', 'Оперативность'] },
  'remote-help': { name: 'Удалённая помощь', img: '/images/bg.jpg', price: 'от 5 000 ₽/час', category: 'Техническая поддержка', description: 'TeamViewer, AnyDesk.', characteristics: { 'Программы': 'TeamViewer, AnyDesk', 'Срок': 'По запросу', 'Эксперты': 'Да' }, features: ['Удаленно', 'Эксперты', 'Гибкость'] },
  'original-parts': { name: 'Оригинальные запчасти', img: '/images/bg.jpg', price: 'по запросу', category: 'Запасные части', description: 'От производителей.', characteristics: { 'Производитель': 'Оригинал', 'Гарантия': '1 год', 'Доставка': 'Мир' }, features: ['Оригинал', 'Гарантия', 'Доставка'] },
  'consumables': { name: 'Расходные материалы', img: '/images/bg.jpg', price: 'по прайсу', category: 'Запасные части', description: 'В наличии.', characteristics: { 'Наличие': 'Да', 'Доставка': 'Быстрая', 'Цены': 'Конкурентные' }, features: ['Наличие', 'Доставка', 'Цены'] },
  'interview': { name: 'Интервью в журнале', img: '/images/bg.jpg', price: '', category: 'Публикации в СМИ', description: 'Электронные компоненты, февраль 2025.', date: '02.2025' },
  'article': { name: 'Статья в газете', img: '/images/bg.jpg', price: '', category: 'Публикации в СМИ', description: 'Ведомости, январь 2025.', date: '01.2025' },
  'press-q4': { name: 'Пресс-релиз Q4 2024', img: '/images/bg.jpg', price: '', category: 'Пресс-релизы', description: 'Итоги года.', date: 'Q4 2024' },
  'new-direction': { name: 'Новое направление', img: '/images/bg.jpg', price: '', category: 'Пресс-релизы', description: 'Запуск 3D печати.', date: '2025' },
  'company-video': { name: 'Презентация компании', img: '/images/bg.jpg', price: '', category: 'Видео', description: '5 минут.' },
  'equipment-review': { name: 'Обзор оборудования', img: '/images/bg.jpg', price: '', category: 'Видео', description: '15 минут.' },
  'smt-seminar': { name: 'SMT технологии', img: '/images/bg.jpg', price: '5 000 ₽', category: 'Семинары', description: 'Обучающий семинар.', date: '1 день' },
  'soldering-seminar': { name: 'Пайка и монтаж', img: '/images/bg.jpg', price: '8 000 ₽', category: 'Семинары', description: 'Практический курс.', date: '2 дня' },
  'online-presentation': { name: 'Онлайн презентация', img: '/images/bg.jpg', price: 'бесплатно', category: 'Вебинары', description: 'Новое оборудование.' },
  'qa-webinar': { name: 'Вопрос-ответ', img: '/images/bg.jpg', price: 'бесплатно', category: 'Вебинары', description: 'С экспертами.' },
  'distributors': { name: 'Официальные дистрибьюторы', img: '/images/bg.jpg', price: '', category: 'Партнёры', description: '15 компаний.' },
  'partners': { name: 'Сертифицированные партнёры', img: '/images/bg.jpg', price: '', category: 'Партнёры', description: '50+ компаний.' },
  'iso-9001': { name: 'ISO 9001', img: '/images/bg.jpg', price: '', category: 'Сертификаты', description: 'Система менеджмента качества.' },
  'iso-14001': { name: 'ISO 14001', img: '/images/bg.jpg', price: '', category: 'Сертификаты', description: 'Экологический менеджмент.' },
  'requisites': { name: 'ООО Диполь Технологии', img: '/images/bg.jpg', price: '', category: 'Реквизиты', description: 'ИНН: 7701234567, ОГРН: 1157746123456.' },
  'team-events': { name: 'Командные мероприятия', img: '/images/bg.jpg', price: '', category: 'Корпоративная культура', description: 'Тимбилдинги.' },
  'sports': { name: 'Спорт и здоровье', img: '/images/bg.jpg', price: '', category: 'Корпоративная культура', description: 'Корпоративный спорт.' },
  'review-engineer': { name: 'Отзыв инженера', img: '/images/bg.jpg', price: '', category: 'Отзывы сотрудников', description: 'Работаю 5 лет.' },
  'review-manager': { name: 'Отзыв менеджера', img: '/images/bg.jpg', price: '', category: 'Отзывы сотрудников', description: 'Отличная компания.' },
  'contact-form': { name: 'Форма обратной связи', img: '/images/bg.jpg', price: '', category: 'Написать нам', description: 'Заполните форму на сайте.' },
};

export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = params.id as string;
  const product = productsData[productId];

  // Получаем параметр 'from' из URL
  const fromCategorySlug = searchParams.get('from');

  const handleBack = () => {
    if (fromCategorySlug) {
      // Переходим в категорию с параметром sub, чтобы открыть нужную подкатегорию
      router.push(`/category/${fromCategorySlug}?sub=${encodeURIComponent(product.category)}`);
    } else {
      router.back();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    setIsModalOpen(false);
  };

  if (!product) {
    return (
      <>
        <Header onContactClick={() => setIsModalOpen(true)} />
        <main className="min-h-screen bg-gray-50 flex flex-col">
          <div className="flex-1 flex items-center justify-center px-4 py-20">
            <div className="text-center max-w-lg">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Товар не найден</h1>
              <p className="text-gray-600 mb-8">К сожалению, запрошенный товар не существует.</p>
              <button
                onClick={handleBack}
                className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-sm px-6 py-3 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Вернуться назад
              </button>
            </div>
          </div>
          <footer className="bg-gray-950 text-white py-16">
            <div className="container">
              <div className="text-center text-gray-500 text-sm">
                <p>&copy; 2024 ООО «Диполь Технологии». Все права защищены.</p>
              </div>
            </div>
          </footer>
        </main>
      </>
    );
  }

  // Проверяем, нужно ли показывать характеристики и преимущества
  const showSpecs = !simpleContentCategories.includes(product.category);

  return (
    <>
      <Header onContactClick={() => setIsModalOpen(true)} />
      <main className="min-h-screen bg-gray-50">
      {/* Хлебные крошки - КЛИКАБЕЛЬНЫЕ */}
      <div className="bg-white border-b border-gray-200">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-700 transition-colors">
              Главная
            </Link>
            <span>/</span>
            <Link
              href={`/category/${getCategorySlug(product.category)}?sub=${encodeURIComponent(product.category)}`}
              className="hover:text-blue-700 transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

        <section className="py-12">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div className="bg-white rounded-sm p-8">
                <div className="aspect-square bg-gray-100 rounded-sm overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                </div>
              </div>

              <div>
                <div className="text-sm text-blue-700 font-medium mb-2">{product.category}</div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                {product.price && <div className="text-3xl font-bold text-blue-700 mb-6">{product.price}</div>}
                <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.description}</p>

                {/* Контактная информация для менеджеров и контактов */}
                {(product.phone || product.email || product.address) && (
                  <div className="bg-gray-50 rounded-sm p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Контактная информация</h3>
                    <div className="space-y-3">
                      {product.phone && (
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href={`tel:${product.phone}`} className="text-gray-700 hover:text-blue-700">{product.phone}</a>
                        </div>
                      )}
                      {product.email && (
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <a href={`mailto:${product.email}`} className="text-gray-700 hover:text-blue-700">{product.email}</a>
                        </div>
                      )}
                      {product.address && (
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-blue-700 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-700">{product.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Дополнительная информация для вакансий */}
                {(product.experience || product.location) && (
                  <div className="bg-gray-50 rounded-sm p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Требования</h3>
                    <div className="space-y-2">
                      {product.experience && (
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700">Опыт: {product.experience}</span>
                        </div>
                      )}
                      {product.location && (
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <span className="text-gray-700">Локация: {product.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Информация о дате для новостей и мероприятий */}
                {product.date && (
                  <div className="bg-blue-50 rounded-sm p-4 mb-8">
                    <div className="flex items-center gap-2 text-blue-900">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">{product.date}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mb-8">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-sm px-8 py-4 transition-all inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Связаться
                  </button>
                  <button
                    onClick={handleBack}
                    className="border-2 border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-medium rounded-sm px-8 py-4 transition-all"
                  >
                    Назад
                  </button>
                </div>

                {/* Преимущества (только для товаров) */}
                {showSpecs && product.features && product.features.length > 0 && (
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Преимущества</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Характеристики (только для товаров) */}
            {showSpecs && product.characteristics && Object.keys(product.characteristics).length > 0 && (
              <div className="bg-white rounded-sm p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Технические характеристики</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.characteristics).map(([key, value]) => (
                    <div key={key} className="flex border-b border-gray-200 pb-3">
                      <div className="w-1/2 text-gray-500 font-medium">{key}</div>
                      <div className="w-1/2 text-gray-900">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* === ПОЛНЫЙ ФУТЕР (как на главной) === */}
        <footer className="bg-gray-950 text-white py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
              {/* Логотип и контакты */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-700 rounded-sm flex items-center justify-center text-white font-bold text-xl">Д</div>
                  <div>
                    <div className="text-2xl font-bold">ДИПОЛЬ</div>
                    <div className="text-xs text-gray-400">ТЕХНОЛОГИИ</div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-6">Технологическая поддержка предприятий радиоэлектронной промышленности</p>
                <div className="space-y-3">
                  <a href="tel:88005553535" className="block text-lg font-medium text-white hover:text-blue-400 transition-colors">8 (800) 555-35-35</a>
                  <a href="mailto:info@dipaul.ru" className="block text-sm text-gray-400 hover:text-white transition-colors">info@dipaul.ru</a>
                  <p className="text-sm text-gray-400">Пн-Пт: 9:00 - 18:00</p>
                </div>
              </div>
              {/* Разделы */}
              <div>
                <h4 className="font-semibold mb-6 text-white text-lg">Разделы</h4>
                <ul className="space-y-3">
                  <li><Link href="/category/equipment" className="text-gray-400 hover:text-blue-400 transition-colors">Оборудование</Link></li>
                  <li><Link href="/category/industries" className="text-gray-400 hover:text-blue-400 transition-colors">Отраслевые решения</Link></li>
                  <li><Link href="/category/services" className="text-gray-400 hover:text-blue-400 transition-colors">Услуги</Link></li>
                  <li><Link href="/category/service" className="text-gray-400 hover:text-blue-400 transition-colors">Сервис</Link></li>
                </ul>
              </div>
              {/* Компания */}
              <div>
                <h4 className="font-semibold mb-6 text-white text-lg">Компания</h4>
                <ul className="space-y-3">
                  <li><Link href="/category/about" className="text-gray-400 hover:text-blue-400 transition-colors">О компании</Link></li>
                  <li><Link href="/category/press" className="text-gray-400 hover:text-blue-400 transition-colors">Пресс-центр</Link></li>
                  <li><Link href="/category/events" className="text-gray-400 hover:text-blue-400 transition-colors">Мероприятия</Link></li>
                  <li><button onClick={() => setIsModalOpen(true)} className="text-gray-400 hover:text-blue-400 transition-colors">Контакты</button></li>
                </ul>
              </div>
            </div>
            {/* Нижняя часть футера */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-500 text-sm text-center md:text-left"><p>&copy; 2024 ООО «Диполь Технологии». Все права защищены.</p></div>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <Link href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Политика конфиденциальности</Link>
                  <Link href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Пользовательское соглашение</Link>
                  <Link href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Карта сайта</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* === МОДАЛЬНОЕ ОКНО (встроено) === */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-gray-900 rounded-sm p-8 max-w-md w-full border border-gray-800 shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">Остались вопросы?</h2>
            <p className="text-gray-400 mb-6">Оставьте заявку, и мы свяжемся с вами</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Ваше имя" required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors" />
              <input type="tel" placeholder="Телефон" required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors" />
              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-sm px-6 py-3 transition-all duration-200 hover:shadow-lg">Отправить заявку</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
