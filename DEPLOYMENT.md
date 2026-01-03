# 📦 DEPLOYMENT-ANLEITUNG - Schritt für Schritt

## 🎯 ZIEL: Live-URL in 10 Minuten!

Diese Anleitung führt dich durch den kompletten Deployment-Prozess.

---

## ✅ VORAUSSETZUNGEN (einmalig)

1. **GitHub-Account** → [github.com/signup](https://github.com/signup)
2. **Vercel-Account** → [vercel.com/signup](https://vercel.com/signup) (mit GitHub verbinden!)
3. **Git installiert** auf deinem Computer

**Git-Installation prüfen:**
```bash
git --version
# Sollte zeigen: git version 2.x.x
```

Falls nicht installiert:
- **Mac:** `brew install git` oder [git-scm.com](https://git-scm.com)
- **Windows:** [git-scm.com/download/win](https://git-scm.com/download/win)

---

## 🚀 DEPLOYMENT - DIE 3 SCHRITTE

### SCHRITT 1: GitHub Repository erstellen (2 Minuten)

#### 1.1 Öffne GitHub
- Gehe zu [github.com](https://github.com)
- Logge dich ein

#### 1.2 Neues Repository
- Klicke oben rechts auf **"+"**
- Wähle **"New repository"**

#### 1.3 Repository-Einstellungen
- **Repository name:** `grundrissratgeber`
- **Description:** "GrundrissRatgeber.de - Hausplanung 2D/3D Prototyp"
- **Visibility:** Public ✅
- **WICHTIG:** NICHT anwählen:
  - ❌ "Add a README file"
  - ❌ "Add .gitignore"
  - ❌ "Choose a license"
- Klicke **"Create repository"**

#### 1.4 Repository-URL kopieren
Du siehst jetzt eine Seite mit Kommandos. **Lasse diese Seite offen!**

---

### SCHRITT 2: Code hochladen (3 Minuten)

#### 2.1 Terminal öffnen
- **Mac:** Programme → Dienstprogramme → Terminal
- **Windows:** Git Bash (nach Git-Installation)

#### 2.2 Zum Projekt navigieren
```bash
cd /pfad/zum/grundrissratgeber-deploy
```

**Beispiel Mac:**
```bash
cd ~/Downloads/grundrissratgeber-deploy
```

**Beispiel Windows:**
```bash
cd C:/Users/DeinName/Downloads/grundrissratgeber-deploy
```

#### 2.3 Git initialisieren und hochladen

**Kopiere diese Befehle NACHEINANDER (ersetze DEIN-GITHUB-USERNAME):**

```bash
# 1. Git initialisieren
git init

# 2. Alle Dateien hinzufügen
git add .

# 3. Ersten Commit erstellen
git commit -m "Initial commit - GrundrissRatgeber Prototyp"

# 4. Branch auf 'main' setzen
git branch -M main

# 5. Mit GitHub verbinden (ERSETZE DEINEN USERNAME!)
git remote add origin https://github.com/DEIN-GITHUB-USERNAME/grundrissratgeber.git

# 6. Code hochladen
git push -u origin main
```

**Wenn nach Login gefragt wird:**
- Username: Dein GitHub-Username
- Password: Dein GitHub-**Personal Access Token** (siehe unten)

##### Personal Access Token erstellen (falls nötig):
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → "Generate new token (classic)"
3. Name: "Vercel Deploy"
4. Expiration: 90 days
5. Scopes: ✅ repo
6. "Generate token"
7. **Token kopieren** (nur einmal sichtbar!)
8. Als Password verwenden

#### 2.4 Prüfen ob erfolgreich
Gehe zurück zu GitHub im Browser und lade die Seite neu.
Du solltest jetzt alle Dateien sehen! ✅

---

### SCHRITT 3: Auf Vercel deployen (2 Minuten)

#### 3.1 Vercel öffnen
- Gehe zu [vercel.com](https://vercel.com)
- Klicke **"Login"** → **"Continue with GitHub"**
- Autorisiere Vercel (falls gefragt)

#### 3.2 Neues Projekt erstellen
- Klicke **"Add New..."** (oben rechts)
- Wähle **"Project"**

#### 3.3 Repository importieren
- Du siehst eine Liste deiner GitHub-Repos
- Finde **"grundrissratgeber"**
- Klicke **"Import"**

#### 3.4 Projekt konfigurieren
**Framework Preset:** Next.js (wird automatisch erkannt) ✅

**WICHTIG - NICHTS ÄNDERN bei:**
- Build Command: `next build`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables:** LEER lassen (später)

#### 3.5 Deployen!
- Klicke **"Deploy"**
- Warte 1-2 Minuten ⏳

#### 3.6 Live-URL erhalten 🎉
Nach dem Build siehst du:
- ✅ **Congratulations!** 
- Eine URL wie: `https://grundrissratgeber.vercel.app`

**Klicke auf "Visit"** → Deine App ist LIVE! 🚀

---

## 🎯 LIVE-URL TEILEN

### Für FUNKE/WITO Pitch:

**Email-Template:**
```
Betreff: GrundrissRatgeber.de - Interaktiver Prototyp

Hallo [Name],

ich habe einen funktionierenden Prototyp für GrundrissRatgeber.de entwickelt:

🔗 Live-Demo: https://grundrissratgeber.vercel.app

Features:
✅ 2D Grundriss-Editor (Drag & Drop)
✅ 3D Live-Vorschau (interaktiv)
✅ Möbel-Katalog mit Affiliate-Links
✅ Bauträger-Lead-Formular

Business Model:
💰 Affiliate-Revenue (Möbel)
💰 Lead-Vermittlung (€12-20k pro Hausvermittlung)
💰 Integration mit Musterhaus.net möglich

Lass uns gerne telefonieren, um Details zu besprechen.

Viele Grüße
[Dein Name]
```

---

## 🔄 UPDATES DEPLOYEN

Wenn du später Änderungen machst:

```bash
cd /pfad/zum/grundrissratgeber-deploy

# Änderungen committen
git add .
git commit -m "Feature XYZ hinzugefügt"
git push

# Vercel deployt automatisch! 🎉
```

---

## 🆘 TROUBLESHOOTING

### Problem: `git: command not found`
**Lösung:** Git installieren (siehe Voraussetzungen oben)

### Problem: `Permission denied (publickey)`
**Lösung:** Personal Access Token verwenden (siehe Schritt 2.3)

### Problem: Build Error auf Vercel
**Lösung:** 
1. Vercel Dashboard → dein Projekt → Settings → General
2. "Node.js Version" → 18.x oder höher
3. Redeploy

### Problem: 3D-Ansicht zeigt nur schwarzen Screen
**Lösung:** 
- Browser-Cache leeren (Cmd+Shift+R / Ctrl+Shift+R)
- Warten 5-10 Sekunden (3D lädt langsam)

---

## 📞 HILFE BENÖTIGT?

Falls etwas nicht klappt:
1. Screenshot vom Fehler machen
2. Terminal-Output kopieren
3. Mir schicken

**Ich helfe dir dann sofort weiter!** 💪

---

## ✅ CHECKLISTE

- [ ] GitHub-Account erstellt
- [ ] Vercel-Account erstellt (mit GitHub verbunden)
- [ ] Git installiert
- [ ] Repository auf GitHub erstellt
- [ ] Code hochgeladen (git push)
- [ ] Auf Vercel deployt
- [ ] Live-URL funktioniert
- [ ] FUNKE/WITO Email geschrieben

**Wenn alle Häkchen gesetzt: FERTIG! 🎉**
