// server/utils/printer.js

const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');
const { print } = require('pdf-to-printer');

// Função para gerar o PDF da comanda para impressoras POS de 58mm
function generateComandaPDF(comanda) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: [58 * 2.83, 167], // 58mm de largura, altura inicial, ajustável dinamicamente
        margin: 5 // Margem mínima para maximizar o espaço
      });
      const tempDir = path.join(__dirname, '../../temp');
      const pdfPath = path.join(tempDir, `comanda-${comanda.id}.pdf`);

      // Criar o stream de gravação para o PDF
      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);

      // Cabeçalho
      doc.fontSize(10).text('Desmantelo Music Bar', {
        align: 'center',
        underline: true
      });

      doc.moveDown(0.5);

      doc.fontSize(9).text(`Comanda - Mesa ${comanda.mesaId}`, {
        align: 'center'
      });

      doc.moveDown(0.5);

      // Linha de separação
      doc.moveTo(5, doc.y).lineTo(53, doc.y).stroke();

      doc.moveDown(0.5);

      // Itens da comanda
      doc.fontSize(8).text('Itens:', { align: 'left' });

      comanda.itens.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.nome} - ${item.quantidade}x - R$${item.preco.toFixed(2)}`, {
          align: 'left'
        });
        doc.moveDown(0.2);
      });

      // Linha de separação
      doc.moveTo(5, doc.y).lineTo(53, doc.y).stroke();

      // Total
      doc.moveDown(0.5);
      doc.fontSize(8).text(`Total: R$${comanda.getTotal().toFixed(2)}`, {
        align: 'right',
        bold: true
      });

      // Rodapé
      doc.moveDown(1.0);
      doc.fontSize(7).text('Obrigado pela preferência!', {
        align: 'center'
      });

      doc.end(); // Finalizar o documento PDF

      writeStream.on('finish', () => {
        resolve(pdfPath); // PDF gerado com sucesso
      });

      writeStream.on('error', (error) => {
        reject(error); // Lidar com erros durante a gravação
      });

    } catch (error) {
      reject(error); // Lidar com erros na criação do PDF
    }
  });
}

// Função para imprimir a comanda
async function printComanda(pdfPath) {
  try {
    await print(pdfPath); // Usar a biblioteca `pdf-to-printer` para imprimir o PDF
  } catch (error) {
    throw new Error(`Erro ao imprimir o PDF: ${error.message}`);
  }
}

module.exports = { generateComandaPDF, printComanda };
