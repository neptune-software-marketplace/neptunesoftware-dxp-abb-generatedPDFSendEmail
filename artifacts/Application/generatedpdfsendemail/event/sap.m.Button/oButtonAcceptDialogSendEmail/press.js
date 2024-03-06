var email = modeloDialogSendEmail.oData.email;

if (email === "" || email === null || email === undefined) {
    InputEmail.setValueState("Error");
    InputEmail.setValueStateText("Email field is empty");
    return;
}

oApp.setBusy(true);

oDialogSendEmail.close();
InputEmail.setValue();

var filename = "InvoiceNr" + modeloSimpleFormHeader.oData.purchOrder + ".pdf";

var options = {
    data: {
        email: email,
        attachments: { filename: filename, pdf: pdfAttachment },
    },
};

apiRestAPISendEmail(options);