document.addEventListener("DOMContentLoaded", function() {
    const images = [
        "images/jeziorkoGorskie.jpg",
        "images/rzekaZawila.jpg",
        "images/strumyklesny.jpg",
        "images/zatokaMorska.jpg",
        "images/szwajicarskieMiasteczko.jpg",
        
    ];

    const descriptions = [
        "Chatka nad jeziorem w Austrii",
        "Rzeka w Amazonii",
        "Strumyk w Bieszczadach",
        "Zatoka Morska w Chorwacji",
        "Szwajcarskie miasteczko w Alpach ",
        
    ];

    let currentIndex = 0;
    const bannerImage = document.getElementById("photoBanner");
    const photoDescription = document.getElementById("photoDescription");

    function changeImage() {
        bannerImage.src = images[currentIndex];
        photoDescription.innerText = descriptions[currentIndex];
        currentIndex = (currentIndex + 1) % images.length;
    }

    // Zmieñ obraz co 4 sekund
    setInterval(changeImage, 4000);
});
