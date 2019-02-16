class Invitado{
  constructor(nombre){
    this.nombre = nombre;
  }
}

/*Array donde guardamos la lista de objetos de los nombres*/
var invitados = [];

//Para el filtro
var ocultar = document.getElementById("ocultar");
var marcado = document.getElementById("marcado");

/*Evento al hacer click en enviar */
document.getElementById("submit").addEventListener("click", function(e){
	e.preventDefault();
	/*Para añadir invitados*/
	var aniadir = document.getElementById("aniardirDatos").value;
	//comprobamos el nombre que nos venga este correcto.
	comprobarNombre(aniadir);
	//lo ponemos a vacio cada vez que enviemos un dato.
	document.getElementById("aniardirDatos").value = "";
});


/*Si esta vacio lo meto y despues comprobarlo compruebo*/
function comprobarNombre(comprobarN){
	var existeNombre = false;
	//Comprobamos que la persona a la que queremos invitar no sea vacio y que no se repita en el array.
	if(comprobarN!=""){
		var mensajeError = document.getElementById("MensajeError");
		//Para meter el primer elemento en el array. Siempre pasa primero por aqui la primera vez
		if(invitados == ""){
		 	mensajeError.textContent= "";
			aniadirElementos(comprobarN);
			invitados.push(new Invitado(comprobarN));
		}else if (invitados!="") {
			for (var i = 0; i < invitados.length; i++) {

				if(invitados[i].nombre ==comprobarN){
					existeNombre = true;
				}
			}	
			if(existeNombre){
				mensajeError.textContent= "¡No puedes invitar a una persona que ya está invitad@!";
				mensajeError.style.color = 'red';
			} else {
				mensajeError.textContent= "";
				aniadirElementos(comprobarN);
				invitados.push(new Invitado(comprobarN));
			}
		}
	}
}

