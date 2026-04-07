Para poder utilizar el proyecto es necesario tener una motor de base de datos instalado localmente para poder hacer pruebas correctamente de la api desarrollada.



Descargas el repositorio https://github.com/rickso21/Luis_Ruiz.git

Descomprimes el archivo descargado

Observas que se divide en dos sistemas alojados que es backen y front en este caso la carpeta se llama Prueba_Luis_Ruiz_ y el otro backend


estas dos carpetas las podras dejas alojadas en una carpeta principal que sea nombrada pruebas o cualquier nombre no es necesario uno especifico


para levantar el proyecto no se necesita algo tecnico como tal solo es crear una bd en el motod de POSTGRESQL nombrado message_feed con password 123 

Una vez que se cree la bd abrimos la ide que sea de su seleccion y levantaremos primero el proyecto backend con el siguiente comando 

npm run dev  

no es necesario hacer mas ya que dentro de este proyecto tenemos una base o un archivo de configuracion que crea todo el sistema de la base de datos que en este caso son tablas sin necesidad que lo hagas manualmente.

Una vez que hecho abrimos una ventana nueva sin cerrar la que ya trabajamos para el frontend en este proyecto no es tampoco algo muy tecnico ya que trabajaremos con  react este no depende de algun serivicio externo como xampp ya que el uso de nuestro front se independiza completamente

integramos el comando  yarn dev


en caso de que este no funcione sera necesario solo actualizar la paqueteria con yarn install una ves ejecutado integramos corepack enable 

y listo volvemos a ejecutar el comando para levantar el servicio yarn dev




nota importante el sistema se emplea en publicar un estado almacenarlo en una base de datos y registrar los likes que se vayan registrando en la api esto no limita a que puedan ser muchos likes 