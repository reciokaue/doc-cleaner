// import { PDFDocument, StandardFonts } from 'pdf-lib';
// import Epub from 'epub2';
// import EpubGen from 'epub-gen';
import {getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import jsPDF from 'jspdf';
import pdfToText from 'react-pdftotext';

export async function processFile(file: File, textToRemove: string): Promise<Blob> {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  // const cleanedContent = '';

  if (fileExtension === 'pdf') {
    // GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.mjs'
    
    // // Carregar o arquivo PDF e extrair o texto
    // const arrayBuffer = await file.arrayBuffer();
    // const loadingDoc = getDocument({data: arrayBuffer});
    // const newDoc = new jsPDF()

    pdfToText(file)
    .then(text => console.log(text))

    console.log('chegou aqui')


    // loadingDoc.promise.then(async (pdf) => {
    //   console.log('PDF LOADED')

    //   // for (let pageNum = 0; pageNum < pdf.numPages; pageNum++) {
    //   //   const page = await pdf.getPage(pageNum)
    //   //   const pageText = await page.getTextContent()
    //   //   console.log(pageText)
    //   //   newDoc.text(pageText, 10, 10)
    //   // }

    //   const pageNumber = 1;
    //   pdf.getPage(pageNumber).then(function(page) {
    //     page.getTextContent().then((text) => {
    //       console.log(text)
    //     })
    //     //   console.log(pageText)
    //   })

    // })

    // newDoc.save()

    // const pages = pdfDoc.getPages();

    // Remover o texto repetitivo de cada página
    // pages.forEach((page) => {
    //   const text = page.getTextContent().then((textContent) => {
    //     let pageText = textContent.items.map((item) => item.str).join(' ');
    //     pageText = pageText.replace(new RegExp(textToRemove, 'g'), '');
    //     page.drawText(pageText, {
    //       x: 50,
    //       y: 50,
    //       size: 12,
    //       font: pdfDoc.embedFont(StandardFonts.Helvetica),
    //     });
    //   });
    // });

    // const pdfBytes = await pdfDoc.save();
    return new Blob  ;
  }

  // if (fileExtension === 'epub') {
  //   const epub = await Epub.createAsync(file);
  //   let content = '';
  //   for (const item of epub.flow) {
  //     content += await epub.getTextAsync(item.id);
  //   }
  //   cleanedContent = content.replace(new RegExp(textToRemove, 'g'), '');

  //   const epubOptions = {
  //     title: 'Cleaned EPUB',
  //     author: 'EPUB Cleaner',
  //     content: [{ title: 'Content', data: cleanedContent }],
  //   };
  //   const buffer = await new EpubGen(epubOptions).promise;
  //   return new Blob([buffer], { type: 'application/epub+zip' });
  // }

  throw new Error('Unsupported file type');
}
