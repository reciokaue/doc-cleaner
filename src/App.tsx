import { ChangeEvent, useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./components/ui/select";
import { processFile } from "./lib/fileProcessor";
import { saveAs } from 'file-saver';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [textToRemove, setTextToRemove] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [processedFile, setProcessedFile] = useState<Blob | null>(null);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/epub+zip')) {
      setFile(file);
    }
  };
  const removeFile = () => {setFile(null)};

  const handleProcessFile = async () => {
    // if (file && textToRemove) {
      const processed = await processFile(file, textToRemove);
      setProcessedFile(processed);
    // }
  };

  const handleDownload = () => {
    saveAs(processFile, newFileName);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-20 max-w-5xl mx-auto">
      <h1 className="font-bold text-2xl leading-relaxed">EPUB/PDF Cleaner</h1>
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 p-2"
      >
        {file ? (
          <span className="text-gray-500">
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </span>
        ) : (
          <span className="text-gray-500">Clique para selecionar um PDF ou EPUB</span>
        )}
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".pdf,.epub"
        onChange={handleFileChange}
        className="hidden"
      />
      {file && (
        <button
          onClick={removeFile}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Remover arquivo
        </button>
      )}

      <Input
        onChange={(e) => setTextToRemove(e.target.value)}
        placeholder="Insira o texto repetitivo que deseja remover"
        value={textToRemove}
      />
      <Input
        onChange={(e) => setNewFileName(e.target.value)}
        placeholder="Novo do documento"
        value={newFileName}
      />

      <div className="flex w-full gap-3 justify-end items-center">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Arquivo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Formato do arquivo</SelectLabel>
            <SelectItem value="epub">.EPUB</SelectItem>
            <SelectItem value="pdf">.PDF</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={handleDownload} variant='secondary' disabled={!file || !textToRemove || !processedFile}>
        Download
      </Button>
      <Button onClick={handleProcessFile}>
        Remover texto
      </Button>

      </div>


    </div>
  )
}

export default App
