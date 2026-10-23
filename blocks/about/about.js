export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`about-${cols.length}-cols`);
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('about-img-col');
        }
      } else {
        col.classList.add('about-content-col');
        const list = col.querySelector('ul');
        if (list) list.classList.add('about-checklist');
      }
    });
  });
}

