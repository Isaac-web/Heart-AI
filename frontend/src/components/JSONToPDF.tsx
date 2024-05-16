import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const JSONToPDF: React.FC = () => {
  const generatePDF = () => {
    const doc = new jsPDF();

    const jsonData = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };

    const jsonString = JSON.stringify(jsonData, null, 4);

    // Convert string to HTML
    const htmlString = `<pre>${jsonString}</pre>`;

    // Convert HTML to canvas
    html2canvas(document.querySelector('#pdf-content') as HTMLElement).then(
      (canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Add image to PDF
        doc.addImage(imgData, 'PNG', 10, 10);

        // Save PDF
        doc.save('json-to-pdf.pdf');
      }
    );
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
      <div id="pdf-content" style={{ display: 'none' }}>
        {/* JSON data will be displayed here */}
        <pre>
          {`
            {
              "key1": "value1",
              "key2": "value2",
              "key3": "value3"
            }
          `}
        </pre>
      </div>
    </div>
  );
};

export default JSONToPDF;
