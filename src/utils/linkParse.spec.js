import linkParse from './linkParse'

describe('parse link string', () => {

  test('path Transform', () => {
    expect(linkParse(undefined)).toEqual(undefined)
    expect(linkParse(null)).toEqual(undefined)
    expect(linkParse('<https://api.github.com/search/users?q=moz+in:login&per_page=9&page=2>; rel="next"'))
      .toEqual({next: {link: 'https://api.github.com/search/users?q=moz+in:login&per_page=9&page=2', page: 2}})
    expect(linkParse('<https://api.github.com/search/users?q=moz+in:login&per_page=9&page=1>; rel="prev", <https://api.github.com/search/users?q=moz+in:login&per_page=9&page=3>; rel="next", <https://api.github.com/search/users?q=moz+in:login&per_page=9&page=112>; rel="last", <https://api.github.com/search/users?q=moz+in:login&per_page=9&page=1>; rel="first"'))
      .toEqual({
        first: { link: 'https://api.github.com/search/users?q=moz+in:login&per_page=9&page=1', page: 1},
        prev: { link: 'https://api.github.com/search/users?q=moz+in:login&per_page=9&page=1', page: 1},
        next: { link: 'https://api.github.com/search/users?q=moz+in:login&per_page=9&page=3', page: 3 },
        last: { link: 'https://api.github.com/search/users?q=moz+in:login&per_page=9&page=112', page: 112},
      })
  })

})