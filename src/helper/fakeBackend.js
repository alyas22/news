/* eslint-disable complexity */
const users = JSON.parse(localStorage.getItem('users')) || [];
const userNews = JSON.parse(localStorage.getItem('news')) || [];

export function configureFakeBackend() {
  const realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
          const params = JSON.parse(opts.body);
          const filteredUsers = users.filter(user => user.email === params.email && user.password === params.password);

          if (filteredUsers.length) {
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
          resolve({ ok: true, text: () => Promise.resolve() });
          return;
        }
        // save news
        if (url.endsWith('/news/save') && opts.method === 'POST') {
          const news = JSON.parse(opts.body);
          // validation
          const duplicateNews = userNews.filter(news1 => news1.userid === news.userid && news1.title === news.title).length;
          if (duplicateNews) {
            reject('This Artical is already saved');
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
        if (url.endsWith('/news/delete') && opts.method === 'DELETE') {
          const news = JSON.parse(opts.body);

          const index = userNews.findIndex(news1 => news1.userid === news.userid && news1.title === news.title);
          const newData = [...userNews.slice(0, index), ...userNews.slice(index + 1)];

          localStorage.setItem('news', JSON.stringify(newData));
          // respond 200 OK
          resolve({ ok: true, text: () => Promise.resolve() });
          return;
        }
        realFetch(url, opts).then(response => resolve(response));
      }, 500);
    });
  };
}
