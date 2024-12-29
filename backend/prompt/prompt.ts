 import { prompt } from "./promptType";
 
    function generatePrompt(language: string, level: string, interestAreas: string[]): string {
        const prompt = `
        Bir dil öğrenme yolculuğuna çıkan bir kullanıcı var. Aşağıdaki bilgileri sağladı:
            - **Dil Seçimi**: ${language}
            - **Dil Seviyesi**: ${level}
            - **İlgi Alanları**: ${interestAreas.join(", ")}

Bir dil öğrenme yolculuğuna çıkan bir kullanıcı için özgün ve kişiselleştirilmiş bir hikaye ve quiz oluşturulması istenmektedir. Kullanıcı, dil seçimi, dil seviyesi ve ilgi alanları doğrultusunda hikayenin içeriğini ve zorluk seviyesini belirler. Bu süreç, dil öğrenme deneyimini zenginleştirir ve kullanıcıya etkili bir öğrenme fırsatı sunar.

Adımlar:
Dil Seçimi:
Kullanıcı, öğrenmek istediği dili seçer. Seçilebilecek diller arasında İngilizce, Fransızca, Almanca, İspanyolca, İtalyanca, Portekizce vb. diller yer alır.
Seçilen dilin dil bilgisi yapıları ve günlük kullanım özelliklerine göre hikaye hazırlanır.

Dil Seviyesi:
Kullanıcı, öğrenmeye başladığı dilin seviyesini seçer. Bu seviye, hikayede kullanılacak dil bilgisi seviyesini belirler:
- Başlangıç Seviyesi (A1-A2): Kullanıcı, dilin temel yapılarını ve günlük ifadeleri öğrenir. Hikayede basit cümleler, tanışmalar, temel kelimeler ve ifadeler yer alır. Bu hikayeler 15 ile 20 satır arasında olur.
- Orta Seviye (B1-B2): Kullanıcı, daha karmaşık dil yapılarına ve zamanlara (geçmiş zaman, şimdiki zaman, vs.) hakim olmaya başlar. Hikayede bağlaçlar, geçmiş zaman kullanımı ve daha uzun cümle yapıları bulunur. Bu hikayeler 15 ile 20 satır arasında olur.
- İleri Seviye (C1-C2): Kullanıcı, profesyonel dil kullanımı, deyimler, ileri düzey dil bilgisi ve kültürel referanslarla tanışır. Hikayede derinlemesine analiz gerektiren ifadeler ve kompleks cümle yapıları yer alır. Bu hikayeler 15 ile 20 satır arasında olur.

İlgi Alanları:
Kullanıcı, öğrenme sürecini daha ilgi çekici hale getirmek için belirli bir alan seçer. İlgi alanları şunlar olabilir:
- Teknoloji: Yazılım, yapay zeka, bilgisayar bilimleri, teknoloji haberleri.
- Futbol: Takım sporları, futbol maçları, futbol stratejileri.
- Seyahat: Yeni yerler, kültürel geziler, seyahat ipuçları.
- Sanat ve Kültür: Resim, heykel, film, müzik.
- Bilim: Fizik, kimya, biyoloji, bilimsel keşifler.
- Yazılım ve Programlama: Kodlama, yazılım geliştirme, teknoloji dünyası.
- Diğer: Kullanıcı herhangi bir ilgi alanı seçebilir ve buna göre içerik oluşturulabilir.

Hikaye Yapısı ve Konusu:
Hikaye, dil seviyesine ve ilgi alanına göre şekillendirilir. Her seviyeye uygun dil yapıları ve kelimelerle zenginleştirilmiş özgün bir hikaye oluşturulur.

Başlangıç Seviyesi Hikayesi (A1-A2):
Bu hikayeler A1 ve A2 düzeylerinde olacaktır. Hikayeler uzun, yaratıcı ve zengin olacak. Bu hikayeler 15 ile 20 satır arasında olur.

Orta Seviye Hikayesi (B1-B2):
Bu hikayeler B1 ve B2 düzeylerinde olacaktır. Hikayeler uzun, yaratıcı ve zengin olacak. Bu hikayeler 15 ile 20 satır arasında olur.

İleri Seviye Hikayesi (C1-C2):
Bu hikayeler C1 ve C2 düzeylerinde olacaktır. Hikayeler uzun, yaratıcı ve zengin olacak. Bu hikayeler 15 ile 20 satır arasında olur.

Quiz Yapısı:
Her hikaye, kullanıcıya hikayede öğrendikleri bilgileri test etme fırsatı sunacak bir quiz ile tamamlanır. Quizler, dil bilgisi unsurlarını ve kültürel bağlamları test etmek amacıyla hazırlanır.

Başlangıç Seviyesi Quiz (A1-A2):
Quiz, basit ifadeler, tanışma cümleleri ve temel dil bilgisi üzerine olacaktır. Daha çok kullanıcıyı geliştirmek için bu seviyeye uygun bir quiz oluşturulacak.

Orta Seviye Quiz (B1-B2):
Quiz, geçmiş zaman kullanımı, bağlaçlar ve daha karmaşık cümle yapıları üzerine olacaktır. Gelişmiş kullanıcıyı düşünmeye yönlendirecek bir quiz olacak.

İleri Seviye Quiz (C1-C2):
Quiz, deyimler, karmaşık dil yapıları ve kültürel referanslar üzerine olacaktır. Profesyonel kullanıcıyı geliştirme fırsatı sunacak bir quiz oluşturulacak.

Şimdi son olarak bu hikayelerden ve quizlerden her seferinde sadece bir kere oluşturulacak ve sorular 10 soru 5 şıklı olacak. Hiçbir zaman hikayeden önce açıklama yazılmayacak, sadece hikaye ve quizler olacak. Ayrıca hikayelere başlık eklenecek ve başlık dille aynı olacak. Hikayeler her zaman uzunluğu fazla olacak.

        `;
        return prompt;

      
        
    }

    export default generatePrompt;

