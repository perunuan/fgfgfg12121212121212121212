'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  const menuItems = [
    {
      name: 'Коллаборативная робототехника',
      slug: 'collaborative-robots',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      subcategories: [
        { name: 'Коботы Universal Robots', img: '/images/bg.jpg' },
        { name: 'Системы безопасности', img: '/images/bg.jpg' },
        { name: 'Программирование и обучение', img: '/images/bg.jpg' },
        { name: 'Интеграция в линии', img: '/images/bg.jpg' },
        { name: 'Эффекторы и захваты', img: '/images/bg.jpg' },
      ]
    },
    {
      name: 'Отраслевые решения',
      slug: 'industries',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      subcategories: [
        { name: 'Оборонно-промышленный комплекс', img: '/images/bg.jpg' },
        { name: 'Производство электроники и ЭКБ', img: '/images/bg.jpg' },
        { name: 'Космическая промышленность', img: '/images/bg.jpg' },
        { name: 'Телекоммуникации и связь', img: '/images/bg.jpg' },
        { name: 'Радиоэлектронная промышленность', img: '/images/bg.jpg' },
        { name: 'Автомобилестроение', img: '/images/bg.jpg' },
        { name: 'Авиастроение', img: '/images/bg.jpg' },
        { name: 'Энергетика', img: '/images/bg.jpg' },
      ]
    },
    {
      name: 'Мобильная робототехника',
      slug: 'mobile-robots',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      subcategories: [
        { name: 'AGV и AMR платформы', img: '/images/bg.jpg' },
        { name: 'Инспекционные дроны', img: '/images/bg.jpg' },
        { name: 'Логистические роботы', img: '/images/bg.jpg' },
        { name: 'Навигация и LiDAR', img: '/images/bg.jpg' },
        { name: 'Зарядные станции', img: '/images/bg.jpg' },
      ]
    },
    {
      name: 'Мехатроника',
      slug: 'mechatronics',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      subcategories: [
        { name: 'Сервоприводы и моторы', img: '/images/bg.jpg' },
        { name: 'Контроллеры движения', img: '/images/bg.jpg' },
        { name: 'Датчики и энкодеры', img: '/images/bg.jpg' },
        { name: 'Пневмо- и гидроцилиндры', img: '/images/bg.jpg' },
        { name: 'Сборочные модули', img: '/images/bg.jpg' },
      ]
    },
    {
      name: 'Промышленная автоматизация',
      slug: 'automation',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      subcategories: [
        { name: 'ПЛК и модули ввода-вывода', img: '/images/bg.jpg' },
        { name: 'SCADA-системы', img: '/images/bg.jpg' },
        { name: 'Промышленный IoT', img: '/images/bg.jpg' },
        { name: 'Шкафы управления', img: '/images/bg.jpg' },
        { name: 'Частотные преобразователи', img: '/images/bg.jpg' },
      ]
    },
    {
      name: 'Цифровые двойники производств',
      slug: 'digital-twins',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      subcategories: [
        { name: '3D-моделирование процессов', img: '/images/bg.jpg' },
        { name: 'Предиктивная аналитика', img: '/images/bg.jpg' },
        { name: 'Оптимизация циклов', img: '/images/bg.jpg' },
        { name: 'VR/AR обучение', img: '/images/bg.jpg' },
        { name: 'Цифровые нити', img: '/images/bg.jpg' },
      ]
    },
    {
      name: 'Мероприятия',
      slug: 'events',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      subcategories: [
        { name: 'Выставка Robotica 2025', img: '/images/bg.jpg' },
        { name: 'Форум Industry 4.0', img: '/images/bg.jpg' },
        { name: 'Семинар по коботам', img: '/images/bg.jpg' },
        { name: 'Онлайн-трансляции', img: '/images/bg.jpg' },
      ]
    },
    {
      name: 'О Технопарке',
      slug: 'about',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      subcategories: [
        { name: 'История и миссия', img: '/images/bg.jpg' },
        { name: 'Руководство', img: '/images/bg.jpg' },
        { name: 'Партнёры и клиенты', img: '/images/bg.jpg' },
        { name: 'Сертификаты', img: '/images/bg.jpg' },
        { name: 'Контакты и адрес', img: '/images/bg.jpg' },
      ]
    },
    {
      name: 'Карьера в Технопарке',
      slug: 'careers',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      subcategories: [
        { name: 'Инженер-робототехник', img: '/images/bg.jpg' },
        { name: 'Специалист по автоматизации', img: '/images/bg.jpg' },
        { name: 'Менеджер проектов', img: '/images/bg.jpg' },
        { name: 'Стажировки для студентов', img: '/images/bg.jpg' },
        { name: 'Корпоративная культура', img: '/images/bg.jpg' },
      ]
    },
    {
      name: 'Поддержка и связь',
      slug: 'support',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      subcategories: [
        { name: 'Гарантийное обслуживание', img: '/images/bg.jpg' },
        { name: 'Техническая поддержка 24/7', img: '/images/bg.jpg' },
        { name: 'Ремонт и диагностика', img: '/images/bg.jpg' },
        { name: 'Запасные части', img: '/images/bg.jpg' },
        { name: 'Форма обратной связи', img: '/images/bg.jpg' },
      ]
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-white border-b border-gray-200">
          <div className="container py-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Каталог решений</h1>
            <p className="text-gray-600 text-lg">Выберите категорию оборудования, услуг или направление</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-80 flex-shrink-0">
                <div className="bg-white border border-gray-200 rounded-sm overflow-hidden sticky top-24">
                  {menuItems.map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => setActiveCategory(index)}
                      className={`w-full flex items-center gap-3 px-5 py-4 text-sm transition-colors border-b border-gray-100 last:border-b-0 ${
                        activeCategory === index
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-l-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 border-l-4 border-l-transparent'
                      }`}
                    >
                      <span className={activeCategory === index ? 'text-blue-700' : 'text-gray-400'}>{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                      <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-white border border-gray-200 rounded-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                    {menuItems[activeCategory]?.name}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {menuItems[activeCategory]?.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        href={`/category/${menuItems[activeCategory].slug}?sub=${encodeURIComponent(sub.name)}`}
                        className="flex items-center gap-4 p-4 rounded-sm border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                      >
                        <div className="w-20 h-14 bg-gray-200 rounded-sm overflow-hidden flex-shrink-0">
                          <img src={sub.img} alt={sub.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <span className="text-gray-700 font-medium group-hover:text-blue-700 transition-colors">{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
              <div>
                <div className="mb-6">
                  <img src="/images/logo2.png" alt="Технопарк ГУАП" className="h-14 w-auto object-contain" />
                </div>
                <p className="text-gray-400 text-sm mb-6">Инновационная площадка для развития технологий</p>
                <div className="space-y-3">
                  <a href="tel:89811703215" className="block text-lg font-medium text-white hover:text-blue-400 transition-colors">8 (981) 170-32-15</a>
                  <a href="mailto:info@technopark.ru" className="block text-sm text-gray-400 hover:text-white transition-colors">info@technopark.ru</a>
                  <p className="text-sm text-gray-400">Пн-Пт: 9:00 - 18:00</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-6 text-white text-lg">Разделы</h4>
                <ul className="space-y-3">
                  <li><Link href="/category/collaborative-robots" className="text-gray-400 hover:text-blue-400 transition-colors">Робототехника</Link></li>
                  <li><Link href="/category/industries" className="text-gray-400 hover:text-blue-400 transition-colors">Отраслевые решения</Link></li>
                  <li><Link href="/category/automation" className="text-gray-400 hover:text-blue-400 transition-colors">Автоматизация</Link></li>
                  <li><Link href="/category/support" className="text-gray-400 hover:text-blue-400 transition-colors">Поддержка</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-6 text-white text-lg">Компания</h4>
                <ul className="space-y-3">
                  <li><Link href="/category/about" className="text-gray-400 hover:text-blue-400 transition-colors">О Технопарке</Link></li>
                  <li><Link href="/category/events" className="text-gray-400 hover:text-blue-400 transition-colors">Мероприятия</Link></li>
                  <li><Link href="/category/careers" className="text-gray-400 hover:text-blue-400 transition-colors">Карьера</Link></li>
                  <li><button className="text-gray-400 hover:text-blue-400 transition-colors">Обратная связь</button></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-500 text-sm text-center md:text-left"><p>&copy; 2024 Технопарк ГУАП. Все права защищены.</p></div>
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
    </>
  );
}
