export const Toast=(text)=>{
    
    var dismiss=$('<button class="btn-flat toast-action">Dismiss</button>')
    dismiss.click(function(){
       
        console.log( $(this).closest('.toast'))
        $(this).closest('.toast')[0].M_Toast.remove()
    })
    var content = $(`<span>${text}</span>`).add(dismiss)
    Materialize.toast(content, 10000);
}