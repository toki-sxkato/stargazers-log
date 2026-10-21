const repositoryList = document.querySelector("#repository-list");
const statusMessage = document.querySelector("#status");

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list.");
    }

    for (const repository of repositories) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const description = document.createElement("p");
      const starredAt = document.createElement("time");

      link.href = repository.url;
      link.textContent = repository.name;
      description.textContent = repository.description;
      starredAt.dateTime = repository.starredAt;
      starredAt.textContent = `Starred on ${repository.starredAt}`;

      item.append(link, description, starredAt);
      repositoryList.append(item);
    }

    statusMessage.textContent = repositories.length
      ? ""
      : "No starred repositories to show.";
  } catch (error) {
    statusMessage.textContent = "Unable to load starred repositories.";
    console.error(error);
  }
}

loadRepositories();
