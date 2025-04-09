# Simple forum 

rojekt to proste forum umożliwiające dodawanie postów i komentowanie ich przez użytkowników identyfikowanych za pomocą tokenów JWT. Backend został napisany w Javie (Spring) i działa w architekturze REST zgodnie z wzorcem MVC. Frontend oparty jest na TypeScript (React), a dane przechowywane są w relacyjnej bazie danych SQL. Całość działa w środowisku Docker, gdzie każdy komponent uruchamiany jest w osobnym kontenerze.


# **Funkcjonalności:**
- Wyświetlanie postów tworzonych przez użytkowników
- Możliwość interakcji z postami za pomocą polubień i komentarzy
- Tworzenie konta użytkownika
- Edytowanie oraz usuwanie postów i komentarzy
- 

# Części projektu

## Klient
- **Język programowania**: TypeScript
- **Framework**: React
- **Cechy**:
  - Wyświetlanie postów
  - Wysyłanie na serwer postów i komentarzy tworzonych przez użytkowników, oraz polubień dodanych do posta
  - Logowanie i rejestracja użytkowników
  - Zarządzanie obecnymi postami i komentarzami poprzez możliwość edytowania ich oraz usuwania
  - Umożliwienie moderacji forum, poprzez usuwanie postów przez administratorów

## Serwer
- **Język programowania**: JavaScript
- **Framework**: Express.js
- **Baza danych**: SQL
- **Features**:
  - Autoryzacja i auntetykacja za pomocą JWT
  - Wysyłanie do klienta postów oraz komentarzy
  - Odbieranie od klienta nowych danych w postaci komentarzy, postów oraz użytkowników
  - Aktualizowanie obecnych danych zmienionych przez akcje użytkownika.

## Database
- **Język**: SQL
- **Cechy**:
  - Przechowywanie danych o postach, komentarzach i użytkownikach

## Zrzuty ekranu
- Strona główna
[![homewylogowany.png](https://i.postimg.cc/cLXC1bWG/homewylogowany.png)](https://postimg.cc/bZSp3Ldm)
- Strona główna po zalogowaniu
[![home.png](https://i.postimg.cc/tgJTsNRZ/home.png)](https://postimg.cc/SX0q58Mk)
- Dodawanie nowego postu
[![Dodawanie-postu.png](https://i.postimg.cc/rF2Kf4j3/Dodawanie-postu.png)](https://postimg.cc/w3Fqv7SQ)
- Edytowanie obecnego postu
[![edytowanie.png](https://i.postimg.cc/jSsCbrGh/edytowanie.png)](https://postimg.cc/hf5KLN4J)
- Szczegóły postu
[![Szczegoly.png](https://i.postimg.cc/DzNzL4mC/Szczegoly.png)](https://postimg.cc/XZw30JfF)
- Logowanie
[![logowanie.png](https://i.postimg.cc/WbmtC4f3/logowanie.png)](https://postimg.cc/PPxt8dHs)
