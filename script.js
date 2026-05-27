// 🔥 CHANGE THIS to your EC2 public IP
const API = "http://98.92.119.61:3000/posts";

// =======================
// 📝 CREATE BLOG
// =======================
async function createPost() {

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const imageUrl = document.getElementById("image").value.trim();

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
      body: JSON.stringify({
        title,
        content,
        imageUrl
      })
    });

    if (!res.ok) {
      throw new Error("Failed to publish blog");
    }

    // ✅ Success
    alert("✅ Blog Published Successfully!");

    // Clear form
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("image").value = "";

    // Reload blogs instantly
    loadPosts();

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

  // If page has no posts section
  if (!container) return;

  try {

    const res = await fetch(API);

    const posts = await res.json();

    container.innerHTML = "";

    // No blogs
    if (posts.length === 0) {

      container.innerHTML = `
        <p style="
          text-align:center;
          color:#666;
          font-size:1.1rem;
        ">
          No blogs published yet 🚀
        </p>
      `;

      return;
    }

    // Latest first
    posts.reverse();

    posts.forEach(post => {

      container.innerHTML += `

        <div class="post-card">

          <img 
            src="${post.imageUrl || 'https://picsum.photos/600/400'}"
            alt="${post.title}"
          />

          <div class="post-content">

            <h3>${post.title}</h3>

            <p>
              ${post.content.substring(0, 120)}...
            </p>

            <small style="
              display:block;
              margin-top:15px;
              color:#777;
            ">
              🕒 ${new Date(post.createdAt).toLocaleString()}
            </small>

          </div>

        </div>

      `;
    });

  } catch (err) {

    console.error(err);

    container.innerHTML = `
      <p style="
        text-align:center;
        color:red;
        font-size:1.1rem;
      ">
        ❌ Failed to load blogs
      </p>
    `;
  }
}

// =======================
// 🚀 AUTO LOAD BLOGS
// =======================
loadPosts();
