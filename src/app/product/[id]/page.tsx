'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';

// === БАЗА ДАННЫХ ВСЕХ ТОВАРОВ ===
const productsDatabase: Record<string, {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  price?: string;
  salary?: string;
}> = {
  // === КОЛЛАБОРАТИВНАЯ РОБОТОТЕХНИКА ===
  'ur3e': { name: 'UR3e', slug: 'ur3e', category: 'Коботы Universal Robots', categorySlug: 'collaborative-robots', description: 'Компактный кобот для малых задач, радиус 500 мм, грузоподъёмность 3 кг' },
  'ur5e': { name: 'UR5e', slug: 'ur5e', category: 'Коботы Universal Robots', categorySlug: 'collaborative-robots', description: 'Универсальный кобот для сборки и упаковки, радиус 850 мм, грузоподъёмность 5 кг' },
  'ur10e': { name: 'UR10e', slug: 'ur10e', category: 'Коботы Universal Robots', categorySlug: 'collaborative-robots', description: 'Мощный кобот для паллетирования, радиус 1300 мм, грузоподъёмность 12.5 кг' },
  'ur16e': { name: 'UR16e', slug: 'ur16e', category: 'Коботы Universal Robots', categorySlug: 'collaborative-robots', description: 'Тяжёлый кобот для автопрома, радиус 900 мм, грузоподъёмность 16 кг' },
  'ur20': { name: 'UR20', slug: 'ur20', category: 'Коботы Universal Robots', categorySlug: 'collaborative-robots', description: 'Новейшая модель для крупных задач, радиус 1750 мм, грузоподъёмность 20 кг' },
  'sick-scanners': { name: 'Лазерные сканеры SICK', slug: 'sick-scanners', category: 'Системы безопасности', categorySlug: 'collaborative-robots', description: 'Защитные зоны для коботов, сертификация SIL2/PLd' },
  'signal-towers': { name: 'Светофоры и маяки', slug: 'signal-towers', category: 'Системы безопасности', categorySlug: 'collaborative-robots', description: 'Визуальная индикация статуса робота и линии' },
  'protective-covers': { name: 'Защитные кожухи', slug: 'protective-covers', category: 'Системы безопасности', categorySlug: 'collaborative-robots', description: 'IP54 защита для работы в агрессивных средах' },
  'emergency-stops': { name: 'Аварийные кнопки', slug: 'emergency-stops', category: 'Системы безопасности', categorySlug: 'collaborative-robots', description: 'Категория 0 и 1 по стандарту ISO 13850' },
  'polyscope-basic': { name: 'Курс PolyScope Basic', slug: 'polyscope-basic', category: 'Программирование и обучение', categorySlug: 'collaborative-robots', description: '5 дней, программирование с пульта, базовые скрипты' },
  'polyscope-advanced': { name: 'Курс PolyScope Advanced', slug: 'polyscope-advanced', category: 'Программирование и обучение', categorySlug: 'collaborative-robots', description: 'Scripting, Modbus, Ethernet/IP, интеграция с внешними системами' },
  'ursim-simulator': { name: 'Симулятор URSim', slug: 'ursim-simulator', category: 'Программирование и обучение', categorySlug: 'collaborative-robots', description: 'Оффлайн программирование и отладка на ПК' },
  'plc-integration': { name: 'Интеграция с PLC', slug: 'plc-integration', category: 'Программирование и обучение', categorySlug: 'collaborative-robots', description: 'Profinet, EtherNet/IP, Modbus TCP — настройка обмена данными' },
  'cell-design': { name: 'Проектирование ячеек', slug: 'cell-design', category: 'Интеграция в линии', categorySlug: 'collaborative-robots', description: '3D-моделирование, расчёт цикла, эргономика' },
  'commissioning': { name: 'Монтаж и пусконаладка', slug: 'commissioning', category: 'Интеграция в линии', categorySlug: 'collaborative-robots', description: 'Установка, калибровка, тестовый запуск' },
  'documentation': { name: 'Техническая документация', slug: 'documentation', category: 'Интеграция в линии', categorySlug: 'collaborative-robots', description: 'Паспорта, инструкции, схемы подключения' },
  'integration-support': { name: 'Поддержка 24/7', slug: 'integration-support', category: 'Интеграция в линии', categorySlug: 'collaborative-robots', description: 'Удалённая помощь и выезд инженера при необходимости' },
  'schunk-grippers': { name: 'Пневмозахваты Schunk', slug: 'schunk-grippers', category: 'Эффекторы и захваты', categorySlug: 'collaborative-robots', description: 'Параллельные и угловые захваты для различных задач' },
  'vacuum-generators': { name: 'Вакуумные генераторы', slug: 'vacuum-generators', category: 'Эффекторы и захваты', categorySlug: 'collaborative-robots', description: 'Для хрупких и пористых поверхностей, с контролем утечек' },
  'servo-grippers': { name: 'Сервозахваты', slug: 'servo-grippers', category: 'Эффекторы и захваты', categorySlug: 'collaborative-robots', description: 'Точное управление усилием и положением' },
  'gripper-tips': { name: 'Сменные насадки', slug: 'gripper-tips', category: 'Эффекторы и захваты', categorySlug: 'collaborative-robots', description: 'Быстрая смена под разные типы деталей' },

  // === МОБИЛЬНАЯ РОБОТОТЕХНИКА ===
  'mir250': { name: 'MiR250', slug: 'mir250', category: 'AGV и AMR платформы', categorySlug: 'mobile-robots', description: 'Автономный мобильный робот, грузоподъёмность 250 кг, навигация LiDAR+SLAM' },
  'otto1500': { name: 'OTTO 1500', slug: 'otto1500', category: 'AGV и AMR платформы', categorySlug: 'mobile-robots', description: 'Тяжёлая платформа для паллет, до 1500 кг, магнитная навигация' },
  'seegrid-vslam': { name: 'Seegrid VSLAM', slug: 'seegrid-vslam', category: 'AGV и AMR платформы', categorySlug: 'mobile-robots', description: 'Визуальная навигация без маркеров, обучение маршрута' },
  'kuka-kmr': { name: 'KUKA KMR', slug: 'kuka-kmr', category: 'AGV и AMR платформы', categorySlug: 'mobile-robots', description: 'Модульная платформа для интеграции с манипуляторами' },
  'dji-matrice': { name: 'DJI Matrice 350 RTK', slug: 'dji-matrice', category: 'Инспекционные дроны', categorySlug: 'mobile-robots', description: 'Промышленный дрон с тепловизором и зум-камерой, защита IP55' },
  'autel-evo': { name: 'Autel EVO II Enterprise', slug: 'autel-evo', category: 'Инспекционные дроны', categorySlug: 'mobile-robots', description: 'Компактный дрон для быстрой инспекции, время полёта 40 мин' },
  'drone-docks': { name: 'Станции автозарядки', slug: 'drone-docks', category: 'Инспекционные дроны', categorySlug: 'mobile-robots', description: 'Полностью автономные полёты по расписанию' },
  'drone-software': { name: 'ПО для анализа данных', slug: 'drone-software', category: 'Инспекционные дроны', categorySlug: 'mobile-robots', description: 'Автоматическое выявление дефектов на снимках' },
  'sorting-robots': { name: 'Сортировочные системы', slug: 'sorting-robots', category: 'Логистические роботы', categorySlug: 'mobile-robots', description: 'Для складов и e-commerce, производительность до 20 000 посылок/час' },
  'palletizers': { name: 'Паллетайзеры', slug: 'palletizers', category: 'Логистические роботы', categorySlug: 'mobile-robots', description: 'Автоматическая укладка коробок на паллеты по заданной схеме' },
  'picking-amr': { name: 'AMR для picking', slug: 'picking-amr', category: 'Логистические роботы', categorySlug: 'mobile-robots', description: 'Роботы-помощники для комплектации заказов' },
  'wms-integration': { name: 'Интеграция с WMS', slug: 'wms-integration', category: 'Логистические роботы', categorySlug: 'mobile-robots', description: 'Синхронизация с системами управления складом' },
  'hesai-lidar': { name: 'LiDAR Hesai Pandar', slug: 'hesai-lidar', category: 'Навигация и LiDAR', categorySlug: 'mobile-robots', description: 'Высокоточное 3D-картирование, дальность до 200 м' },
  'slam-modules': { name: 'SLAM модули', slug: 'slam-modules', category: 'Навигация и LiDAR', categorySlug: 'mobile-robots', description: 'Навигация без внешних маркеров, построение карты в реальном времени' },
  'visual-odometry': { name: 'Визуальные одометры', slug: 'visual-odometry', category: 'Навигация и LiDAR', categorySlug: 'mobile-robots', description: 'Точное позиционирование по камерам' },
  'rtk-receivers': { name: 'RTK-приёмники', slug: 'rtk-receivers', category: 'Навигация и LiDAR', categorySlug: 'mobile-robots', description: 'Сантиметровая точность для открытых площадок' },
  'contact-chargers': { name: 'Контактные станции', slug: 'contact-chargers', category: 'Зарядные станции', categorySlug: 'mobile-robots', description: 'Быстрая зарядка AGV за 15-30 минут' },
  'wireless-charging': { name: 'Беспроводные системы', slug: 'wireless-charging', category: 'Зарядные станции', categorySlug: 'mobile-robots', description: 'Индукционная зарядка без контакта, защита IP67' },
  'energy-management': { name: 'Умное управление энергией', slug: 'energy-management', category: 'Зарядные станции', categorySlug: 'mobile-robots', description: 'Оптимизация графика зарядки для снижения пиковых нагрузок' },

  // === МЕХАТРОНИКА ===
  'siemens-servo': { name: 'Siemens 1FK7', slug: 'siemens-servo', category: 'Сервоприводы и моторы', categorySlug: 'mechatronics', description: 'Высокая динамика и точность, интеграция с Sinamics' },
  'stepper-motors': { name: 'Шаговые двигатели', slug: 'stepper-motors', category: 'Сервоприводы и моторы', categorySlug: 'mechatronics', description: 'Для ЧПУ и 3D-принтеров, микрошаговый режим' },
  'linear-motors': { name: 'Линейные моторы', slug: 'linear-motors', category: 'Сервоприводы и моторы', categorySlug: 'mechatronics', description: 'Прямой привод без редуктора, высокая скорость' },
  'beckhoff-cx': { name: 'Beckhoff CX', slug: 'beckhoff-cx', category: 'Контроллеры движения', categorySlug: 'mechatronics', description: 'PC-based управление, EtherCAT, TwinCAT 3' },
  'br-acopos': { name: 'B&R ACOPOS', slug: 'br-acopos', category: 'Контроллеры движения', categorySlug: 'mechatronics', description: 'Мультиосевое позиционирование, синхронизация до 32 осей' },
  'omron-nj': { name: 'Omron NJ', slug: 'omron-nj', category: 'Контроллеры движения', categorySlug: 'mechatronics', description: 'Интегрированный ПЛК и контроллер движения' },
  'optical-encoders': { name: 'Оптические энкодеры', slug: 'optical-encoders', category: 'Датчики и энкодеры', categorySlug: 'mechatronics', description: 'Разрешение до 24 бит, интерфейс SSI/BISS' },
  'ft-sensors': { name: 'Силомоментные датчики', slug: 'ft-sensors', category: 'Датчики и энкодеры', categorySlug: 'mechatronics', description: 'Для коботов и сборки, измерение 6 компонентов' },
  'laser-distance': { name: 'Лазерные дальномеры', slug: 'laser-distance', category: 'Датчики и энкодеры', categorySlug: 'mechatronics', description: 'Точность до 0.1 мм, дальность до 100 м' },
  'festo-cylinders': { name: 'Festo цилиндры', slug: 'festo-cylinders', category: 'Пневмо- и гидроцилиндры', categorySlug: 'mechatronics', description: 'Стандартные и компактные серии, материалы нержавейка' },
  'hydraulic-stations': { name: 'Гидростанции', slug: 'hydraulic-stations', category: 'Пневмо- и гидроцилиндры', categorySlug: 'mechatronics', description: 'Высокое давление до 350 бар, встроенная фильтрация' },
  'proportional-valves': { name: 'Пропорциональные клапаны', slug: 'proportional-valves', category: 'Пневмо- и гидроцилиндры', categorySlug: 'mechatronics', description: 'Плавное регулирование потока и давления' },
  'linear-modules': { name: 'Линейные модули', slug: 'linear-modules', category: 'Сборочные модули', categorySlug: 'mechatronics', description: 'Точное перемещение осей, нагрузка до 500 кг' },
  'rotary-tables': { name: 'Поворотные столы', slug: 'rotary-tables', category: 'Сборочные модули', categorySlug: 'mechatronics', description: 'Для фрезеровки и сварки, позиционирование ±5 угловых секунд' },
  'vibration-bowls': { name: 'Вибрационные чаши', slug: 'vibration-bowls', category: 'Сборочные модули', categorySlug: 'mechatronics', description: 'Автоматическая ориентация мелких деталей' },

  // === ПРОМЫШЛЕННАЯ АВТОМАТИЗАЦИЯ ===
  's7-1500': { name: 'Siemens S7-1500', slug: 's7-1500', category: 'ПЛК и модули ввода-вывода', categorySlug: 'automation', description: 'Флагманская серия ПЛК, производительность до 1 МБ/мс' },
  'compactlogix': { name: 'Allen-Bradley CompactLogix', slug: 'compactlogix', category: 'ПЛК и модули ввода-вывода', categorySlug: 'automation', description: 'Для средних задач, интеграция с Rockwell' },
  'io-modules': { name: 'Модули расширения', slug: 'io-modules', category: 'ПЛК и модули ввода-вывода', categorySlug: 'automation', description: 'Аналоговые, цифровые, специализированные входы/выходы' },
  'ignition': { name: 'Ignition', slug: 'ignition', category: 'SCADA-системы', categorySlug: 'automation', description: 'Платформа IIoT и визуализации, модульная архитектура' },
  'wincc': { name: 'WinCC Unified', slug: 'wincc', category: 'SCADA-системы', categorySlug: 'automation', description: 'Интеграция с Siemens, веб-интерфейс, мобильный доступ' },
  'custom-hmi': { name: 'Кастомные панели', slug: 'custom-hmi', category: 'SCADA-системы', categorySlug: 'automation', description: 'Разработка интерфейсов под задачи заказчика' },
  'moxa-gateways': { name: 'Шлюзы Moxa', slug: 'moxa-gateways', category: 'Промышленный IoT', categorySlug: 'automation', description: 'Сбор данных с оборудования, протоколы Modbus, OPC UA' },
  'cloud-platforms': { name: 'Облачные платформы', slug: 'cloud-platforms', category: 'Промышленный IoT', categorySlug: 'automation', description: 'Azure IoT / AWS IoT — хранение, аналитика, дашборды' },
  'predictive-iot': { name: 'Предиктивная аналитика', slug: 'predictive-iot', category: 'Промышленный IoT', categorySlug: 'automation', description: 'ML-модели для прогноза отказов оборудования' },
  'rittal-ts8': { name: 'Rittal TS8', slug: 'rittal-ts8', category: 'Шкафы управления', categorySlug: 'automation', description: 'Модульные шкафы IP55, быстрая сборка' },
  'cabinet-cooling': { name: 'Климат-контроль', slug: 'cabinet-cooling', category: 'Шкафы управления', categorySlug: 'automation', description: 'Обогрев и охлаждение для стабильной работы электроники' },
  'cabinet-assembly': { name: 'Сборка под ключ', slug: 'cabinet-assembly', category: 'Шкафы управления', categorySlug: 'automation', description: 'Проектирование, монтаж, тестирование, документация' },
  'danfoss-vlt': { name: 'Danfoss VLT', slug: 'danfoss-vlt', category: 'Частотные преобразователи', categorySlug: 'automation', description: 'Для насосов и вентиляторов, энергосбережение до 30%' },
  'abb-acs880': { name: 'ABB ACS880', slug: 'abb-acs880', category: 'Частотные преобразователи', categorySlug: 'automation', description: 'Универсальные приводы, векторное управление' },
  'grid-sync': { name: 'Синхронизация с сетью', slug: 'grid-sync', category: 'Частотные преобразователи', categorySlug: 'automation', description: 'Рекуперация энергии, снижение гармоник' },

  // === ЦИФРОВЫЕ ДВОЙНИКИ ===
  'process-simulate': { name: 'Siemens Process Simulate', slug: 'process-simulate', category: '3D-моделирование процессов', categorySlug: 'digital-twins', description: 'Виртуальная commissioning, отладка до физического запуска' },
  'visual-components': { name: 'Visual Components', slug: 'visual-components', category: '3D-моделирование процессов', categorySlug: 'digital-twins', description: 'Планирование производств, расчёт узких мест' },
  'cad-integration': { name: 'Интеграция с CAD', slug: 'cad-integration', category: '3D-моделирование процессов', categorySlug: 'digital-twins', description: 'Импорт моделей из SolidWorks, CATIA, NX' },
  'ibm-maximo': { name: 'IBM Maximo', slug: 'ibm-maximo', category: 'Предиктивная аналитика', categorySlug: 'digital-twins', description: 'Прогноз отказов оборудования, оптимизация ТО' },
  'cognite': { name: 'Cognite Data Fusion', slug: 'cognite', category: 'Предиктивная аналитика', categorySlug: 'digital-twins', description: 'Промышленные данные и AI, контекстуализация' },
  'custom-ml': { name: 'Кастомные ML-модели', slug: 'custom-ml', category: 'Предиктивная аналитика', categorySlug: 'digital-twins', description: 'Разработка под конкретные процессы заказчика' },
  'flow-simulation': { name: 'Симуляция потоков', slug: 'flow-simulation', category: 'Оптимизация циклов', categorySlug: 'digital-twins', description: 'Балансировка линий, снижение времени такта' },
  'digital-threads': { name: 'Цифровые нити', slug: 'digital-threads', category: 'Оптимизация циклов', categorySlug: 'digital-twins', description: 'Сквозная прослеживаемость данных от заказа до отгрузки' },
  'ab-testing': { name: 'A/B тестирование', slug: 'ab-testing', category: 'Оптимизация циклов', categorySlug: 'digital-twins', description: 'Сравнение сценариев работы в виртуальной среде' },
  'hololens': { name: 'Microsoft HoloLens 2', slug: 'hololens', category: 'VR/AR обучение', categorySlug: 'digital-twins', description: 'AR инструкции для сборки и ремонта' },
  'vr-trainers': { name: 'VR тренажеры', slug: 'vr-trainers', category: 'VR/AR обучение', categorySlug: 'digital-twins', description: 'Безопасное обучение операторов на виртуальных копиях' },
  'remote-expert': { name: 'Удалённая экспертиза', slug: 'remote-expert', category: 'VR/AR обучение', categorySlug: 'digital-twins', description: 'Специалист видит через камеру оператора и даёт подсказки' },
  'plm-systems': { name: 'PLM системы', slug: 'plm-systems', category: 'Цифровые нити', categorySlug: 'digital-twins', description: 'Управление жизненным циклом изделия' },
  'erp-integration': { name: 'ERP интеграция', slug: 'erp-integration', category: 'Цифровые нити', categorySlug: 'digital-twins', description: 'Связь производства и склада в реальном времени' },
  'blockchain-traceability': { name: 'Блокчейн для прослеживаемости', slug: 'blockchain-traceability', category: 'Цифровые нити', categorySlug: 'digital-twins', description: 'Неизменяемая история каждой детали' },

  // === МЕРОПРИЯТИЯ ===
  'robotica-stand': { name: 'Стенд Технопарка', slug: 'robotica-stand', category: 'Выставка Robotica 2025', categorySlug: 'events', description: '15-18 апреля, Экспоцентр, павильон 2, стенд B15' },
  'cobot-demo': { name: 'Демонстрация коботов', slug: 'cobot-demo', category: 'Выставка Robotica 2025', categorySlug: 'events', description: 'Живые сценарии: сборка, упаковка, контроль качества' },
  'programming-workshop': { name: 'Мастер-класс по программированию', slug: 'programming-workshop', category: 'Выставка Robotica 2025', categorySlug: 'events', description: '16 апреля, 14:00, регистрация на сайте' },
  'industry-panel': { name: 'Панельная дискуссия', slug: 'industry-panel', category: 'Форум Industry 4.0', categorySlug: 'events', description: 'Тренды автоматизации 2025, спикеры из ГУАП, Росатома, Сбера' },
  'networking': { name: 'Нетворкинг', slug: 'networking', category: 'Форум Industry 4.0', categorySlug: 'events', description: 'Встреча с производителями и интеграторами' },
  'startup-zone': { name: 'Стартап-зона', slug: 'startup-zone', category: 'Форум Industry 4.0', categorySlug: 'events', description: 'Питчи инновационных проектов, гранты до 5 млн ₽' },
  'cobot-basic': { name: 'Базовый курс', slug: 'cobot-basic', category: 'Семинар по коботам', categorySlug: 'events', description: '12 мая, очно в СПб, 2 дня, сертификат' },
  'cobot-advanced': { name: 'Продвинутая интеграция', slug: 'cobot-advanced', category: 'Семинар по коботам', categorySlug: 'events', description: '20 мая, онлайн, работа с PLC и SCADA' },
  'cobot-cases': { name: 'Кейсы внедрения', slug: 'cobot-cases', category: 'Семинар по коботам', categorySlug: 'events', description: 'Разбор реальных проектов от заказчиков' },
  'amr-webinar': { name: 'Вебинар по AMR', slug: 'amr-webinar', category: 'Онлайн-трансляции', categorySlug: 'events', description: 'Расписание на сайте, запись доступна после регистрации' },
  'webinar-archive': { name: 'Архив записей', slug: 'webinar-archive', category: 'Онлайн-трансляции', categorySlug: 'events', description: 'Более 50 часов контента по автоматизации' },
  'qa-sessions': { name: 'Q&A сессии', slug: 'qa-sessions', category: 'Онлайн-трансляции', categorySlug: 'events', description: 'Ежемесячные ответы на вопросы от инженеров Технопарка' },

  // === О ТЕХНОПАРКЕ ===
  'history': { name: 'Основание в 2018', slug: 'history', category: 'История и миссия', categorySlug: 'about', description: 'Путь от лаборатории ГУАП до федерального технопарка' },
  'mission': { name: 'Миссия и ценности', slug: 'mission', category: 'История и миссия', categorySlug: 'about', description: 'Развитие Industry 4.0 в России через образование и инновации' },
  'achievements': { name: 'Достижения', slug: 'achievements', category: 'История и миссия', categorySlug: 'about', description: '50+ внедрённых проектов, 200+ партнёров, 15 патентов' },
  'ceo': { name: 'Генеральный директор', slug: 'ceo', category: 'Руководство', categorySlug: 'about', description: 'Иванов Алексей Петрович, 15 лет в автоматизации' },
  'cto': { name: 'Технический директор', slug: 'cto', category: 'Руководство', categorySlug: 'about', description: 'Смирнов Дмитрий Игоревич, экс-инженер Siemens' },
  'team': { name: 'Команда', slug: 'team', category: 'Руководство', categorySlug: 'about', description: '40+ инженеров, разработчиков и менеджеров' },
  'partners-universities': { name: 'Университеты', slug: 'partners-universities', category: 'Партнёры и клиенты', categorySlug: 'about', description: 'ГУАП, ИТМО, Политех, МГТУ им. Баумана' },
  'partners-vendors': { name: 'Производители', slug: 'partners-vendors', category: 'Партнёры и клиенты', categorySlug: 'about', description: 'Universal Robots, Siemens, Festo, SICK' },
  'clients': { name: 'Клиенты', slug: 'clients', category: 'Партнёры и клиенты', categorySlug: 'about', description: 'Росатом, Ростех, Яндекс, Сбер, АвтоВАЗ' },
  'iso-9001': { name: 'ISO 9001:2015', slug: 'iso-9001', category: 'Сертификаты', categorySlug: 'about', description: 'Система менеджмента качества' },
  'software-license': { name: 'Лицензия на ПО', slug: 'software-license', category: 'Сертификаты', categorySlug: 'about', description: 'Реестр отечественного ПО Минцифры' },
  'minpromtorg': { name: 'Аккредитация Минпромторга', slug: 'minpromtorg', category: 'Сертификаты', categorySlug: 'about', description: 'Статус индустриального партнёра' },
  'main-office': { name: 'Главный офис', slug: 'main-office', category: 'Контакты и адрес', categorySlug: 'about', description: 'г. Санкт-Петербург, ул. Гастелло, д. 15, офис 304' },
  'requisites': { name: 'Реквизиты', slug: 'requisites', category: 'Контакты и адрес', categorySlug: 'about', description: 'ИНН 7801234567, ОГРН 1157846123456' },
  'map': { name: 'Карта проезда', slug: 'map', category: 'Контакты и адрес', categorySlug: 'about', description: 'М. «Обводный канал», 7 минут пешком' },

  // === КАРЬЕРА (С ЗАРПЛАТАМИ) ===
  'robotics-junior': { name: 'Junior', slug: 'robotics-junior', category: 'Инженер-робототехник', categorySlug: 'careers', description: 'Настройка и пуск коботов, обучение', salary: 'от 80 000 ₽' },
  'robotics-middle': { name: 'Middle', slug: 'robotics-middle', category: 'Инженер-робототехник', categorySlug: 'careers', description: 'Проектирование ячеек, интеграция с ПЛК', salary: 'от 140 000 ₽' },
  'robotics-senior': { name: 'Senior', slug: 'robotics-senior', category: 'Инженер-робототехник', categorySlug: 'careers', description: 'Архитектура решений, менторство', salary: 'от 200 000 ₽' },
  'asutp-engineer': { name: 'Инженер АСУ ТП', slug: 'asutp-engineer', category: 'Специалист по автоматизации', categorySlug: 'careers', description: 'ПЛК, SCADA, промышленные сети', salary: 'от 130 000 ₽' },
  'plc-programmer': { name: 'Программист ПЛК', slug: 'plc-programmer', category: 'Специалист по автоматизации', categorySlug: 'careers', description: 'Siemens, Beckhoff, B&R', salary: 'от 150 000 ₽' },
  'integrator': { name: 'Интегратор', slug: 'integrator', category: 'Специалист по автоматизации', categorySlug: 'careers', description: 'Связка роботов, датчиков, систем управления', salary: 'от 160 000 ₽' },
  'pm-robotics': { name: 'PM Robotics', slug: 'pm-robotics', category: 'Менеджер проектов', categorySlug: 'careers', description: 'Ведение проектов под ключ от ТЗ до сдачи', salary: 'от 160 000 ₽' },
  'pm-automation': { name: 'PM Автоматизация', slug: 'pm-automation', category: 'Менеджер проектов', categorySlug: 'careers', description: 'Координация команд, бюджет, сроки', salary: 'от 170 000 ₽' },
  'business-analyst': { name: 'Бизнес-аналитик', slug: 'business-analyst', category: 'Менеджер проектов', categorySlug: 'careers', description: 'Сбор требований, ТЗ, коммуникация с заказчиком', salary: 'от 140 000 ₽' },
  'summer-internship': { name: 'Летняя практика', slug: 'summer-internship', category: 'Стажировки для студентов', categorySlug: 'careers', description: '3 месяца, оплачиваемая, реальные задачи', salary: 'от 45 000 ₽/мес' },
  'thesis-project': { name: 'Дипломный проект', slug: 'thesis-project', category: 'Стажировки для студентов', categorySlug: 'careers', description: 'Тема от Технопарка, менторство, возможность трудоустройства', salary: 'от 50 000 ₽' },
  'hackathons': { name: 'Хакатоны', slug: 'hackathons', category: 'Стажировки для студентов', categorySlug: 'careers', description: 'Командные соревнования, призы, карьерные предложения', salary: '' },
  'office-culture': { name: 'Офис и атмосфера', slug: 'office-culture', category: 'Корпоративная культура', categorySlug: 'careers', description: 'Современный коворкинг, лаборатории, зона отдыха' },
  'learning': { name: 'Обучение и рост', slug: 'learning', category: 'Корпоративная культура', categorySlug: 'careers', description: 'Сертификации за счёт компании, конференции, менторство' },
  'team-culture': { name: 'Команда', slug: 'team-culture', category: 'Корпоративная культура', categorySlug: 'careers', description: 'Открытость, взаимопомощь, фокус на результате' },

  // === ПОДДЕРЖКА ===
  'warranty-std': { name: 'Стандартная гарантия', slug: 'warranty-std', category: 'Гарантийное обслуживание', categorySlug: 'support', description: '12 месяцев на оборудование, бесплатный ремонт' },
  'warranty-ext': { name: 'Расширенная гарантия', slug: 'warranty-ext', category: 'Гарантийное обслуживание', categorySlug: 'support', description: 'До 36 месяцев с выездом инженера и заменой узлов' },
  'software-warranty': { name: 'Гарантия на ПО', slug: 'software-warranty', category: 'Гарантийное обслуживание', categorySlug: 'support', description: 'Обновления и исправления в течение срока лицензии' },
  'remote-support': { name: 'Удалённая помощь', slug: 'remote-support', category: 'Техническая поддержка 24/7', categorySlug: 'support', description: 'TeamViewer, AnyDesk, телефон, чат — ответ в течение 15 минут' },
  'onsite-support': { name: 'Выезд инженера', slug: 'onsite-support', category: 'Техническая поддержка 24/7', categorySlug: 'support', description: 'По всей России, срок прибытия до 48 часов' },
  'knowledge-base': { name: 'База знаний', slug: 'knowledge-base', category: 'Техническая поддержка 24/7', categorySlug: 'support', description: 'Статьи, видео, инструкции — доступно 24/7' },
  'diagnostics': { name: 'Диагностика узлов', slug: 'diagnostics', category: 'Ремонт и диагностика', categorySlug: 'support', description: 'Выявление неисправностей, отчёт с рекомендациями' },
  'board-repair': { name: 'Восстановление плат', slug: 'board-repair', category: 'Ремонт и диагностика', categorySlug: 'support', description: 'Компонентный ремонт, замена микросхем' },
  'calibration': { name: 'Калибровка', slug: 'calibration', category: 'Ремонт и диагностика', categorySlug: 'support', description: 'Восстановление точности после ремонта или длительного простоя' },
  'original-parts': { name: 'Оригинальные запчасти', slug: 'original-parts', category: 'Запасные части', categorySlug: 'support', description: 'Склад в СПб, отгрузка 24 часа, гарантия' },
  'consumables': { name: 'Расходные материалы', slug: 'consumables', category: 'Запасные части', categorySlug: 'support', description: 'Сопла, захваты, кабели, фильтры — всегда в наличии' },
  'compatible-parts': { name: 'Аналоги и совместимые', slug: 'compatible-parts', category: 'Запасные части', categorySlug: 'support', description: 'Бюджетные альтернативы без потери качества' },
  'support-request': { name: 'Заявка на поддержку', slug: 'support-request', category: 'Форма обратной связи', categorySlug: 'support', description: 'Заполните форму на сайте — ответ в течение 2 часов' },
  'quote-request': { name: 'Запрос коммерческого предложения', slug: 'quote-request', category: 'Форма обратной связи', categorySlug: 'support', description: 'Опишите задачу — подготовим решение и расчёт' },
  'callback': { name: 'Обратный звонок', slug: 'callback', category: 'Форма обратной связи', categorySlug: 'support', description: 'Оставьте номер — перезвоним в удобное время' },

  // === ОТРАСЛЕВЫЕ РЕШЕНИЯ ===
  'opk-equipment': { name: 'Специализированное оборудование ОПК', slug: 'opk-equipment', category: 'Оборонно-промышленный комплекс', categorySlug: 'industries', description: 'По техническому заданию' },
  'quality-control': { name: 'Системы контроля качества', slug: 'quality-control', category: 'Оборонно-промышленный комплекс', categorySlug: 'industries', description: 'Военная приемка' },
  'pcb-line': { name: 'Линия сборки плат', slug: 'pcb-line', category: 'Производство электроники и ЭКБ', categorySlug: 'industries', description: 'Полный цикл производства' },
  'ekb-equipment': { name: 'Оборудование для ЭКБ', slug: 'ekb-equipment', category: 'Производство электроники и ЭКБ', categorySlug: 'industries', description: 'Производство компонентов' },
  'space-equipment': { name: 'Оборудование для космоса', slug: 'space-equipment', category: 'Космическая промышленность', categorySlug: 'industries', description: 'Сертифицировано' },
  'space-vibration': { name: 'Вибростенд космический', slug: 'space-vibration', category: 'Космическая промышленность', categorySlug: 'industries', description: 'Испытания спутников' },
  'aviation-equipment': { name: 'Оборудование для авиации', slug: 'aviation-equipment', category: 'Авиастроение', categorySlug: 'industries', description: 'Сертификат FAA' },
  'aviation-measurement': { name: 'Контрольно-измерительное', slug: 'aviation-measurement', category: 'Авиастроение', categorySlug: 'industries', description: 'Прецизионное' },
  'auto-electronics': { name: 'Линия сборки электроники', slug: 'auto-electronics', category: 'Автомобилестроение', categorySlug: 'industries', description: 'Для автоэлектроники' },
  'auto-tester': { name: 'Тестер автомобильный', slug: 'auto-tester', category: 'Автомобилестроение', categorySlug: 'industries', description: 'Диагностика' },
  'energy-equipment': { name: 'Оборудование для энергетики', slug: 'energy-equipment', category: 'Энергетика', categorySlug: 'industries', description: 'Высоковольтное' },
  'power-analyzer': { name: 'Анализатор качества энергии', slug: 'power-analyzer', category: 'Энергетика', categorySlug: 'industries', description: 'Класс A' },
  'fiber-tester': { name: 'Тестер оптоволокна', slug: 'fiber-tester', category: 'Телекоммуникации и связь', categorySlug: 'industries', description: 'OTDR' },
  'network-analyzer': { name: 'Анализатор сетей', slug: 'network-analyzer', category: 'Телекоммуникации и связь', categorySlug: 'industries', description: '5G ready' },
  'measurement-complex': { name: 'Измерительные комплексы', slug: 'measurement-complex', category: 'Радиоэлектронная промышленность', categorySlug: 'industries', description: 'Для РЭП' },
  'test-stands': { name: 'Стенды испытаний', slug: 'test-stands', category: 'Радиоэлектронная промышленность', categorySlug: 'industries', description: 'Комплексные' },
  'university-equipment': { name: 'Оборудование для ВУЗов', slug: 'university-equipment', category: 'Наука и образование', categorySlug: 'industries', description: 'Учебные комплексы' },
  'lab-stands': { name: 'Лабораторные стенды', slug: 'lab-stands', category: 'Наука и образование', categorySlug: 'industries', description: 'Для исследований' },
  'railway-systems': { name: 'Системы для ЖД', slug: 'railway-systems', category: 'Транспортная инфраструктура', categorySlug: 'industries', description: 'Железнодорожная автоматика' },
  'metro-equipment': { name: 'Метро оборудование', slug: 'metro-equipment', category: 'Транспортная инфраструктура', categorySlug: 'industries', description: 'Системы управления' },
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const productId = params.id as string;
  const product = productsDatabase[productId];

  // ✅ ИСПРАВЛЕНО: Возвращаем параметр ?sub= для сохранения вкладки
  const handleBack = () => {
    if (product?.categorySlug && product?.category) {
      router.push(`/category/${product.categorySlug}?sub=${encodeURIComponent(product.category)}`);
    } else {
      router.back();
    }
  };

  if (!product) {
    return (
      <>
        <Header />
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
          <footer className="bg-black text-white py-16">
            <div className="container">
              <div className="text-center text-gray-500 text-sm">
                <p>&copy; 2024 Технопарк ГУАП. Все права защищены.</p>
              </div>
            </div>
          </footer>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* ✅ ИСПРАВЛЕНО: Хлебные крошки с параметром ?sub= */}
        <div className="bg-white border-b border-gray-200">
          <div className="container py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <button onClick={handleBack} className="hover:text-blue-700 transition-colors">
                Меню
              </button>
              <span>/</span>
              <Link
                href={`/category/${product.categorySlug}?sub=${encodeURIComponent(product.category)}`}
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
              <div className="bg-white rounded-sm p-8 shadow-sm">
                <div className="aspect-square bg-gray-100 rounded-sm overflow-hidden">
                  <img src="/images/bg.jpg" alt={product.name} className="w-full h-full object-cover" />
                </div>
              </div>

              <div>
                <div className="text-sm text-blue-700 font-medium mb-2">{product.category}</div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                {product.salary && <div className="text-3xl font-bold text-blue-700 mb-6">{product.salary}</div>}
                {!product.salary && <div className="text-gray-400 text-lg mb-6 italic">Подробности по запросу</div>}

                <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.description}</p>

                <div className="flex gap-4 mb-8">
                  <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-sm px-8 py-4 transition-all inline-flex items-center gap-2">
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
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-black text-white py-16">
          <div className="container">
            <div className="text-center text-gray-500 text-sm">
              <p>&copy; 2024 Технопарк ГУАП. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
