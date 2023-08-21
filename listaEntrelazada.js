
/*

LA LISTA ENLAZDA DOBLE SIGUE EXACTAMENTE LOS MISMOS PRINCIPIOS QUE LA ENLAZADA SIMPLE, POR LO QUE NO PROFUNDIZARE EN ELLO.

LA DIFERENCIA ES QUE EN VEZ DE TENER UN SOLO POINTER (NEXT) COMO EN LA SIMPLE, LA DOBLE APUNTA TANTO AL ANTERIOR COMO AL SIGUIENTE DEL NODO. ES DECIR TENEMOS 3 PROPIEDADES, ANTERIOR, VALOR , SIGUIENTE.

PARA LA CABEZA DE LA LISTA, SU PREV ES NULL
PARA LA COLA DE LA LISTA, SU NEXT ES NULL

IMAGEN QUE REPRESENTA LA IMPLEMENTACION DE UNA LISTA ENLAZADA DOBLE https://bigcode.es/wp-content/uploads/2022/01/Listas-Doblemente-Enlazadas.webp


// TOMEN A HEAD Y TAIL COMO REFERENCIAS, NO SON DOS LISTAS INVERTIDAS SI ES QUE ALGUNA VEZ LO PENSARON

// HEAD APUNTA AL PRIMER NUDO INGRESADO(EXCEPTO SI SE CAMBIO JUSTAMENTE EL HEAD), Y TAIL VE SIEMPRE AL ULTIMO NUDO INGRESADO.
// TANTO HEAD COMO TAIL USAN LOS MISMOS POINTERS EN LA MISMA DIRECCION
// PERO
// PARA AVANZAR CON HEAD UNO DEBE USAR NEXT QUE APUNTA A LA DERECHA -->, ES DECIR AL FINAL DE LA LISTA
// Y PARA TAIL QUE YA ES EL FINAL DE LA LISTA UNO DEBE AVANZAR HACIA LA IZQUIERDA CON PREV, ES DECIR HACIA EL INICIO DE LA LISTA

*/

// ANTES DE EMPEZAR QUIERO DEJAR EN CLARO QUE ESTAS NO SON LAS IMPLEMENTACIONES MAS OPTIMAS
// SI HUBIERA USADO CHATGPT PARA MEJORARLAS SEGURAMENTE ME HUBIERA AHORRADO UNAS 60 A 100 LINEAS DE CODIGO
// SIN EMBARGO EL CODIGO DE CHATGPT MUCHAS VECES ES MUCHO MAS IMPLICITO Y MENOS LEGIBLE A MI MODO DE VER, DE TODAS FORMAS, SI VEN ALGUN METODO QUE NO LES TERMINA DE CONVENCER, AGARREN TODO EL CODIGO SIN LOS BLOQUES GIGANTES DE COMENTARIOS, Y DENSELO A CHATGPT. LUEGO DIGANLE CUAL METODO QUIEREN QUE EL SIMPLIFIQUE Y QUE LES EXPLIQUE DETALLADAMENTE ESE METODO, O DIRECTAMENTE TODO EL CODIGO. MI RECOMENDACION COMO SIEMPRE ES COJAN UN METODO QUE NO ENTIENDA, USEN BREAKPOINTS Y PONGAN LAS VARIABLES/EXPRESIONES QUE ESTAN USANDOSE EN ESE METODO EN EL DEBUGGER Y VEAN LOS CAMBIOS QUE SE PRESENTAN LINEA A LINEA. A MI ME TOCO CON EL METODO REVERSE Y EL PUSH EN LAS LISTAS TANTO ENLAZADAS COMO DOBLEMENTE ENLAZADAS A LAPIZ Y PAPEL IR REGISTRANDO LAS ITERACIONES EN UN BUCLE PORQUE NO LO ENTENDIA.(HABIA HECHO EL METODO REVERSE PREVIAMENTE POR MI CUENTA, PERO ERAN COMO 40 LINEAS, LE PEDI UNA IMPLEMENTACION DE REVERSE A CHATGPT Y ERAN 15 LINEAS PERO NO ENTENDIA NADA, POR ESO ME TOCO REGISTRAR A LAPIZ Y PAPEL)


