document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card-item");
    const indicators = document.querySelectorAll(".scroll-indicator");
    const cardsContainer = document.querySelector(".cards-container");

    // Configurazione dell'Intersection Observer
    const options = {
      root: cardsContainer,
      rootMargin: "0px",
      threshold: 0.6, // La carta è considerata visibile quando è visibile al 60%
    };

    // Callback per l'Intersection Observer
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trova l'indice della carta visibile
          const visibleCard = entry.target;
          const visibleIndex = Array.from(cards).indexOf(visibleCard);

          // Aggiorna gli indicatori
          indicators.forEach((indicator, index) => {
            if (index === visibleIndex) {
              indicator.classList.add("active");
            } else {
              indicator.classList.remove("active");
            }
          });
        }
      });
    };

    // Crea l'observer
    const observer = new IntersectionObserver(callback, options);

    // Osserva tutte le carte
    cards.forEach((card) => {
      observer.observe(card);
    });

    // Gestione del click sugli indicatori
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        // Scorri alla carta corrispondente
        cards[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      });
    });
  });