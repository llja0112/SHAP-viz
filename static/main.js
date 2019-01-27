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
      // console.log($('#patients_select').val());
      patient_index = $('#patients_select').val();
      if (window.SHAP){
        SHAP.ReactDom.render(
          SHAP.React.createElement(SHAP.AdditiveForceVisualizer, {
            "outNames": ['output value'],
            "baseValue": shap_data.baseValue,
            "outValue": shap_data.explanations[patient_index].outValue,
            "link": "logit",
            "featureNames": shap_data.featureNames,
            "features": shap_data.explanations[patient_index].features,
            "plot_cmap": "RdBu",
            "labelMargin": 20
          }),
          document.getElementById('shap_patient_plot')
        );
      }
    });
  });
});
