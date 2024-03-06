// Custom Init - Happens only once when mounting the component
sap.ui.getCore().attachInit(function (startParams) {
    modeloSimpleFormHeader.setData(purchDocumentHeader);
    modeloTablePurchDocumentItems.setData(purchDocumentItems);
});
