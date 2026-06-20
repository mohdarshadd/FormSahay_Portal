const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');

const extractText = async (fileBuffer, mimeType, originalName) => {
  const isPdf = mimeType === 'application/pdf' || originalName.toLowerCase().endsWith('.pdf');

  if (isPdf) {
    try {
      console.log(`📄 Parsing PDF using pdf-parse: ${originalName}`);
      const data = await pdfParse(fileBuffer);
      const text = data.text ? data.text.trim() : "";
      
      // If the text is sufficiently populated, return it.
      if (text.length > 150) {
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
    }
  }

  // Fallback / Image handling: Run Tesseract OCR (with English and Hindi support)
  try {
    console.log(`📷 Running Tesseract OCR (eng+hin) on file: ${originalName}`);
    
    // Tesseract can process standard image buffers directly
    const { data: { text, confidence } } = await Tesseract.recognize(
      fileBuffer,
      'eng+hin',
      {
        logger: m => console.log(`[Tesseract OCR] Progress: ${(m.progress * 100).toFixed(1)}% | Status: ${m.status}`)
      }
    );

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
  }
};

module.exports = { extractText };
