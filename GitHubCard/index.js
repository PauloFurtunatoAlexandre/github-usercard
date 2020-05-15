/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/
const gitCard = (image, fullName, login, userLocation, link, allFollowers, allFollowing, summary) => {
  const card = document.createElement('div');
  const img = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');
  const profileLink = document.createElement('a');
  const ghGraph = document.createElement('img');

  img.setAttribute('src', image); 
  name.textContent = fullName;
  userName.textContent = login;
  location.textContent = `Location: ${userLocation}`;
  profileLink.textContent = 'Click here';
  profileLink.setAttribute('href', link)
  profile.textContent = `Profile: `;
  followers.textContent = `Followers: ${allFollowers}`;
  following.textContent = `Following: ${allFollowing}`;
  bio.textContent = `Bio: ${summary}`;
  ghGraph.setAttribute('src', 'http://ghchart.rshah.org/PauloFurtunatoAlexandre');
  ghGraph.style.width = '100%';
  ghGraph.classList.add('graph');

  card.appendChild(img);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(bio);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(ghGraph);
  profile.appendChild(profileLink);

  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('username');

  return card;
}
/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

const entryPoint = document.querySelector('.cards');

axios.get('https://cors-anywhere.herokuapp.com/https://api.github.com/users/PauloFurtunatoAlexandre')
  .then(response => {
    const dataItem = response.data;
    
    const newGitCard = gitCard(
      dataItem['avatar_url'], 
      dataItem['name'], 
      dataItem['login'],
      dataItem['location'], 
      dataItem['url'], 
      dataItem['followers'], 
      dataItem['following'], 
      dataItem['bio']
      );

    entryPoint.appendChild(newGitCard);
  
  })
  .catch(err => {
    alert('Something did not work well!');
  });
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const gitCardOtherUsers = (image, fullName, login, userLocation, link, allFollowers, allFollowing, summary, item) => {
  const card = document.createElement('div');
  const img = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');
  const profileLink = document.createElement('a');
  const ghGraphOthers = document.createElement('img');

  const dynamicLink = `http://ghchart.rshah.org/${item}`;

  img.setAttribute('src', image); 
  name.textContent = fullName;
  location.textContent = `Location: ${userLocation}`;
  profileLink.textContent = 'Click here';
  profileLink.setAttribute('href', link)
  profile.textContent = `Profile: `;
  followers.textContent = `Followers: ${allFollowers}`;
  following.textContent = `Following: ${allFollowing}`;
  bio.textContent = `Bio: ${summary}`;
  ghGraphOthers.setAttribute('src', dynamicLink);
  ghGraphOthers.style.width = '100%';
  ghGraphOthers.classList.add('graph');
  card.classList.add('card');
  userName.textContent = login;

  card.appendChild(img);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(bio);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(ghGraphOthers);
  profile.appendChild(profileLink);

  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('username');

  return card;
}

const followersArray = ['slroberts', 'reidysj', 'Jfadelli', 'angelabauer', 'diego3g'];

followersArray.forEach((item) => {
  const otherGithubUsers = `https://cors-anywhere.herokuapp.com/https://api.github.com/users/${item}`;

  axios.get(otherGithubUsers)
  .then(response => {
    const dataItem = response.data;
    
    const newGitCard = gitCardOtherUsers(
      dataItem['avatar_url'], 
      dataItem['name'],
      dataItem['login'],
      dataItem['location'], 
      dataItem['url'], 
      dataItem['followers'], 
      dataItem['following'], 
      dataItem['bio'],
      item
      );

    entryPoint.appendChild(newGitCard);
  
  })
  .catch(err => {
    alert('Something did not work well!');
  });
});

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
