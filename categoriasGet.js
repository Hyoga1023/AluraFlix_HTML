document.addEventListener("DOMContentLoaded", function() {
    fetch('https://my-json-server.typicode.com/hyoga1023/aluraflix-api/videos')
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos:", data);
            const sectionCategorias = document.querySelector('.categorias');

            for (const [categoria, videos] of Object.entries(data)) {
                const categoriaDiv = document.createElement('div');
                categoriaDiv.classList.add('categoria');
                const categoriaTitulo = document.createElement('h2');
                categoriaTitulo.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
                categoriaDiv.appendChild(categoriaTitulo);

                const videosContainer = document.createElement('div');
                videosContainer.classList.add('videos');

                videos.forEach(video => {
                    const videoDiv = document.createElement('div');
                    videoDiv.classList.add('video');
                    videoDiv.setAttribute('data-id', video.id);

                    videoDiv.innerHTML = `
                        <a href="${video.url}" target="_blank">
                            <img src="${video.image}" alt="${video.title}">
                        </a>
                        <h3>${video.title}</h3>
                        <p>${video.description}</p>
                        <div class="btn-container">
                            <button class="btn-edit" data-id="${video.id}">Editar</button>
                            <button class="btn-delete" data-id="${video.id}">Borrar</button> <!-- Botón de borrado -->
                        </div>
                    `;
                    videosContainer.appendChild(videoDiv);

                    // Evento para el botón editar
                    videoDiv.querySelector('.btn-edit').addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        editarVideo(id);
                    });

                    // Evento para el botón borrar (borrado solo visual)
                    videoDiv.querySelector('.btn-delete').addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        borrarVideo(id);
                    });
                });

                categoriaDiv.appendChild(videosContainer);
                sectionCategorias.appendChild(categoriaDiv);
            }
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
});

// Función para editar video
function editarVideo(id) {
    currentVideoId = id;
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    const videoDiv = document.querySelector(`.video[data-id="${id}"]`);
    if (!videoDiv) {
        console.log("No se encontró el div del video");
        return;
    }

    const title = videoDiv.querySelector('h3').textContent;
    const description = videoDiv.querySelector('p').textContent;
    const url = videoDiv.querySelector('a').href;

    document.getElementById('edit-title').value = title;
    document.getElementById('edit-description').value = description;
    document.getElementById('edit-url').value = url;
}

// Función para borrar video (solo visual)
function borrarVideo(id) {
    Swal.fire({
        title: '¿Estás seguro de que deseas borrar este video?',
        text: "¡Una vez lo hagas no hay vuelta atras y el mundo como lo conoces puede desaparecer!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Borrar',
        confirmButtonColor: '#D84040',
        cancelButtonColor: '#8E1616',
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
            // Eliminar el video solo visualmente
            const videoDiv = document.querySelector(`.video[data-id="${id}"]`);
            if (videoDiv) {
                videoDiv.remove();
                console.log('Video eliminado visualmente');
            }
        }
    });
}

function limpiarModal() {
    document.getElementById('edit-title').value = '';
    document.getElementById('edit-description').value = '';
    document.getElementById('edit-url').value = '';
}

function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    currentVideoId = null;
    limpiarModal();
}

document.getElementById('modal').addEventListener('click', function(event) {
    if (event.target === this) {
        cerrarModal();
    }
});
