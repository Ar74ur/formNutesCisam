let pergunta = 0;
let prontuario = false;
let formulario = "";
let perguntas = ["Você já tem prontuário no CISAM?","Você concorda em fornecer seus dados pessoais ao CISAM de acordo com a Lei Geral de Proteção de dados (LGPD)?\n Para maiores informações sobre a LGPD, consultar: http://www.mpf.mp.br/servicos/lgpd/o-que-e-a-lgpd",
"Nome completo do(a) paciente:","Data de nascimento:","Número do seu celular pessoal.\n Registre o número do seu celular com DDD, por exemplo 8198765-4321.",
"Informe um e-mail pessoal para comunicação com o(a) paciente.\nCaso não tenha email pessoal, busque sua Unidade de Saúde da Família para pedir orientação ou use de uma pessoa próxima em constante contato com você",
"Número do CPF do(a) paciente :","Nome completo da mãe do(a) paciente:","CEP da Residência do(a) paciente:","Rua da Residência do(a) paciente:",
"Número da Residência do(a) paciente:","Complemento da Residência do(a) paciente:\n(Casa, Número do apartamento, entre outras identificações)",
"Bairro da Residência do(a) paciente:","Cidade da Residência do(a) paciente:","Estado da Residência do(a) paciente:",
"Número da Carteira Nacional de Saúde (CNS) do(a) paciente:","Informe seu nível de escolaridade","Informe sua Raça/Cor:","Qual é a sua identidade de gênero?"];
let maximo = perguntas.length
let person = {nome:"",nascimento:"",email:"",cpf:"",nomedamae:"",cep:"",rua:"",numeroendereco:"",complemento:"",bairro:"",cidade:"",
estado:"",numerocns:"",escolaridade:"",raca:"",genero:"",motivoprontuario:"",extra:[]};
let audio = new Audio()

const regexCpf = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;
const regexNome = /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/;
const regexData = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const regexPhone = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
const regexCep = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/;

function sendMessage(){
    var message = document.getElementById('message-input')
    if(!checkAnswer(message.value))
    {
        message.style.border = '1px solid red'
        return;
    }
    message.style.border = 'none'

    var btnSubmit = document.getElementById('btn-submit')

    btnSubmit.disabled = true
    btnSubmit.style.cursor = 'not-allowed'
    message.disabled = true


    showMessage(message.value)
    fillPerson(message.value)

    let audio = new Audio()
    audio.src = "audio/prontuario.mp3"

    btnSubmit.disabled = false
    btnSubmit.style.cursor = 'pointer'
    message.disabled = false
    message.value = ''
    pergunta+=1
    if(pergunta >= maximo){
        showResponse("Formulário enviado!");
        document.getElementById("btn-submit").disabled = true;
        postdata(person);
        console.log(person);
    }else if(pergunta == 16 && !prontuario){
        pergunta += 5;
        showResponse(perguntas[pergunta]);
    }else{
        showResponse(perguntas[pergunta]);
    }

    createInput();
    makeAudio();
    document.getElementById('history').scrollTop = document.getElementById('history').scrollHeight;
}

function showMessage(message){

    let phrases = message.split('\n');
    if(phrases.length > 1){
        message = "";
        phrases.forEach(phrase => {
            message += "," + phrase;
            
        });
        message[0] = ' ';
    }


    let historyBox = document.getElementById('history');

    let boxMyMessage = document.createElement('div')
    boxMyMessage.className = 'box-my-message'

    let myMessage = document.createElement('p')
    myMessage.className = 'my-message'
    myMessage.innerHTML = message

    boxMyMessage.appendChild(myMessage)

    historyBox.appendChild(boxMyMessage)
}

function showResponse(response){

    let phrases = response.split('\n');

    let historyBox = document.getElementById('history');


    phrases.forEach(phrase => {

        let boxResponseMessage = document.createElement('div');
        boxResponseMessage.className = 'box-response-message';

        let img = new Image();
        img.className = 'response-icon';
        img.src = 'image/user_icon.png';
        boxResponseMessage.appendChild(img);

        let chatResponse = document.createElement('p');
        chatResponse.className = 'response-message';
        chatResponse.innerHTML = phrase
        
        boxResponseMessage.appendChild(chatResponse);
        historyBox.appendChild(boxResponseMessage);
    });

}

