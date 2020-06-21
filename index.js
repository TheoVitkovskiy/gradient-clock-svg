const main = () => {
  // variables
  const bgColor = '#ccc';

  const docStyle = document.documentElement.style;
  docStyle.setProperty('--bg-color', bgColor);

  console.log(docStyle.getPropertyValue('--tomato-success-start'));
}


document.addEventListener("DOMContentLoaded", main)