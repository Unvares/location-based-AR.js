# Location Based AR.js
## Что это?
Это WebAR-приложение для рпосмотра интерьера и экстерьера 3D-модели трамвая. Создал его в целях изучения принципов работы Location Based-позиционирования в AR.js

## Используемые технологии
#### Фреймворки:
- A-Frame

#### Библиотеки:
- AR.js
- three.js

#### Методологии:
- BEM

## Как запустить?
Понадобится сервер с SSL-сертификатом, так как без него не будет работать Geolocation API, а значит не будет работать всё приложение.

## Как поставить SSL-сертификат на локальный сервер?
По одному из следующих гайдов:
1) [How to enable https on live server VScode](https://medium.com/webisora/how-to-enable-https-on-live-server-visual-studio-code-5659fbc5542c)
2) [Add HTTPS support to VScode Live Server (video)](https://www.youtube.com/watch?v=v4jgr0ppw8Q&ab_channel=SteveGriffith-Prof3ssorSt3v3)

_P.S. не используй функцию воркспейсов, а открывай папку напрямую. Через воркспейс VScode не может запустить Live Server с https-протоколом._