'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  const menuItems = [
    {
      name: 'Оборудование',
      slug: 'equipment',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      subcategories: [
        { name: 'Производство электроники', img: '/images/bg.jpg' },
        { name: 'Производство микроэлектроники', img: '/images/bg.jpg' },
        { name: 'Измерения', img: '/images/bg.jpg' },
        { name: 'Испытательное оборудование', img: '/images/bg.jpg' },
        { name: 'Метрология и поверка', img: '/images/bg.jpg' },
        { name: '3D-принтеры', img: '/images/bg.jpg' },
        { name: 'Ручная пайка и визуальный контроль', img: '/images/bg.jpg' },
        { name: 'Программное обеспечение', img: '/images/bg.jpg' },
        { name: 'Инженерная инфраструктура', img: '/images/bg.jpg' },
        { name: 'Оснащение производственных помещений', img: '/images/bg.jpg' },
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
      name: 'Услуги',
      slug: 'services',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      subcategories: [
        { name: 'Техническое перевооружение', img: '/images/bg.jpg' },
        { name: 'Инжиниринг', img: '/images/bg.jpg' },
        { name: 'Аудит и консалтинг', img: '/images/bg.jpg' },
        { name: 'Поставка оборудования', img: '/images/bg.jpg' },
        { name: 'Монтаж и пусконаладка', img: '/images/bg.jpg' },
        { name: 'Обучение персонала', img: '/images/bg.jpg' },
      ]
    },
    {
      name: 'Сервис',
      slug: 'service',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      subcategories: [
        { name: 'Гарантийное обслуживание', img: '/images/bg.jpg' },
        { name: 'Постгарантийное обслуживание', img: '/images/bg.jpg' },
        { name: 'Ремонт оборудования', img: '/images/bg.jpg' },
        { name: 'Техническая поддержка', img: '/images/bg.jpg' },
        { name: 'Запасные части', img: '/images/bg.jpg' },
      ]
    },
    {
      name: 'Пресс-центр',
      slug: 'press',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      subcategories: [
        { name: 'Новости компании', img: '/images/bg.jpg' },
        { name: 'Публикации в СМИ', img: '/images/bg.jpg' },
        { name: 'Пресс-релизы', img: '/images/bg.jpg' },
        { name: 'Видео', img: '/images/bg.jpg' },
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
        { name: 'Выставки', img: '/images/bg.jpg' },
        { name: 'Конференции', img: '/images/bg.jpg' },
        { name: 'Семинары', img: '/images/bg.jpg' },
        { name: 'Вебинары', img: '/images/bg.jpg' },
      ]
    },
    {
      name: 'О компании',
      slug: 'about',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      subcategories: [
        { name: 'История компании', img: '/images/bg.jpg' },
        { name: 'Руководство', img: '/images/bg.jpg' },
        { name: 'Партнёры', img: '/images/bg.jpg' },
        { name: 'Сертификаты', img: '/images/bg.jpg' },
        { name: 'Реквизиты', img: '/images/bg.jpg' },
      ]
    },
    {
      name: 'Работа в Диполе',
      slug: 'careers',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      subcategories: [
        { name: 'Вакансии', img: '/images/bg.jpg' },
        { name: 'Стажировки', img: '/images/bg.jpg' },
        { name: 'Корпоративная культура', img: '/images/bg.jpg' },
        { name: 'Отзывы сотрудников', img: '/images/bg.jpg' },
      ]
    },
    {
      name: 'Контакты',
      slug: 'contacts',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      subcategories: [
        { name: 'Офисы и представительства', img: '/images/bg.jpg' },
        { name: 'Отдел продаж', img: '/images/bg.jpg' },
        { name: 'Сервисный центр', img: '/images/bg.jpg' },
        { name: 'Написать нам', img: '/images/bg.jpg' },
      ]
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Заголовок страницы */}
        <section className="bg-white border-b border-gray-200">
          <div className="container py-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Каталог
            </h1>
            <p className="text-gray-600 text-lg">
              Выберите категорию оборудования или услуг
            </p>
          </div>
        </section>

        {/* Основное содержимое меню */}
        <section className="py-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Левая колонка - основные категории */}
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
                      <span className={activeCategory === index ? 'text-blue-700' : 'text-gray-400'}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.name}</span>
                      <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Правая колонка - подразделы */}
              <div className="flex-1">
                <div className="bg-white border border-gray-200 rounded-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                    {menuItems[activeCategory]?.name}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {menuItems[activeCategory]?.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        href={`/category/${menuItems[activeCategory].slug}`}
                        className="flex items-center gap-4 p-4 rounded-sm border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                        onClick={() => {
                          // При клике запоминаем выбранную категорию
                          localStorage.setItem('lastCategory', menuItems[activeCategory].slug);
                        }}
                      >
                        <div className="w-20 h-14 bg-gray-200 rounded-sm overflow-hidden flex-shrink-0">
                          <img
                            src={sub.img}
                            alt={sub.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-gray-700 font-medium group-hover:text-blue-700 transition-colors">
                          {sub.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
