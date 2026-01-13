import express from 'express';  //sunucuyu kurar

import cors from 'cors';  //farklı port olan 3000 ve 5173 lerin birbiriyşe konuşmasını sağlar

import fs from 'fs';  
                     //fs ve path data.jsondan veri okuyup yazmaya yarıyor
import path from 'path';

import { fileURLToPath } from 'url';   // urlimiz bilgisayar formatına çevirir pc okuyabilsin diye



// __dirname modern javascript'te olmadığı için onu böyle tanımlıyoruz

const __filename = fileURLToPath(import.meta.url);  //çalışan dosya adreini gösterir C:\Proje\server.js gibi

const __dirname = path.dirname(__filename); 



const app = express(); // Ne yapıyor: express kütüphanesini çalıştırıp, bize app adında canlı bir Sunucu Uygulaması (Server Application) veriyor.

const PORT = 3000;  //sunucunun hangi porttan çalışacağını belirledik

const DB_FILE = path.join(__dirname, 'data.json');  //data.jsonın hangi kalsörde oldunu söylüyor karışıklığa karşı



app.use(cors());  // 3000 ile 5117 gibi iki sunucu arası veri akışına izin verdik güvenli dedik

app.use(express.json());  //gelen verileri .json formatına çeviriyor mail-şifre vs yeni bilgileri



// --- OKUMA / YAZMA FONKSİYONLARI ---

const readData = () => {  //data.jsondan verilleri okuyan bir fonksiyon tanımladık

    try {

        const fileContent = fs.readFileSync(DB_FILE, 'utf8');  //db_file değişkenindeki dosyayı okuyor

        return JSON.parse(fileContent);  //string olan mail vs bilgileri bilgisyar formatına çeviriyoruz

    } catch (err) {

        return { users: [], products: [] };  //hata verirse try içinde kod boş bir kullanıcı çevirisn
                                             // kod dönüp durmasın diye

    }

};



const writeData = (data) => {

    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

};



// --- ROTALAR (API ENDPOINTS) ---

// 1. Ürünleri Listele

app.get('/products', (req, res) => {  

    const data = readData();    //bu kod bloğu productstaki ürünleri okuyup müşteriye gösteriyor    

    res.json(data.products);   

});



// 2. Kayıt Ol

app.post('/register', (req, res) => {

    console.log("Kayıt isteği geldi:", req.body); 



    const { name, email, password } = req.body;

    const data = readData();          //eski kullancılar silinmesin diye okuyor önce data.jsonu



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

    writeData(data);        //yeni kullanıcıyı data.jsona push yapıp yazdırıyor data.jsona



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




// 5. Kullanıcı Bilgisi ve Geçmişi Getir
app.get('/user/:id', (req, res) => {
    const userId = req.params.id; // URL'den gelen ID
    const data = readData();
    const user = data.users.find(u => u.id == userId);

    if (user) {
        res.json({ success: true, user });
    } else {
        res.json({ success: false, message: "Kullanıcı bulunamadı." });
    }
});

app.listen(PORT, () => {


    console.log(`MODERN SERVER HAZIR: http://localhost:${PORT}`);

});