// *mucho texto XD*

class Nodo {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class listaEnlazadaDoble {
    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }

    push(valor) {
        let newNode = new Nodo(valor);
        if (this.isEmpty()) { // CUANDO NUESTRA LISTA ESTA VACIA
            this.head = newNode; // NUESTO NODO VA A SER TANTO CABEZA COMO COLA, PORQUE ES EL UNICO EXISTENTE
            this.tail = newNode; // Y COMO ANTES HABIAMOS DECLARADO QUE POR DEFAULT EL NODO SE CREA CON NEXT Y PREV CON VALORES NULL, EL NODO AL SER EL ULTIMO ELEMENTO APUNTA A NULL CON NEXT, PERO COMO TAMBIEN ES EL PRIMER ELEMENTO APUNTA A NULL CON PREV
        }
        else {// SI LA LISTA YA NO ESTA VACIA
            // COMO YA TENEMOS UN ELEMENTO EN LA LISTA ESTA SE VERIA ALGO ASI

            // NULL <-- NODO_0 --> NULL
            //      PREV       NEXT
            // SI LE INGRESAMOS UN NUEVO ELEMENTO CAMIBIARIA LA ESTRUCTURA A ESTO


            //       NEXT SOLO APUNTA A LA DERECHA
            //      NEXT        NEXT        NEXT
            // NULL ---> NODO_0 ---> NODO_1 ---> NULL
            //           HEAD        TAIL


            //     PREV SOLO APUNTA A LA IZQUIERDA
            //      PREV        PREV        PREV
            // NULL <--- NODO_0 <--- NODO_1 <--- NULL
            //           HEAD        TAIL



            // COMO SE VE ARRIBA EL NODO 0 DEJA DE SER HEAD Y TAIL, Y PASA A SER UNICAMENTE HEAD
            // PORQUE ES EL PRIMER ELEMENTO INGRESADO MAS NO EL ULTIMO
            // Y NODO 1 PASA A SER EL TAIL, PORQUE ES EL ULTIMO ELEMENTO INGRESADO


            // AHORA, ESTO ES SOLO SI PASAMOS DE 1 NODO A 2 NODOS
            // PERO CUANDO YA PASAMOS A 3 NODOS O MAS EL INGRESO DE VALORES DEBE VERSE CON OTRA PERSPECTIVA

            // CUANDO INGRESAMOS EN ESTA LISTA LOS ELEMENTOS SIEMPRE SE DEBEN IMAGINAR COMO SI SE INGRESARAN A UN ARRAY CONVENCIONAL
            // ES DECIR HACIA LA DERECHA, UN PUSH DE TODA LA VIDA
            // POR LO QUE POR EL LADO DE HEAD LOS NEXT HACEN REFERENCIA AL SIGUIENTE ELEMENTO
            // * PERO EN EL LADO DE TAIL LOS PREV SON LOS QUE HACEN REFERENCIA AL SIGUIENTE ELEMENTO
            // Y ESTO ES SENCILLO DE ENTENDER
            // COMO SE VE ARRIBA TAIL ES EL ULTIMO ELEMENTO, ESTO SIGNIFICA QUE PARA EL TAIL, EL ULTIMO ELEMENTO ES EN REALIDAD SU POSICION 0, PUES ES COMO SI SU OBSERVADOR ESTUVIERA MIRANDO DESDE EL FINAL DE LA LISTA, LO PRIMERO QUE VE ES EL ULTIMO
            // EN CAMBIO EL HEAD APUNTA AL PRIMER ELEMENTO QUE ENTRO, POR LO QUE SE INFIERE QUE HEAD ESTA OBSERVANDO DESDE EL INICIO DE LA LISTA
            // SERIA ALGO ASI    HEAD --> LISTA <-- TAIL
            // TOMEN A HEAD Y TAIL COMO OBSERVADORES
            // ACLARANDO EL COMENTARIO CON *, NO ES QUE PARA TAIL EL ULTIMO ELEMENTO FUE EL QUE INGRESO PRIMERO. LO QUE HACE TAIL ES QUE INVIERTE LAS POSICIONES DE LOS ELEMENTOS
            // Y AL INVERTIR LOS "INDICES" DEBE DESPLAZARSE AL CONTRARIO DE HEAD, ES DECIR CON PREV
            


            // AQUI RECOMIENDO USAR EL DEBUGGER Y PONER EN WATCH/INSPECCION ESTAS EXPRESIONES : this.tail, newNode.prev, this.head, this.tail.next
            // VEAN LOS CAMBIOS POR CADA LINEA E INTENTEN ENTENDERLOS JUNTO CON LA EXPLICACION POR LINEA
            // ESTAS LINEAS SERAN EXPLICADAS COMO SI YA TUVIERAMOS 2 ELEMENTOS EN LA LISTA, Y ESTUVIERAMOS INGRESANDO EL 3RO EN ADELANTE
            newNode.prev = this.tail; // newNode.prev ORIGINALMENTE ES NULL PORQUE EN EL CONSTRUCTOR NODO ASI LO PUSIMOS, PERO AHORA NECESITAMOS QUE PREV HAGA REFERENCIA AL ULTIMO NODO DE LA LISTA, Y COMO TAIL HACE REFERENCIA SIEMPRE AL ULTIMO NODO PONEMOS EL VALOR DE TAIL
            this.tail.next = newNode; // AHORA HACEMOS QUE EL ULTIMO ELEMENTO DE LA LISTA ESTE CONECTADO AL NUEVO ELEMENTO POR EL POINTER NEXT
            this.tail = newNode; // INGRESAMOS EL NUEVO ELEMENTO HACIENDO AHORA QUE TAIL APUNTE AL NUEVO ELEMENTO
        } // SI SE PREGUNTAN PORQUE NO MODIFICAMOS AQUI A HEAD, ES PORQUE TANTO HEAD COMO TAIL HACEN REFERENCIA A UNA LISTA EN LA MEMORIA, ENTONCES AL MODIFICAR ALGUN NODO QUE ESTE CONECTADO A TAIL, TAMBIEN LO ESTAMOS MODIFICANDO AL NODO QUE CONECTE A HEAD
        this.size++;

        // INTENTO DE MOSTRAR COMO SE VERIA LA LISTA ENLAZADA DOBLE https://imgur.com/a/Jjjb28s
    }
    isEmpty() {
        return this.size === 0;
    }
    length() {
        return this.size
    }
    print() {
        if (!this.head) {
            console.log("La lista está vacía.");
            return;
        }
        console.log('HEAD   v')
        let nodoActual = this.head; // NODO ACTUAL EMPIEZA DESDE EL PRIMER ELEMENTO DE LA LISTA, ES DECIR EL HEAD
        while (nodoActual !== null) { // SOLO VALORES DE LA LISTA
            const value = nodoActual.value;
            const prevValue = nodoActual.prev ? nodoActual.prev.value : null; // Si existe un prev se regresa ese prev, de lo contrario se devuelve null
            const nextValue = nodoActual.next ? nodoActual.next.value : null; // Si existe un next se regresa ese next, de lo contrario se devuelve null
            
            console.log(`Valor: ${value} Next: ${nextValue} Prev: ${prevValue}`);
            nodoActual = nodoActual.next; // Saltamos al siguiente nodo
        }
        console.log('TAIL   ^');
    }
    pop(){
        if (this.size > 1){ // Siempre que la lista no este vacia y tenga mas de 1 nodo
            this.tail = this.tail.prev // La referencia tail apunta al elemento anterior del que se va a eliminar
            this.tail.next = null; // El nuevo tail ahora apunta a null para completar el cambio a los pointers
            this.size--;
        }
        if (this.size === 1){ // Si la lista tiene solo un nodo y este va a ser eliminado
            this.tail = this.head = null; // Los valores de las referencias se dirijen a null
            this.size--;
        }
        else { // En caso de que este vacia
            return null;
        }
    }
    unshift(valor){ // Agregar un nuevo nodo al principio de la lista.
        const newNode = new Nodo(valor); // Declaramos la variable que contendra el nuevo nodo
        let oldHead = this.head; // Guardamos la lista en una variable
        this.head = newNode; // La lista ahora solo tiene como nodo al nuevo nodo
        oldHead.prev = this.head; // A la lista que se tiene guardada en la constante oldHead, se le cambia el pointer prev que antes apuntaba a null, ahora apuntara al nuevo nodo
        this.head.next = oldHead; // el nuevo nodo ahora tiene su pointer next apuntando a la lista anterior
        this.size++;
    }
    shift(){ // Eliminar y devolver el primer nodo de la lista.
        const oldHead = this.head.value; // // Guardamos el primer nodo en una constante
        if (this.size > 1){ // Siempre que la lista no este vacia y tenga mas de 1 nodo
            this.size--;
            this.head = this.head.next; // La referencia head ahora apunta al segundo nodo eliminando asi al primero
            this.head.prev = null; // Ahora el nuevo primer nodo tiene que tener su prev apuntando a null
            return oldHead; // Retornamos nodo que eliminamos (el primero)
        }
        if (this.size === 1){ // Si la lista solo tiene un nodo, y va a ser eliminado
            this.head = null; // Ambas referencias van a apuntar a null, de esta forma borrando toda la lista
            this.tail = null;
            this.size--;
            return oldHead; // Retornamos nodo que eliminamos (el primero, el unico que quedaba)
        }
        else { // En caso de que la lista este
            return null;
        }
    }
    insertAt(valor, index){ // Insertar un nuevo nodo en una posición específica de la lista.
        // En el caso de que se ingrese en index un  0<numero>size se pueden tomar varias opciones de como manejarlo.
        // En mi implementacion voy a simplemente omitir estos, y no hacer nada. Como ud quiera tomarlo es valido.
        const newNode = new Nodo(valor);
        if ((index>this.size) || (index<0)){
            return null;
        }
        else if (index===0){this.unshift(valor)}
        else if (index === (this.size -1)) {this.push(valor)} // Mas que todo para que no tenga que hacer mas calculos de los necesarios, pero como tal esta linea no hace falta.
        else{
            let i = 0; // Inicializar i en la primera posicion de la referencia 
            if ((this.size / 2) <= index) {
                let nodoActual = this.tail; // Elegimos la referencia tail
                let nodoAnterior;
                while(i!==((this.size-index)-1)){ // Aqui como tail maneja al reves los indices, toca usar una expresion matematica que permita calcular cuantos saltos al nodoAnterior desde el ultimo nodo, para llegar al nodo con la posicion que buscamos
                    nodoActual = nodoActual.prev; // Como tail avanza a la izquierda usamos prev
                    i++;
                }
                nodoAnterior = nodoActual.prev; // Hacemos una referencia al nodo anterior a donde vamos a ingresar el nuevo nodo
                newNode.next = nodoActual; // Ahora conectamos el nodo que tiene la posicion donde vamos a ingresar el nodo nuevo
                newNode.prev = nodoAnterior; // Y conectamos el prev con el nodo que esta en la posicion anterior a donde vamos a ingresar el nuevo nodo
                nodoAnterior.next = newNode; // Ahora hacemos que el nodo nuevo este en la posicion que deseamos
                nodoActual.prev = newNode; // Y movemos el nodo que antes estaba en esta posicion a la siguiente
            }
            else {
                let nodoActual = this.head; // Elegimos la referencia head
                let nodoAnterior;
                while(i!=index){
                    nodoActual = nodoActual.next; // Como head avanza a la derecha usamos next
                    i++;
                }
                nodoAnterior = nodoActual.prev; // Hacemos una referencia al nodo anterior a donde vamos a ingresar el nuevo nodo
                newNode.next = nodoActual; // Ahora conectamos el nodo que tiene la posicion donde vamos a ingresar el nodo nuevo
                newNode.prev = nodoAnterior; // Y conectamos el prev con el nodo que esta en la posicion anterior a donde vamos a ingresar el nuevo nodo
                nodoAnterior.next = newNode; // Ahora hacemos que el nodo nuevo este en la posicion que deseamos
                nodoActual.prev = newNode; // Y movemos el nodo que antes estaba la posicion que deseamos para el nuevo, a la siguiente
            }
            }
        this.size++;
        }
    removeAt(index) { // Eliminar el nodo de este index
        if ((index>this.size) || (index<0)){
            return null;
        }
        let nodoActual;
        let nodoAnterior;
        let nodoSiguiente;
        let i = 0; // Inicializar i en la primera posicion de la referencia 
        if (index === (this.size-1)) {this.pop()}
        else if ((this.size / 2) <= index) {
            nodoActual = this.tail; // Elegimos la referencia tail
            while(i!==((this.size-index)-1)){ // Aqui como tail maneja al reves los indices, toca usar una expresion matematica que permita calcular cuantos saltos al nodoAnterior desde el ultimo nodo, para llegar al nodo con la posicion que buscamos
                nodoActual = nodoActual.prev; // Como tail avanza a la izquierda usamos prev
                i++;
            }
            nodoAnterior = nodoActual.prev; // Asignamos el nodo anterior al nodo que vamos a borrar, en la variable nodoAnterior
            nodoSiguiente = nodoActual.next; // Asignamos el nodo siguiente al nodo que vamos a borrar, en la variable nodoSiguiente
            nodoAnterior.next = nodoActual.next; // Al nodo anterior al que vamos a borrar, le cambiamos el pointer al nodo siguiente del nodo que vamos a borrar. Asi logramos eliminarlo de la lista enlazada.
            nodoSiguiente.prev = nodoAnterior; // Al nodo siguiente le cambiamos el pointer para que ahora sea el nodoAnterior al que vamos a eliminar. Asi lo eliminamos de la lista enlazada
        }
        else {
            nodoActual = this.head; // Elegimos la referencia head
            while(i!=index){
                nodoActual = nodoActual.next; // Como head avanza a la derecha usamos next
                i++;
            }
            nodoAnterior = nodoActual.prev; // Asignamos el nodo anterior al nodo que vamos a borrar, en la variable nodoAnterior
            nodoSiguiente = nodoActual.next; // Asignamos el nodo siguiente al nodo que vamos a borrar, en la variable nodoSiguiente
            nodoAnterior.next = nodoActual.next; // Al nodo anterior al que vamos a borrar, le cambiamos el pointer al nodo siguiente del nodo que vamos a borrar. Asi logramos eliminarlo de la lista enlazada.
            nodoSiguiente.prev = nodoAnterior; // Al nodo siguiente le cambiamos el pointer para que ahora sea el nodoAnterior al que vamos a eliminar. Asi lo eliminamos de la lista enlazada
        }
        this.size--;
        }
    removeAtTail(){ // Elimina el nodo en la cola de la lista
        if (this.size === 0){
            return null
        }
        else if (this.size === 1){
            this.head = this.tail = null;
        }
        else {
            this.tail = this.tail.prev; // Camibamos el puntero de la referencia tail al penultimo nodo
            this.tail.next = null; // Actualizamos el valor next del nuevo tail para que apunte a null
        }
        this.size--;
    }
    search(value){
        let nodoActual = this.head;
        let i = 0;
        while((nodoActual!==null) && (nodoActual.value!=value)){
            if (i === (this.size-1)){
                return null
            }
            nodoActual = nodoActual.next;
            i++;
        }
        return nodoActual;
    }
    insertAfter(valorNodoNuevo, value){
        let newNode = new Nodo(valorNodoNuevo);
        let nodoActual = this.head;
        let nodoSiguiente;
        const nodeIndex = this.indexOf(value);
        let i = 0;
        while((i !== nodeIndex)&&(nodoActual!==null)){
            nodoActual = nodoActual.next;
            i++;
        }
        if (nodoActual===null){return null;}
        nodoSiguiente = nodoActual.next;
        newNode.next = nodoSiguiente;
        newNode.prev = nodoActual;
        nodoActual.next = newNode;
        this.size++;
    }
    indexOf(valor){ // Encuentra el index del nodo con value valor
        if ((this.size === 0)){return null}
        let nodoActual = this.head;
        let i=0;
        while ((nodoActual!==null) && (nodoActual.value!==valor)){
            nodoActual = nodoActual.next;
            i++;  
        }
        if (nodoActual=== null){return null}
        return i;
    }
    toArray(){
        if (this.size === 0){return []}
        let nodoActual = this.head;
        let doubleLinkedArray = new Array;
        while (nodoActual!==null){
            doubleLinkedArray.push(nodoActual.value);
            nodoActual = nodoActual.next;
        }
        return doubleLinkedArray;
    }
    // Metodo fromArray(array) proximamente // Crea una lista doblemente enlazada a partir de un array.
    get(index){
        if ((this.size === 0)||(index > (this.size-1)) || (index < 0)){return null};
        let i = 0;
        let nodoActual;
        if (index === (this.size-1)){return this.tail}
        else if (index === 0){return this.head}
        if ((this.size / 2) <= index){
            nodoActual = this.tail;
            while(i != (this.size - index)-1){
                nodoActual = nodoActual.prev;
                i++;
            }
        }
        else {
            nodoActual = this.head;
            while(i != index){
                nodoActual = nodoActual.next;
                i++;
            }
        }
        return nodoActual;
    }
    reverse(){
        if (this.size === 0){return}
        const oldHead = this.head;
        const oldTail = this.tail;
        this.head = oldTail;
        this.tail = oldHead;
        let nodoActual = this.head;
        let oldNext;
        let oldPrev;
        while (nodoActual!==null){
            oldNext = nodoActual.next;
            oldPrev = nodoActual.prev;
            nodoActual.prev = oldNext;
            nodoActual.next = oldPrev;
            nodoActual = nodoActual.next;
        }
    }
}
let lista = new listaEnlazadaDoble;
// Probando push
lista.push(32);
lista.push(64);
lista.push(10);
// Probando isEmpty
console.log(lista.isEmpty())
// Probando print
lista.print();
// Probando pop
lista.pop();
lista.pop();
lista.pop();
lista.print();
// Probando unshift
lista.push(32);
lista.push(64);
lista.push(10);
lista.unshift(5);
lista.print(); // Deberia ser, [5,32,64,10]
// Probando shift
console.log(lista.shift()); // Deberia dar 5
console.log(lista.shift());
console.log(lista.shift());
console.log(lista.shift());
lista.print();
// Probando insertAt
lista.push(32); // 1
lista.push(64); // 2
lista.push(3); // 3
lista.push(4); // 4
lista.push(5); // 5
lista.push(6); // 6
lista.push(7); // 7
lista.push(8); // 8
// Probando insertAt
lista.insertAt("cinco",4);
lista.insertAt("2",8);
lista.print();
// Probando removeAt
lista.removeAt(lista.length()-1)
lista.print();
// Probando removeAtTail
lista.removeAtTail();
lista.print();
// Probando Search
console.log(lista.search(6))
// Probando indesOf
console.log(lista.indexOf(2));
// Probando insertAfter
lista.insertAfter("despues",8);
lista.print();
// Probando toArray
console.log(lista.toArray());
// Probando get
console.log(lista.get(5));
// Probando reverse
lista.reverse();
lista.print();
