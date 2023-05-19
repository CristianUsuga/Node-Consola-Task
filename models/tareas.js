import { Tarea } from "./tarea.js";

/**
 * _listado:
 *      {'uuid-123712-123123: {id:12, completadoEn:09022023}'},      
 */



class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        }); //Retorna arreglo de todas las llaves

        return listado;
    }


    constructor() {
        this._listado = {};
    }

    borrarTarea(id =''){
        if (this._listado[id]) {
            delete this._listado[id]; 
        }
    }

    cargarTareasFromArray(tareas = []) {
        //Podemos desestructurar el id.
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }



    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${(i + 1)+"."}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`)

        })
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea) => {

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            if (completadas) {
                //Mostrar compleatadas
                if (completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green + '.'} ${desc} :: ${completadoEn.green}`);
                }
            } else {
                //mostrar pendientes
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green+ '.'} ${desc} :: ${estado}`);
                }
            }


        })

    }

    toggleCompletadas(ids = []){
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

export { Tareas };