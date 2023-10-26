
// url sola = https://opentdb.com/api.php + (cantidad preguntas) ?amount=10 + (categoria) &category=17 + (dificultad) &difficulty=medium + (tipo) &type=boolean
// https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple

const apiURL = 'https://opentdb.com/api.php?amount=10';
const categoryOption = document.getElementById ('inputGroupSelect01');
const difficultyOption = document.getElementById ('inputGroupSelect02');
const typeOption = document.getElementById ('inputGroupSelect03'); 
const trivia = document.getElementById ('info_trivia');
const tuPuntaje = document.getElementById ('puntaje_total')

let respuestasTexto = '';
let arrayRespuestasIncorrectas = '';
let respuestasCorrecta = '';

empezar.addEventListener ('click', buscarPreguntas);

function buscarPreguntas () {
    let category = `&category=${categoryOption.value}`
    let difficulty = `&difficulty=${difficultyOption.value}`
    let type = `&type=${typeOption.value}`

    fetch (`${apiURL}${category}${difficulty}${type}`)
        .then (datos => {
            if (datos.status === 404) {
                alert ('Opción inválida')
            } else {
                return datos.json()
            } 
        })
        .then (response => mostrarTrivia (response))
}

function mostrarTrivia (response){
    console.log (response)
    trivia.innerHTML = '';   

    const {results} = response;
    console.log (results)

    let contador = 0;

    results.forEach (i => {
        const preguntaTexto = document.createElement("div");
        preguntaTexto.textContent = i.question;
        trivia.append (preguntaTexto);
        
        let arrayRespuestasIncorrectas = i.incorrect_answers;
        let respuestasCorrecta = i.correct_answer;
        let arrayTodasRespuestas = [...arrayRespuestasIncorrectas, respuestasCorrecta];

        arrayTodasRespuestas.sort().reverse();

        let opcionesPregunta = [];

        arrayTodasRespuestas.forEach (i => {
            let respuestasTexto = document.createElement("button");
            respuestasTexto.disabled = false;
            respuestasTexto.type = 'submit';
            respuestasTexto.id = 'button_respuesta'
            respuestasTexto.textContent = i;
            trivia.append (respuestasTexto) 

            opcionesPregunta.push(respuestasTexto);

            respuestasTexto.addEventListener('click', function(){
                opcionesPregunta.forEach (a => {                    
                    a.disabled = true;                 
                })

                respuestasTexto.disabled = true;
                respuestasTexto.style.backgroundColor = 'rgb(0, 221, 255)';  
                respuestasTexto.style.color = 'rgb(0, 0, 0)';           

                if (respuestasTexto.textContent === respuestasCorrecta){
                    contador = contador + 100
                } else {
                    contador = contador
                }

                tuPuntaje.textContent = contador
            })
        })        
    })    
}