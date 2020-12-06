[English](./README.md) | 简体中文 | [Русский](./README.ru-RU.md)

# ant-frontend

> This is an iot system's frontend, based on ant-design.

## startup

```bash
npm install
npm start
```

```dockerfile
  frontend:
    build: ./ant_frontend
    command: bash -c "npm install && npm start"
    volumes:
      - ./ant_frontend:/usr/src/app/
    ports:
      - "9001:8000"
    restart: always
```

## functions

### languages

> The ant-design will provide the ablity of choosing language, what you need to do
is changing locales' files and use `{formatMessage({id: 'app.settings.basic.geographic'}`

### maps

> with 高德地图's api

### pages

> design pages we need which are aiming for some functions such as subscribing mqtt's topic.

## Display

![1559832994(1).jpg](https://i.loli.net/2019/06/06/5cf929b1f382b17711.jpg)

![1559834129(1).jpg](https://raw.githubusercontent.com/tyrantqiao/picgo/master/img/1559834129(1).jpg?token=AE66MAH77LUTUUKRNUIHON247EXR2)

![20190606232022.png](https://raw.githubusercontent.com/tyrantqiao/picgo/master/img/20190606232022.png?token=AE66MAA7C5WXVCPR3DJQ6VK47EXXO)

![20190606232104.png](https://raw.githubusercontent.com/tyrantqiao/picgo/master/img/20190606232104.png?token=AE66MACFXZQUC33ZC7H54WC47EX2A)

![20190606232119.png](https://raw.githubusercontent.com/tyrantqiao/picgo/master/img/20190606232119.png?token=AE66MADO5EFXRJCMFDVWJFC47EX3A)

![20190606232127.png](https://raw.githubusercontent.com/tyrantqiao/picgo/master/img/20190606232127.png?token=AE66MAF5AVRR2P37UO5MOZS47EX3S)