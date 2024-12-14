// helpers.js
export const setPageTitle = (title) => {
    const titleElement = document.getElementsByTagName("title")[0];
    if (titleElement) {
      titleElement.innerText = title;
    }
  };
  