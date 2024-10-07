/*
// Hello World 
// Variável Global
const mensagem = "olá eu!"

// Variável Local
{
    const mensagem = "olá mundo!"
    console.log(mensagem)
}

console.log(mensagem);
// pode ser números tambem, ex: ("2 1.4")
*/

// Arrays, objetos
//let metas = ["Cezar", "Alo"]

//console.log(metas[1] + ", " + metas[0])

let meta = {
    value: 'ler um livro por mês',
    checked: false,
    isChecked: (info) => {
    console.log(info) 
  }
}  

//meta.isChecked ou meta.log -> os dois funcionam
meta.isChecked(meta.value)

// function // arrow function
const criarMeta = () => {}


