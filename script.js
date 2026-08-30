document.addEventListener("DOMContentLoaded", () => {
  
  const botonesMenu = document.querySelectorAll(".item-menu");
  const vistas = document.querySelectorAll("article[id^='vista-']");

  botonesMenu.forEach((boton) => {
    boton.addEventListener("click", function () {
      const idVistaDestino = this.getAttribute("data-target");

      vistas.forEach((vista) => {
        vista.classList.remove("vista-activa");
        vista.classList.add("vista-oculta");
      });

      const vistaDestino = document.getElementById(idVistaDestino);
      if (vistaDestino) {
        vistaDestino.classList.remove("vista-oculta");
        vistaDestino.classList.add("vista-activa");
      }

      botonesMenu.forEach((b) => b.classList.remove("activo"));
      this.classList.add("activo");
    });
  });

  const formularioContacto = document.getElementById("formulario-contacto");
  
  // Verifica que el formulario exista para no romper el código si falla la carga
  if (formularioContacto) {
    formularioContacto.addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs
        .sendForm("service_ooma8np", "template_zq1y13e", this)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "¡Formulario enviado!",
            text: "¡Me pondré en contacto contigo a la brevedad!",
            background: "#0d0d0d",
            color: "#e7e7e7",
            confirmButtonColor: "#22c55e",
          });

          this.reset();
        })
        .catch((error) => {
          console.error("ERROR EMAILJS:", error);

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal al enviar el formulario.",
            background: "#0d0d0d",
            color: "#e7e7e7",
            confirmButtonColor: "#e7e7e7",
          });
        });
    });
  }

  const contenedorGaleria = document.getElementById("galeria-proyectos");
  const modal = document.getElementById("modal-proyecto");
  const botonCerrarModal = document.getElementById("modal-boton-cerrar");

  // Elementos internos del Modal a modificar
  const modalTitulo = document.querySelector(".modal-titulo");
  const modalDescripcion = document.querySelector(".modal-descripcion");
  const modalTecnologias = document.querySelector(".modal-tecnologias");
  const modalEnlace = document.querySelector(".modal-enlace");
  const modalColumnaImagen = document.querySelector(".modal-columna-imagen");

  // ARREGLO DE PROYECTOS CON FOTOS, CAPTIONS Y METADATOS TÉCNICOS
  const misProyectos = [
    {
      title: "Punto Promo SGO - API REST & Ecosistema Web",
      description:
        "Plataforma web y API REST para la centralización y consulta de promociones bancarias y beneficios comerciales en Santiago del Estero. Diseñada bajo arquitectura en capas con persistencia en MySQL (3NF), soporte para filtrado dinámico con paginación, validaciones con Jakarta y documentación interactiva con OpenAPI 3 / Swagger.",
      images: [
        {
          url: "img/PromoHub/demo_promohub.mp4",
          isVideo: true,
          caption: "Demo en video de Punto Promo SGO: Recorrido por la aplicación en vivo, filtrado por entidades locales (BSE, Tarjeta Sol), selección de categorías y motor de búsqueda en acción."
        },
        {
          url: "img/PromoHub/swagger_general.png",
          caption: "Swagger UI (OpenAPI 3.1): Documentación viva e interactiva de endpoints, esquemas DTO y contratos de la API REST."
        },
        {
          url: "img/PromoHub/DER_Proyecto.png",
          caption: "Diagrama Entidad-Relación (3NF): Modelo normalizado con tabla asociativa N:M e índices para optimizar consultas de búsqueda y vencimiento."
        }
      ],
      technologies: [
        { name: "Java 17", category: "backend" },
        { name: "Spring Boot 3", category: "backend" },
        { name: "Swagger / OpenAPI 3", category: "tool" },
        { name: "MySQL (3NF)", category: "database" },
        { name: "JPA / Hibernate", category: "database" },
        { name: "Jakarta Validation", category: "backend" },
        { name: "DTO Pattern", category: "backend" }
      ],
      link: `<a href="https://github.com/afigueroaagustin/PromosHubSGO" target="_blank" rel="noopener noreferrer"><i class="devicon-github-original"></i> Ver Repositorio</a>
             <a href="img/PromoHub/demo_promohub.mp4" target="_blank" class="boton-video-demo"><span class="material-symbols-outlined" style="font-size:18px;">play_circle</span> Abrir Video</a>`,
    },
    {
      title: "Data Pipeline & Web Scraper Multi-Fuente",
      description:
        "Pipeline ETL de extracción y procesamiento automatizado en Python y Selenium como motor de ingesta para Punto Promo SGO. Recolecta promociones financieras desde 7 fuentes bancarias y billeteras (Tarjeta Sol, BNA, MODO, Mercado Pago, etc.), normaliza fechas y comercios con diccionarios de datos, e inyecta la información en la API de Spring Boot con control de duplicados (HTTP 409) y reportes de auditoría.",
      images: [
        {
          url: "img/Scraping/scraper.png",
          caption: "Pipeline ETL en Python: Extracción multi-fuente con Selenium, normalización de datos no estructurados y carga automatizada a la API REST."
        }
      ],
      technologies: [
        { name: "Python 3", category: "automation" },
        { name: "Selenium", category: "tool" },
        { name: "Arquitectura ETL", category: "automation" },
        { name: "Requests Session", category: "tool" },
        { name: "Data Normalization", category: "automation" },
        { name: "Integración REST", category: "backend" }
      ],
      link: `<a href="https://github.com/AFigueroaAgustin/PromosHubSGO" target="_blank" rel="noopener noreferrer"><i class="devicon-github-original"></i> Ver Repositorio</a>`,
    },
    {
      title: "Sistema Punto de Venta (POS)",
      description:
        "Sistema de gestión comercial y facturación en Java (Swing) con persistencia en MySQL y reportes con Jasper Reports. Actualmente utilizado como caso de estudio de arquitectura para su modernización y migración hacia una API REST desacoplada en Spring Boot.",
      images: [
        {
          url: "img/Pos/Captura.PNG",
          caption: "Módulo de ventas y facturación: Procesamiento de transacciones comerciales y control de stock."
        },
        {
          url: "img/Pos/Pantalla Admin.PNG",
          caption: "Panel de administración: Gestión de inventario, catálogo de productos y usuarios."
        },
        {
          url: "img/Pos/login.PNG",
          caption: "Autenticación y seguridad: Control de acceso según perfiles (Cajero / Administrador)."
        },
        {
          url: "img/Pos/Venta.PNG",
          caption: "Reportes comerciales: Emisión de informes y comprobantes con Jasper Reports."
        }
      ],
      technologies: [
        { name: "Java", category: "backend" },
        { name: "MySQL", category: "database" },
        { name: "Swing", category: "frontend" },
        { name: "Jasper Reports", category: "tool" },
        { name: "Migración a Web", category: "backend" }
      ],
      link: `<a href="https://github.com/afigueroaagustin/SistemaPuntoDeVenta-Java" target="_blank" rel="noopener noreferrer"><i class="devicon-github-original"></i> Ver Repositorio</a>`,
    }
  ];

  function renderizarProyectos() {
    if (!contenedorGaleria) return; 
    contenedorGaleria.innerHTML = ""; 

    misProyectos.forEach((proyecto) => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-proyecto");

      // Si el primer elemento es un video, usamos la siguiente imagen disponible como portada de la tarjeta
      let imagenPortada = "";
      for (let img of proyecto.images) {
        if (typeof img === 'object' && !img.isVideo) {
          imagenPortada = img.url;
          break;
        } else if (typeof img === 'string') {
          imagenPortada = img;
          break;
        }
      }
      if (!imagenPortada && proyecto.images.length > 0) {
        imagenPortada = typeof proyecto.images[0] === 'object' ? proyecto.images[0].url : proyecto.images[0];
      }

      tarjeta.innerHTML = `
                <h3 class="tarjeta-titulo">${proyecto.title}</h3>
                <p class="tarjeta-descripcion">${proyecto.description}</p>
                <div class="tarjeta-imagen-contenedor">
                    <img src="${imagenPortada}" alt="Captura de ${proyecto.title}" onerror="this.style.display='none'">
                </div>
            `;

      contenedorGaleria.appendChild(tarjeta);

      // EVENTO DE CLIC EN LA TARJETA (ABRE EL MODAL)
      tarjeta.addEventListener("click", () => {
        modalTitulo.textContent = proyecto.title;
        modalDescripcion.textContent = proyecto.description;
        modalEnlace.innerHTML = proyecto.link;

        // Renderizado de Badges de Tecnologías
        modalTecnologias.innerHTML = ""; 
        const tituloTech = document.createElement("p");
        tituloTech.textContent = "Tecnologías y Enfoque:";
        tituloTech.classList.add("modal-tecnologias-titulo");
        modalTecnologias.appendChild(tituloTech);

        const contenedorBadges = document.createElement("div");
        contenedorBadges.classList.add("contenedor-badges");

        proyecto.technologies.forEach(tech => {
          const badge = document.createElement("span");
          badge.textContent = tech.name;
          badge.classList.add("badge-tech", `badge-${tech.category}`); 
          contenedorBadges.appendChild(badge);
        });

        modalTecnologias.appendChild(contenedorBadges);

        // Renderizado de Imágenes, Videos y Captions explicativos
        let htmlMedia = proyecto.images
          .map((item, indice) => {
            const ruta = typeof item === 'object' ? item.url : item;
            const isVideo = typeof item === 'object' && item.isVideo;
            const mostrar = indice === 0 ? "block" : "none";

            if (isVideo) {
              return `<video class="img-slider video-slider" controls preload="metadata" style="display: ${mostrar}; width: 100%; height: 100%; object-fit: contain; border-radius: 6px; background: #000;">
                        <source src="${ruta}" type="video/mp4">
                        Tu navegador no soporta reproducción de video.
                      </video>`;
            } else {
              return `<img class="img-slider" src="${ruta}" alt="Captura ${indice + 1}" style="display: ${mostrar};">`;
            }
          })
          .join("");

        let htmlCaptions = proyecto.images
          .map((imgItem, indice) => {
            const caption = typeof imgItem === 'object' ? imgItem.caption : "";
            const mostrar = indice === 0 ? "block" : "none";
            return `<div class="slider-caption" style="display: ${mostrar};">${caption}</div>`;
          })
          .join("");

        let htmlFlechas = "";
        if (proyecto.images.length > 1) {
          htmlFlechas = `
            <button class="boton-slider flecha-izq" aria-label="Anterior"><span class="material-symbols-outlined">arrow_back_ios_new</span></button>
            <button class="boton-slider flecha-der" aria-label="Siguiente"><span class="material-symbols-outlined">arrow_forward_ios</span></button>
          `;
        }

        modalColumnaImagen.innerHTML = `
          <div class="modal-slider-contenedor">
            ${htmlMedia}
            ${htmlFlechas}
          </div>
          ${htmlCaptions}
        `;

        if (proyecto.images.length > 1) {
          const listaMedia = modalColumnaImagen.querySelectorAll(".img-slider");
          const listaCaptions = modalColumnaImagen.querySelectorAll(".slider-caption");
          const btnIzq = modalColumnaImagen.querySelector(".flecha-izq");
          const btnDer = modalColumnaImagen.querySelector(".flecha-der");
          let indiceActual = 0;

          function cambiarFoto(nuevoIndice) {
            listaMedia.forEach((elem) => {
              elem.style.display = "none";
              // Si es un video y se pasa de slide, pausar la reproducción
              if (elem.tagName === "VIDEO") {
                elem.pause();
              }
            });
            listaCaptions.forEach((cap) => (cap.style.display = "none"));
            
            listaMedia[nuevoIndice].style.display = "block";
            if (listaCaptions[nuevoIndice]) {
              listaCaptions[nuevoIndice].style.display = "block";
            }
          }

          btnIzq.addEventListener("click", (e) => {
            e.stopPropagation(); 
            indiceActual = indiceActual > 0 ? indiceActual - 1 : listaMedia.length - 1;
            cambiarFoto(indiceActual);
          });

          btnDer.addEventListener("click", (e) => {
            e.stopPropagation(); 
            indiceActual = indiceActual < listaMedia.length - 1 ? indiceActual + 1 : 0;
            cambiarFoto(indiceActual);
          });
        }

        if (modal) modal.style.display = "flex";
      });
    });
  }

  renderizarProyectos();

  // EVENTOS PARA CERRAR EL MODAL
  if (botonCerrarModal) {
    botonCerrarModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", (evento) => {
    if (evento.target === modal) {
      modal.style.display = "none";
    }
  });

});
