# 🏠 GrundrissRatgeber.de - Prototyp

**Dein Traumhaus. Digital geplant. Real gebaut.**

Ein interaktiver 2D/3D Hausplaner mit Möbel-Katalog und Bauträger-Vermittlung.

## 🚀 Schnell-Deployment auf Vercel (2 Minuten!)

### Schritt 1: GitHub Repository erstellen

1. Gehe zu [GitHub](https://github.com) und logge dich ein
2. Klicke auf **"+"** → **"New repository"**
3. Repository-Name: `grundrissratgeber`
4. Setze auf **Public**
5. **NICHT** "Initialize with README" anwählen
6. Klicke **"Create repository"**

### Schritt 2: Code hochladen

Öffne dein Terminal und navigiere zum Projekt-Ordner:

```bash
cd /pfad/zum/grundrissratgeber-deploy

# Git initialisieren
git init
git add .
git commit -m "Initial commit - GrundrissRatgeber Prototyp"

# Mit GitHub verbinden (ersetze DEIN-USERNAME)
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/grundrissratgeber.git
git push -u origin main
```

### Schritt 3: Mit Vercel verbinden

1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke **"Sign Up"** oder **"Login"** (mit GitHub)
3. Klicke **"Add New..."** → **"Project"**
4. Wähle dein Repository **"grundrissratgeber"**
5. Framework Preset: **Next.js** (wird automatisch erkannt)
6. Klicke **"Deploy"** (KEINE Einstellungen ändern!)

### ✅ Fertig! 

Nach 1-2 Minuten bekommst du eine Live-URL wie:
```
https://grundrissratgeber.vercel.app
```

**Diese URL kannst du sofort FUNKE/WITO zeigen! 🎉**

---

## 🎨 Features

### 1. **2D Grundriss-Editor**
- Drag & Drop Räume
- Räume hinzufügen/löschen
- Raumgrößen anpassen
- Grid-basierte Platzierung

### 2. **3D Live-Vorschau**
- Echte 3D-Visualisierung (React Three Fiber)
- Interaktiv: Drehen, Zoomen, Erkunden
- Automatische Raumdarstellung

### 3. **Möbel-Katalog**
- Klickbare Möbel-Items
- Affiliate-Links (IKEA-Integration)
- Drag-to-Canvas Funktion
- Preisanzeige

### 4. **Bauträger-Lead-Formular**
- Vollständiges Kontaktformular
- Budget-Auswahl
- Partner-Logos (WITO Haus, Musterhaus.net)
- Lead-Generierung

---

## 🛠️ Lokal entwickeln (optional)

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Öffne http://localhost:3000
```

---

## 📊 Business Model

### Triple-Revenue-Streams:

1. **Affiliate (Möbel)**
   - IKEA, Otto, Wayfair
   - 5-15% Kommission

2. **Lead-Vermittlung (Bauträger)**
   - 3-5% Provision bei Hausvermittlung
   - Bei €400k Haus = €12-20k

3. **Premium-Features** (später)
   - Export als Architekten-PDF
   - Erweiterte 3D-Modelle
   - Virtueller Rundgang (VR)

---

## 🎯 Nächste Schritte

### Phase 1 (Woche 1-2):
- ✅ Prototyp fertig
- ⏳ FUNKE/WITO Pitch
- ⏳ AWIN Affiliate-Account

### Phase 2 (Woche 3-4):
- Backend (Supabase)
- User-Accounts
- Grundriss-Speicherung

### Phase 3 (Monat 2-3):
- Bauträger-Dashboard
- Email-Automation
- Analytics/Tracking

---

## 📞 Kontakt

**Projekt-Owner:** [Dein Name]
**Domain:** grundrissratgeber.de
**Status:** Prototyp v1.0

---

## 📄 Lizenz

© 2026 GrundrissRatgeber.de - Alle Rechte vorbehalten
