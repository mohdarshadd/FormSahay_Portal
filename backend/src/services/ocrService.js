const { PDFParse } = require('pdf-parse');
const Tesseract = require('tesseract.js');

const extractText = async (fileBuffer, mimeType, originalName) => {
  const isPdf = mimeType === 'application/pdf' || originalName.toLowerCase().endsWith('.pdf');

  if (isPdf) {
    let pdf = null;
    try {
      console.log(`📄 Parsing PDF using pdf-parse: ${originalName}`);
      pdf = new PDFParse({ verbosity: 0, data: fileBuffer });
      await pdf.load();
      const result = await pdf.getText();
      const text = result.text ? result.text.trim() : "";
      
      // If the text is sufficiently populated, return it.
      if (text.length > 20) {
        console.log(`✅ Extracted ${text.length} characters of selectable text from PDF.`);
        return {
          text,
          method: 'pdf-parse',
          success: true
        };
      }
      console.log(`⚠️ Selected text in PDF was too short (${text.length} chars). Falling back to image OCR if possible...`);
    } catch (err) {
      console.error("Error parsing native PDF text:", err.message);
    } finally {
      if (pdf) try { pdf.destroy(); } catch (e) { /* ignore */ }
    }
  }

  // Fallback / Image handling: Run Tesseract OCR (with English and Hindi support)
  let worker = null;
  try {
    console.log(`📷 Running Tesseract OCR (eng+hin) on file: ${originalName}`);
    
    worker = await Tesseract.createWorker('eng+hin');
    const { data: { text, confidence } } = await worker.recognize(fileBuffer).catch(err => {
      return { data: { text: '', confidence: 0 } };
    });

    console.log(`✅ OCR Complete. Confidence: ${confidence}%. Extracted ${text.length} characters.`);
    
    return {
      text: text.trim(),
      method: 'tesseract',
      confidence,
      success: text.trim().length > 0
    };
  } catch (err) {
    console.error("OCR recognition error:", err.message);
    return {
      text: "",
      method: 'tesseract',
      success: false,
      error: err.message
    };
  } finally {
    if (worker) try { await worker.terminate(); } catch (e) { /* ignore */ }
  }
};

module.exports = { extractText };
