function createPortfolioCard(work) {
  const card = document.createElement("div");
  card.className = "portfolio-card";

  let current = 0;

  const main = document.createElement("div");
  main.className = "media-main";

  const thumbRow = document.createElement("div");
  thumbRow.className = "thumb-row";

  function render(i) {
    const m = work.media[i];

    if (m.type === "image") {
      main.innerHTML = `<img src="${m.src}">`;
    }

    if (m.type === "video") {
      main.innerHTML = `
        <video controls>
          <source src="${m.src}" type="video/mp4">
        </video>
      `;
    }

    thumbRow.querySelectorAll(".thumb").forEach((t, idx) => {
      t.classList.toggle("active", idx === i);
    });
  }

  work.media.forEach((m, i) => {
    const thumb = document.createElement("div");
    thumb.className = "thumb";

    if (m.type === "image") {
      thumb.innerHTML = `<img src="${m.src}">`;
    } else {
      thumb.innerHTML = "▶";
    }

    thumb.addEventListener("click", () => {
      current = i;
      render(current);
    });

    thumbRow.appendChild(thumb);
  });

  const body = document.createElement("div");
  body.className = "card-body";

  body.innerHTML = `
    <h5>${work.title}</h5>
    <p>${work.description}</p>
    <div>
      ${(work.tags || []).map((t) => `<span class="badge bg-secondary me-1">${t}</span>`).join("")}
    </div>
    <small class="text-muted d-block mt-2">${work.date}</small>
    ${work.url ? `<a href="${work.url}" target="_blank" class="btn btn-sm btn-outline-primary mt-2">Details</a>` : ""}
  `;

  card.appendChild(main);
  card.appendChild(thumbRow);
  card.appendChild(body);

  render(0);

  return card;
}

fetch("assets/data/works.json")
  .then((r) => r.json())
  .then((data) => {
    const container = document.getElementById("works");

    data.forEach((work) => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      col.appendChild(createPortfolioCard(work));
      container.appendChild(col);
    });
  });
