export const site = {
  name: "Demo Oto Galeri",
  district: "Pendik",
  city: "İstanbul",
  slogan: "Pendik'te güvenilir ikinci el, şeffaf fiyat.",
  description:
    "Pendik / İstanbul'da ekspertiz raporlu, takas ve kredi imkanlı ikinci el araçlar. Demo Oto Galeri.",
  /** Shown to visitors. */
  phoneDisplay: "0216 555 00 00",
  /** Used in tel: links, E.164 format. */
  phoneE164: "+902165550000",
  /** Used in wa.me links: country code + number, digits only. */
  whatsappNumber: "905551234567",
  address: {
    street: "Kurtköy Mah. Ankara Cad. No: 123",
    district: "Pendik",
    city: "İstanbul",
  },
  hours: [
    { days: "Pazartesi - Cumartesi", time: "09:00 - 19:00" },
    { days: "Pazar", time: "Kapalı" },
  ],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.district} / ${site.address.city}`;
