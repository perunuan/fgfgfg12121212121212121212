'use client';

import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Верхняя полоска */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="container py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <a href="tel:88005553535" className="font-medium hover:text-gray-300 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                8 (981) 170-32-15
              </a>
              <span className="hidden lg:inline text-gray-500">|</span>
              <button onClick={onContactClick} className="hidden lg:block hover:text-gray-300 transition-colors">
                Связаться с нами
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Основное меню */}
      <div className="container">
        <div className="flex items-center justify-between py-5">

          {/* === ИСПРАВЛЕННЫЙ ЛОГОТИП === */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Картинка логотипа */}
            <img
              src="/images/logo.png"
              alt="1"
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />

            {/* Текстовое название с градиентом */}
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide">
                ТЕХНОПАРК
              </span>
              <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-widest uppercase">
                ГУАП
              </span>
            </div>
          </Link>
          {/* ========================== */}

          {/* Десктопное меню */}
          <nav className="hidden xl:flex items-center gap-6">
            <Link href="/category/equipment" className="text-gray-700 hover:text-blue-700 transition-colors font-medium text-sm">Оборудование</Link>
            <Link href="/category/industries" className="text-gray-700 hover:text-blue-700 transition-colors font-medium text-sm">Отраслевые решения</Link>
            <Link href="/category/services" className="text-gray-700 hover:text-blue-700 transition-colors font-medium text-sm">Услуги</Link>
            <Link href="/category/service" className="text-gray-700 hover:text-blue-700 transition-colors font-medium text-sm">Сервис</Link>
          </nav>

          {/* Кнопка МЕНЮ + Поиск */}
          <div className="hidden xl:flex items-center gap-3">
            <button className="p-3 hover:bg-gray-100 rounded-sm transition-colors">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link href="/menu" className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-sm px-6 py-2 text-sm transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Меню
            </Link>
          </div>

          {/* Мобильное меню - бургер */}
          <button className="xl:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <nav className="xl:hidden py-6 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link href="/category/equipment" className="text-gray-700 hover:text-blue-700 transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Оборудование</Link>
              <Link href="/category/industries" className="text-gray-700 hover:text-blue-700 transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Отраслевые решения</Link>
              <Link href="/category/services" className="text-gray-700 hover:text-blue-700 transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Услуги</Link>
              <Link href="/category/service" className="text-gray-700 hover:text-blue-700 transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Сервис</Link>
              <div className="flex flex-col leading-tight">
                <Link href="/menu" className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-sm px-6 py-3 text-center transition-colors" onClick={() => setMobileMenuOpen(false)}>Меню</Link>
                <button onClick={() => { onContactClick?.(); setMobileMenuOpen(false); }} className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-sm px-6 py-3 text-center transition-colors">
                  Связаться с нами
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
