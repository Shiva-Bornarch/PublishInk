// 🔥 CHANGE THIS to your EC2 public IP
const API = "http://65.0.104.101:3000/posts";

// =======================
// 📝 CREATE BLOG
// =======================
async function createPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const imageUrl = document.getElementById("image").value;

  if (!title || !content) {
    alert("⚠️ Title & Content are required");
    return;
  }

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content, imageUrl })
    });

    if (!res.ok) {
      throw new Error("Failed to publish blog");
    }

    // ✅ Success message
    alert("✅ Blog Published Successfully!");

    // ✅ Open published blogs in new tab
    window.open("/published-blogs.html", "_blank");

    // (optional) clear form
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("image").value = "";

  } catch (err) {
    console.error(err);
    alert("❌ Error publishing blog. Check console.");
  }
}

// =======================
// 📚 LOAD BLOGS
// =======================
async function loadPosts() {
  const container = document.getElementById("posts");

  // If no posts container (e.g., homepage), skip
  if (!container) return;

  try {
    const res = await fetch(API);
    const posts = await res.json();

    container.innerHTML = "";

    if (posts.length === 0) {
      container.innerHTML = "<p>No blogs published yet.</p>";
      return;
    }

    posts.forEach(post => {
      container.innerHTML += `
        <div class="card">
          <img src="${post.imageUrl || 'https://picsum.photos/400'}" />
          <div class="card-content">
            <h3>${post.title}</h3>
            <p>${post.content.substring(0, 100)}...</p>
            <small>${new Date(post.createdAt).toLocaleString()}</small>
          </div>
        </div>
      `;
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>❌ Failed to load posts</p>";
  }
}

// =======================
// 🚀 AUTO LOAD
// =======================
loadPosts();