function showHistory(message,response){
    let historyBox = document.getElementById('history');

    let boxMyMessage = document.createElement('div');
    boxMyMessage.className = 'box-my-message';

    let myMessage = document.createElement('p');
    myMessage.className = 'my-message';
    myMessage.innerHTML = message;

    boxMyMessage.appendChild(myMessage);

    historyBox.appendChild(boxMyMessage);

    let boxResponseMessage = document.createElement('div');
    boxResponseMessage.className = 'box-response-message';

    let chatResponse = document.createElement('p');
    chatResponse.className = 'response-message';
    chatResponse.innerHTML = response;

    boxResponseMessage.appendChild(chatResponse);

    historyBox.appendChild(boxResponseMessage);

    historyBox.scrollTop = historyBox.scrollHeight;
}

function createErrorMessage(message){

    let alertBox = document.getElementById('alert-box');

    let div = document.createElement('div');
    div.className = "alert";
    
    let closeButton = document.createElement('span');
    closeButton.className="closebtn";
    closeButton.onclick = function(){
        this.parentElement.style.display='none';
    }
    closeButton.innerText = "X";

    let p = document.createElement('p');
    p.innerHTML = message;

    div.appendChild(closeButton);
    div.appendChild(p);

    setTimeout(function(){ div.style.display = "none"; }, 6000);

    alertBox.appendChild(div);

}

function checkAnswer(value){
    //return true;

    if(!value){
        createErrorMessage("Preencha o campo abaixo");
        return false;
    }
    
    if(pergunta == 2 || pergunta == 7){
        if(!validaNome(value)){
            createErrorMessage("Nome inválido");
            return false;
        }
        return true;

    }else if(pergunta == 3){
        if(!validaData(value)){
            createErrorMessage("Formato de data inválido");
            return false;
        }
        return true;

    }else if(pergunta == 4){
        if(!validaPhone(value)){
            createErrorMessage("Número do celular inválido, padrão correto: 8198765-4321");
            return false;
        }
        return true;

    }else if(pergunta == 5){
        if(!validaEmail(value)){
            createErrorMessage("Formato de email inválido");
            return false;
        }
        return true;

    }else if(pergunta == 6){
        if(!validaCpf(value)){
            createErrorMessage("CPF inválido");
            return false;
        }
        return true;
        
    }else if(pergunta == 8){
        if(!validaCep(value)){
            createErrorMessage("CEP inválido");
            return false;
        }
        return true;
        
    }
    
    return true;
}

function getErrorMessage(){

}

function createInput(){
    let inputPos = document.getElementById('input-position');

    let teste = document.getElementById('message-input');
    if(teste){
        teste.parentElement.removeChild(teste);
    }

    if(pergunta == 0 || pergunta == 1 || pergunta == 16 || pergunta == 17 || pergunta == 18 || pergunta == 19 || pergunta == 20 ||
         pergunta == 21 || pergunta == 22 || (pergunta == 23 && formulario == "Histeroscopia Cirúrgica") ||
        (pergunta == 24 && formulario == "Histeroscopia Cirúrgica") || (pergunta == 23 && formulario == "Histeroscopia Diagnóstica")){
        let input = document.createElement('select');
        input.id = 'message-input';
        let options = getOptions(pergunta);

        options.forEach(option => {
            let optionElement = document.createElement('option');
            optionElement.text = option;
            input.add(optionElement);
        });

        if(formulario == "Climatério" || formulario == "Ginecologia Endócrina"){
            input.multiple = true;
        }

        inputPos.appendChild(input);
    }else{
        let input = document.createElement('input');
        input.type = "text";       
        input.id = 'message-input';
        input.placeholder = "Digite aqui...";
    
        inputPos.appendChild(input);
    }
}

