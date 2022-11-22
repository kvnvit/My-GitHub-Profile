const profileInformation = document.querySelector("#profile");


async function loadRepositoryInformation() {

  profileInformation.innerHTML = `
<div class="info__loading">
  <img src="../img/loading.gif" alt="Loading...">
</div>`;

  // const user = "kvnvit";
  let url = 'https://api.github.com/users/kvnvit';
  let response = await fetch(url, {method: "GET"});
  let mainInfo = await response.json();

  if (response.ok) {
    getRepositoryInformation(mainInfo);
  } else {
    profileInformation.innerHTML = mainInfo.message;
  }
}

if (profileInformation) {
  loadRepositoryInformation();
}

function getRepositoryInformation(data) {
  console.log(data);
  const nameUser = data.name;
  const login = data.login;
  const avatarUrl = data.avatar_url;
  const dateCreation = new Date(data.created_at).toLocaleDateString('en-us', {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const htmlUrl = data.html_url;
  const typeAccount = data.type;
  const followers = data.followers;
  const following = data.following;
  const publicRepos = data.public_repos;

  // HTML Template
  const template = `
  <div class="main__field">
  <span class="sub-title">User's name: </span>
  <span>${nameUser}</span>
</div>
<div class="main__field">
  <span class="sub-title">User's login: </span>
  <span>${login}</span>
</div>
<div class="main__field">
  <img src="${avatarUrl}" alt="User's avatar" class="avatar">
</div>
<div class="main__field">
  <span class="sub-title">Account creation date: </span>
  <span>${dateCreation}</span>
</div>
<div class="main__field">
  <span class="sub-title">Account link: </span>
  <a href="${htmlUrl}" class="link" target="_blank">${htmlUrl}</a>
</div>
<div class="main__field">
  <span class="sub-title">Account type: </span>
  <span>${typeAccount}</span>
</div>
<div class="main__field">
  <span class="sub-title">Followers: </span>
  <span>${followers}</span>
</div>
<div class="main__field">
  <span class="sub-title">Following: </span>
  <span>${following}</span>
</div>
<div class="main__field">
  <span class="sub-title">Public repositories: </span>
  <span>${publicRepos}</span>
</div>`;

  profileInformation.innerHTML = template;

  console.log(login);
  for (let key in data) {
    // if (!(mainInfo[key] === 0 || mainInfo[key] === null || mainInfo[key] === "")) {
    // console.log(key, data[key]);
    // }
  }
}

// getRepositoryInformation();

async function getListRepositories() {
  let url = 'https://api.github.com/users/kvnvit/repos';
  let response = await fetch(url);
  let repositories = await response.json();

  for (let i = 0; i < repositories.length; i++) {
    console.log(repositories[i].name);
  }
}

// getListRepositories();

async function getLastCommit() {
  let url = 'https://api.github.com/repos/kvnvit/my_pages/commits';
  let response = await fetch(url);
  let commits = await response.json();

  console.log("Last commit date:", new Date(commits[0].commit.author.date).toLocaleDateString('en-us', {
    year: "numeric",
    month: "short",
    day: "numeric"
  }));
}

// getLastCommit();