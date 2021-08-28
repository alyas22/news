/* eslint-disable complexity */
const users = JSON.parse(localStorage.getItem('users')) || [];

export function configureFakeUserBackend() {
  const realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
          const params = JSON.parse(opts.body);
          const filteredUsers = users.filter(user => user.email === params.email && user.password === params.password);

          if (filteredUsers.length) {
            // if login details are valid return user details and fake jwt token
            const user = filteredUsers[0];
            const responseJson = {
              id: user.id,
              email: user.email,
              name: user.name,
              nationalid: user.nationalid,
              phone: user.phone,
              dateInput: user.dateInput,
              token: 'fake-jwt-token',
            };
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
          } else {
            reject('Username or password is incorrect');
          }

          return;
        }

        // register user
        if (url.endsWith('/users/register') && opts.method === 'POST') {
          // get new user object from post body
          const newUser = JSON.parse(opts.body);

          // validation
          const duplicateUser = users.filter(user => user.email === newUser.email).length;
          if (duplicateUser) {
            reject(`Email "${newUser.email}" is already taken`);
            return;
          }

          // save new user
          newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));
          // respond 200 OK
          resolve({ ok: true, text: () => Promise.resolve() });
          return;
        }
        // pass through any requests not handled above
        realFetch(url, opts).then(response => resolve(response));
      }, 500);
    });
  };
}

const userNews = JSON.parse(localStorage.getItem('news')) || [];

export function configureFakeUserNewsBackend() {
  const realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url.endsWith('/news/save') && opts.method === 'POST') {
          const news = JSON.parse(opts.body);
          console.log(userNews);
          console.log(news);
          // validation
          const duplicateNews = userNews.filter(news1 => news1.userid === news.userid && news1.title === news.title).length;
          if (duplicateNews) {
            reject('This Artical is already taken');
            return;
          }
          userNews.push(news);
          localStorage.setItem('news', JSON.stringify(userNews));
          // respond 200 OK
          resolve({ ok: true, text: () => Promise.resolve() });

          return;
        }

        // get My seved news
        if (url.endsWith('/myNews') && opts.method === 'GET') {
          resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(userNews)) });
          return;
        }

        // delete news
        // if (url.endsWith('/news/delete') && opts.method === 'DELETE') {
        //   const news = JSON.parse(opts.body);
        //   console.log(userNews);
        //   console.log(news);
        //   // validation
        //   const deletedNews = userNews.filter(news1 => news1.userid === news.userid && news1.title === news.title).length;
        //   // userNews.pop(deletedNews);
        //   console.log(userNews);

        // localStorage.setItem('news', JSON.stringify(userNews));
        //   if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
        //     // find user by id in users array
        //     const urlParts = url.split('/');
        //     const id = parseInt(urlParts[urlParts.length - 1]);
        //     for (let i = 0; i < users.length; i++) {
        //       const user = users[i];
        //       if (user.id === id) {
        //         // delete user
        //         users.splice(i, 1);
        //         localStorage.setItem('users', JSON.stringify(users));
        //         break;
        //       }
        //     }

        //     // respond 200 OK
        //     resolve({ ok: true, text: () => Promise.resolve() });
        //   } else {
        //     // return 401 not authorised if token is null or invalid
        //     reject('Unauthorised');
        //   }

        // return;
        // }

        // pass through any requests not handled above
        realFetch(url, opts).then(response => resolve(response));
      }, 500);
    });
  };
}
