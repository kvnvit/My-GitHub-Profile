const urlMainInfo = "https://api.github.com/users/kvnvit";
const urlRepositories = "https://api.github.com/users/kvnvit/repos";
const profileInfo = document.querySelector("#profile");
const repositoriesInfo = document.querySelector("#repositories");

if (profileInfo) {
  loadMainInfo();
}

async function loadMainInfo() {
  profileInfo.innerHTML = `
<div class="main__loading">
  <img src="../img/loading.gif" alt="Loading...">
</div>`;

  repositoriesInfo.innerHTML = `
<div class="repo__loading">
  <img src="../img/loading.gif" alt="Loading...">
</div>`;

  let responseMain = await fetch(urlMainInfo, {method: "GET"});
  let mainInfo = await responseMain.json();

  if (responseMain.ok) {
    getMainInfo(mainInfo);
  } else {
    profileInfo.innerHTML = mainInfo.message;
  }

  let responseRepo = await fetch(urlRepositories, {method: "GET"});
  let repoInfo = await responseRepo.json();

  if (responseRepo.ok) {
    getRepositoriesInfo(repoInfo);
  } else {
    repositoriesInfo.innerHTML = repoInfo.message;
  }

}

function getMainInfo(data) {
  const nameUser = data.name;
  const login = data.login;
  const avatarUrl = data.avatar_url;
  const dateCreation = new Date(data.created_at).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const htmlUrl = data.html_url;
  const typeAccount = data.type;
  const followers = data.followers;
  const following = data.following;
  const publicRepos = data.public_repos;

  const templateMain = `
  <div class="main__field first">
  <span class="sub-title">User's name: </span>
  <span>${nameUser}</span>
</div>
<div class="main__field">
  <span class="sub-title">User's login: </span>
  <span>${login}</span>
</div>
<div class="main__field field-avatar">
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

  profileInfo.innerHTML = templateMain;
}

function getRepositoriesInfo(data) {
  repositoriesInfo.innerHTML = ``;
  let itemRepository;
  let itemLastCommit;
  let dateLastCommit;
  const listOfRepositories = document.querySelector('.repositories');

  for (let i = 0; i < data.length; i++) {
    itemRepository = document.createElement("li");
    itemRepository.classList.add("item__repository");
    itemLastCommit = document.createElement("p");
    listOfRepositories.append(itemRepository);
    itemRepository.innerHTML = `${i + 1}. ${data[i].name}`;

    if (data[i].default_branch === "master" || data[i].default_branch === "main") {
      let dateTemp = new Date(data[i].pushed_at).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
      dateLastCommit = `Branch: ${data[i].default_branch}, last commit date: ${dateTemp}`;
    } else {
      dateLastCommit = `The main branch of this repository is not "main" or "master"`;
    }

    itemLastCommit.innerHTML = dateLastCommit;
  }

  function showDate(target) {
    target.append(itemLastCommit);
    itemLastCommit.classList.toggle("active");
  }

  listOfRepositories.addEventListener("click", function (event) {
    let target = event.target;
    if (event.target.closest(".item__repository")) {
      showDate(target);
    }
  });
}
