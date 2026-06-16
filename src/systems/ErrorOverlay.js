export class ErrorOverlay {
  constructor() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'error-overlay';
    this.overlay.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);color:#ff4444;font-family:monospace;font-size:14px;padding:20px;z-index:9999;overflow:auto;white-space:pre-wrap;pointer-events:none';
    document.body.appendChild(this.overlay);
    this._errorCount = 0;

    window.addEventListener('error', (e) => {
      e.preventDefault();
      this._append(e.message, e.filename, e.lineno, e.colno, e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
      e.preventDefault();
      const err = e.reason;
      this._append(err?.message || String(err), '', '', '', err instanceof Error ? err : null);
    });
  }

  _append(msg, source, line, col, err) {
    this._errorCount++;
    if (this._errorCount > 20) return;
    this.overlay.textContent += `[${new Date().toLocaleTimeString()}] ${msg}\n  at ${source || '?'}:${line || '?'}:${col || '?'}\n${err?.stack || ''}\n\n`;
    this.overlay.style.display = 'block';
    console.error(msg, source, line, col, err);
  }

  showError(err) {
    this._append(err.message, '', '', '', err);
  }
}
