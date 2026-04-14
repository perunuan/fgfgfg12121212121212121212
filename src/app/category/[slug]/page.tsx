'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';

const productsData: Record<string, Array<{ name: string; slug: string; img: string; description: string; salary?: string }>> = {
  // === КОЛЛАБОРАТИВНАЯ РОБОТОТЕХНИКА ===
  'Коботы Universal Robots': [
    { name: 'UR3e', slug: 'ur3e', img: '/images/bg.jpg', description: 'Компактный кобот для малых задач, радиус 500 мм, грузоподъёмность 3 кг' },
    { name: 'UR5e', slug: 'ur5e', img: '/images/bg.jpg', description: 'Универсальный кобот для сборки и упаковки, радиус 850 мм, грузоподъёмность 5 кг' },
    { name: 'UR10e', slug: 'ur10e', img: '/images/bg.jpg', description: 'Мощный кобот для паллетирования, радиус 1300 мм, грузоподъёмность 12.5 кг' },
    { name: 'UR16e', slug: 'ur16e', img: '/images/bg.jpg', description: 'Тяжёлый кобот для автопрома, радиус 900 мм, грузоподъёмность 16 кг' },
    { name: 'UR20', slug: 'ur20', img: '/images/bg.jpg', description: 'Новейшая модель для крупных задач, радиус 1750 мм, грузоподъёмность 20 кг' },
  ],
  'Системы безопасности': [
    { name: 'Лазерные сканеры SICK', slug: 'sick-scanners', img: '/images/bg.jpg', description: 'Защитные зоны для коботов, сертификация SIL2/PLd' },
    { name: 'Светофоры и маяки', slug: 'signal-towers', img: '/images/bg.jpg', description: 'Визуальная индикация статуса робота и линии' },
    { name: 'Защитные кожухи', slug: 'protective-covers', img: '/images/bg.jpg', description: 'IP54 защита для работы в агрессивных средах' },
    { name: 'Аварийные кнопки', slug: 'emergency-stops', img: '/images/bg.jpg', description: 'Категория 0 и 1 по стандарту ISO 13850' },
  ],
  'Программирование и обучение': [
    { name: 'Курс PolyScope Basic', slug: 'polyscope-basic', img: '/images/bg.jpg', description: '5 дней, программирование с пульта, базовые скрипты' },
    { name: 'Курс PolyScope Advanced', slug: 'polyscope-advanced', img: '/images/bg.jpg', description: 'Scripting, Modbus, Ethernet/IP, интеграция с внешними системами' },
    { name: 'Симулятор URSim', slug: 'ursim-simulator', img: '/images/bg.jpg', description: 'Оффлайн программирование и отладка на ПК' },
    { name: 'Интеграция с PLC', slug: 'plc-integration', img: '/images/bg.jpg', description: 'Profinet, EtherNet/IP, Modbus TCP — настройка обмена данными' },
  ],
  'Интеграция в линии': [
    { name: 'Проектирование ячеек', slug: 'cell-design', img: '/images/bg.jpg', description: '3D-моделирование, расчёт цикла, эргономика' },
    { name: 'Монтаж и пусконаладка', slug: 'commissioning', img: '/images/bg.jpg', description: 'Установка, калибровка, тестовый запуск' },
    { name: 'Техническая документация', slug: 'documentation', img: '/images/bg.jpg', description: 'Паспорта, инструкции, схемы подключения' },
    { name: 'Поддержка 24/7', slug: 'integration-support', img: '/images/bg.jpg', description: 'Удалённая помощь и выезд инженера при необходимости' },
  ],
  'Эффекторы и захваты': [
    { name: 'Пневмозахваты Schunk', slug: 'schunk-grippers', img: '/images/bg.jpg', description: 'Параллельные и угловые захваты для различных задач' },
    { name: 'Вакуумные генераторы', slug: 'vacuum-generators', img: '/images/bg.jpg', description: 'Для хрупких и пористых поверхностей, с контролем утечек' },
    { name: 'Сервозахваты', slug: 'servo-grippers', img: '/images/bg.jpg', description: 'Точное управление усилием и положением' },
    { name: 'Сменные насадки', slug: 'gripper-tips', img: '/images/bg.jpg', description: 'Быстрая смена под разные типы деталей' },
  ],

  // === МОБИЛЬНАЯ РОБОТОТЕХНИКА ===
  'AGV и AMR платформы': [
    { name: 'MiR250', slug: 'mir250', img: '/images/bg.jpg', description: 'Автономный мобильный робот, грузоподъёмность 250 кг, навигация LiDAR+SLAM' },
    { name: 'OTTO 1500', slug: 'otto1500', img: '/images/bg.jpg', description: 'Тяжёлая платформа для паллет, до 1500 кг, магнитная навигация' },
    { name: 'Seegrid VSLAM', slug: 'seegrid-vslam', img: '/images/bg.jpg', description: 'Визуальная навигация без маркеров, обучение маршрута' },
    { name: 'KUKA KMR', slug: 'kuka-kmr', img: '/images/bg.jpg', description: 'Модульная платформа для интеграции с манипуляторами' },
  ],
  'Инспекционные дроны': [
    { name: 'DJI Matrice 350 RTK', slug: 'dji-matrice', img: '/images/bg.jpg', description: 'Промышленный дрон с тепловизором и зум-камерой, защита IP55' },
    { name: 'Autel EVO II Enterprise', slug: 'autel-evo', img: '/images/bg.jpg', description: 'Компактный дрон для быстрой инспекции, время полёта 40 мин' },
    { name: 'Станции автозарядки', slug: 'drone-docks', img: '/images/bg.jpg', description: 'Полностью автономные полёты по расписанию' },
    { name: 'ПО для анализа данных', slug: 'drone-software', img: '/images/bg.jpg', description: 'Автоматическое выявление дефектов на снимках' },
  ],
  'Логистические роботы': [
    { name: 'Сортировочные системы', slug: 'sorting-robots', img: '/images/bg.jpg', description: 'Для складов и e-commerce, производительность до 20 000 посылок/час' },
    { name: 'Паллетайзеры', slug: 'palletizers', img: '/images/bg.jpg', description: 'Автоматическая укладка коробок на паллеты по заданной схеме' },
    { name: 'AMR для picking', slug: 'picking-amr', img: '/images/bg.jpg', description: 'Роботы-помощники для комплектации заказов' },
    { name: 'Интеграция с WMS', slug: 'wms-integration', img: '/images/bg.jpg', description: 'Синхронизация с системами управления складом' },
  ],
  'Навигация и LiDAR': [
    { name: 'LiDAR Hesai Pandar', slug: 'hesai-lidar', img: '/images/bg.jpg', description: 'Высокоточное 3D-картирование, дальность до 200 м' },
    { name: 'SLAM модули', slug: 'slam-modules', img: '/images/bg.jpg', description: 'Навигация без внешних маркеров, построение карты в реальном времени' },
    { name: 'Визуальные одометры', slug: 'visual-odometry', img: '/images/bg.jpg', description: 'Точное позиционирование по камерам' },
    { name: 'RTK-приёмники', slug: 'rtk-receivers', img: '/images/bg.jpg', description: 'Сантиметровая точность для открытых площадок' },
  ],
  'Зарядные станции': [
    { name: 'Контактные станции', slug: 'contact-chargers', img: '/images/bg.jpg', description: 'Быстрая зарядка AGV за 15-30 минут' },
    { name: 'Беспроводные системы', slug: 'wireless-charging', img: '/images/bg.jpg', description: 'Индукционная зарядка без контакта, защита IP67' },
    { name: 'Умное управление энергией', slug: 'energy-management', img: '/images/bg.jpg', description: 'Оптимизация графика зарядки для снижения пиковых нагрузок' },
  ],

  // === МЕХАТРОНИКА ===
  'Сервоприводы и моторы': [
    { name: 'Siemens 1FK7', slug: 'siemens-servo', img: '/images/bg.jpg', description: 'Высокая динамика и точность, интеграция с Sinamics' },
    { name: 'Шаговые двигатели', slug: 'stepper-motors', img: '/images/bg.jpg', description: 'Для ЧПУ и 3D-принтеров, микрошаговый режим' },
    { name: 'Линейные моторы', slug: 'linear-motors', img: '/images/bg.jpg', description: 'Прямой привод без редуктора, высокая скорость' },
  ],
  'Контроллеры движения': [
    { name: 'Beckhoff CX', slug: 'beckhoff-cx', img: '/images/bg.jpg', description: 'PC-based управление, EtherCAT, TwinCAT 3' },
    { name: 'B&R ACOPOS', slug: 'br-acopos', img: '/images/bg.jpg', description: 'Мультиосевое позиционирование, синхронизация до 32 осей' },
    { name: 'Omron NJ', slug: 'omron-nj', img: '/images/bg.jpg', description: 'Интегрированный ПЛК и контроллер движения' },
  ],
  'Датчики и энкодеры': [
    { name: 'Оптические энкодеры', slug: 'optical-encoders', img: '/images/bg.jpg', description: 'Разрешение до 24 бит, интерфейс SSI/BISS' },
    { name: 'Силомоментные датчики', slug: 'ft-sensors', img: '/images/bg.jpg', description: 'Для коботов и сборки, измерение 6 компонентов' },
    { name: 'Лазерные дальномеры', slug: 'laser-distance', img: '/images/bg.jpg', description: 'Точность до 0.1 мм, дальность до 100 м' },
  ],
  'Пневмо- и гидроцилиндры': [
    { name: 'Festo цилиндры', slug: 'festo-cylinders', img: '/images/bg.jpg', description: 'Стандартные и компактные серии, материалы нержавейка' },
    { name: 'Гидростанции', slug: 'hydraulic-stations', img: '/images/bg.jpg', description: 'Высокое давление до 350 бар, встроенная фильтрация' },
    { name: 'Пропорциональные клапаны', slug: 'proportional-valves', img: '/images/bg.jpg', description: 'Плавное регулирование потока и давления' },
  ],
  'Сборочные модули': [
    { name: 'Линейные модули', slug: 'linear-modules', img: '/images/bg.jpg', description: 'Точное перемещение осей, нагрузка до 500 кг' },
    { name: 'Поворотные столы', slug: 'rotary-tables', img: '/images/bg.jpg', description: 'Для фрезеровки и сварки, позиционирование ±5 угловых секунд' },
    { name: 'Вибрационные чаши', slug: 'vibration-bowls', img: '/images/bg.jpg', description: 'Автоматическая ориентация мелких деталей' },
  ],

  // === ПРОМЫШЛЕННАЯ АВТОМАТИЗАЦИЯ ===
  'ПЛК и модули ввода-вывода': [
    { name: 'Siemens S7-1500', slug: 's7-1500', img: '/images/bg.jpg', description: 'Флагманская серия ПЛК, производительность до 1 МБ/мс' },
    { name: 'Allen-Bradley CompactLogix', slug: 'compactlogix', img: '/images/bg.jpg', description: 'Для средних задач, интеграция с Rockwell' },
    { name: 'Модули расширения', slug: 'io-modules', img: '/images/bg.jpg', description: 'Аналоговые, цифровые, специализированные входы/выходы' },
  ],
  'SCADA-системы': [
    { name: 'Ignition', slug: 'ignition', img: '/images/bg.jpg', description: 'Платформа IIoT и визуализации, модульная архитектура' },
    { name: 'WinCC Unified', slug: 'wincc', img: '/images/bg.jpg', description: 'Интеграция с Siemens, веб-интерфейс, мобильный доступ' },
    { name: 'Кастомные панели', slug: 'custom-hmi', img: '/images/bg.jpg', description: 'Разработка интерфейсов под задачи заказчика' },
  ],
  'Промышленный IoT': [
    { name: 'Шлюзы Moxa', slug: 'moxa-gateways', img: '/images/bg.jpg', description: 'Сбор данных с оборудования, протоколы Modbus, OPC UA' },
    { name: 'Облачные платформы', slug: 'cloud-platforms', img: '/images/bg.jpg', description: 'Azure IoT / AWS IoT — хранение, аналитика, дашборды' },
    { name: 'Предиктивная аналитика', slug: 'predictive-iot', img: '/images/bg.jpg', description: 'ML-модели для прогноза отказов оборудования' },
  ],
  'Шкафы управления': [
    { name: 'Rittal TS8', slug: 'rittal-ts8', img: '/images/bg.jpg', description: 'Модульные шкафы IP55, быстрая сборка' },
    { name: 'Климат-контроль', slug: 'cabinet-cooling', img: '/images/bg.jpg', description: 'Обогрев и охлаждение для стабильной работы электроники' },
    { name: 'Сборка под ключ', slug: 'cabinet-assembly', img: '/images/bg.jpg', description: 'Проектирование, монтаж, тестирование, документация' },
  ],
  'Частотные преобразователи': [
    { name: 'Danfoss VLT', slug: 'danfoss-vlt', img: '/images/bg.jpg', description: 'Для насосов и вентиляторов, энергосбережение до 30%' },
    { name: 'ABB ACS880', slug: 'abb-acs880', img: '/images/bg.jpg', description: 'Универсальные приводы, векторное управление' },
    { name: 'Синхронизация с сетью', slug: 'grid-sync', img: '/images/bg.jpg', description: 'Рекуперация энергии, снижение гармоник' },
  ],

  // === ЦИФРОВЫЕ ДВОЙНИКИ ПРОИЗВОДСТВ ===
  '3D-моделирование процессов': [
    { name: 'Siemens Process Simulate', slug: 'process-simulate', img: '/images/bg.jpg', description: 'Виртуальная commissioning, отладка до физического запуска' },
    { name: 'Visual Components', slug: 'visual-components', img: '/images/bg.jpg', description: 'Планирование производств, расчёт узких мест' },
    { name: 'Интеграция с CAD', slug: 'cad-integration', img: '/images/bg.jpg', description: 'Импорт моделей из SolidWorks, CATIA, NX' },
  ],
  'Предиктивная аналитика': [
    { name: 'IBM Maximo', slug: 'ibm-maximo', img: '/images/bg.jpg', description: 'Прогноз отказов оборудования, оптимизация ТО' },
    { name: 'Cognite Data Fusion', slug: 'cognite', img: '/images/bg.jpg', description: 'Промышленные данные и AI, контекстуализация' },
    { name: 'Кастомные ML-модели', slug: 'custom-ml', img: '/images/bg.jpg', description: 'Разработка под конкретные процессы заказчика' },
  ],
  'Оптимизация циклов': [
    { name: 'Симуляция потоков', slug: 'flow-simulation', img: '/images/bg.jpg', description: 'Балансировка линий, снижение времени такта' },
    { name: 'Цифровые нити', slug: 'digital-threads', img: '/images/bg.jpg', description: 'Сквозная прослеживаемость данных от заказа до отгрузки' },
    { name: 'A/B тестирование', slug: 'ab-testing', img: '/images/bg.jpg', description: 'Сравнение сценариев работы в виртуальной среде' },
  ],
  'VR/AR обучение': [
    { name: 'Microsoft HoloLens 2', slug: 'hololens', img: '/images/bg.jpg', description: 'AR инструкции для сборки и ремонта' },
    { name: 'VR тренажеры', slug: 'vr-trainers', img: '/images/bg.jpg', description: 'Безопасное обучение операторов на виртуальных копиях' },
    { name: 'Удалённая экспертиза', slug: 'remote-expert', img: '/images/bg.jpg', description: 'Специалист видит через камеру оператора и даёт подсказки' },
  ],
  'Цифровые нити': [
    { name: 'PLM системы', slug: 'plm-systems', img: '/images/bg.jpg', description: 'Управление жизненным циклом изделия' },
    { name: 'ERP интеграция', slug: 'erp-integration', img: '/images/bg.jpg', description: 'Связь производства и склада в реальном времени' },
    { name: 'Блокчейн для прослеживаемости', slug: 'blockchain-traceability', img: '/images/bg.jpg', description: 'Неизменяемая история каждой детали' },
  ],

  // === МЕРОПРИЯТИЯ ===
  'Выставка Robotica 2025': [
    { name: 'Стенд Технопарка', slug: 'robotica-stand', img: '/images/bg.jpg', description: '15-18 апреля, Экспоцентр, павильон 2, стенд B15' },
    { name: 'Демонстрация коботов', slug: 'cobot-demo', img: '/images/bg.jpg', description: 'Живые сценарии: сборка, упаковка, контроль качества' },
    { name: 'Мастер-класс по программированию', slug: 'programming-workshop', img: '/images/bg.jpg', description: '16 апреля, 14:00, регистрация на сайте' },
  ],
  'Форум Industry 4.0': [
    { name: 'Панельная дискуссия', slug: 'industry-panel', img: '/images/bg.jpg', description: 'Тренды автоматизации 2025, спикеры из ГУАП, Росатома, Сбера' },
    { name: 'Нетворкинг', slug: 'networking', img: '/images/bg.jpg', description: 'Встреча с производителями и интеграторами' },
    { name: 'Стартап-зона', slug: 'startup-zone', img: '/images/bg.jpg', description: 'Питчи инновационных проектов, гранты до 5 млн ₽' },
  ],
  'Семинар по коботам': [
    { name: 'Базовый курс', slug: 'cobot-basic', img: '/images/bg.jpg', description: '12 мая, очно в СПб, 2 дня, сертификат' },
    { name: 'Продвинутая интеграция', slug: 'cobot-advanced', img: '/images/bg.jpg', description: '20 мая, онлайн, работа с PLC и SCADA' },
    { name: 'Кейсы внедрения', slug: 'cobot-cases', img: '/images/bg.jpg', description: 'Разбор реальных проектов от заказчиков' },
  ],
  'Онлайн-трансляции': [
    { name: 'Вебинар по AMR', slug: 'amr-webinar', img: '/images/bg.jpg', description: 'Расписание на сайте, запись доступна после регистрации' },
    { name: 'Архив записей', slug: 'webinar-archive', img: '/images/bg.jpg', description: 'Более 50 часов контента по автоматизации' },
    { name: 'Q&A сессии', slug: 'qa-sessions', img: '/images/bg.jpg', description: 'Ежемесячные ответы на вопросы от инженеров Технопарка' },
  ],

  // === О ТЕХНОПАРКЕ ===
  'История и миссия': [
    { name: 'Основание в 2018', slug: 'history', img: '/images/bg.jpg', description: 'Путь от лаборатории ГУАП до федерального технопарка' },
    { name: 'Миссия и ценности', slug: 'mission', img: '/images/bg.jpg', description: 'Развитие Industry 4.0 в России через образование и инновации' },
    { name: 'Достижения', slug: 'achievements', img: '/images/bg.jpg', description: '50+ внедрённых проектов, 200+ партнёров, 15 патентов' },
  ],
  'Руководство': [
    { name: 'Генеральный директор', slug: 'ceo', img: '/images/bg.jpg', description: 'Иванов Алексей Петрович, 15 лет в автоматизации' },
    { name: 'Технический директор', slug: 'cto', img: '/images/bg.jpg', description: 'Смирнов Дмитрий Игоревич, экс-инженер Siemens' },
    { name: 'Команда', slug: 'team', img: '/images/bg.jpg', description: '40+ инженеров, разработчиков и менеджеров' },
  ],
  'Партнёры и клиенты': [
    { name: 'Университеты', slug: 'partners-universities', img: '/images/bg.jpg', description: 'ГУАП, ИТМО, Политех, МГТУ им. Баумана' },
    { name: 'Производители', slug: 'partners-vendors', img: '/images/bg.jpg', description: 'Universal Robots, Siemens, Festo, SICK' },
    { name: 'Клиенты', slug: 'clients', img: '/images/bg.jpg', description: 'Росатом, Ростех, Яндекс, Сбер, АвтоВАЗ' },
  ],
  'Сертификаты': [
    { name: 'ISO 9001:2015', slug: 'iso-9001', img: '/images/bg.jpg', description: 'Система менеджмента качества' },
    { name: 'Лицензия на ПО', slug: 'software-license', img: '/images/bg.jpg', description: 'Реестр отечественного ПО Минцифры' },
    { name: 'Аккредитация Минпромторга', slug: 'minpromtorg', img: '/images/bg.jpg', description: 'Статус индустриального партнёра' },
  ],
  'Контакты и адрес': [
    { name: 'Главный офис', slug: 'main-office', img: '/images/bg.jpg', description: 'г. Санкт-Петербург, ул. Гастелло, д. 15, офис 304' },
    { name: 'Реквизиты', slug: 'requisites', img: '/images/bg.jpg', description: 'ИНН 7801234567, ОГРН 1157846123456' },
    { name: 'Карта проезда', slug: 'map', img: '/images/bg.jpg', description: 'М. «Обводный канал», 7 минут пешком' },
  ],

  // === КАРЬЕРА В ТЕХНОПАРКЕ (с зарплатами) ===
  'Инженер-робототехник': [
    { name: 'Junior', slug: 'robotics-junior', img: '/images/bg.jpg', description: 'Настройка и пуск коботов, обучение', salary: 'от 80 000 ₽' },
    { name: 'Middle', slug: 'robotics-middle', img: '/images/bg.jpg', description: 'Проектирование ячеек, интеграция с ПЛК', salary: 'от 140 000 ₽' },
    { name: 'Senior', slug: 'robotics-senior', img: '/images/bg.jpg', description: 'Архитектура решений, менторство', salary: 'от 200 000 ₽' },
  ],
  'Специалист по автоматизации': [
    { name: 'Инженер АСУ ТП', slug: 'asutp-engineer', img: '/images/bg.jpg', description: 'ПЛК, SCADA, промышленные сети', salary: 'от 130 000 ₽' },
    { name: 'Программист ПЛК', slug: 'plc-programmer', img: '/images/bg.jpg', description: 'Siemens, Beckhoff, B&R', salary: 'от 150 000 ₽' },
    { name: 'Интегратор', slug: 'integrator', img: '/images/bg.jpg', description: 'Связка роботов, датчиков, систем управления', salary: 'от 160 000 ₽' },
  ],
  'Менеджер проектов': [
    { name: 'PM Robotics', slug: 'pm-robotics', img: '/images/bg.jpg', description: 'Ведение проектов под ключ от ТЗ до сдачи', salary: 'от 160 000 ₽' },
    { name: 'PM Автоматизация', slug: 'pm-automation', img: '/images/bg.jpg', description: 'Координация команд, бюджет, сроки', salary: 'от 170 000 ₽' },
    { name: 'Бизнес-аналитик', slug: 'business-analyst', img: '/images/bg.jpg', description: 'Сбор требований, ТЗ, коммуникация с заказчиком', salary: 'от 140 000 ₽' },
  ],
  'Стажировки для студентов': [
    { name: 'Летняя практика', slug: 'summer-internship', img: '/images/bg.jpg', description: '3 месяца, оплачиваемая, реальные задачи', salary: 'от 45 000 ₽/мес' },
    { name: 'Дипломный проект', slug: 'thesis-project', img: '/images/bg.jpg', description: 'Тема от Технопарка, менторство, возможность трудоустройства', salary: 'от 50 000 ₽' },
    { name: 'Хакатоны', slug: 'hackathons', img: '/images/bg.jpg', description: 'Командные соревнования, призы, карьерные предложения' },
  ],
  'Корпоративная культура': [
    { name: 'Офис и атмосфера', slug: 'office-culture', img: '/images/bg.jpg', description: 'Современный коворкинг, лаборатории, зона отдыха' },
    { name: 'Обучение и рост', slug: 'learning', img: '/images/bg.jpg', description: 'Сертификации за счёт компании, конференции, менторство' },
    { name: 'Команда', slug: 'team-culture', img: '/images/bg.jpg', description: 'Открытость, взаимопомощь, фокус на результате' },
  ],

  // === ПОДДЕРЖКА И СВЯЗЬ ===
  'Гарантийное обслуживание': [
    { name: 'Стандартная гарантия', slug: 'warranty-std', img: '/images/bg.jpg', description: '12 месяцев на оборудование, бесплатный ремонт' },
    { name: 'Расширенная гарантия', slug: 'warranty-ext', img: '/images/bg.jpg', description: 'До 36 месяцев с выездом инженера и заменой узлов' },
    { name: 'Гарантия на ПО', slug: 'software-warranty', img: '/images/bg.jpg', description: 'Обновления и исправления в течение срока лицензии' },
  ],
  'Техническая поддержка 24/7': [
    { name: 'Удалённая помощь', slug: 'remote-support', img: '/images/bg.jpg', description: 'TeamViewer, AnyDesk, телефон, чат — ответ в течение 15 минут' },
    { name: 'Выезд инженера', slug: 'onsite-support', img: '/images/bg.jpg', description: 'По всей России, срок прибытия до 48 часов' },
    { name: 'База знаний', slug: 'knowledge-base', img: '/images/bg.jpg', description: 'Статьи, видео, инструкции — доступно 24/7' },
  ],
  'Ремонт и диагностика': [
    { name: 'Диагностика узлов', slug: 'diagnostics', img: '/images/bg.jpg', description: 'Выявление неисправностей, отчёт с рекомендациями' },
    { name: 'Восстановление плат', slug: 'board-repair', img: '/images/bg.jpg', description: 'Компонентный ремонт, замена микросхем' },
    { name: 'Калибровка', slug: 'calibration', img: '/images/bg.jpg', description: 'Восстановление точности после ремонта или длительного простоя' },
  ],
  'Запасные части': [
    { name: 'Оригинальные запчасти', slug: 'original-parts', img: '/images/bg.jpg', description: 'Склад в СПб, отгрузка 24 часа, гарантия' },
    { name: 'Расходные материалы', slug: 'consumables', img: '/images/bg.jpg', description: 'Сопла, захваты, кабели, фильтры — всегда в наличии' },
    { name: 'Аналоги и совместимые', slug: 'compatible-parts', img: '/images/bg.jpg', description: 'Бюджетные альтернативы без потери качества' },
  ],
  'Форма обратной связи': [
    { name: 'Заявка на поддержку', slug: 'support-request', img: '/images/bg.jpg', description: 'Заполните форму на сайте — ответ в течение 2 часов' },
    { name: 'Запрос коммерческого предложения', slug: 'quote-request', img: '/images/bg.jpg', description: 'Опишите задачу — подготовим решение и расчёт' },
    { name: 'Обратный звонок', slug: 'callback', img: '/images/bg.jpg', description: 'Оставьте номер — перезвоним в удобное время' },
  ],

  // === ОТРАСЛЕВЫЕ РЕШЕНИЯ (ОСТАВЛЕНЫ БЕЗ ИЗМЕНЕНИЙ) ===
  'Оборонно-промышленный комплекс': [
    { name: 'Специализированное оборудование ОПК', slug: 'opk-equipment', img: '/images/bg.jpg', description: 'По техническому заданию' },
    { name: 'Системы контроля качества', slug: 'quality-control', img: '/images/bg.jpg', description: 'Военная приемка' },
  ],
  'Производство электроники и ЭКБ': [
    { name: 'Линия сборки плат', slug: 'pcb-line', img: '/images/bg.jpg', description: 'Полный цикл производства' },
    { name: 'Оборудование для ЭКБ', slug: 'ekb-equipment', img: '/images/bg.jpg', description: 'Производство компонентов' },
  ],
  'Космическая промышленность': [
    { name: 'Оборудование для космоса', slug: 'space-equipment', img: '/images/bg.jpg', description: 'Сертифицировано' },
    { name: 'Вибростенд космический', slug: 'space-vibration', img: '/images/bg.jpg', description: 'Испытания спутников' },
  ],
  'Авиастроение': [
    { name: 'Оборудование для авиации', slug: 'aviation-equipment', img: '/images/bg.jpg', description: 'Сертификат FAA' },
    { name: 'Контрольно-измерительное', slug: 'aviation-measurement', img: '/images/bg.jpg', description: 'Прецизионное' },
  ],
  'Автомобилестроение': [
    { name: 'Линия сборки электроники', slug: 'auto-electronics', img: '/images/bg.jpg', description: 'Для автоэлектроники' },
    { name: 'Тестер автомобильный', slug: 'auto-tester', img: '/images/bg.jpg', description: 'Диагностика' },
  ],
  'Энергетика': [
    { name: 'Оборудование для энергетики', slug: 'energy-equipment', img: '/images/bg.jpg', description: 'Высоковольтное' },
    { name: 'Анализатор качества энергии', slug: 'power-analyzer', img: '/images/bg.jpg', description: 'Класс A' },
  ],
  'Телекоммуникации и связь': [
    { name: 'Тестер оптоволокна', slug: 'fiber-tester', img: '/images/bg.jpg', description: 'OTDR' },
    { name: 'Анализатор сетей', slug: 'network-analyzer', img: '/images/bg.jpg', description: '5G ready' },
  ],
  'Радиоэлектронная промышленность': [
    { name: 'Измерительные комплексы', slug: 'measurement-complex', img: '/images/bg.jpg', description: 'Для РЭП' },
    { name: 'Стенды испытаний', slug: 'test-stands', img: '/images/bg.jpg', description: 'Комплексные' },
  ],
  'Наука и образование': [
    { name: 'Оборудование для ВУЗов', slug: 'university-equipment', img: '/images/bg.jpg', description: 'Учебные комплексы' },
    { name: 'Лабораторные стенды', slug: 'lab-stands', img: '/images/bg.jpg', description: 'Для исследований' },
  ],
  'Транспортная инфраструктура': [
    { name: 'Системы для ЖД', slug: 'railway-systems', img: '/images/bg.jpg', description: 'Железнодорожная автоматика' },
    { name: 'Метро оборудование', slug: 'metro-equipment', img: '/images/bg.jpg', description: 'Системы управления' },
  ],
};

