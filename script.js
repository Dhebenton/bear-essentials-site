document.addEventListener('DOMContentLoaded', () => {
  handleRoute();
  initCarousels();
  initMobileSliders();
  initFAQ();
});

function handleRoute() {
  const path = window.location.pathname;
  const app = document.getElementById('app');
  if (!app) return;

  if (path.startsWith('/products/')) {
    const slug = path.replace('/products/', '');
    loadProduct(slug, app);
  }
}

function loadProduct(slug, app) {
  fetch('/products.json')
    .then(r => r.json())
    .then(products => {
      const product = products.find(p => p.slug === slug);

      if (!product) {
        app.innerHTML = '<h1>Product not found</h1>';
        return;
      }

      app.innerHTML = `
        <h1>${product.name}</h1>
        <p>${product.description}</p>
      `;
    });
}
