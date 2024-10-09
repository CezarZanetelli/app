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

const { select, input, checkbox } = require('@inquirer/prompts')

const fs = require("fs").promises

let mensagem = "Bem vindo ao App de Metas";

let metas

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {}
    metas = []
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"})
   
    if(meta.length == 0) {
        mensagem = 'A meta não pode ser vazia.'
         return    
    }

    metas.push(
        { value: meta, checked: false }    
    )

    mensagem = "Meta cadastrada com sucesso!"
}


    const listarMetas = async () => {
        if(metas.length == 0) {
            mensagem = "Não existem metas!"
            return
        }

        const respostas = await checkbox({
            message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa",
            choices: [...metas],
            instructions: false,
        })

        metas.forEach((m) => {
            m.checked = false
        })

    if(respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada!"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta 
        })

        meta.checked = true
    })

      mensagem = 'Meta(s) marcada(s) como concluída(s)'
    }

const metasRealizadas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const realizadas = metas.filter((meta) => {
         return meta.checked
    })
    
    if(realizadas.length == 0) {
        mensagem = 'Não existe metas realizadas! :('
        return
    } 

await select({
    message: "Metas Realizadas: " + realizadas.length,
    choices: [...realizadas]
  })
}

const metasAbertas = async () => { 
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const abertas = metas.filter((meta) => {
        return meta.cheked != true 
//        return meta.checked != true OU return !meta.cheked (inverte o valor do boolean)
    })

    if(abertas.length == 0) {
        mensagem = "Não existe metas abertas! :)"
        return
    }

    await select({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checkbox: false }
    })

    const itemsADeletar = await checkbox({
            message: "Selecione o item para deletar",
            choices: [...metasDesmarcadas],
            instructions: false,   
    })

    if(itemsADeletar.length == 0) {
        mensagem = "Nenhum item para deletar!"
        return
    }

    itemsADeletar.forEach((item) => {
        metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"

   }

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
        await carregarMetas()

    while(true){
        mostrarMensagem()
        await salvarMetas()

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
            name: "Metas realizadas",
            value: "realizadas"  
        },
        {
            name: "Metas abertas",
            value: "abertas"  
        },
        {
            name: "Deletar metas",
            value: "deletar"  
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
            break
        case "listar":
            await listarMetas()
            break
        case "realizadas":
            await metasRealizadas()
            break
        case "abertas":
            await metasAbertas()
            break
        case "deletar":
            await deletarMetas()
            break       
        case "sair":
            console.log("Até a próxima!")
            return
     }
    }
}

start()


