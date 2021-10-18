const findCPF = (text) => {
    const couponTexts = text.split(' ');

    const cpf = couponTexts.find(value => /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(value));

    return cpf || findCpfOrCnpj(text, 'CPF');
}

const findCNPJ = (text) => {
    const couponTexts = text.split(' ');

    const cnpj = couponTexts.find(value => /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(value));

    return cnpj || findCpfOrCnpj(text, 'CNPJ');;
}

const findCpfOrCnpj = (text, type) => {
    const couponLines = text.split('\n');
    let result = couponLines.find(value => value.toUpperCase().indexOf(type) !== -1);

    if(result) {
        const numberPattern = /\d+/g;

        const arrNumbers = result.match( numberPattern )
        
        let numbers;
        if(arrNumbers && arrNumbers.length > 0) numbers = arrNumbers.join('');

        if(numbers.length === 12 || numbers.length === 15) {
            numbers = numbers.substring(1, numbers.length);
        }

        if(numbers.length === 11) {
            result = formatCPF(numbers);
        } 
        else if(numbers.length === 14) {
            result = formatCNPJ(numbers);
        } 
        else result = ''
    }

    return result || '';
}

const findCompany = (text) => {
    const couponLines = text.split('\n');

    const companyTypes = [
        ' MEI', // Microempreendedor individual
        ' EIRELI', // Empresa Individual de Responsabilidade Limitada
        ' EI', // Empresário Individual
        ' Ltda', // Sociedade Empresária Limitada
        ' SS', // Sociedade Simples
        ' SA', // Sociedade Anônima
        ' SLU', // Sociedade Limitada Unipessoal
    ];

    const company = couponLines.find(value => 
        companyTypes.find(type => value.toUpperCase().indexOf(type) !== -1));

    return company || '';
}

const findTotal = (text) => {
    const couponLines = text.split('\n');
    const total = couponLines.find(value => value.toUpperCase().indexOf('TOTAL') !== -1);

    return total || '';
}


const findItems = (text) => {
    const couponLines = text.split('\n');
    let hasItems = false;
    const items = couponLines.filter((value) => {
        if(value.toUpperCase().indexOf('ITEM') !== -1) hasItems = true;
        if(value.toUpperCase().indexOf('TOTAL') !== -1) hasItems = false;
        if(hasItems) return value
    });

    return items || '';
}

const formatCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

const formatCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]/g, "");
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

module.exports = {
    findCPF,
    findCNPJ,
    findCompany,
    findTotal,
    findItems,
}