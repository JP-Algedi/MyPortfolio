async function load(id, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

load("bootstrap", "components/bootstrap.html");
load("header", "components/header.html");
load("footer", "components/footer.html");
