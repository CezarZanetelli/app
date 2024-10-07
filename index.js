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


/*
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

let metas = [
    meta,
    {
        value: "caminhar 20 minutos todos os dias",
        checked: false
    }
]

console.log(metas[1].value)
*/


/*
//[0] = 'ler um livro por mês'
let meta = {
    value: 'ler um livro por mês',
    checked: false,
  }

//[1] = 'caminhar 20 minutos todos os dias'
let metas = [
    meta,
    {
        value: "caminhar 20 minutos todos os dias",
        checked: false
    }
]

console.log(metas[0].value)
*/

/*
const start = () => {
    let count = 0
    //count 0 até 9 / <= 1 até 10
    while(count < 10){
        console.log(count)
        count = count + 1
    }
}

start()
*/

/*
// select = caixinha de seleção
const { select } = require('@inquirer/prompts')

const start = async () => {

    while(true){

const opcao = await select({
    message: "Menu >",
    choices: [
        {
    name: "Cadastrar meta",
    value: "cadastrar"
        },
        {
            name: "Listar metas",
            value: "listar"  
        },
        {
            name: "Sair",
            value: "sair"
        }
    ]
})

     switch(opcao) {
        case "cadastrar":
            console.log("vamos cadastrar")
            break
            case "listar":
                console.log("vamos listar")
                break
                case "sair":
                    console.log("Até a próxima!")
                    return
     }
    }
}

start()
*/

const { select, input } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"})
    if(meta.length == 0) {
console.log('A meta não pode ser vazia.')
return
    }

    metas.push(
        { value: meta, checked: false }    
    )

metas.push({})
}

const start = async () => {

    while(true){

const opcao = await select({
    message: "Menu >",
    choices: [
        {
    name: "Cadastrar meta",
    value: "cadastrar"
        },
        {
            name: "Listar metas",
            value: "listar"  
        },
        {
            name: "Sair",
            value: "sair"
        }
    ]
})

     switch(opcao) {
        case "cadastrar":
         await cadastrarMeta()
         console.log(metas)
            break
            case "listar":
                console.log("vamos listar")
                break
                case "sair":
                    console.log("Até a próxima!")
                    return
     }
    }
}

start()


