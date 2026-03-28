const API = "http://localhost:3000/posts";

async function loadPosts() {
  const container = document.getElementById("posts");
  if (!container) return;

  const res = await fetch(API);
  const posts = await res.json();

  container.innerHTML = "";

  posts.forEach(post => {
    container.innerHTML += `
      <div class="card">
        <img src="${post.imageUrl || 'https://picsum.photos/400'}"/>
        <div class="card-content">
          <h3>${post.title}</h3>
          <p>${post.content.substring(0, 100)}...</p>
          <small>${new Date(post.createdAt).toLocaleString()}</small>
        </div>
      </div>
    `;
  });
}

loadPosts();

async function createPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const imageUrl = document.getElementById("image").value;

  if (!title || !content) {
    alert("Title & Content required");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, content, imageUrl })
  });

  // ✅ Redirect to clean URL
  window.location.href = "/published-blogs";
}
