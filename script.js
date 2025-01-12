function borrarVideo(id) {
    // Usamos SweetAlert para mostrar la confirmación
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Este video será borrado permanentemente',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#D84040', 
        cancelButtonColor: '#8E1616',  
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar',
        background: 'linear-gradient(to bottom, #1D1616, #550000)',
        color: '#EEEEEE',
        customClass: {
            title: 'swal-title-custom', 
            content: 'swal-content-custom', 
            confirmButton: 'swal-confirm-btn', 
            cancelButton: 'swal-cancel-btn'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://my-json-server.typicode.com/hyoga1023/aluraflix-api/videos/${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    const videoDiv = document.querySelector(`.video[data-id="${id}"]`);
                    if (videoDiv) {
                        videoDiv.remove();
                        Swal.fire(
                            '¡Eliminado!',
                            'El video ha sido borrado exitosamente.',
                            'success'
                        );
                    }
                } else {
                    throw new Error('Error al eliminar el video');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire(
                    '¡Error!',
                    'Hubo un problema al intentar borrar el video.',
                    'error'
                );
            });
        }
    });
}

const volverArribaBtn = document.getElementById('volverArriba');
window.addEventListener('scroll', () => {
    if (window.scrollY > 800) {
        volverArribaBtn.style.display = 'block'; 
    } else {
        volverArribaBtn.style.display = 'none';
    }
});

volverArribaBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