function getOptions(){
    if(pergunta == 0 || pergunta == 1 || (pergunta == 22 && formulario == "Histeroscopia Cirúrgica")
     || (pergunta == 23 && formulario == "Histeroscopia Cirúrgica") || (pergunta == 24 && formulario == "Histeroscopia Cirúrgica")){
        return ["Sim","Não"];
    }else if(pergunta == 16){
        return ["Alfabetizado","Não alfabetizado","Fundamental completo","Fundamental incompleto","Médio completo","Médio incompleto"
    ,"Não sei informar","Especialização/Residência","Mestrado","Doutorado"];
    }else if(pergunta == 17){
        return ["Branca","Preta","Parda","Amarela","Indígena"];
    }else if(pergunta == 18){
        return ["Feminino","Masculino","Transgênero","Não binário","Prefiro não dizer","Outro"];
    }else if(pergunta == 19){
        return ["Tenho interesse em colocação de DIU","Tenho interesse em realizar uma das consultas",
        "Tenho interesse em realizar um procedimento disponível no CISAM","Tenho interesse em realizar um exame"];
    }else if(pergunta == 20){
        return ["Entendi."];
    }else if(pergunta == 21){
        return ["Climatério","Odontologia CISAM","Odontologia de pacientes da Faculdade de Odontologia da UPE",
        "Dermatologia","Ginecologia Endócrina","Histeroscopia Cirúrgica","Histeroscopia Diagnóstica","Prevenção da Gravidez"];
    }else if(formulario == "Climatério"){
        return ["Alterações nos órgãos sexuais","Depressão ou irritabilidade","Desconforto durante as relações sexuais",
        "Distúrbios menstruais","Diminuição da elasticidade da pele","Diminuição da libido","Diminuição do tamanho das mamas e perda da firmeza",
        "Ondas de calor","Suores noturnos prejudicando o sono","Tonturas e palpitações","Transpiração excessiva",
        "Aumento da gordura circulante no sangue","Aumento da porosidade dos ossos tornando-os mais frágeis","Nenhuma das opções acima"];
    }else if(formulario == "Odontologia CISAM"){
        return ["Gestante em pré-natal no CISAM","Fiz meu parto no CISAM (até 60 dias)","Adolescentes cadastrados em algum programa do CISAM",
        "Servidores ou Contratados do CISAM","Docentes do CISAM"];
    }else if(formulario == "Odontologia de pacientes da Faculdade de Odontologia da UPE"){
        return ["Dentística (restauração dentária/clareamento dentário)","Endodontia (tratamento de canal)"];
    }else if(formulario == "Dermatologia"){
        return ["Dra Ayana Karla","Dra Angela Simone","Dra Carolina Chacon","Dra Jane Martins","Dr. Paulo Guedes",
        "Não sou acompanhado por estes profissionais (1a consulta em Dermatologia)"];
    }else if(formulario == "Ginecologia Endócrina"){
        return ["Aumento de pelos no corpo","Leite no peito","Muita acne",
        "Menopausa precoce","Meninas com puberdade precoce", "Qualquer problema na menstruação","Síndrome dos ovários policísticos",
        "Quem nunca menstruou"," Nenhuma desses opções acima"];
    }else if(formulario == "Histeroscopia Diagnóstica"){
        if(pergunta == "22"){
            return ["Ainda tenho ciclo menstrual ativo","Estou na Menopausa","Estou com sangramento ativo","Não sei responder","Outro"];
        }else{
            return ["Sim","Não","Não sei responder"];
        }
    }else if(formulario == "Prevenção da Gravidez"){
        return ["Inserção DIU Mirena","Inserção DIU Cobre","Retirada do DIU","DIU mal posicionado","Troca de DIU pelo tempo de uso",
    "Orientação sobre qual método contraceptivo escolher","Não sei escolher uma das opções acima"];
    }
}

