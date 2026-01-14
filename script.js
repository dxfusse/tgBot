const tg = window.Telegram.WebApp;
tg.ready();
if (!tg.isExpanded) {
    tg.expand();
}
