// ── Global error overlay ─────────────────────────────
// Captures window.onerror and unhandledrejection events,
// displays them in a fixed overlay. Caps at 20 errors,
// deduplicates events < 200ms apart.
export class ErrorOverlay {
  constructor() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'error-overlay';
    this.overlay.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);color:#ff4444;font-family:monospace;font-size:14px;padding:20px;z-index:9999;overflow:auto;white-space:pre-wrap;pointer-events:none';
    document.body.appendChild(this.overlay);
    this._errorCount = 0;
    this._lastErrorTime = 0;

    window.addEventListener('error', (e) => {
      if (e.filename && (e.filename.startsWith('chrome-extension://') || e.filename.startsWith('moz-extension://'))) return;
      e.preventDefault();
      const now = Date.now();
      if (now - this._lastErrorTime < 200 || this._errorCount >= 20) return;
      this._lastErrorTime = now;
      this._errorCount++;
      this.overlay.textContent += `[${new Date().toLocaleTimeString()}] ${e.message}\n  at ${e.filename || '?'}:${e.lineno || '?'}:${e.colno || '?'}\n${e.error?.stack || ''}\n\n`;
      this.overlay.style.display = 'block';
    });

    window.addEventListener('unhandledrejection', (e) => {
      e.preventDefault();
      const err = e.reason;
      const stack = err instanceof Error ? (err.stack || '') : String(err);
      if (stack.includes('chrome-extension://') || stack.includes('moz-extension://')) return;
      const now = Date.now();
      if (now - this._lastErrorTime < 200 || this._errorCount >= 20) return;
      this._lastErrorTime = now;
      this._errorCount++;
      this.overlay.textContent += `[${new Date().toLocaleTimeString()}] ${err?.message || String(err)}\n${stack}\n\n`;
      this.overlay.style.display = 'block';
    });
  }

  showError(err) {
    if (!err || this._errorCount >= 20) return;
    const now = Date.now();
    if (now - this._lastErrorTime < 200) return;
    this._lastErrorTime = now;
    this._errorCount++;
    this.overlay.textContent += `[${new Date().toLocaleTimeString()}] ${err.message}\n${err.stack || ''}\n\n`;
    this.overlay.style.display = 'block';
  }
}