function fillPerson(value){
    if(pergunta == 0){
        if(value == "Sim"){
            prontuario = false
            perguntas.push("")
            perguntas.push("")
            perguntas.push("Qual especialista você está buscando?")
            maximo += 3
        }else{
            prontuario = true
            perguntas.push("Informe o motivo que está solicitando a abertura de prontuário.");
            perguntas.push("Para realização de consulta no CISAM é necessária a abertura do prontuário no CISAM.\nVocê deverá preencher todas as informações desse formulário, e depois de enviá-lo, você será redirecionado e enviará alguns documentos para nós no email telessaude.cisam@upe.br\n1 - Foto da FRENTE da Carteira de Identidade (RG) do (a) paciente (ou Foto da Certidão de Nascimento, se não possuir RG) do(a) paciente\n2 - Foto do VERSO da Carteira de Identidade (RG) do (a) paciente\n3 - Foto da FRENTE do Cadastro do CPF do(a) paciente\n4 - Foto do Comprovante de Residência ATUALIZADO (no máximo dos últimos três meses) do(a) paciente\n5 - Foto do da Carteira Nacional de Saúde (CNS) do(a) paciente\n6 - Foto do Documento de Encaminhamento para atendimento no CISAM assinado pelo profissional de saúde\nAssim que for criado o prontuário no CISAM, você receberá o número de registro por e-mail e poderá solicitar uma consulta no CISAM.")
            perguntas.push("Qual especialista você está buscando?");
            maximo += 3
            console.log(perguntas)
        }
    }else if(pergunta == 1){
        if(value == "Não"){
            window.close()
        }
    }else if(pergunta == 2){
        person.nome = value
    }else if(pergunta == 3){
        person.nascimento = value
    }else if(pergunta == 4){
        person.celular = value
    }else if(pergunta == 5){
        person.email = value
    }else if(pergunta == 6){
        person.cpf = value
    }else if(pergunta == 7){
        person.nomedamae = value
    }else if(pergunta == 8){
        person.cep = value
    }else if(pergunta == 9){
        person.rua = value
    }else if(pergunta == 10){
        person.numeroendereco = value
    }else if(pergunta == 11){
        person.complemento = value
    }else if(pergunta == 12){
        person.bairro = value
    }else if(pergunta == 13){
        person.cidade = value
    }else if(pergunta == 14){
        person.estado = value
    }else if(pergunta == 15){
        person.numerocns = value
    }else if(pergunta == 16){
        person.escolaridade = value
    }else if(pergunta == 17){
        person.raca = value
    }else if(pergunta == 18){
        person.genero = value
    }else if(pergunta == 19){
        person.motivoprontuario = value
    }else if(pergunta == 21){
        formulario = value
        if(value == "Climatério" || value == "Ginecologia Endócrina"){
            perguntas.push("Selecione abaixo os sinais e sintomas que você está apresentando, pode clicar em mais de um:");
            maximo++;
        }else if(value == "Odontologia CISAM"){
            perguntas.push("Selecione uma das opções indicando seu perfil:");
            maximo++;
        }else if(value == "Odontologia de pacientes da Faculdade de Odontologia da UPE"){
            perguntas.push("Selecione a especialidade odontológica de sua necessidade");
            maximo++;
        }else if(value == "Dermatologia"){
            perguntas.push("Selecione o profissional que já é acompanhado ou deseja ser atendido:");
            maximo++;
        }else if(value == "Histeroscopia Cirúrgica"){
            perguntas.push("Sangramento ativo?");
            perguntas.push("História de internamento por Anemia?");
            perguntas.push("História de Transfusão Sanguínea?");
            perguntas.push("Data da solicitação médica:");
            maximo += 4;
        }else if(value == "Histeroscopia Diagnóstica"){
            perguntas.push("Indique sua condição de saúde atual:");
            perguntas.push("A solicitação da histeroscopia diagnóstica é do CISAM?");
            perguntas.push("No caso de ainda ter ciclo menstrual ativo, qual a data provável do 1o dia do ciclo menstrual (se regular). Se for irregular, nos descreva como ocorre.");
            maximo += 4;
        }else if(value == "Prevenção da Gravidez"){
            perguntas.push("Escolha uma opções abaixo para indicar a sua necessidade atual");
            maximo++;
        }
    }else if(pergunta >= 22){
        person.extra.push(perguntas[pergunta] + ": " + value);
    }
}

function makeAudio(){
    audio.src = "audio/pergunta" + pergunta + ".mp3";
}

function validaNome(nome){
    let words = nome.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    let word = words.join(" ");
    return regexNome.test(word);
}

function validaCpf(cpf){
    return regexCpf.test(cpf);
}

function validaData(data){
    return regexData.test(data);
}

function validaPhone(data){
    return regexPhone.test(data);
}

function validaEmail(data){
    return regexEmail.test(data);
}

function validaCep(data){
    return regexCep.test(data);
}

window.onload = function() {
    showResponse(perguntas[pergunta])
    createInput();
    makeAudio();
};

function postdata(person) {
    const endereco = person.rua + ", " + person.numeroendereco + " - " + person.bairro + ", " + person.cidade + " - " + person.estado + " (" + person.complemento + ")";
    const json = {
        "nome": person.nome,
        "tel": person.celular,
        "email": person.email,
        "endereco": endereco,
        "cep": person.cep,
        "cpf": person.cpf,
        "nascimento": person.nascimento,
        "nome_mae": person.nomedamae,
        "cns": person.numerocns,
        "tipo": formulario,
        "extra": person.extra
    };

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost/nutes/inserir_rota.php", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {
            console.log("Data sent successfully");
        } else {
            console.error("Error sending data:", request.status);
        }
    });

    request.send(JSON.stringify(json));
}