let val = 0;
let sound = 'santaandagi.mp3';
let image = "osaka.gif";
let rareImage = "osakadark.gif";

document.addEventListener("DOMContentLoaded", () => {

    const maintext = document.getElementById("maintext");
    const compteur = document.getElementById("compteur");

    maintext.addEventListener("click", (e) => {

        // Son
        const beep = new Audio(sound);
        beep.play().catch(err => console.error(err));

        // Compteur
        val++;
        compteur.textContent = val;

        // Image normale
        createFlyingImage(image);

        // Rare event (ponctuel)
        if (Math.random() < 0.001) {
            for (let i = 0; i < 1000; i++) {
                createFlyingImage(image);
            }
        }

        // 💡 ULTRA RARE EVENT : effet lampe torche + POP finale
        if (Math.random() < 0.0001) {   // 0.05% = ULTRA RARE
            startFlashlightEvent(e.clientX, e.clientY);
        }
    });

    // ---------------------------------------------------
    // Changer image (fix)
    // ---------------------------------------------------
    function changer(name1, name2) {
        return name2; 
    }

    // ---------------------------------------------------
    // Image volante normale
    // ---------------------------------------------------
    function createFlyingImage(imgname) {
        const maxX = window.innerWidth - 10;
        const maxY = window.innerHeight - 10;

        const img = document.createElement('img');
        img.src = imgname;
        img.classList.add('flying-img');

        img.style.left = `${Math.random() * maxX}px`;
        img.style.top = `${Math.random() * maxY}px`;

        document.body.appendChild(img);

        setTimeout(() => img.remove(), 2000);
    }


    // ---------------------------------------------------
    // ULTRA RARE EVENT : Lampe Torche + POP
    // ---------------------------------------------------
    function startFlashlightEvent(mouseX, mouseY) {

        console.log("ULTRA RARE EVENT !!!");

        // --- 1) Création de l’overlay noir ---
        const overlay = document.createElement("div");
        overlay.id = "flashlight-overlay";
        overlay.style.position = "fixed";
        overlay.style.left = "0";
        overlay.style.top = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.pointerEvents = "none";
        overlay.style.background = "rgba(0,0,0,0.97)";
        overlay.style.mixBlendMode = "multiply";
        overlay.style.zIndex = "99999";

        document.body.appendChild(overlay);

        // --- 2) On suit la souris pour dessiner un trou ---
        document.addEventListener("mousemove", followFlashlight);

        function followFlashlight(e) {
            const x = e.clientX;
            const y = e.clientY;

            overlay.style.background = `
                radial-gradient(circle 120px at ${x}px ${y}px, 
                transparent 0%, rgba(0,0,0,0.98) 80%)
            `;
        }

        // --- 3) Après 5 secondes → POP ---
        setTimeout(() => {

            document.removeEventListener("mousemove", followFlashlight);

            overlay.remove();

            popImageAt(mouseX, mouseY);

        }, 5000);
    }

    // ---------------------------------------------------
    // POP image en GRAND + son
    // ---------------------------------------------------
    function popImageAt(x, y) {

        const pop = document.createElement("img");
        pop.src = image;
        pop.style.position = "fixed";
        pop.style.width = "300px";
        pop.style.height = "300px";
        pop.style.left = (x - 150) + "px";
        pop.style.top = (y - 150) + "px";
        pop.style.zIndex = "100000";
        pop.style.transition = "transform 0.4s ease";
        pop.style.transform = "scale(0)";
        
        document.body.appendChild(pop);

        // Animation POP
        setTimeout(() => {
            pop.style.transform = "scale(1)";
        }, 20);

        // Son final
        const finalSound = new Audio(sound);
        finalSound.play();

        // Disparition après 2 sec
        setTimeout(() => {
            pop.remove();
        }, 2000);
    }

});
