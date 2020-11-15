var param = {
	"auto" : true,
	"criterion" : "gini",
	"max_depth" : 10,
}

$(function(){
	$('#trainButton').click(function(){
		$('#trainButton').hide();
		$('#trainParam').hide();
		$('#trainLoader').show();

		console.log(JSON.stringify(param));
		$.ajax({
			url: '/train',
			type: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: JSON.stringify(param),
			success: function(response){
				$('#trainLoader').hide();
                $('#trainResult').show();

                result = JSON.parse(response)
                console.log(result);

                var accuracy = (result['accuracy'] * 100).toPrecision(2);
                $('#resultAccuracy').text(`${accuracy} %`);
                $('#resultCriterion').text(result['criterion']);
                $('#resultMaxDepth').text(result['max_depth']);

			},
			error: function(error){
				console.log(error);
			}
		});
	});

	$('#paramAuto').change(function(){
		param["auto"] = $(this).is(':checked');
		$('#paramManualForm').hide();
	});

	$('#paramManual').change(function(){
		param["auto"] = !$(this).is(':checked');
		$('#paramManualForm').show();
	});

	$("input[name='criterion']").click(function(){
		param["criterion"] = $("input[name='criterion']:checked").val();
	});

	$("#paramMaxDepth").change(function(){
		param["max_depth"] = $(this).val();
	});

	$('#paramAuto').prop('checked', true);
	$('#paramCriterionGini').prop('checked', true);
	$('#paramMaxDepth').val(10);
});