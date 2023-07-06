
// let getPreguntas = async () => {
//     const response = await fetch ("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean")
//     const jsonData = await response.json()
//     console.log(jsonData.results[0])

//     for ( let i = ; i < jsonData.questions.length; i++){
//         console.log (`las preguntas son: ${jsonData.questions[i]}`)
//     }
// }


// url sola = https://opentdb.com/api.php + (cantidad preguntas) ?amount=10 + (categoria) &category=17 + (dificultad) &difficulty=medium + (tipo) &type=boolean
// https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple

const apiURL = 'https://opentdb.com/api.php?amount=10';
const categoryOption = document.getElementById ('inputGroupSelect01');
const difficultyOption = document.getElementById ('inputGroupSelect02');
const typeOption = document.getElementById ('inputGroupSelect03'); 
const trivia = document.getElementById ('info_trivia');
const impCategoria = document.getElementById ('categoria_seleccionada');
const pregunta = document.getElementById ('container_pregunta');
const respuestas = document.getElementById ('container_respuestas');

empezar.addEventListener ('click', buscarPreguntas);

function buscarPreguntas () {

    let category = `&category=${categoryOption.value}`
    let difficulty = `&difficulty=${difficultyOption.value}`
    let type = `&type=${typeOption.value}`

    window.fetch (`${apiURL}${category}${difficulty}${type}`)

    .then (datos => {
        if (datos.status === 404) {
            alert ('opcion invalida')
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


    results.forEach (i => {
        
        console.log (i)

        const preguntaTexto = document.createElement("div");
        preguntaTexto.textContent = i.question;

        trivia.append (preguntaTexto)
        
        const arrayRespuestasIncorrectas = i.incorrect_answers;
        const respuestasCorrecta = i.correct_answer;
        let arrayTodasRespuestas = arrayRespuestasIncorrectas.concat(respuestasCorrecta);
        arrayTodasRespuestas.sort().reverse();
        arrayTodasRespuestas.forEach (i => {
            const respuestasTexto = document.createElement("button");
            respuestasTexto.textContent = i;
            trivia.append (respuestasTexto) 
        })    
             
        console.log (arrayTodasRespuestas)
    })

}


