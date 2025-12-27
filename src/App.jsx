import { useState, useEffect } from 'react';

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [quotesData, setQuotesData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fccBox = document.getElementById('fcc_test_suite_wrapper');
    if (fccBox) fccBox.style.display = 'none';

    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(res => res.json())
      .then(data => {
        setQuotesData(data.quotes);
        const random = data.quotes[Math.floor(Math.random() * data.quotes.length)];
        setQuote(random.quote);
        setAuthor(random.author);
      });
  }, []);

  const handleNewQuote = () => {
    setIsVisible(false);
    setTimeout(() => {
      const random = quotesData[Math.floor(Math.random() * quotesData.length)];
      setQuote(random.quote);
      setAuthor(random.author);
      setIsVisible(true);
    }, 400);
  };

  return (
    <div id="wrapper" className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden antialiased">
      
      {/* --- SMOOTH MODERN BACKGROUND (AURORA EFFECT) --- */}
      
      {/* Slow Drifting Orb 1 (Cyan/Blue) */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-sky-200/30 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite]"></div>
      
      {/* Slow Drifting Orb 2 (Indigo/Purple) */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-100/40 rounded-full blur-[120px] animate-[pulse_15s_ease-in-out_infinite]"></div>
      
      {/* Static Center Softness */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent pointer-events-none"></div>
      
      {/* ------------------------------------------------ */}

      <div id="quote-box" className="relative z-10 w-full max-w-xl bg-white/70 backdrop-blur-3xl border border-white/40 rounded-[2.5rem] p-10 md:p-16 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.06)]">
        
        {/* Quote Content with refined spacing */}
        <div className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 id="text" className="text-2xl md:text-4xl font-semibold text-slate-800 leading-[1.2] tracking-tight mb-8">
            “{quote}”
          </h2>
          
          <p id="author" className="text-slate-400 font-medium text-xs tracking-[0.2em] uppercase">
            — {author}
          </p>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between mt-12 pt-10 border-t border-slate-200/30">
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + quote + '" ' + author)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all duration-500"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </a>

          <button
            id="new-quote"
            onClick={handleNewQuote}
            className="bg-slate-900 text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:shadow-xl active:scale-95 transition-all duration-500 cursor-pointer"
          >
            Next Selection
          </button>
        </div>
      </div>

      {/* Subtle Bottom Branding */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30">
        <span className="w-1 h-1 rounded-full bg-slate-900"></span>
        <span className="text-slate-900 text-[9px] font-bold tracking-[0.3em] uppercase">
          Studio Edition
        </span>
      </div>
    </div>
  );
}

export default App;