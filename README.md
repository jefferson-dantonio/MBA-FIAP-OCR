<h1 align="center">
    <p>Solution Sprint - OCR Builtcode</p>
</h1>

<p>
O SISTEMA FAZ A LEITURA DO LOTE DE CUPONS FISCAIS DISPONÍVEIS EM UM DIRETÓRIO DE ARQUIVOS.<br>

O SISTEMA REALIZA O TRATAMENTO DA IMAGEM E EXTRAI AS INFORMAÇÕES:<br>
- NOME
- ESTABELECIMENTO
- CPF
- CLIENTE
- ITENS
- VALOR TOTAL
O SISTEMA GERA UM ARQUIVO CSV COM OS DADOS DOS CUPONS EM UM DIRETORIO.<br>
</p>

## :computer: Como rodar  a aplicação:
### No terminal:
### clone o projeto:<br>
```
git clone <https://github.com/jefferson-dantonio/fiap-ocr.git>
```
### Acesse a pagina do projeto:<br>
```
cd fiap-ocr
```
### Baixe as dependencias:<br>
```
$ npm i
```
### Altera a imagem a ser analisada:<br>
```
$ let image = await loadImage('./cupom.jpg');
```

### Execute a aplicação:<br>
```
$ npm start
```
 
## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [OpenCv](https://opencv.org/)
- [Tessract](https://github.com/tesseract-ocr/tesseract/)



## Autores
ALAN SILVA BRASILINO<br>
JEFFERSON D'ANTONIO MALAQUIAS<br>
JOSE LUCIANO MATOS DA SILVA


