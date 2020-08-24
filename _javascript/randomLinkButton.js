(function() {
  const posts = window.ContentData.posts,
        randomPost = posts[Math.floor(Math.random() * posts.length)],
        postLinkElement = document.getElementById('random-post-link');

  if (postLinkElement) {
    postLinkElement.classList.remove('hidden');
    postLinkElement.setAttribute('href', randomPost.url);
  }
})();

(function() {
  const notes = window.ContentData.notes,
        randomNote = notes[Math.floor(Math.random() * notes.length)],
        noteLinkElement = document.getElementById('random-note-link');

  if (noteLinkElement) {
    noteLinkElement.classList.remove('hidden');
    noteLinkElement.setAttribute('href', randomNote.url);
  }
})();
