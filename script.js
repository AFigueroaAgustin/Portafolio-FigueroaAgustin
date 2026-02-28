document.addEventListener("DOMContentLoaded", () => {
  

  const botonesMenu = document.querySelectorAll(".item-menu");
  const vistas = document.querySelectorAll(".panel-derecho > article");

  botonesMenu.forEach((boton) => {
    boton.addEventListener("click", function () {
      const idVistaDestino = this.getAttribute("data-target");

      vistas.forEach((vista) => {
        vista.classList.remove("vista-activa");
        vista.classList.add("vista-oculta");
      });

      const vistaDestino = document.getElementById(idVistaDestino);
      vistaDestino.classList.remove("vista-oculta");
      vistaDestino.classList.add("vista-activa");

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

  // Elementos internos del Modal a modificar
  const modalTitulo = document.querySelector(".modal-titulo");
  const modalDescripcion = document.querySelector(".modal-descripcion");
  const modalTecnologias = document.querySelector(".modal-tecnologias");
  const modalEnlace = document.querySelector(".modal-enlace");
  const modalColumnaImagen = document.querySelector(".modal-columna-imagen");

  // 1. EL NUEVO ARREGLO DE PROYECTOS (Datos limpios, sin HTML)
  const misProyectos = [
    {
      title: "PromoHUB SGO - API REST",
      description:
        "Sistema centralizado para la gestión de promociones financieras. API construida bajo el patrón MVC y N-Capas, integrando paginación, filtros dinámicos y persistencia en base de datos.",
      images: ["img/PromoHub/promohub.png"],
      // Refactor: Array de objetos con nombre y categoría
      technologies: [
        { name: "Java", category: "backend" },
        { name: "Spring Boot", category: "backend" },
        { name: "MySQL", category: "database" },
        {name: "JPA / Hibernate", category: "database"},
        {name: "Jakarta Validation", category: "backend"}
      ],
      link: `<a href="https://github.com/afigueroaagustin/PromosHubSGO" target="_blank" rel="noopener noreferrer">Ver Repositorio</a>`,
    },
    {
      title: "Sistema Punto de Venta",
      description:
        "Aplicación de escritorio enfocada en la gestión comercial. Manejo de inventario, procesamiento de transacciones y control de stock aplicando los fundamentos de la programación orientada a objetos.",
      images: [
        "img/Pos/Captura.PNG",
        "img/Pos/login.PNG",
        "img/Pos/Pantalla Admin.PNG",
        "img/Pos/Pantalla Cajero.PNG",
        "img/Pos/Venta.PNG",
      ],
      technologies: [
        { name: "Java", category: "backend" },
        {name: "Swing", category:"frontend"},
        {name:"My Sql", category:"database"},
        { name: "Jasper Reports", category: "tool" }
      ],
      link: `<a href="https://github.com/afigueroaagustin/SistemaPuntoDeVenta-Java" target="_blank" rel="noopener noreferrer">Ver Repositorio</a>`,
    },
    {
      title: "Data Pipeline - Web Scraping",
      description:
        "Motor de automatización encargado de mantener actualizada la información financiera extraída de sitios web (ej. Tarjeta Sol). Procesa datos no estructurados, limpia textos y fechas.",
      images: ["img/Scraping/scraper.png"],
      technologies: [
        { name: "Python", category: "automation" },
        { name: "Selenium", category: "tool" }
      ],
      link: `<a href="https://github.com/AFigueroaAgustin/PromosHubSGO" target="_blank" rel="noopener noreferrer">Ver Repositorio</a>`,
    }
  ];

  function renderizarProyectos() {
    if (!contenedorGaleria) return; 
    contenedorGaleria.innerHTML = ""; 

    misProyectos.forEach((proyecto) => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-proyecto");

      tarjeta.innerHTML = `
                <h3 class="tarjeta-titulo">${proyecto.title}</h3>
                <p class="tarjeta-descripcion">${proyecto.description}</p>
                <div class="tarjeta-imagen-contenedor">
                    <img src="${proyecto.images[0]}" alt="Captura de ${proyecto.title}" onerror="this.style.display='none'">
                </div>
            `;

      contenedorGaleria.appendChild(tarjeta);

      // EVENTO DE CLIC EN LA TARJETA (ABRE EL MODAL)
      tarjeta.addEventListener("click", () => {
        modalTitulo.textContent = proyecto.title;
        modalDescripcion.textContent = proyecto.description;
        modalEnlace.innerHTML = proyecto.link;

        // --- INICIO REFACTORIZACIÓN DE TECNOLOGÍAS ---
        
        // 1. Limpiamos el contenedor (único uso válido de innerHTML aquí)
        modalTecnologias.innerHTML = ""; 

        // 2. Creamos el título
        const tituloTech = document.createElement("p");
        tituloTech.textContent = "Tecnologías empleadas:";
        tituloTech.classList.add("modal-tecnologias-titulo");
        modalTecnologias.appendChild(tituloTech);

        // 3. Creamos el contenedor de las badges
        const contenedorBadges = document.createElement("div");
        contenedorBadges.classList.add("contenedor-badges");

        // 4. Iteramos sobre el array limpio e inyectamos nodos dinámicamente
        proyecto.technologies.forEach(tech => {
          const badge = document.createElement("span");
          badge.textContent = tech.name;
          // Agregamos una clase general y una específica basada en la categoría
          badge.classList.add("badge-tech", `badge-${tech.category}`); 
          
          contenedorBadges.appendChild(badge);
        });

        modalTecnologias.appendChild(contenedorBadges);
        
        // --- FIN REFACTORIZACIÓN DE TECNOLOGÍAS ---


        // (El código del slider se mantiene exactamente igual a partir de aquí)
        let htmlImagenes = proyecto.images
          .map((rutaImg, indice) => {
            const mostrar = indice === 0 ? "block" : "none";
            return `<img class="img-slider" src="${rutaImg}" style="display: ${mostrar}; border-radius: 5px;">`;
          })
          .join("");

        let htmlFlechas = "";
        if (proyecto.images.length > 1) {
          htmlFlechas = `
                        <button class="boton-slider flecha-izq"><span class="material-symbols-outlined">arrow_back_ios_new</span></button>
                        <button class="boton-slider flecha-der"><span class="material-symbols-outlined">arrow_forward_ios</span></button>
                    `;
        }

        modalColumnaImagen.innerHTML = htmlImagenes + htmlFlechas;

        if (proyecto.images.length > 1) {
          const listaImagenes = modalColumnaImagen.querySelectorAll(".img-slider");
          const btnIzq = modalColumnaImagen.querySelector(".flecha-izq");
          const btnDer = modalColumnaImagen.querySelector(".flecha-der");
          let indiceActual = 0;

          function cambiarFoto(nuevoIndice) {
            listaImagenes.forEach((img) => (img.style.display = "none"));
            listaImagenes[nuevoIndice].style.display = "block";
          }

          btnIzq.addEventListener("click", (e) => {
            e.stopPropagation(); 
            indiceActual = indiceActual > 0 ? indiceActual - 1 : listaImagenes.length - 1;
            cambiarFoto(indiceActual);
          });

          btnDer.addEventListener("click", (e) => {
            e.stopPropagation();
            indiceActual = indiceActual < listaImagenes.length - 1 ? indiceActual + 1 : 0;
            cambiarFoto(indiceActual);
          });
        }

        if (modal) modal.style.display = "flex";
      });
    });
  }

  renderizarProyectos();

  // EVENTO PARA CERRAR EL MODAL
  window.addEventListener("click", (evento) => {
    if (evento.target === modal) {
      modal.style.display = "none";
    }
  });

});