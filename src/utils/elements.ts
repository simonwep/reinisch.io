export const resolveFittingFontSize = (el: HTMLElement): number | undefined => {
  const element = document.createElement('p');
  element.style.setProperty('font-size', '50px');
  element.style.setProperty('position', 'fixed');
  element.style.setProperty('white-space', 'nowrap');
  element.innerHTML = el.innerText;
  el.appendChild(element);

  const width = element.offsetWidth;
  element.style.setProperty('font-size', '100px');

  const nextWidth = element.offsetWidth;
  const diff = (nextWidth - width) / 50;

  el.removeChild(element);
  return Math.floor(el.clientWidth / diff);
};
