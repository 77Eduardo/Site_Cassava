document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu > li > a');
    const subMenuItems = document.querySelectorAll('.menu li ul li a');

    // Function to highlight the selected menu item based on localStorage
    function highlightSelectedMenuItem() {
        const selectedMenuItem = localStorage.getItem('selectedMenuItem');
        const selectedSubMenuItem = localStorage.getItem('selectedSubMenuItem');

        if (selectedMenuItem) {
            const menuItem = document.querySelector(`.menu > li > a[href="${selectedMenuItem}"]`);
            if (menuItem) {
                menuItem.classList.add('selected');
                const parentLi = menuItem.parentElement;
                if (parentLi.querySelector('ul')) {
                    parentLi.classList.add('open');
                }
            }
        }

        if (selectedSubMenuItem) {
            const subMenuItem = document.querySelector(`.menu li ul li a[href="${selectedSubMenuItem}"]`);
            if (subMenuItem) {
                subMenuItem.classList.add('selected');
                const parentLi = subMenuItem.closest('.menu > li');
                parentLi.querySelector('a').classList.add('selected');
                parentLi.classList.add('open');
            }
        }
    }

    highlightSelectedMenuItem();

    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            const parentLi = this.parentElement;
            const isOpen = parentLi.classList.contains('open');
            const hasSubMenu = this.nextElementSibling && this.nextElementSibling.tagName === 'UL';

            // Close all submenus
            document.querySelectorAll('.menu li.open').forEach(li => li.classList.remove('open'));
            document.querySelectorAll('.menu a.selected').forEach(a => a.classList.remove('selected'));

            if (hasSubMenu) {
                e.preventDefault();  // Prevent default only if it has a submenu

                // Toggle open state and mark as selected
                if (!isOpen) {
                    parentLi.classList.add('open');
                    this.classList.add('selected');
                }

                // Store the selected menu item in localStorage
                localStorage.setItem('selectedMenuItem', this.getAttribute('href'));
                localStorage.removeItem('selectedSubMenuItem');  // Clear submenu selection
            } else {
                // Store the selected menu item in localStorage
                localStorage.setItem('selectedMenuItem', this.getAttribute('href'));
                localStorage.removeItem('selectedSubMenuItem');  // Clear submenu selection
            }
        });
    });

    subMenuItems.forEach(subItem => {
        subItem.addEventListener('click', function (e) {
            e.preventDefault();

            const isSubMenuSelected = this.classList.contains('selected');

            // Remove selection from all submenu items
            document.querySelectorAll('.menu li ul li a.selected').forEach(a => a.classList.remove('selected'));

            // Toggle submenu item selection
            if (!isSubMenuSelected) {
                this.classList.add('selected');

                // Mark the parent menu item as selected
                const parentLi = this.closest('.menu > li');
                parentLi.querySelector('a').classList.add('selected');

                // Store the selected submenu item in localStorage
                localStorage.setItem('selectedSubMenuItem', this.getAttribute('href'));
                localStorage.setItem('selectedMenuItem', parentLi.querySelector('a').getAttribute('href'));
                window.location.href = this.getAttribute('href');
            }
        });
    });

    // Close all submenus if clicking outside the menu
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.menu_nav')) {
            document.querySelectorAll('.menu li.open').forEach(li => li.classList.remove('open'));
            document.querySelectorAll('.menu a.selected').forEach(a => a.classList.remove('selected'));
            localStorage.removeItem('selectedMenuItem');
            localStorage.removeItem('selectedSubMenuItem');
        }
    });
});
