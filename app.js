import colors from 'colors';
import { inquirerMenu, pause, leerInput, listadoTareasBorrar, confirmar ,mostrarListadoCheckList} from './helpers/inquirer.js';

import { Tareas } from './models/tareas.js';
import { guardarDB, leerDB } from './helpers/GuardarArchivo.js';


//console.clear();

const main = async () => {


  let opt = '';
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) { //Cargar tareas
    //Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);


  }
  // await pause();

  do {

    //Imprimir el menu
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        //Crear opcion
        const desc = await leerInput('Descripción tarea: ');
        tareas.crearTarea(desc);
        break;
      case '2':
        //Listar tareas
        tareas.listadoCompleto();
        break;
      case '3':
        //Listar Completadas
        tareas.listarPendientesCompletadas(true);
        break;
      case '4':
        //Listar Pendientes
        tareas.listarPendientesCompletadas(false);
        break;
        case '5':
        //Completado | pendiente
         const ids =  await mostrarListadoCheckList(tareas.listadoArr);
         tareas.toggleCompletadas(ids);
        break;
      case '6':
        //Borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        
        if (id !== '0') {
          const ok = await confirmar('¿Está seguro?')
          if (ok) {
            tareas.borrarTarea(id);
            console.log('Tarea borrada');
            //console.log({ok})
          }
        }else{
          break;
        }

        break;

    }
    guardarDB(tareas.listadoArr);

    console.log('\n');
    await pause();

  } while (opt !== '0');
};

main();