/*Para añadir invitados*/
function aniadirElementos(aniadir){
		var obtenerUl = document.getElementById("invitedList");
		var newLi = document.createElement("li");
		obtenerUl.appendChild(newLi);

		var newSpan = document.createElement("span");
		newSpan.textContent=aniadir;
		//Para el modificar
		var newInputModi = document.createElement("input");
		newInputModi.setAttribute("type", "text");
		newInputModi.style.display = "none";
		newLi.appendChild(newInputModi);
		newLi.appendChild(newSpan);

		var newLabel = document.createElement("label");
		newLabel.textContent="Confirmed";
		newLi.appendChild(newLabel);
		
		var newInput = document.createElement("input");
		newInput.setAttribute("type", "checkbox");
		newLabel.appendChild(newInput);

		/*Para los checkbox*/
		newInput.addEventListener("click",function(e){
			/*Si confirmas asistencia*/
			if(newInput.checked == true){
				newLi.setAttribute("class", "responded");
			}
			/*Si no asistes*/
			else{
				newLi.setAttribute("class", "");
			}
		});

		//Boton de editar
		var newButtonEdi = document.createElement("button");
		newButtonEdi.textContent="edit";	
		newButtonEdi.setAttribute("type", "submit");
		newButtonEdi.setAttribute("name", "editar");
		newButtonEdi.setAttribute("value", "editar");
		newLi.appendChild(newButtonEdi);


		/*Para crear boton borrado*/
		var newButtonRemove = document.createElement("button");
		newButtonRemove.textContent="remove";
		newLi.appendChild(newButtonRemove);

		
		//Boton de guardar
		var newButtonSave = document.createElement("button");
		newButtonSave.textContent="save";	
		newButtonSave.setAttribute("type", "submit");
		newButtonSave.setAttribute("name", "save");
		newButtonSave.setAttribute("value", "save");
		newButtonSave.style.display = "none";
		newLi.appendChild(newButtonSave);

		//Boton cancelar
		var newButtonCancel = document.createElement("button");
		newButtonCancel.textContent="cancel";	
		newButtonCancel.setAttribute("type", "submit");
		newButtonCancel.setAttribute("name", "cancel");
		newButtonCancel.setAttribute("value", "cancel");
		newButtonCancel.style.display = "none";
		newLi.appendChild(newButtonCancel);

		
		/*Para cuando quieres editar*/
		newButtonEdi.addEventListener("click", function(){
			//ocultamos el span
			newSpan.style.display = "none";
			
			//mostramos la caja de texto
			newInputModi.style.display = "block";
			newInputModi.setAttribute("value", aniadir);
			
			//ocultamos el boton de edit
			newButtonEdi.style.display = "none";
			
			//mostramos el boton de guardar
			newButtonSave.style.display = "inline";
			
			//ocultamos el boton de remove
			newButtonRemove.style.display = "none";
			
			//mostramos el boton de cancelar
			newButtonCancel.style.display = "inline";

			//Boton guardar.
			newButtonSave.addEventListener("click", function(){
				var valorInputModificar =newInputModi.value;
				var existeNombreRep = false;
				var mensajeError = document.getElementById("MensajeError");

				//Recorremos el array hasta encontrar que haya algun nombre con el mismo nombre del invitado
				for (var i = 0; i < invitados.length; i++) {
					if(invitados[i].nombre == valorInputModificar ){
						existeNombreRep = true;
					}
				}
				if(existeNombreRep){
					mensajeError.textContent= "¡No puedes invitar a una persona que ya está invitad@!";
					mensajeError.style.color = 'red';
				}else{
					for (i = 0; i < invitados.length; i++) {
						//Si el contenido del span es igual al nombre del array lo cambiamos
						if(newSpan.textContent == invitados[i].nombre && valorInputModificar !=""){
							document.getElementById("MensajeError").value = "";
							invitados[i].nombre=valorInputModificar;
							//Mostramos el span
							newSpan.style.display = "block";
							
							//Ocultamos la caja de texto de modificar
							newInputModi.style.display = "none";
							
							//le asignamos el nuevo valor.
							newSpan.textContent=invitados[i].nombre;
							
							//Mostramos el boton de editar
							newButtonEdi.style.display = "inline";
							
							//Ocultamos el boton de guardar
							newButtonSave.style.display = "none";
							
							//Mostramos el boton de borrar
							newButtonRemove.style.display = "inline";
							
							//Ocultamos el boton de cancelar
							newButtonCancel.style.display = "none";
						}
					}
				}
			});

			/*Para cuando quieres cancelar*/
			newButtonCancel.addEventListener("click",function(){
						//Mostramos el span
						newSpan.style.display = "block";

						//Ocultamos la caja de texto
						newInputModi.style.display = "none";

						//Mostramos el boton de editar
						newButtonEdi.style.display = "inline";

						//Ocultamos el boton de guardar
						newButtonSave.style.display = "none";

						//Mostramos el boton de borrar
						newButtonRemove.style.display = "inline";		

						//Ocultamos el de cancelar
						newButtonCancel.style.display = "none";
			});
		});

		/*Para el evento de borrar*/
		newButtonRemove.addEventListener("click",function(){
    	var opcion = confirm("¿Seguro que quieres eliminar a este invitado?");
	    	if (opcion == true) {
	    		//Recorremos el array para luego eliminar el elemento que queremos
				for (var i = 0; i < invitados.length; i++) {
					if(newSpan.textContent == invitados[i].nombre){
		            	invitados.splice(i,1);
		            	obtenerUl.removeChild(newLi);
		    		}	
				}
			}
		});

		/*Filtros para sabe quien asiste*/
		ocultar.addEventListener("click",function (){
			//Comprobamos que este marcado el check de confirmado y que el atributo de la clase sea distinto a responded para ocultarlo.
				if(marcado.checked==true && newLi.getAttribute("class") != "responded"){
					newLi.style.display = "none";
				}else{
					newLi.style.display = "block";
				}
		});
}
