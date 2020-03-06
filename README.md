# Prueba técnica newtral

## iniciar docker

```sh
docker-compose -f "back/docker-compose.yml" up -d --build
```

## iniciar proyecto react


```sh
cd front
npm install
npm start
```
- se abrirá una ventana del navegador http://localhost:3001
- al introducir email y contraseña, si no existe el usuario se creará uno automáticamente y se hará login