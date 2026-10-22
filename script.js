document.addEventListener('DOMContentLoaded', () => {

    // --- MENÚ HAMBURGUESA ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    hamburger?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // --- ASISTENTE IA DE FRECUENCIAJD ---
    const iaChat = document.getElementById('ia-chat');
    const iaInput = document.getElementById('ia-user-input');
    const iaSendBtn = document.getElementById('ia-send-btn');

    function responderIA(mensaje) {
        let texto = mensaje.toLowerCase();
        let respuesta = "Puedo ayudarte a cotizar o informarte sobre doblajes, locuciones o covers vocales. ¿Cuántos minutos o líneas tiene tu guion?";

        if (texto.includes("doblaje") || texto.includes("anime") || texto.includes("personaje")) {
            respuesta = "El servicio de doblaje tiene una tarifa base de $15 USD por escena o minuto de actuación vocal con lipsync sincronizado.";
        } else if (texto.includes("cover") || texto.includes("rap") || texto.includes("canción") || texto.includes("musica")) {
            respuesta = "Los covers o raps adaptados cuestan $25 USD por tema completo, e incluyen mezcla y procesamiento vocal profesional.";
        } else if (texto.includes("locucion") || texto.includes("spot") || texto.includes("comercial")) {
            respuesta = "La locución comercial/intros para redes inicia en $10 USD por grabación limpia de hasta 100 palabras.";
        } else if (texto.includes("hola") || texto.includes("buenas")) {
            respuesta = "¡Hola! Bienvenido a FrecuenciaJD. ¿En qué proyecto de voz estás trabajando hoy?";
        }

        setTimeout(() => {
            iaChat.innerHTML += `<div class="chat-msg bot">${respuesta}</div>`;
            iaChat.scrollTop = iaChat.scrollHeight;
        }, 500);
    }

    iaSendBtn?.addEventListener('click', () => {
        const val = iaInput.value.trim();
        if (val) {
            iaChat.innerHTML += `<div class="chat-msg user">${val}</div>`;
            iaInput.value = '';
            iaChat.scrollTop = iaChat.scrollHeight;
            responderIA(val);
        }
    });

    // --- FORMULARIO DE CONTACTO EN TIEMPO REAL ---
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        if (!nameInput.value.trim()) {
            document.getElementById('name-error').textContent = 'Escribe tu nombre.';
            valid = false;
        } else { document.getElementById('name-error').textContent = ''; }

        if (!emailInput.value.includes('@')) {
            document.getElementById('email-error').textContent = 'Correo inválido.';
            valid = false;
        } else { document.getElementById('email-error').textContent = ''; }

        if (!messageInput.value.trim()) {
            document.getElementById('message-error').textContent = 'Escribe un mensaje.';
            valid = false;
        } else { document.getElementById('message-error').textContent = ''; }

        if (valid) {
            // Guardar solicitud en el Admin
            const listaAdmin = document.getElementById('admin-requests-list');
            if (listaAdmin) {
                listaAdmin.innerHTML += `
                    <tr>
                        <td>${nameInput.value}</td>
                        <td>${emailInput.value}</td>
                        <td>${messageInput.value}</td>
                        <td><span class="badge success" style="background:rgba(230,25,60,0.2); color:#ff2a4b;">Pendiente</span></td>
                    </tr>
                `;
            }

            const status = document.getElementById('form-status');
            status.style.display = 'block';
            status.className = 'form-status success';
            status.textContent = '¡Mensaje enviado con éxito! También se ha registrado en el Panel Admin.';
            contactForm.reset();
        }
    });

    // --- PANEL ADMIN & LOGIN ---
    const btnLoginAdmin = document.getElementById('btn-login-admin');
    const btnLogoutAdmin = document.getElementById('btn-logout-admin');
    const adminPassInput = document.getElementById('admin-pass');
    const adminLoginBox = document.getElementById('admin-login-box');
    const adminDashboard = document.getElementById('admin-dashboard');

    btnLoginAdmin?.addEventListener('click', () => {
        if (adminPassInput.value === 'admin123') {
            adminLoginBox.classList.add('hidden');
            adminDashboard.classList.remove('hidden');
            document.getElementById('admin-error').textContent = '';
        } else {
            document.getElementById('admin-error').textContent = 'Contraseña incorrecta (Usa: admin123)';
        }
    });

    btnLogoutAdmin?.addEventListener('click', () => {
        adminDashboard.classList.add('hidden');
        adminLoginBox.classList.remove('hidden');
        adminPassInput.value = '';
    });
});
