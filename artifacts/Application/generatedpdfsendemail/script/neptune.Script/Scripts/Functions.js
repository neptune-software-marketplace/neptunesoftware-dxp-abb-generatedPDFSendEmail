var pdfAttachment;

function createDataURL(pdf) {
    //Register BLOBs on the application.
    jQuery.sap.addUrlWhitelist("blob");
    //convert the base64 to binary and insert it in a byte array.
    var decodedPdfContent = atob(pdf);
    var byteArray = new Uint8Array(decodedPdfContent.length);
    for (var i = 0; i < decodedPdfContent.length; i++) {
        byteArray[i] = decodedPdfContent.charCodeAt(i);
    }
    //create a BLOB and a URL
    var blob = new Blob([byteArray.buffer], { type: "application/pdf" });
    var pdfurl = URL.createObjectURL(blob);

    return pdfurl;
}

function generatePDF() {
    var header_data = {};

    header_data.purchOrder = modeloSimpleFormHeader.oData.purchOrder;
    header_data.companyCode = modeloSimpleFormHeader.oData.companyCode;

    var tablePurchDocItems = modeloTablePurchDocumentItems.oData;

    //Calc total invoice amount
    header_data.totalAmount = 0;

    for (let i = 0; i < tablePurchDocItems.length; i++) {
        header_data.totalAmount = header_data.totalAmount + tablePurchDocItems[i].amount;
    }

    var pdfData = { pdfHeader: header_data, pdfTableItems: tablePurchDocItems }; //data to send for the PDF template

    //Send the PDF data into the PDF Designer template
    $.ajax({
        type: "POST",
        url: "/pdf/purchorder_pdf", //the pdf designer template to which the data will be sent
        data: pdfData,
        success: function (data) {
            // Show PDF after decode into base 64
            console.log("data:application/pdf;base64," + data);

            oApp.setBusy(false);

            var temp = data;

            pdfAttachment = temp;

            var pdfurl = createDataURL(temp);

            console.log(pdfurl);

            oPDFViewer.setSource(pdfurl);

            oApp.to(oPageViewPDF);
        },
        error: function (result, status) {
            if (data.responseJSON && result.responseJSON.status)
                console.error(data.responseJSON.status);

            oApp.setBusy(false);
        },
    });

    console.log("PDFData:");
    console.log(pdfData);
}
