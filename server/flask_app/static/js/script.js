function scrollContainer(section, direction) {
    const container = document.getElementById(`scroll-container-${section}`);
    const scrollAmount = 600;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
}