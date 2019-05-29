## Algoritmos
- Los algoritmos se encuentran en el archivo [src/utils.js](https://github.com/nlopezm/met-euler/blob/master/src/utils.js "src/utils.js").
- Los algoritmos disponibles son Euler, Euler Mejorado y Runge-Kutta de orden 4. Todos ellos reciben como parámetro una fórmula `f(x,t), t0, x0` y dos de los parámetros `n, h y b` (El otro se calcula automáticamente). Siendo n la cantidad de puntos y h la distancia entre cada punto.
- Además, la interfaz gráfica permite indicar un intervalo de tiempo para darle vida al gráfico.
- Para evaluar las fórmulas, utilicé la librería [mathjs](https://mathjs.org/ "mathjs").

## Demo
Puede ver un video con una mínima demostración haciendo click en [este enlace](https://drive.google.com/file/d/1A-NMOEk2vIu0nxsR7juw9jo4oPjbUm6r/view "este enlace").

## Cómo ejecutar
- Instalar Node y npm
- En el directorio del proyecto, correr `npm start`
- Abrir [http://localhost:3000](http://localhost:3000) para ver la aplicación en el navegador.