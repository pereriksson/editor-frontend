import { jsPDF } from "jspdf";

class PdfApi {
    exportPdf() {
        const doc = new jsPDF();

        doc.text("Hello world!", 10, 10);
        doc.save("a4.pdf");
    }
}

export default PdfApi;