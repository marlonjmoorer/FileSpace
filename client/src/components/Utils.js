export const Toast=(text)=>{
    
    var dismiss=$('<button class="btn-flat toast-action">Dismiss</button>')
    dismiss.click(function(){
       
        console.log( $(this).closest('.toast'))
        $(this).closest('.toast')[0].M_Toast.remove()
    })
    var content = $(`<span>${text}</span>`).add(dismiss)
    Materialize.toast(content, 10000);
}

export const AddFormValidation=(id,rules)=>{
    $(`#${id}`).validate({
        rules,
        errorClass: "invalid red-text",
        errorElement : 'span',
        errorPlacement: function(error, element) {
          var placement = $(element).data('error');
         
          if (placement) {
            $(placement).append(error)
          } else {
            error.insertAfter(element);
          }
        }
     });


}