# MFA – prezentacja betternow (reveal.js 6.0.2)

## Uruchomienie
- Najprościej: otwórz `index.html` w przeglądarce (działa offline, bez instalacji).
- Widok prelegenta (klawisz **S**) najpewniej działa z lokalnego serwera:
  `npx serve .` albo `python3 -m http.server 8000`, potem http://localhost:8000

## Struktura
```
index.html                 slajdy (<section class="slide">)
css/betternow.css          motyw: 1) komponenty slajdów, 2) warstwa betternow (dark mode, mesh gradient, logo)
js/app.js                  konfiguracja reveal.js i animacje wejścia
assets/betternow-logo.svg  logo (tło)
assets/fonts/              Roboto, kopia offline (SIL OFL 1.1); online ładowany z Google Fonts
dist/                      reveal.js 6.0.2 (MIT) + wtyczka notatek
```

## Typowe zmiany
- Kolory: zmienne `--bg`, `--accent` itd. w sekcji 2 pliku `css/betternow.css`.
- Widoczność logo: `opacity` w regule `body::after`; rozmiar: `--logo-size`. Logo jest wbudowane w CSS jako data URI (`--logo-mask`), bo maska z pliku nie działa przy otwieraniu z dysku (file://). Po zmianie `assets/betternow-logo.svg` wygeneruj data URI ponownie.
- Notatki prelegenta: dodaj do slajdu `<aside class="notes">…</aside>`.
- PDF: otwórz `index.html?print-pdf` w Chrome i wydrukuj do PDF.
- Aktualizacja reveal.js: podmień pliki w `dist/` na nowsze z pakietu npm `reveal.js` (od wersji 6: `dist/` i `dist/plugin/`).
