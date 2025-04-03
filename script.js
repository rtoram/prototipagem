// Inicializa o palco do Konva.js
const stage = new Konva.Stage({
    container: 'container',
    width: 800,
    height: 500
});

const layer = new Konva.Layer();
stage.add(layer);

let selectedFont = 'Roboto';

// Função para adicionar texto arrastável
function addText() {
    const text = new Konva.Text({
        x: 50,
        y: 50,
        text: 'Texto Editável',
        fontSize: 20,
        fontFamily: selectedFont,
        fill: 'black',
        draggable: true
    });

    // Adiciona evento de clique para edição
    text.on('click', () => {
        const newText = prompt('Digite o novo texto:', text.text());
        if (newText) text.text(newText);
        layer.draw();
    });

    layer.add(text);
    layer.draw();
}

// Função para mudar a fonte
function changeFont() {
    selectedFont = document.getElementById('fontSelector').value;
    const allTexts = layer.getChildren(node => node.getClassName() === 'Text');
    allTexts.forEach(text => {
        text.fontFamily(selectedFont);
    });
    layer.draw();
}

// Função para exportar como HTML/CSS
function exportHTML() {
    let html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Protótipo Exportado</title>
    <link href="https://fonts.googleapis.com/css2?family=${selectedFont.replace(' ', '+')}&display=swap" rel="stylesheet">
    <style>
        body { margin: 0; padding: 0; }
        .container { position: relative; width: 800px; height: 500px; }
    `;

    let css = '';
    const allTexts = layer.getChildren(node => node.getClassName() === 'Text');
    allTexts.forEach((text, index) => {
        css += `
        #text-${index} {
            position: absolute;
            left: ${text.x()}px;
            top: ${text.y()}px;
            font-family: '${text.fontFamily()}', sans-serif;
            font-size: ${text.fontSize()}px;
            color: ${text.fill()};
        }
        `;
        html += `    <div id="text-${index}">${text.text()}</div>\n`;
    });

    html += `    </style>\n</head>\n<body>\n    <div class="container">\n${html}    </div>\n</body>\n</html>`;

    // Cria um arquivo para download
    const blob = new Blob([html], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'prototipo.html';
    link.click();
}
