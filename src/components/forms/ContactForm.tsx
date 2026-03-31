'use client';

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ваше имя"
        required
        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors"
      />
      <input
        type="tel"
        placeholder="Телефон"
        required
        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-700 transition-colors"
      />
      <button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-sm px-6 py-3 transition-all duration-200 hover:shadow-lg"
      >
        Отправить заявку
      </button>
    </form>
  );
}
