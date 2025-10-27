import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import MarketplaceGrid from './components/MarketplaceGrid';
import BottomNav from './components/BottomNav';

const copy = {
  en: {
    title: 'Millet Marketplace',
    subtitle: 'Rural-friendly platform for farmers, FPOs, and consumers',
    marketplace: 'Marketplace',
    searchPlaceholder: 'Search millets, products, or categories…',
    voiceSearch: 'Voice search',
    voice: 'Voice',
    voiceNotSupported: 'Voice search is not supported on this device.',
    voiceError: 'Could not start voice recognition.',
    rating: 'rating',
    add: 'Add',
    addToCart: 'Add to cart',
    addedToCart: 'Added to cart',
    noResults: 'No products found',
    home: 'Home',
    cart: 'Cart',
    nearby: 'Nearby',
    account: 'Account',
    language: 'Language',
    heroTitle: 'Connect. Trade. Thrive.',
    heroDesc:
      'Buy and sell millets and pulses with low bandwidth mode, multilingual support, and offline-first experience.',
    offline: 'You are offline. Browsing cached content.',
  },
  hi: {
    title: 'बाजरा मार्केटप्लेस',
    subtitle: 'किसानों, एफपीओ और उपभोक्ताओं के लिए सरल मंच',
    marketplace: 'बाज़ार',
    searchPlaceholder: 'मिलेट, उत्पाद या श्रेणियाँ खोजें…',
    voiceSearch: 'वॉइस सर्च',
    voice: 'आवाज़',
    voiceNotSupported: 'इस डिवाइस पर वॉइस सर्च उपलब्ध नहीं है।',
    voiceError: 'वॉइस पहचान शुरू नहीं हो सकी।',
    rating: 'रेटिंग',
    add: 'जोड़ें',
    addToCart: 'कार्ट में जोड़ें',
    addedToCart: 'कार्ट में जोड़ा गया',
    noResults: 'कोई उत्पाद नहीं मिला',
    home: 'होम',
    cart: 'कार्ट',
    nearby: 'नज़दीक',
    account: 'खाता',
    language: 'भाषा',
    heroTitle: 'जुड़ें. व्यापार करें. आगे बढ़ें.',
    heroDesc:
      'कम नेटवर्क में भी मिलेट्स और दालों की खरीद-बिक्री। बहुभाषीय और ऑफ़लाइन-फ़र्स्ट अनुभव।',
    offline: 'आप ऑफ़लाइन हैं। कैश्ड सामग्री दिख रही है।',
  },
  te: {
    title: 'సజ్జల మార్కెట్‌ప్లేస్',
    subtitle: 'రైతులు, ఎఫ్‌పీఓలు, వినియోగదారుల కోసం సులభ వేదిక',
    marketplace: 'మార్కెట్',
    searchPlaceholder: 'సజ్జలు, ఉత్పత్తులు లేదా వర్గాలు వెతకండి…',
    voiceSearch: 'వాయిస్ సెర్చ్',
    voice: 'వాయిస్',
    voiceNotSupported: 'ఈ పరికరంలో వాయిస్ సెర్చ్ అందుబాటులో లేదు.',
    voiceError: 'వాయిస్ గుర్తింపును ప్రారంభించలేకపోయాం.',
    rating: 'రేటింగ్',
    add: 'చേర్చు',
    addToCart: 'కార్ట్‌లో చేర్చు',
    addedToCart: 'కార్ట్‌లో చేర్చబడింది',
    noResults: 'ఉత్పత్తులు కనబడలేదు',
    home: 'హోమ్',
    cart: 'కార్ట్',
    nearby: 'దగ్గరలో',
    account: 'ఖాతా',
    language: 'భాష',
    heroTitle: 'కలుసుకోండి. ట్రేడ్ చేయండి. అభివృద్ధి చెందండి.',
    heroDesc:
      'తక్కువ నెట్‌వర్క్‌లో కూడా మిల్లెట్స్, పప్పుదినుసుల వ్యాపారం. బహుభాషా, ఆఫ్‌లైన్-ఫస్ట్ అనుభవం.',
    offline: 'మీరు ఆఫ్‌లైన్‌లో ఉన్నారు. క్యాష్ చేసిన కంటెంట్ చూపిస్తోంది.',
  },
  kn: {
    title: 'ಸಜ್ಜೆ ಮಾರುಕಟ್ಟೆ',
    subtitle: 'ರೈತರು, ಎಫ್‌ಪಿಒ ಹಾಗೂ ಗ್ರಾಹಕರಿಗಾಗಿ ಸುಲಭ ವೇದಿಕೆ',
    marketplace: 'ಮಾರ್ಕೆಟ್',
    searchPlaceholder: 'ಸಜ್ಜೆ, ಉತ್ಪನ್ನಗಳು ಅಥವಾ ವರ್ಗಗಳನ್ನು ಹುಡುಕಿ…',
    voiceSearch: 'ವಾಯ್ಸ್ ಸರ್ಚ್',
    voice: 'ವಾಯ್ಸ್',
    voiceNotSupported: 'ಈ ಸಾಧನದಲ್ಲಿ ವಾಯ್ಸ್ ಸರ್ಚ್ ಲಭ್ಯವಿಲ್ಲ.',
    voiceError: 'ವಾಯ್ಸ್ ಗುರುತಿಸುವಿಕೆಯನ್ನು ಪ್ರಾರಂಭಿಸಲಾಗಲಿಲ್ಲ.',
    rating: 'ರೇಟಿಂಗ್',
    add: 'ಸೇರಿಸಿ',
    addToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
    addedToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಲಾಯಿತು',
    noResults: 'ಉತ್ಪನ್ನಗಳು ಸಿಗಲಿಲ್ಲ',
    home: 'ಮುಖಪುಟ',
    cart: 'ಕಾರ್ಟ್',
    nearby: 'ಹತ್ತಿರ',
    account: 'ಖಾತೆ',
    language: 'ಭಾಷೆ',
    heroTitle: 'ಸಂಪರ್ಕಿಸಿ. ವ್ಯಾಪಾರ ಮಾಡಿ. ಬೆಳೆದುಬನ್ನಿ.',
    heroDesc:
      'ಕಡಿಮೆ ಜಾಲದಲ್ಲಿಯೂ ಮಿಲ್ಲೆಟ್ಸ್, ಪಲ್ಸಸ್ ವ್ಯಾಪಾರ. ಬಹುಭಾಷಾ, ಆಫ್‌ಲೈನ್-ಪ್ರಥಮ ಅನುಭವ.',
    offline: 'ನೀವು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಇದ್ದೀರಿ. ಕ್ಯಾಶ್ ಮಾಡಿದ ವಿಷಯವನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.',
  },
  ta: {
    title: 'கம்பு மார்க்கெட்',
    subtitle: 'விவசாயிகள், FPOக்கள், நுகர்வோருக்கான எளிய தளம்',
    marketplace: 'சந்தை',
    searchPlaceholder: 'கம்பு, பொருட்கள் அல்லது வகைகளைத் தேடுங்கள்…',
    voiceSearch: 'குரல் தேடல்',
    voice: 'வாய்ஸ்',
    voiceNotSupported: 'இந்த சாதனத்தில் குரல் தேடல் இல்லை.',
    voiceError: 'குரல் அடையாளம் தொடங்க முடியவில்லை.',
    rating: 'மதிப்பீடு',
    add: 'சேர்க்க',
    addToCart: 'வண்டியில் சேர்',
    addedToCart: 'வண்டியில் சேர்க்கப்பட்டது',
    noResults: 'பொருட்கள் இல்லை',
    home: 'முகப்பு',
    cart: 'வண்டி',
    nearby: 'அருகில்',
    account: 'கணக்கு',
    language: 'மொழி',
    heroTitle: 'இணைக. வணிகம் செய். வளர்க.',
    heroDesc:
      'குறைந்த வலையமைப்பிலும் மில்லெட், பருப்பு விற்பனை. பல்மொழி, ஆஃப்லைன்-முதன்மை அனுபவம்.',
    offline: 'நீங்கள் ஆஃப்லைனில் உள்ளீர்கள். கேஷ் உள்ளடக்கம் காட்டப்படுகிறது.',
  },
  mr: {
    title: 'बाजरी बाजार',
    subtitle: 'शेतकरी, FPO आणि ग्राहकांसाठी सोपी सुविधा',
    marketplace: 'बाजार',
    searchPlaceholder: 'बाजरी, उत्पादने किंवा श्रेणी शोधा…',
    voiceSearch: 'व्हॉईस शोध',
    voice: 'व्हॉईस',
    voiceNotSupported: 'या डिव्हाइसवर व्हॉईस शोध नाही.',
    voiceError: 'व्हॉईस ओळख सुरू होऊ शकली नाही.',
    rating: 'रेटिंग',
    add: 'जोडा',
    addToCart: 'कार्टमध्ये जोडा',
    addedToCart: 'कार्टमध्ये जोडले',
    noResults: 'उत्पादने सापडली नाहीत',
    home: 'मुख्य',
    cart: 'कार्ट',
    nearby: 'जवळपास',
    account: 'खाते',
    language: 'भाषा',
    heroTitle: 'जुळा. व्यापार करा. वाढा.',
    heroDesc:
      'कमी नेटवर्कमध्येही मिलेट्स, डाळींचा व्यापार. बहुभाषिक, ऑफलाइन-फर्स्ट अनुभव.',
    offline: 'आपण ऑफलाइन आहात. कॅश केलेली सामग्री दर्शवली जाते.',
  },
  bn: {
    title: 'বাজরা মার্কেটপ্লেস',
    subtitle: 'কৃষক, এফপিও ও ভোক্তাদের জন্য সহজ প্ল্যাটফর্ম',
    marketplace: 'বাজার',
    searchPlaceholder: 'বাজরা, পণ্য বা বিভাগ খুঁজুন…',
    voiceSearch: 'ভয়েস সার্চ',
    voice: 'ভয়েস',
    voiceNotSupported: 'এই ডিভাইসে ভয়েস সার্চ নেই।',
    voiceError: 'ভয়েস রিকগনিশন শুরু করা যায়নি।',
    rating: 'রেটিং',
    add: 'যোগ করুন',
    addToCart: 'কার্টে যোগ করুন',
    addedToCart: 'কার্টে যোগ হয়েছে',
    noResults: 'কোনও পণ্য পাওয়া যায়নি',
    home: 'হোম',
    cart: 'কার্ট',
    nearby: 'কাছাকাছি',
    account: 'অ্যাকাউন্ট',
    language: 'ভাষা',
    heroTitle: 'সংযুক্ত হোন। বাণিজ্য করুন। উন্নতি করুন।',
    heroDesc:
      'কম নেটওয়ার্কেও মিলেট ও ডাল ব্যবসা। বহুভাষী, অফলাইন-ফার্স্ট অভিজ্ঞতা।',
    offline: 'আপনি অফলাইনে আছেন। ক্যাশড কনটেন্ট দেখানো হচ্ছে।',
  },
};

