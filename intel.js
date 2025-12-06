let val = 0;
document.addEventListener("DOMContentLoaded", () => {
    const maintext = document.getElementById("maintext");
    
    commpteur = document.getElementById("compteur")
    maintext.addEventListener("click", (e) => {
        // Jouer le son
        const beep = new Audio('santaandagi.mp3');
        beep.play().catch(err => console.error(err));
        val+= 1;
        commpteur.textContent = val;
        // Créer l'image
        const newImg = document.createElement('img');
        newImg.src = 'osaka.gif'; // ton image
        newImg.classList.add('flying-img');

            // Position aléatoire dans la fenêtre
        const maxX = window.innerWidth - 10; // largeur de l'image
        const maxY = window.innerHeight - 10; 
        newImg.style.left = `${Math.random() * maxX}px`;
        newImg.style.top = `${Math.random() * maxY}px`;

        // Ajouter au body
        document.body.appendChild(newImg);

        // Supprimer l'image après la fin de l'animation (2s ici)
        setTimeout(() => {
            newImg.remove();
        }, 2000);
    });
});
