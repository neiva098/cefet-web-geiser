// importação de dependência(s)
import express from 'express';
import { readFile } from 'fs';
const app = express();

// variáveis globais deste módulo
const PORT = 3000
const db = {}

// carregar "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
// você pode colocar o conteúdo dos arquivos json no objeto "db" logo abaixo
// dica: 1-4 linhas de código (você deve usar o módulo de filesystem (fs))

readFile('server/data/jogadores.json', (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        db.jogadores = JSON.parse(data);
    }
});

readFile('server/data/jogosPorJogador.json', (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        db.jogosPorJogador = JSON.parse(data);
    }
});


// configurar qual templating engine usar. Sugestão: hbs (handlebars)
//app.set('view engine', '???qual-templating-engine???');
//app.set('views', '???caminho-ate-pasta???');
// dica: 2 linhas

app.set('view engine', 'hbs');
app.set('views', 'server/views');

// EXERCÍCIO 2
// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
// dica: o handler desta função é bem simples - basta passar para o template
//       os dados do arquivo data/jogadores.json (~3 linhas)

app.get('/', (req, res) => {
    res.render('index.hbs', db.jogadores, (err, html) => {
        if (err) {
            res.status(500).send(`Error: ${err}`);
        }
        else {
            res.send(html);
        }
    });
});

// EXERCÍCIO 3
// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
// dica: o handler desta função pode chegar a ter ~15 linhas de código


// EXERCÍCIO 1
// configurar para servir os arquivos estáticos da pasta "client"
// dica: 1 linha de código


// abrir servidor na porta 3000 (constante PORT)
// dica: 1-3 linhas de código
app.use(express.static('client'));

app.get('/api', (req, res, next) => {
    res.send('Geiser v1.0.1')
})

app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});