function useDarkMode() {
  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', enabled);
    localStorage.setItem('theme', enabled ? 'dark' : 'light');
  }, [enabled]);
  return [enabled, setEnabled];
}

export default function App() {
  const [lang, setLang] = useState('en');
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const update = () => setIsOnline(navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  const t = useMemo(() => {
    const strings = copy[lang] || copy.en;
    return (key) => strings[key] || key;
  }, [lang]);

  const products = useMemo(
    () => [
      {
        id: 'p1',
        name: 'Pearl Millet (Bajra) - Cleaned',
        price: 42,
        unit: 'kg',
        rating: 4.6,
        category: 'Raw Millets',
        image:
          'https://images.unsplash.com/photo-1604908554035-8777b4c5f66a?q=80&w=800&auto=format&fit=crop',
        nutrition: 'Rich in fiber, iron, and protein. Ideal for rotis and porridge.',
      },
      {
        id: 'p2',
        name: 'Finger Millet Flour (Ragi)',
        price: 68,
        unit: 'kg',
        rating: 4.7,
        category: 'Processed',
        image:
          'https://images.unsplash.com/photo-1516573401726-efcb7e1fbb7e?q=80&w=800&auto=format&fit=crop',
        nutrition: 'Calcium-rich flour for dosa, idli, and porridge.',
      },
      {
        id: 'p3',
        name: 'Foxtail Millet - Value Pack',
        price: 120,
        unit: '2kg',
        rating: 4.5,
        category: 'Value-added',
        image:
          'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop',
        nutrition: 'Low glycemic index. Great for weight management.',
      },
      {
        id: 'p4',
        name: 'Barnyard Millet - Dehulled',
        price: 95,
        unit: 'kg',
        rating: 4.4,
        category: 'Raw Millets',
        image:
          'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=800&auto=format&fit=crop',
        nutrition: 'High in fiber; suitable for upma and salads.',
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        lowBandwidth={lowBandwidth}
        setLowBandwidth={setLowBandwidth}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      {!isOnline && (
        <div role="status" className="mx-auto max-w-6xl px-4 pt-3">
          <div className="rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-4 py-2 text-amber-800 dark:text-amber-300">
            {t('offline')}
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 pb-24">
        <section className="mt-4 sm:mt-6 rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="p-5 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{t('heroTitle')}</h2>
            <p className="mt-2 text-white/90 max-w-2xl">{t('heroDesc')}</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <LanguageSelector value={lang} onChange={setLang} />
            </div>
          </div>
        </section>

        <MarketplaceGrid products={products} lowBandwidth={lowBandwidth} t={t} />
      </main>

      <BottomNav t={t} />
    </div>
  );
}
