frontPost = document.getElementById("frontPost")
backPost = document.getElementById("backPost")
submitBtn = document.getElementById("submit")
nextBtn = document.getElementById("next")
prevBtn = document.getElementById("prev")
deleteBtn = document.getElementById("delete")
revealBtn = document.getElementById("reveal")
randomBtn = document.getElementById("randomize")
newFrontPost = document.getElementById("newFrontPost")
newBackPost = document.getElementById("newBackPost")

localUrl = "http://localhost:3000"

submitBtn.addEventListener("click", async function () {
    await addPost(newFrontPost.value, newBackPost.value)
    allPosts = await getPosts()
    newFrontPost.value = ""
    newBackPost.value = ""
  });

nextBtn.addEventListener("click", async function () {
    nextPost()
});

prevBtn.addEventListener("click", async function () {
    prevPost()
});

revealBtn.addEventListener("click", async function () {
    revealPost()
});

deleteBtn.addEventListener("click", async function () {
    deletePost()
});

randomBtn.addEventListener("click", async function () {
    randomPost()
});

var postIndex = -1
var allPosts = []

async function initializePosts() {
    revealBtn.style.visibility = "hidden";
    deleteBtn.style.visibility = "hidden";
    randomBtn.style.visibility = "hidden";
    allPosts = await getPosts();
}

initializePosts()

function nextPost() {
    revealBtn.style.visibility = "visible";
    deleteBtn.style.visibility = "visible";
    randomBtn.style.visibility = "visible";
    postIndex += 1
    if (postIndex == allPosts.length) {
        postIndex = 0
    }
    backPost.innerHTML = ""
    frontPost.innerHTML = allPosts[postIndex].front
}

function prevPost() {
    postIndex -= 1
    if (postIndex == -1) {
        postIndex = allPosts.length - 1
    }
    backPost.innerHTML = ""
    frontPost.innerHTML = allPosts[postIndex].front
}

function revealPost() {
    backPost.innerHTML = allPosts[postIndex].back
}

async function deletePost() {
    await deletePostById(allPosts[postIndex]._id)
    allPosts = await getPosts()
    backPost.innerHTML = ""
    frontPost.innerHTML = allPosts[postIndex].front
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

async function randomPost() {
    postIndex = randomInteger(0, allPosts.length - 1)
    backPost.innerHTML = ""
    frontPost.innerHTML = allPosts[postIndex].front
}

async function apiCall(url, front=null, back=null) {
    if (front && back) {
        let data = {
            "front": front,
            "back": back
        }
        var response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
    } else {
        var response = await fetch(url)
    }
    let responseData = await response.json()
    return responseData
}

async function getPosts() {
    let formattedUrl = localUrl + "/posts"
    let allPosts = await apiCall(formattedUrl)
    return allPosts
}

async function getPostById(id) {
    let formattedUrl = localUrl + "/post/" + id
    let post = await apiCall(formattedUrl)
    return post
}

async function addPost(front, back) {
    let formattedUrl = localUrl + "/new"
    let status = await apiCall(formattedUrl, front, back)
    return status
}

async function deletePostById(id) {
    let formattedUrl = localUrl + "/delete/" + id
    let post = await apiCall(formattedUrl)
    return post
}