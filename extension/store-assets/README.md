# Chrome Web Store assets

- `promotional-tile-440x280.png` — optional small promotional tile.
- `promotional-marquee-1400x560.png` — optional promotional marquee.

Both assets deliberately reserve clear space at the left for Store-provided title and description. The extension icon source is at `../assets/tokentint-logo.png`; the required 16, 32, 48 and 128 px exports are in `../public/icons/`.

Do not use generated artwork as a Store screenshot. Chrome Web Store screenshots must show the real extension. After rebuilding, load `extension/dist` at `chrome://extensions`, open the popup on a real webpage, and capture the following at 1280x800 or 640x400:

1. Main picker and color history.
2. The eyedropper on a real webpage.
3. A project palette.
4. An export format.
5. The Pro extraction flow.
