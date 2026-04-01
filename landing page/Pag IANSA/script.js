/**
 * IANSA - Bazar Solidário
 * Scripts principais
 */

document.addEventListener('DOMContentLoaded', function () {

    // --- FormSubmit: redireciona de volta com ?enviado=1 ---
    const formRedirect = document.getElementById('form-redirect');
    if (formRedirect) {
        formRedirect.value = window.location.origin + window.location.pathname + '?enviado=1';
    }

    // --- Menu Mobile ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
        });
    }

    // --- Scroll suave ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
                const headerOffset = document.getElementById('main-header')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Link ativo no menu ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const headerHeight = document.getElementById('main-header')?.offsetHeight || 0;

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - headerHeight - 60) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            const href = a.getAttribute('href');
            if (href === '#' + currentSectionId) {
                a.classList.add('active');
            }
        });
    });

    // --- Mensagem de sucesso após redirecionamento do FormSubmit ---
    const formSucesso = document.getElementById('form-sucesso');
    const formVoluntario = document.getElementById('form-voluntario');
    const params = new URLSearchParams(window.location.search);
    if (params.get('enviado') === '1' && formSucesso && formVoluntario) {
        formVoluntario.style.display = 'none';
        formSucesso.style.display = 'block';
        formSucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // --- Ler Mais (História) ---
    const btnLerMais = document.getElementById('btn-ler-mais');
    const textoHistoria = document.getElementById('texto-historia');

    if (btnLerMais && textoHistoria) {
        btnLerMais.addEventListener('click', function () {
            textoHistoria.classList.toggle('aberto');
            btnLerMais.textContent = textoHistoria.classList.contains('aberto')
                ? 'Esconder História'
                : 'Ler História Completa';
        });
    }
});
