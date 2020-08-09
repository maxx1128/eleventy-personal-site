(function() {
  const getContentData = () => {
    if (linkWrapper.classList.contains('random-navigator-wrapper--note')) {
      return window.ContentData.notes;
    }

    if (linkWrapper.classList.contains('random-navigator-wrapper--document')) {
      return window.ContentData.documents;
    }

    return window.ContentData.posts;
  }

  const filterContent = (data) => {
    const nextLink     = document.getElementsByClassName('random-navigator__next-link')[0],
          previousLink = document.getElementsByClassName('random-navigator__previous-link')[0];

    let blockedURLs    = [window.location.pathname];
    if (nextLink)     { blockedURLs.push(nextLink.getAttribute('href')); }
    if (previousLink) { blockedURLs.push(previousLink.getAttribute('href')); }

    return data.filter(content => !blockedURLs.some(blockedURL => content.url.includes(blockedURL)));
  }

  const linkWrapper = document.getElementById('random-navigator-wrapper');

  if (linkWrapper) {
    const contentData = getContentData(),
          possibleContent = filterContent(contentData),
          randomContent = possibleContent[Math.floor(Math.random() * possibleContent.length)];

    const link = document.querySelectorAll('#random-navigator-wrapper a')[0];
    linkWrapper.classList.remove('hidden');
    link.setAttribute('href', randomContent.url);
    link.innerHTML = randomContent.title;
  }
})();
