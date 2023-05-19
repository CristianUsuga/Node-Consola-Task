import { v4 as uudiv4 } from 'uuid';


class Tarea {

    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc) {

        this.id = uudiv4();
        this.desc = desc;
        this.completadoEn = null;

    }

}


export { Tarea };

