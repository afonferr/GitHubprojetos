import React, { useState } from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';
import useStore from '../store/travelStore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const SettingsPage: React.FC = () => {
  const trips = useStore((state) => state.trips);
  const exportTrip = useStore((state) => state.exportTrip);

  const [exportFormat, setExportFormat] = useState<'json' | 'pdf'>('json');
  const [selectedTripForExport, setSelectedTripForExport] = useState(trips[0]?.id || '');

  const handleExportJSON = () => {
    if (!selectedTripForExport) return;
    const data = exportTrip(selectedTripForExport);
    const element = document.createElement('a');
    const file = new Blob([data], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `travel-plan-${selectedTripForExport}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExportPDF = async () => {
    if (!selectedTripForExport) return;
    
    try {
      // Create a temporary element with trip content
      const trip = trips.find(t => t.id === selectedTripForExport);
      if (!trip) return;

      const element = document.createElement('div');
      element.style.padding = '20px';
      element.style.backgroundColor = 'white';
      element.innerHTML = `
        <h1 style="font-size: 24px; margin-bottom: 10px;">${trip.name}</h1>
        <p style="font-size: 16px; color: #666; margin-bottom: 20px;">${trip.destination}</p>
        ${trip.description ? `<p style="margin-bottom: 20px;">${trip.description}</p>` : ''}
        
        <h2 style="font-size: 18px; margin-top: 20px; margin-bottom: 10px;">Locais (${trip.locations.length})</h2>
        ${trip.locations.map(loc => `
          <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            <h3 style="font-weight: bold; margin-bottom: 5px;">${loc.name}</h3>
            <p style="margin: 5px 0;">${loc.description}</p>
            ${loc.address ? `<p style="margin: 5px 0; color: #666;"><strong>Morada:</strong> ${loc.address}</p>` : ''}
            ${loc.ticketPrice ? `<p style="margin: 5px 0; color: #666;"><strong>Preço:</strong> ${loc.ticketPrice}</p>` : ''}
          </div>
        `).join('')}
        
        <h2 style="font-size: 18px; margin-top: 20px; margin-bottom: 10px;">Checklist (${trip.checklist.length})</h2>
        <ul>
          ${trip.checklist.map(item => `
            <li style="margin: 5px 0; text-decoration: ${item.completed ? 'line-through' : 'none'};">
              ${item.text} ${item.category ? `(${item.category})` : ''}
            </li>
          `).join('')}
        </ul>
      `;
      document.body.appendChild(element);

      const canvas = await html2canvas(element, { backgroundColor: '#ffffff' });
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`travel-plan-${selectedTripForExport}.pdf`);
      document.body.removeChild(element);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar PDF');
    }
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          // Parse and import logic would go here
          alert('Funcionalidade de importação em desenvolvimento');
        } catch (error) {
          alert('Erro ao importar arquivo');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Definições</h1>

      {/* Export Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Exportar Viagem
        </h2>
        <p className="text-slate-600 mb-6">Exporte seus planos de viagem em diferentes formatos</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Selecionar Viagem
            </label>
            <select
              value={selectedTripForExport}
              onChange={(e) => setSelectedTripForExport(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {trips.map((trip) => (
                <option key={trip.id} value={trip.id}>
                  {trip.name} - {trip.destination}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Formato
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="json"
                  checked={exportFormat === 'json'}
                  onChange={(e) => setExportFormat(e.target.value as 'json' | 'pdf')}
                  className="w-4 h-4"
                />
                <span className="text-slate-700">JSON (Importável)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="pdf"
                  checked={exportFormat === 'pdf'}
                  onChange={(e) => setExportFormat(e.target.value as 'json' | 'pdf')}
                  className="w-4 h-4"
                />
                <span className="text-slate-700">PDF (Imprimível)</span>
              </label>
            </div>
          </div>

          <button
            onClick={exportFormat === 'json' ? handleExportJSON : handleExportPDF}
            className="w-full px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Exportar como {exportFormat.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Importar Viagem
        </h2>
        <p className="text-slate-600 mb-6">Importe um arquivo de viagem previamente exportado</p>

        <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-primary-500 transition">
          <div className="text-center">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-700 font-medium">Clique ou arraste um arquivo JSON aqui</p>
          </div>
          <input
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            className="hidden"
          />
        </label>
      </div>

      {/* Storage Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Informações de Armazenamento</h2>
        <p className="text-blue-800 text-sm">
          Seus dados são armazenados localmente no seu navegador. Para não perder os seus dados,
          exporte regularmente suas viagens. Os dados serão perdidos se limpar o cache do navegador.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
