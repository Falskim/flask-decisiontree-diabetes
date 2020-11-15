/* global FileReader, Papa, Handsontable */

var handsontableContainer = document.getElementById('handsontable-container')

var DATASET_URL = "https://raw.githubusercontent.com/Falskim/datamining-decisiontree-diabetes/main/diabetes_data_upload.csv"

var request = new XMLHttpRequest();
request.open('GET', DATASET_URL, true);
request.responseType = 'blob';
request.onload = function () {
    var reader = new FileReader()

    reader.onload = function (e) {
        var csv = e.target.result
        var data = Papa.parse(csv, {
            header: true,
            skipEmptyLines: true
        })
        console.log('DataURL:', e.target.result)
        // reset container
        handsontableContainer.innerHTML = ''
        handsontableContainer.className = ''

        Handsontable(handsontableContainer, {
            data: data.data,
            rowHeaders: true,
            colHeaders: data.meta.fields,
            columnSorting: true
        })
    }

    reader.readAsText(request.response)
};
request.send();