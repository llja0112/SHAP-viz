var shap_data;
$(document).ready(function(){
  $.getJSON("static/data.json", function(data){
    $('#loading_pane').addClass('d-none');
    $('#main_pane').removeClass('d-none');
    shap_data = data;
    if (window.SHAP){
      SHAP.ReactDom.render(
        SHAP.React.createElement(SHAP.AdditiveForceArrayVisualizer, data),
        document.getElementById('shap_plot')
      );
    }
    for(index in shap_data.explanations){
      $('#patients_select').append(
        '<option value="' + index + '">' + index + '</option>');
    }
    $('#patients_select_button').click(function(){
      console.log($('#patients_select').val());
    });
  });
});
