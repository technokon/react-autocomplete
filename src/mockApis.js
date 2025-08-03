const items = [
  'apple',
  'banana',
  'blueberry',
  'grape',
  'strawberry',
  'kiwi',
  'mango',
  'orange',
  'pineapple'
];


export function fetchSuggestions(query) {
  return new Promise(res => {
    setTimeout(() => {

      res(items.filter(i => i.includes(query.toLowerCase())))

    }, 500)
  })
}