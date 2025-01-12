function mostrarAlerta() {
    Swal.fire({
        title: '¡Pagina en Construcción!',
        text: 'Pronto, cosas Maravillosas',
        icon: 'success',
        background: 'linear-gradient(to bottom, #1D1616, #550000)', 
        color: '#EEEEEE', 
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#D84040', 
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#8E1616', 
        customClass: {
            title: 'swal-title-custom', 
            content: 'swal-content-custom', 
            confirmButton: 'swal-confirm-btn', 
            cancelButton: 'swal-cancel-btn' 
        }
    });
}
