# FuwaFitness – React Fitness App

Eine React-Fitness-App, entstanden als Projekt für das Modul **Web-Programmierung** in der Fakultät Wirtschaftsinformatik.

Mit FuwaFitness lassen sich Ernährung und Training tracken: Lebensmittel und Übungen anlegen, mehrere Profile verwalten und alles tagesgenau in einem persönlichen Kalender festhalten. Ein Rechner zeigt, wie viel Energie, Protein, Kohlenhydrate und Fett an einem Tag aufgenommen bzw. verbrannt wurden - im Vergleich zum individuellen Tagesbedarf.

## Funktionen

- **Registrierung & Login** - sitzungsbasierte Authentifizierung über das Backend (Cookies)
- **Profile** - mehrere Profile pro Account (Name, Alter, Größe, Gewicht, Geschlecht)
- **Food-Tracker** – eigene Lebensmittel und Getränke mit Nährwerten anlegen, bearbeiten und löschen
- **Übungen** - Übungen mit Dauer und verbrannter Energie anlegen, bearbeiten und löschen
- **Kalender** - pro Profil und Tag Mahlzeiten und Übungen erfassen
- **Tagesrechner** - Fortschrittsbalken für Energie und Makronährstoffe im Verhältnis zum berechneten Tagesbedarf
- **Statische Seiten** - Über uns, Impressum, Datenschutz, 404-Seite

### Berechnung des Tagesbedarfs

Der Grundumsatz wird nach der **Mifflin-St-Jeor-Formel** berechnet ([src/utils/calculations.js](src/utils/calculations.js)):

```
Energie (kcal) = 10 × Gewicht + 6,25 × Größe − 5 × Alter + (5 bei männlich | −161 bei weiblich)
```

Daraus abgeleitet:

| Wert | Berechnung |
| --- | --- |
| Protein | Gewicht × ~0,79 g |
| Kohlenhydrate | 50 % der Energie ÷ 4 kcal/g |
| Fett | 30 % der Energie ÷ 9 kcal/g |

Die tatsächlich aufgenommenen Werte werden anhand der eingetragenen Menge relativ zur Basismenge des Lebensmittels bzw. der Basisdauer der Übung skaliert.

## Tech-Stack

- [React 19](https://react.dev/) mit [Vite 6](https://vite.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) & React Redux für das State-Management
- [React Router 7](https://reactrouter.com/) für das Routing
- [Axios](https://axios-http.com/) für die Kommunikation mit dem Backend
- [react-calendar](https://github.com/wojtekmaj/react-calendar) für die Kalenderansicht
- [Motion](https://motion.dev/) für Animationen
- [React Icons](https://react-icons.github.io/react-icons/)
- CSS Modules für das Styling

## Voraussetzungen

- [Node.js](https://nodejs.org/) (aktuelle LTS-Version) und npm
- Ein laufendes **Backend** unter `http://localhost:3030`

> Das Backend ist nicht Teil dieses Repositories. Die URL ist in [src/axiosURL.js](src/axiosURL.js) festgelegt und kann dort angepasst werden. Da die Authentifizierung über Cookies läuft (`withCredentials: true`), muss das Backend CORS mit Credentials für die Frontend-Origin erlauben.

## Installation & Start

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten (standardmäßig http://localhost:5173)
npm run dev
```

## Projektstruktur

```
src/
├── main.jsx            # Einstiegspunkt, Router- und Redux-Setup
├── App.jsx             # Layout (Navbar, Footer, Outlet), Auth-Check
├── axiosURL.js         # Axios-Instanz mit Backend-URL
├── assets/             # Bilder
├── components/         # Wiederverwendbare UI-Komponenten
│   ├── dayTracker/     # Tagesansicht inkl. Rechner, Fortschrittsbalken, Eintragstabellen
│   ├── form/           # Generisches Formular (über Schemas konfiguriert)
│   ├── table/          # Generische Tabelle (über Spalten konfiguriert)
│   └── ...             # Navbar, Footer, Intro, Separator, ScrollButton, ...
├── config/             # Formular-Schemas, Tabellenspalten und Initialwerte
├── pages/              # Seiten der Anwendung
├── reducer/
│   ├── store.js        # Redux Store
│   └── slices/         # auth, profile, food, exercise, day
└── utils/
    └── calculations.js # Bedarfs- und Verbrauchsberechnung
```

Formulare und Tabellen sind generisch aufgebaut: Welche Felder bzw. Spalten angezeigt werden, wird über die Konfigurationsdateien in [src/config/](src/config/) gesteuert.

Der Import-Alias `@` zeigt auf `src/` (siehe [vite.config.js](vite.config.js)).

## Routen

| Pfad | Seite |
| --- | --- |
| `/` | Startseite |
| `/login` | Login & Registrierung |
| `/profile` | Profilverwaltung |
| `/food-tracker` | Lebensmittel verwalten |
| `/exercises` | Übungen verwalten |
| `/kalender` | Kalender mit Tagestracker |
| `/ueber-uns` | Über uns |
| `/impressum` | Impressum |
| `/datenschutz` | Datenschutz |
| `*` | 404 – Seite nicht gefunden |

## Verwendete Backend-Endpunkte

| Methode | Endpunkt | Zweck |
| --- | --- | --- |
| `POST` | `/signup`, `/login`, `/logout` | Authentifizierung |
| `GET` / `POST` / `PUT` / `DELETE` | `/fitness/profiles`, `/fitness/profile/:id` | Profile |
| `GET` / `POST` / `PUT` / `DELETE` | `/fitness/food`, `/fitness/food/:id` | Lebensmittel |
| `GET` / `POST` / `PUT` / `DELETE` | `/fitness/exercises`, `/fitness/exercise/:id` | Übungen |
| `GET` | `/fitness/days/:profileId` | Alle Tage eines Profils |
| `GET` | `/fitness/day/:profileId/:date` | Einzelner Tag |
| `POST` / `PUT` / `DELETE` | `/fitness/day/`, `/fitness/day/:id` | Tage anlegen, aktualisieren, löschen |
