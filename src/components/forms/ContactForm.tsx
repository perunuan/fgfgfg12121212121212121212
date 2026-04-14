'use client';

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Имя и Компания */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Имя *</label>
          <input
            type="text"
            placeholder="Иван Иванов"
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Компания *</label>
          <input
            type="text"
            placeholder="ООО Пример"
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors"
          />
        </div>
      </div>

      {/* Должность и ИНН */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Должность</label>
          <input
            type="text"
            placeholder="Главный инженер"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">ИНН</label>
          <input
            type="text"
            placeholder="1234567890"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors"
          />
        </div>
      </div>

      {/* Телефон и Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Телефон *</label>
          <input
            type="tel"
            placeholder="+7 (999) 123-45-67"
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Email *</label>
          <input
            type="email"
            placeholder="email@company.ru"
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors"
          />
        </div>
      </div>

      {/* Сообщение / Задача */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Сообщение / Задача</label>
        <textarea
          rows={4}
          placeholder="Опишите вашу задачу или вопрос..."
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-sm px-6 py-3 transition-all duration-200 hover:shadow-lg"
      >
        Отправить заявку
      </button>
    </form>
  );
}
