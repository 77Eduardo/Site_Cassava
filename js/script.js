document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu > li > a');
    const subMenuItems = document.querySelectorAll('.menu li ul li a');

    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Toggle submenu if it has one
            const parentLi = this.parentElement;
            const isOpen = parentLi.classList.contains('open');

            // Close all submenus
            document.querySelectorAll('.menu li.open').forEach(li => li.classList.remove('open'));
            document.querySelectorAll('.menu a.selected').forEach(a => a.classList.remove('selected'));

            if (!isOpen) {
                // Open the clicked submenu and mark as selected
                parentLi.classList.add('open');
                this.classList.add('selected');
            }
        });
    });

    subMenuItems.forEach(subItem => {
        subItem.addEventListener('click', function (e) {
            e.preventDefault();

            // Remover marcações de todos os itens do submenu
            document.querySelectorAll('.menu li ul li a.selected').forEach(a => a.classList.remove('selected'));


            // Marcar o item do submenu clicado como selecionado
            this.classList.add('selected');

            // Marcar o item principal do menu como selecionado
            const parentLi = this.closest('.menu > li');
            parentLi.querySelector('a').classList.add('selected');

        });
    });
});




