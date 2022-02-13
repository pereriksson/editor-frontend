import { jsPDF } from "jspdf";

class PdfApi {
    exportPdf(content) {
        const maxLength = 180;
        const startY = 20;

        const doc = new jsPDF();

        let template = document.createElement("template");
        template.innerHTML = content;
        let y = startY;

        const styles = {
            "H1": {
                paragraphOffset: 15,
                fontSize: 32,
                lineOffset: 12
            },
            "H2": {
                paragraphOffset: 15,
                fontSize: 28,
                lineOffset: 12
            },
            "H3": {
                paragraphOffset: 15,
                fontSize: 24,
                lineOffset: 12
            },
            "H4": {
                paragraphOffset: 15,
                fontSize: 20,
                lineOffset: 12
            },
            "H5": {
                paragraphOffset: 15,
                fontSize: 16,
                lineOffset: 12
            },
            "H6": {
                paragraphOffset: 15,
                fontSize: 12,
                lineOffset: 12
            },
            "PRE": {
                paragraphOffset: 12,
                fontSize: 12,
                lineOffset: 12
            },
            "P": {
                paragraphOffset: 14,
                fontSize: 12,
                lineOffset: 7
            }
        };

        Array.from(template.content.children).forEach(c => {
            const style = styles[c.tagName];
            doc.setFontSize(style.fontSize);

            const texts = doc.splitTextToSize(c.textContent, maxLength);

            texts.forEach(t => {
                if (y > 290) {
                    doc.addPage();
                    y = startY;
                }

                doc.text(t, 10, y);
                y += style.lineOffset;
            });
        })

        doc.save("Document.pdf");
    }
}

export default PdfApi;