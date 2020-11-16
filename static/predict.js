
$(function () {
    // this is the id of the form
    $('#predictButton').click(function (e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        var form = $('#predictForm');
        var predictData = getParsedPredictData(form);
        console.log(JSON.stringify(predictData));
        $.ajax({
            type: 'POST',
            url: '/predict',
			contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(predictData), // serializes the form's elements.
            success: function (response) {
                $('#predictionResultCard').show()
                result = JSON.parse(response)
                console.log(result)
                if (result['class'] == 0) {
                    $('#predictionClass').text('Negative');
                    $("#predictionClass").removeClass("red-text");
                    $("#predictionClass").addClass("green-text");
                } else {
                    $('#predictionClass').text('Positive');
                    $("#predictionClass").removeClass("green-text");
                    $("#predictionClass").addClass("red-text");
                }
            }
        });
    });

    console.log('AAAAAAAAa')
});

function getParsedPredictData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        var val = n['value'];
        if (val == "") val = 0;
        else if(val == "on") val = 1;
        indexed_array[n['name']] = parseInt(val);
    });

    console.log(indexed_array);
    
    return indexed_array;
}
