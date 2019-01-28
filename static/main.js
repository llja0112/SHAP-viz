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

      patient_indices = [1, 3, 441, 435, 436];
      for(i = 0; i < patient_indices.length; i++){
        // console.log(patient_indices[i]);
        shap_patient_plot(patient_indices[i]);
      }
    }

    for(index in shap_data.explanations){
      $('#patients_select').append(
        '<option value="' + index + '">' + index + '</option>');
    }

    $('#patients_select_button').click(function(){
      if(!$('#explanation_pane').hasClass('d-none')){
        $('#explanation_pane').addClass('d-none');
      }

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

function shap_patient_plot(patient_index){
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
      document.getElementById('shap_patient_' + patient_index + '_plot')
    );
  }
}
