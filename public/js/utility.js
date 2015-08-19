$(function() {

	// Set cookie if dropdown set.
	if ($.cookie('_selectedState') != null)
	{
		$('#select-state').val($.cookie('_selectedState'));
	}

	// On Change event for state dropdown, render detail view if data is found.
    $('#select-state').change(function() {
    	var selectedState = this.selectedOptions[0].value;

    	if (selectedState === '#')
    	{
    		$.removeCookie('_selectedState');
    		return;
    	}

    	$.cookie('_selectedState', selectedState);
    	window.location = window.location.origin + '/state/' + this.selectedOptions[0].value;
	});
});