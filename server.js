import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname modern javascript'te olmadığı için onu böyle tanımlıyoruz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// --- OKUMA / YAZMA FONKSİYONLARI ---
const readData = () => {
    try {
        const fileContent = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(fileContent);
    } catch (err) {
        return { users: [], products: [] };
    }
};

const writeData = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- ROTALAR (API ENDPOINTS) ---

// 1. Ürünleri Listele
app.get('/products', (req, res) => {
    const data = readData();
    res.json(data.products);
});

// 2. Kayıt Ol
app.post('/register', (req, res) => {
    console.log("Kayıt isteği geldi:", req.body); // Terminalde görmek için
    
    const { name, email, password } = req.body;
    const data = readData();

    if (data.users.find(u => u.email === email)) {
        return res.json({ success: false, message: "Bu e-posta zaten kayıtlı." });
    }

    const newUser = {
        id: Date.now(),
        name: name || email.split('@')[0],
        email,
        password,
        history: []
    };

    data.users.push(newUser);
    writeData(data);
    
    console.log(`Yeni Kayıt Yapıldı: ${email}`);
    res.json({ success: true, message: "Kayıt başarılı!", user: newUser });
});

// 3. Giriş Yap
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const data = readData();

    const user = data.users.find(u => u.email === email && u.password === password);

    if (user) {
        console.log(`Kullanıcı Giriş Yaptı: ${email}`);
        res.json({ success: true, user: user });
    } else {
        res.json({ success: false, message: "Hatalı e-posta veya şifre!" });
    }
});

/// 4. Bağış Yap (Dedektif Modu) 🕵️‍♂️
app.post('/donate', (req, res) => {
    console.log("\n--- BAĞIŞ İŞLEMİ BAŞLADI ---");
    console.log("1. Frontend'den gelen istek:", req.body);

    const { userId, productId, amount } = req.body;
    
    // Veriyi oku
    let data;
    try {
        const fileContent = fs.readFileSync(DB_FILE, 'utf8');
        data = JSON.parse(fileContent);
        console.log("2. Veritabanı okundu. Ürün sayısı:", data.products.length);
    } catch (err) {
        console.log("HATAAAA! Dosya okunamadı:", err);
        return res.json({ success: false, message: "Sunucu hatası: Dosya okunamadı" });
    }

    // Ürünü ve Kullanıcıyı bul
    // DİKKAT: Hem Number hem String olarak kontrol ediyoruz (Garanti olsun diye)
    const product = data.products.find(p => p.id == productId); 
    const user = data.users.find(u => u.id == userId);

    console.log("3. Aranan Ürün ID:", productId);
    console.log("4. Bulunan Ürün Stok (Eski):", product ? product.stock : "BULUNAMADI!");

    if (!product) {
        console.log("❌ HATA: Ürün bulunamadı!");
        return res.json({ success: false, message: "Ürün bulunamadı." });
    }
    
    if (product.stock < amount) {
        console.log("❌ HATA: Stok yetersiz!");
        return res.json({ success: false, message: "Stok yetersiz!" });
    }

    // Stok düş
    product.stock -= amount;
    console.log("5. Stok düşüldü. Yeni Stok (Hafızada):", product.stock);

    // Geçmişe ekle
    if (user) {
        user.history.push({
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            productName: product.title,
            amount: amount
        });
        console.log("6. Kullanıcı geçmişine işlendi.");
    } else {
        console.log("⚠️ UYARI: Kullanıcı bulunamadı, geçmişe eklenmedi.");
    }

    // KAYDET
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
        console.log("7. ✅ DOSYAYA YAZMA BAŞARILI! (data.json güncellendi)");
    } catch (err) {
        console.log("❌ YAZMA HATASI:", err);
        return res.json({ success: false, message: "Kayıt hatası!" });
    }

    res.json({ success: true, newStock: product.stock, message: "Bağış alındı!" });
});

app.listen(PORT, () => {
    console.log(`MODERN SERVER HAZIR: http://localhost:${PORT}`);
});