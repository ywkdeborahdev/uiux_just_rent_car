export type Car = {
    id: number; // Add a unique ID
    name: string;
    year: number;
    image: string;
    tags: string[];
    location: string[];
    seats: number;
    doors: number;
    transmission: string;
    price: {
        daily: number;
        weekly: number;
        monthly: number;
        longTerm: number;
    };
    deposit: number;
    isHot?: boolean;
    brand: string; // Add brand for easier filtering
    model: string; // Add model for easier filtering
};

export const cars: Car[] = [
    { id: 1, name: 'HONDA Jazz Auto White', brand: 'Honda', model: 'Jazz', year: 2011, image: '...', tags: ['pLicense', 'invoice', 'emergency', 'insurance'], location: ['airport', 'kwunTong', 'westKowloon'], seats: 4, doors: 5, transmission: 'Automatic', price: { daily: 500, weekly: 2300, monthly: 6100, longTerm: 200 }, deposit: 150000, isHot: true },
    { id: 2, name: 'SUZUKI Hustler', brand: 'Suzuki', model: 'Hustler', year: 2016, image: '...', tags: ['pLicense', 'invoice', 'emergency', 'insurance'], location: ['airport', 'kwunTong', 'westKowloon'], seats: 4, doors: 4, transmission: 'Automatic', price: { daily: 750, weekly: 3300, monthly: 8000, longTerm: 260 }, deposit: 200000 },
    { id: 3, name: 'TOYOTA Corolla', brand: 'Toyota', model: 'Corolla', year: 2018, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['airport', 'kwunTong'], seats: 5, doors: 4, transmission: 'Automatic', price: { daily: 650, weekly: 3000, monthly: 7500, longTerm: 230 }, deposit: 180000 },
    { id: 4, name: 'BMW X5', brand: 'BMW', model: 'X5', year: 2020, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['airport', 'westKowloon'], seats: 5, doors: 5, transmission: 'Automatic', price: { daily: 1200, weekly: 5500, monthly: 20000, longTerm: 600 }, deposit: 300000 },
    { id: 5, name: 'MERCEDES-BENZ C-Class', brand: 'Mercedes-Benz', model: 'C-Class', year: 2019, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['kwunTong'], seats: 5, doors: 4, transmission: 'Automatic', price: { daily: 1100, weekly: 5000, monthly: 18000, longTerm: 550 }, deposit: 280000 },
    { id: 6, name: 'VOLKSWAGEN Golf', brand: 'Volkswagen', model: 'Golf', year: 2017, image: '...', tags: ['pLicense', 'invoice', 'emergency', 'insurance'], location: ['westKowloon'], seats: 5, doors: 5, transmission: 'Automatic', price: { daily: 600, weekly: 2800, monthly: 7000, longTerm: 220 }, deposit: 160000 },
    { id: 7, name: 'AUDI A4', brand: 'Audi', model: 'A4', year: 2021, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['airport'], seats: 5, doors: 4, transmission: 'Automatic', price: { daily: 1300, weekly: 6000, monthly: 22000, longTerm: 650 }, deposit: 320000, isHot: true },
    { id: 8, name: 'NISSAN Serena', brand: 'Nissan', model: 'Serena', year: 2018, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['kwunTong', 'westKowloon'], seats: 7, doors: 5, transmission: 'Automatic', price: { daily: 900, weekly: 4200, monthly: 15000, longTerm: 450 }, deposit: 250000 },
    { id: 9, name: 'TESLA Model 3', brand: 'Tesla', model: 'Model 3', year: 2022, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['airport', 'westKowloon'], seats: 5, doors: 4, transmission: 'Automatic', price: { daily: 1500, weekly: 7000, monthly: 25000, longTerm: 800 }, deposit: 400000 },
    { id: 10, name: 'HYUNDAI Staria', brand: 'Hyundai', model: 'Staria', year: 2021, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['kwunTong'], seats: 8, doors: 5, transmission: 'Automatic', price: { daily: 1000, weekly: 4800, monthly: 17000, longTerm: 500 }, deposit: 260000 },
    { id: 11, name: 'KIA Sorento', brand: 'Kia', model: 'Sorento', year: 2020, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['airport'], seats: 7, doors: 5, transmission: 'Automatic', price: { daily: 950, weekly: 4500, monthly: 16000, longTerm: 480 }, deposit: 270000 },
    { id: 12, name: 'MAZDA CX-5', brand: 'Mazda', model: 'CX-5', year: 2019, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['westKowloon'], seats: 5, doors: 5, transmission: 'Automatic', price: { daily: 850, weekly: 4000, monthly: 14000, longTerm: 420 }, deposit: 240000 },
    { id: 13, name: 'PORSCHE Cayenne', brand: 'Porsche', model: 'Cayenne', year: 2021, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['airport'], seats: 5, doors: 5, transmission: 'Automatic', price: { daily: 2500, weekly: 12000, monthly: 45000, longTerm: 1500 }, deposit: 600000, isHot: true },
    { id: 14, name: 'LEXUS RX', brand: 'Lexus', model: 'RX', year: 2022, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['kwunTong', 'westKowloon'], seats: 5, doors: 5, transmission: 'Automatic', price: { daily: 1800, weekly: 8500, monthly: 30000, longTerm: 900 }, deposit: 500000 },
    { id: 15, name: 'FORD Mustang', brand: 'Ford', model: 'Mustang', year: 2019, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['westKowloon'], seats: 4, doors: 2, transmission: 'Automatic', price: { daily: 2000, weekly: 9500, monthly: 35000, longTerm: 1100 }, deposit: 550000 },
    { id: 16, name: 'HONDA Stepwgn', brand: 'Honda', model: 'Stepwgn', year: 2019, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['airport'], seats: 8, doors: 5, transmission: 'Automatic', price: { daily: 980, weekly: 4600, monthly: 16500, longTerm: 490 }, deposit: 275000 },
    { id: 17, name: 'TOYOTA Alphard', brand: 'Toyota', model: 'Alphard', year: 2021, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['kwunTong'], seats: 7, doors: 5, transmission: 'Automatic', price: { daily: 1600, weekly: 7500, monthly: 28000, longTerm: 850 }, deposit: 450000, isHot: true },
    { id: 18, name: 'SUZUKI Every', brand: 'Suzuki', model: 'Every', year: 2017, image: '...', tags: ['pLicense', 'invoice', 'emergency', 'insurance'], location: ['westKowloon'], seats: 4, doors: 5, transmission: 'Manual', price: { daily: 450, weekly: 2100, monthly: 5800, longTerm: 180 }, deposit: 140000 },
    { id: 19, name: 'BMW 5 Series', brand: 'BMW', model: '5 Series', year: 2021, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['airport'], seats: 5, doors: 4, transmission: 'Automatic', price: { daily: 1400, weekly: 6500, monthly: 24000, longTerm: 750 }, deposit: 380000 },
    { id: 20, name: 'TESLA Model Y', brand: 'Tesla', model: 'Model Y', year: 2023, image: '...', tags: ['invoice', 'emergency', 'insurance'], location: ['kwunTong', 'westKowloon'], seats: 5, doors: 5, transmission: 'Automatic', price: { daily: 1700, weekly: 8000, monthly: 29000, longTerm: 880 }, deposit: 480000 },
];
