function PDFgen(html) {
	pdf.htmlToPDF({
	    data: html,
	    documentSize: "A4",
	    landscape: "portrait",
	    type: "share" //use share to open the open-with-menu.
	}, this.success, this.failure);
}
