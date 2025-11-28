export default function Footer() {
  const footer = document.createElement("footer");

  footer.innerHTML = `
    <p>© ${new Date().getFullYear()} Pokédex SPA – Proyecto académico</p>
  `;

  return footer;
}