const categoryData: Record<string, { title: string; sidebar: string[] }> = {
  'collaborative-robots': { title: 'Коллаборативная робототехника', sidebar: ['Коботы Universal Robots', 'Системы безопасности', 'Программирование и обучение', 'Интеграция в линии', 'Эффекторы и захваты'] },
  'mobile-robots': { title: 'Мобильная робототехника', sidebar: ['AGV и AMR платформы', 'Инспекционные дроны', 'Логистические роботы', 'Навигация и LiDAR', 'Зарядные станции'] },
  'mechatronics': { title: 'Мехатроника', sidebar: ['Сервоприводы и моторы', 'Контроллеры движения', 'Датчики и энкодеры', 'Пневмо- и гидроцилиндры', 'Сборочные модули'] },
  'automation': { title: 'Промышленная автоматизация', sidebar: ['ПЛК и модули ввода-вывода', 'SCADA-системы', 'Промышленный IoT', 'Шкафы управления', 'Частотные преобразователи'] },
  'digital-twins': { title: 'Цифровые двойники производств', sidebar: ['3D-моделирование процессов', 'Предиктивная аналитика', 'Оптимизация циклов', 'VR/AR обучение', 'Цифровые нити'] },
  'events': { title: 'Мероприятия', sidebar: ['Выставка Robotica 2025', 'Форум Industry 4.0', 'Семинар по коботам', 'Онлайн-трансляции'] },
  'about': { title: 'О Технопарке', sidebar: ['История и миссия', 'Руководство', 'Партнёры и клиенты', 'Сертификаты', 'Контакты и адрес'] },
  'careers': { title: 'Карьера в Технопарке', sidebar: ['Инженер-робототехник', 'Специалист по автоматизации', 'Менеджер проектов', 'Стажировки для студентов', 'Корпоративная культура'] },
  'support': { title: 'Поддержка и связь', sidebar: ['Гарантийное обслуживание', 'Техническая поддержка 24/7', 'Ремонт и диагностика', 'Запасные части', 'Форма обратной связи'] },
  'industries': { title: 'Отраслевые решения', sidebar: ['Оборонно-промышленный комплекс', 'Производство электроники и ЭКБ', 'Космическая промышленность', 'Телекоммуникации и связь', 'Радиоэлектронная промышленность', 'Автомобилестроение', 'Авиастроение', 'Энергетика', 'Наука и образование', 'Транспортная инфраструктура'] },
};

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const data = categoryData[slug] || categoryData['collaborative-robots'];

  const subCategory = searchParams.get('sub');
  const activeCategory = subCategory && data.sidebar.includes(subCategory) ? subCategory : data.sidebar[0];
  const products = productsData[activeCategory] || [];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/menu" className="hover:text-blue-700 transition-colors font-medium">Меню</Link>
              <span>/</span>
              <Link href={`/category/${slug}`} className="hover:text-blue-700 transition-colors">{data.title}</Link>
              <span>/</span>
              <Link href={`/category/${slug}?sub=${encodeURIComponent(activeCategory)}`} className="text-gray-900 font-medium hover:text-blue-700 transition-colors">{activeCategory}</Link>
            </div>
          </div>
        </div>

        <section className="py-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-12">
              <aside className="lg:w-72 flex-shrink-0">
                <div className="sticky top-24">
                  <div className="mb-6"><span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Меню</span></div>
                  <nav className="space-y-1">
                    {data.sidebar.map((category) => (
                      <Link
                        key={category}
                        href={`/category/${slug}?sub=${encodeURIComponent(category)}`}
                        className={`w-full py-3 px-4 text-sm transition-colors rounded-sm block ${activeCategory === category ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {category}
                      </Link>
                    ))}
                  </nav>
                </div>
              </aside>

              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{activeCategory}</h1>
                <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mb-12">
                  {products.length > 0 ? `Каталог: ${activeCategory}. Выберите подходящее решение.` : `Информация о разделе: ${activeCategory}`}
                </p>

                {products.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    {products.map((product, index) => (
                      <Link
                        key={index}
                        href={`/product/${product.slug}?from=${slug}&sub=${encodeURIComponent(activeCategory)}`}
                        className="group block"
                      >
                        <div className="border border-gray-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
                          <div className="h-64 bg-gray-100 overflow-hidden">
                            <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{product.name}</h3>
                            <p className="text-gray-600 mb-3">{product.description}</p>
                            {product.salary ? (
                              <div className="text-blue-700 font-bold text-lg">{product.salary}</div>
                            ) : (
                              <div className="text-gray-400 text-sm italic">Подробности по запросу</div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-gray-50 rounded-sm"><p className="text-gray-500 text-lg">Информация готовится</p></div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
