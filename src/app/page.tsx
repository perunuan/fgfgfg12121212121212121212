'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Link from 'next/link';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    setIsModalOpen(false);
  };

  const blueBtnClass = "bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-sm px-8 py-3 transition-all duration-200 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-0.5";

  return (
    <>
      <Header onContactClick={() => setIsModalOpen(true)} />
      <main>
        {/* Hero Section */}
        <section id="hero" className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/bg.jpg" alt="Производство" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gray-900/80"></div>
          </div>
          <div className="container relative z-10 py-24 lg:py-32">
            <div className="max-w-5xl">
              {/* ЗАГОЛОВОК */}
              <h1 className="mb-4 text-white text-5xl md:text-6xl lg:text-7xl font-bold">
                Портал партнеров Технопарка
              </h1>
              {/* ОПИСАНИЕ */}
              <p className="mb-8 text-xl text-gray-300 max-w-4xl leading-relaxed">
                Максимального результата возможно добиться только в тесном взаимодействии университета с партнерами. Это позволяет компаниям укреплять имидж в университетской среде, а университету готовить востребованных экономикой специалистов по таким направлениям, как реверсивный инжиниринг и управление, информационные технологии, инженерные, коллоборативная робототехника и математика.
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <Link href="/category/equipment" className={blueBtnClass}>Смотреть решения</Link>
                <button onClick={() => setIsModalOpen(true)} className="border-2 border-white text-white hover:bg-white/10 font-medium rounded-sm px-8 py-3 transition-all duration-200 inline-block">
                  Связаться с нами
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Отраслевые решения */}
        <section id="industries" className="py-20 lg:py-28 bg-gray-950">
          <div className="px-4 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-white">Отраслевые решения</h2>

            {/* Верхний ряд */}
            <div className="flex gap-1 mb-1">
              {[
                { num: '01', title: 'Оборонно-промышленный комплекс', img: '/images/defense.jpg' },
                { num: '02', title: 'Производство электроники и ЭКБ', img: '/images/electronics.jpg' },
                { num: '03', title: 'Космическая промышленность', img: '/images/space.jpg' },
                { num: '04', title: 'Телекоммуникации и связь', img: '/images/telecom.jpg' },
                { num: '05', title: 'Радиоэлектронная промышленность', img: '/images/radio.jpg' },
              ].map((industry) => (
                <Link
                  key={industry.num}
                  href={`/category/industries?sub=${encodeURIComponent(industry.title)}`}
                  className="group relative overflow-hidden cursor-pointer flex-1 min-w-[120px] hover:flex-[2] transition-all duration-500 ease-out border border-gray-900 hover:border-blue-500/50"
                  style={{ minHeight: '320px' }}
                >
                  <img src={industry.img} alt={industry.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-150" />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/75 via-gray-900/55 to-gray-900/75 group-hover:from-gray-900/50 group-hover:via-gray-900/30 group-hover:to-gray-900/50 transition-all duration-500"></div>
                  <div className="relative z-10 p-5 lg:p-6 h-full flex flex-col justify-between">
                    <div className="pt-2"><h3 className="text-white font-medium text-sm lg:text-base leading-snug line-clamp-2">{industry.title}</h3></div>
                    <div className="flex items-end justify-between">
                      <div className="text-gray-500 text-xs font-mono">{industry.num}</div>
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Нижний ряд */}
            <div className="flex gap-1">
              {[
                { num: '06', title: 'Автомобилестроение', img: '/images/auto.jpg' },
                { num: '07', title: 'Авиастроение', img: '/images/aviation.jpg' },
                { num: '08', title: 'Энергетика', img: '/images/energy.jpg' },
                { num: '09', title: 'Наука и образование', img: '/images/science.jpg' },
                { num: '10', title: 'Транспортная инфраструктура', img: '/images/transport.jpg' },
              ].map((industry) => (
                <Link
                  key={industry.num}
                  href={`/category/industries?sub=${encodeURIComponent(industry.title)}`}
                  className="group relative overflow-hidden cursor-pointer flex-1 min-w-[120px] hover:flex-[2] transition-all duration-500 ease-out border border-gray-900 hover:border-blue-500/50"
                  style={{ minHeight: '320px' }}
                >
                  <img src={industry.img} alt={industry.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-150" />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/75 via-gray-900/55 to-gray-900/75 group-hover:from-gray-900/50 group-hover:via-gray-900/30 group-hover:to-gray-900/50 transition-all duration-500"></div>
                  <div className="relative z-10 p-5 lg:p-6 h-full flex flex-col justify-between">
                    <div className="pt-2"><h3 className="text-white font-medium text-sm lg:text-base leading-snug line-clamp-2">{industry.title}</h3></div>
                    <div className="flex items-end justify-between">
                      <div className="text-gray-500 text-xs font-mono">{industry.num}</div>
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/category/industries" className={blueBtnClass}>Все отрасли →</Link>
            </div>
          </div>
        </section>

        {/* Анимированный переход */}
        <section className="relative h-64 lg:h-96 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2"><div className="w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-blue-600/10 animate-pulse"></div></div>
            <div className="absolute right-1/4 top-1/3"><div className="w-48 h-48 lg:w-72 lg:h-72 rounded-full bg-blue-500/10 animate-pulse" style={{ animationDelay: '0.5s' }}></div></div>
            <div className="absolute left-1/2 top-2/3 transform -translate-x-1/2"><div className="w-56 h-56 lg:w-80 lg:h-80 rounded-full bg-gray-400/10 animate-pulse" style={{ animationDelay: '1s' }}></div></div>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '50px 50px' }}></div>
          </div>
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%`, animationDelay: `${i * 0.3}s`, animationDuration: '3s' }}></div>
            ))}
          </div>
          <svg className="absolute bottom-0 left-0 right-0 w-full h-20 text-white" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path d="M0,60 C200,90 400,30 600,60 C800,90 1000,30 1200,60 L1200,120 L0,120 Z" className="fill-white"></path>
          </svg>
        </section>

        {/* Сделано в Технопарке */}
        <section id="products" className="py-20 lg:py-28 bg-white">
          <div className="container">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-5xl lg:text-6xl font-light"><span className="text-gray-900">Сделано</span> <span className="text-gray-400">в Технопарке</span></h2>
              <Link href="/category/equipment" className="border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 font-medium rounded-sm px-6 py-3 text-sm transition-all duration-200 hidden md:inline-flex items-center gap-2">Все решения
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Аддитивная установка', desc: 'Печать в космосе' },
                { name: 'Система технического зрения', desc: '3D234HG' },
                { name: 'Модульный образовательный робот', desc: 'BFF4CE10D53' },
                { name: 'Роботизированная ячейка', desc: 'Для контроля' },
              ].map((product) => (
                <Link key={product.name} href="/category/equipment" className="bg-gray-50 border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all cursor-pointer group">
                  <div className="h-64 bg-gray-200 overflow-hidden"><img src="/images/bg.jpg" alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{product.desc}</p>
                    <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-sm">Россия</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Ключевые направления */}
        <section id="services" className="py-20 lg:py-28 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-gray-900">Ключевые направления</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { num: '01', title: 'Техническое перевооружение', desc: 'Модернизация производственных линий', href: '/category/services' },
                { num: '02', title: 'Сервисное обслуживание', desc: 'Ремонт и техническая поддержка', href: '/category/service' },
                { num: '03', title: 'Инжиниринг', desc: 'Проектирование и интеграция', href: '/category/services' },
                { num: '04', title: 'Аудит и консалтинг', desc: 'Анализ и оптимизация процессов', href: '/category/services' },
              ].map((item) => (
                <Link key={item.num} href={item.href} className="group border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer bg-white">
                  <div className="h-48 overflow-hidden relative">
                    <img src="/images/bg.jpg" alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-150" />
                    <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/30 transition-colors"></div>
                    <div className="absolute bottom-4 left-4 text-4xl font-bold text-white">{item.num}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contacts" className="py-20 lg:py-28 bg-gray-900">
          <div className="container">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-6 text-white">Остались вопросы?</h2>
              <p className="text-xl mb-8 text-gray-400">Свяжитесь с нами, и наши специалисты помогут подобрать оптимальное решение</p>
              <button onClick={() => setIsModalOpen(true)} className={blueBtnClass}>Связаться с нами</button>
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
                  <li><Link href="/category/equipment" className="text-gray-400 hover:text-blue-400 transition-colors">Оборудование</Link></li>
                  <li><Link href="/category/industries" className="text-gray-400 hover:text-blue-400 transition-colors">Отраслевые решения</Link></li>
                  <li><Link href="/category/services" className="text-gray-400 hover:text-blue-400 transition-colors">Услуги</Link></li>
                  <li><Link href="/category/service" className="text-gray-400 hover:text-blue-400 transition-colors">Сервис</Link></li>
                </ul>
              </div>
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

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-gray-900 rounded-sm p-8 max-w-lg w-full border border-gray-800 shadow-2xl overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">Оставить заявку</h2>
            <p className="text-gray-400 mb-6">Заполните форму, и мы свяжемся с вами в течение 2 часов</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Имя *</label>
                  <input type="text" required placeholder="Иван Иванов" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Компания *</label>
                  <input type="text" required placeholder="ООО Пример" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Должность</label>
                  <input type="text" placeholder="Главный инженер" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">ИНН</label>
                  <input type="text" placeholder="1234567890" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Телефон *</label>
                  <input type="tel" required placeholder="+7 (999) 123-45-67" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email *</label>
                  <input type="email" required placeholder="email@company.ru" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Сообщение / Задача</label>
                <textarea rows={3} placeholder="Опишите вашу задачу или вопрос..." className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors resize-none" />
              </div>
              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-sm px-6 py-3 transition-all duration-200 hover:shadow-lg">Отправить заявку</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
