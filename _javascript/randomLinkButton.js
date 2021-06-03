(function() {
  const setRandomPostLink = (content, linkId) => {
    const randomPost = content[Math.floor(Math.random() * content.length)],
          postLinkElement = document.getElementById(linkId);

    if (postLinkElement) {
      postLinkElement.classList.remove('hidden');
      postLinkElement.setAttribute('href', randomPost.url);
    }
  }

  setRandomPostLink(window.ContentData.posts, 'random-post-link');
  setRandomPostLink(window.ContentData.notes, 'random-note-link');
  setRandomPostLink(window.ContentData.lessons, 'random-lesson-link');
})();
